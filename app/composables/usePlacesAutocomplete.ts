import { ref } from 'vue'

/** === 公共小工具（保持和你原先导出一致） === */
type Prediction = { value: string; label: string; placeId: string }

/** 统一字符串（去重音/多空格/大小写）用于匹配 */
export function normalizeStr(s: string) {
    return (s || '')
        .normalize('NFD')
        .replace(/\p{Diacritic}/gu, '')
        .replace(/\s+/g, ' ')
        .trim()
        .toLowerCase()
}

/** 从 address_components 中取指定类型 */
export function pickAddress(
    comp: google.maps.GeocoderAddressComponent[] | undefined,
    type: string,
    short = false
) {
    if (!comp) return ''
    const c = comp.find(x => x.types.includes(type))
    return short ? (c?.short_name || '') : (c?.long_name || '')
}

/** 覆盖更多地区：locality → postal_town → admin_level_3 → sublocality_level_1 → admin_level_2 */
export function getCity(comp: google.maps.GeocoderAddressComponent[] | undefined) {
    if (!comp) return ''
    const order = [
        'locality',
        'postal_town',
        'administrative_area_level_3',
        'sublocality_level_1',
        'administrative_area_level_2'
    ]
    for (const t of order) {
        const name = pickAddress(comp, t)
        if (name) return name
    }
    return ''
}

/** route + street_number 组合成街道 */
export function getStreet(comp: google.maps.GeocoderAddressComponent[] | undefined) {
    const route = pickAddress(comp, 'route')
    const no = pickAddress(comp, 'street_number')
    return [route, no].filter(Boolean).join(' ')
}

/** === 重要：为了压住 IP 偏置，支持“整国边界限制” === */

/** ISO3/长名 -> ISO2 映射（常见国家够用） */
const ISO3_TO_ISO2: Record<string, string> = {
    USA: 'US', GBR: 'GB', CAN: 'CA', AUS: 'AU', DEU: 'DE', FRA: 'FR', ITA: 'IT', ESP: 'ES',
    CHN: 'CN', JPN: 'JP', KOR: 'KR', HKG: 'HK', TWN: 'TW', RUS: 'RU', IND: 'IN', MEX: 'MX',
    BRA: 'BR', NLD: 'NL', SWE: 'SE', CHE: 'CH', NOR: 'NO', DNK: 'DK', FIN: 'FI', IRL: 'IE'
}
function toISO2(raw?: string) {
    const s = (raw || '').trim().toUpperCase()
    if (!s) return undefined
    if (s.length === 2) return s
    if (ISO3_TO_ISO2[s]) return ISO3_TO_ISO2[s]
    if (s === 'UNITED STATES' || s === 'UNITED STATES OF AMERICA') return 'US'
    if (s === 'UNITED KINGDOM' || s === 'GREAT BRITAIN') return 'GB'
    return undefined
}

let geocoder: google.maps.Geocoder | null = null
const countryBoundsCache = new Map<string, google.maps.LatLngBounds>()
/** 兜底矩形（少数国家给一个全国大概范围） */
const FALLBACK_BOUNDS: Record<string, { south: number; west: number; north: number; east: number }> = {
    US: { south: 24.396308, west: -124.848974, north: 49.384358, east: -66.885444 },
    GB: { south: 49.8623, west: -8.649, north: 60.8609, east: 1.763 },
    CA: { south: 41.6765556, west: -141.00187, north: 83.113883, east: -52.323198 },
    AU: { south: -43.7405, west: 112.9211, north: -10.051, east: 159.1092 },
    CN: { south: 18.1617, west: 73.4994, north: 53.5609, east: 134.7728 },
}

async function getCountryBounds(iso2: string): Promise<google.maps.LatLngBounds | null> {
    if (countryBoundsCache.has(iso2)) return countryBoundsCache.get(iso2)!
    if (!geocoder) geocoder = new google.maps.Geocoder()
    // 1) 用 Geocoder 解析国家，拿到 viewport/bounds
    const { results } = await geocoder.geocode({ address: iso2 })
    const b = results?.[0]?.geometry?.bounds || results?.[0]?.geometry?.viewport
    if (b) { countryBoundsCache.set(iso2, b); return b }
    // 2) 兜底：使用预置矩形
    const fb = FALLBACK_BOUNDS[iso2]
    if (fb) {
        const bounds = new google.maps.LatLngBounds(
            new google.maps.LatLng(fb.south, fb.west),
            new google.maps.LatLng(fb.north, fb.east)
        )
        countryBoundsCache.set(iso2, bounds)
        return bounds
    }
    return null
}

function normalizeCountry(c?: string | string[]) {
    if (!c) return undefined
    if (Array.isArray(c)) {
        const arr = c.map(x => toISO2(x)).filter(Boolean) as string[]
        return arr.length ? arr : undefined
        // Places JS SDK 支持传 string[]；你也可以只传单个
    }
    return toISO2(c)
}

/** === 主 composable === */

type SearchOpts = {
    /** ISO-2（大写）或数组，例如 'US' | ['US','CA']，支持 'USA'/'United States' 自动转换 */
    country?: string | string[]
    /** 显式清空 bounds/locationBias/locationRestriction 等偏置 */
    clearBias?: boolean
    /** 用“整国边界”限制候选，强力抵消 IP 偏置 */
    enforceCountryBounds?: boolean
}

export function usePlacesAutocomplete() {
    const loading = ref(false)
    const options = ref<Prediction[]>([])

    let acSvc: google.maps.places.AutocompleteService | null = null
    let placesSvc: google.maps.places.PlacesService | null = null
    let sessionToken: google.maps.places.AutocompleteSessionToken | null = null

    const ensureSvc = () => {
        if (!acSvc) acSvc = new google.maps.places.AutocompleteService()
        if (!placesSvc) placesSvc = new google.maps.places.PlacesService(document.createElement('div'))
        if (!sessionToken) sessionToken = new google.maps.places.AutocompleteSessionToken()
    }

    /** 外部可在“国家变化时”调用，避免旧 session 偏向某州/地区 */
    const resetPlacesSession = () => { sessionToken = null }

    /** 只按国家限制的搜索；可清空地理偏置；可用整国 bounds 限制候选 */
    const search = async (input: string, opts?: SearchOpts) => {
        const q = (input || '').trim()
        if (!q) { options.value = []; return }

        ensureSvc()
        loading.value = true

        const country = normalizeCountry(opts?.country)
        const req: google.maps.places.AutocompletionRequest = {
            input: q,
            types: ['address'],                // 只要地址，减少 POI 干扰
            sessionToken: sessionToken!,       // 同一会话内，预测与详情共用
            componentRestrictions: country ? { country } : undefined
        }

        if (opts?.clearBias) {
            // @ts-ignore 彻底清空任何已有偏置
            req.bounds = req.origin = req.locationBias = req.locationRestriction = req.radius = undefined
            // @ts-ignore
            req.strictBounds = false
        }

        // 关键：把候选“限制在该国矩形内”，从根上抵消 IP/常用地点偏置
        if (opts?.enforceCountryBounds && typeof country === 'string') {
            const b = await getCountryBounds(country)
            if (b) {
                // @ts-ignore
                req.locationRestriction = b
                // @ts-ignore
                req.strictBounds = true
            }
        }

        acSvc!.getPlacePredictions(req, (preds, status) => {
            loading.value = false
            if (status !== google.maps.places.PlacesServiceStatus.OK || !preds) {
                options.value = []
                return
            }
            options.value = preds.map(p => ({
                value: p.description,
                label: p.description,
                placeId: p.place_id!
            }))
        })
    }

    /** 获取详情；完成后结束本次会话（下次会创建新的 token） */
    const getDetails = (placeId: string) => new Promise<google.maps.places.PlaceResult | null>((resolve) => {
        ensureSvc()
        placesSvc!.getDetails({
            placeId,
            fields: ['address_components', 'formatted_address', 'geometry', 'place_id'],
            sessionToken: sessionToken || undefined
        }, (place, status) => {
            sessionToken = null // 结束本次会话，避免偏置延续
            if (status !== google.maps.places.PlacesServiceStatus.OK || !place) return resolve(null)
            resolve(place)
        })
    })

    return { loading, options, search, getDetails, resetPlacesSession }
}
