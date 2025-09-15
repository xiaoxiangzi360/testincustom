import { ref } from 'vue'

type Prediction = { value: string; label: string; placeId: string }

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

    const search = (input: string, country?: string | string[]) => {
        if (!input) { options.value = []; return }
        ensureSvc()
        loading.value = true
        acSvc!.getPlacePredictions({
            input,
            types: ['address'],
            sessionToken: sessionToken!,
            componentRestrictions: country ? { country } : undefined
        }, (preds, status) => {
            loading.value = false
            if (status !== google.maps.places.PlacesServiceStatus.OK || !preds) {
                options.value = []; return
            }
            options.value = preds.map(p => ({
                value: p.description,
                label: p.description,
                placeId: p.place_id!
            }))
        })
    }

    const getDetails = (placeId: string) => new Promise<google.maps.places.PlaceResult | null>((resolve) => {
        ensureSvc()
        placesSvc!.getDetails({
            placeId,
            fields: ['address_components', 'formatted_address', 'geometry', 'place_id'],
            sessionToken: sessionToken || undefined
        }, (place, status) => {
            // 结束本次会话（一次输入到选择）
            sessionToken = null
            if (status !== google.maps.places.PlacesServiceStatus.OK || !place) return resolve(null)
            resolve(place)
        })
    })

    return { loading, options, search, getDetails }
}

// 从 address_components 中取指定类型
export function pickAddress(comp: google.maps.GeocoderAddressComponent[] | undefined, type: string, short = false) {
    if (!comp) return ''
    const c = comp.find(x => x.types.includes(type))
    return short ? (c?.short_name || '') : (c?.long_name || '')
}

// 解析城市：优先 locality，其次 admin_level_2
export function getCity(comp: google.maps.GeocoderAddressComponent[] | undefined) {
    return pickAddress(comp, 'locality') || pickAddress(comp, 'administrative_area_level_2')
}

// 拼 street: route + street_number
export function getStreet(comp: google.maps.GeocoderAddressComponent[] | undefined) {
    const route = pickAddress(comp, 'route')
    const no = pickAddress(comp, 'street_number')
    return [route, no].filter(Boolean).join(' ')
}
