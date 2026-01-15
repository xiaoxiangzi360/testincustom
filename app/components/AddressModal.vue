<template>
    <UModal :model-value="props.isshow" @update:model-value="(v) => { if (!v) emit('close') }" :prevent-close="false"
        :ui="{ rounded: 'rounded', container: 'items-center',wrapper:'z-[1000]' ,base:'dark:bg-white'}">
        <div class="p-4 rounded">
            <div class="text-lg font-medium pb-4">{{ form.id ? 'Edit' : 'Add' }} Address</div>

            <Form ref="formRef" :model="form" :rules="rules" layout="vertical" @keydown.enter.prevent>
                <FormItem name="country">
                    <Select v-model:value="form.country" show-search :options="countryOptions"
                        placeholder="Select Country/Region" :filter-option="filterOptionByLabel" allowClear />
                </FormItem>

                <FormItem name="firstName">
                    <Input v-model:value="form.firstName" placeholder="First name" size="large" />
                </FormItem>

                <FormItem name="lastName">
                    <Input v-model:value="form.lastName" placeholder="Last name" size="small" />
                </FormItem>

                <!-- Street Address：Autocomplete + 选中回填 -->
                <FormItem name="address">
                    <AutoComplete v-model:value="addressQuery" :options="addressOptions" :loading="addrLoading"
                        placeholder="Street Address" @search="onAddressSearch"
                        @select="(_, option) => onAddressSelect(option as any)"
                        class="[&_.ant-select-selector]:!h-[32px] [&_.ant-select-selection-search-input]:text-sm" />
                </FormItem>

                <FormItem name="province">
                    <Select allowClear v-model:value="form.province" show-search :options="provinceOptions"
                        placeholder="Select State/Province" :filter-option="filterOptionByLabel" />
                </FormItem>

                <FormItem name="city" class="text-sm">
                    <AutoComplete class="text-sm [&_.ant-input]:text-sm" allowClear v-model:value="form.city"
                        show-search :options="cityOptions" :filter-option="filterOptionByLabel"
                        placeholder="Select City" />
                </FormItem>

                <FormItem name="postalCode">
                    <Input v-model:value="form.postalCode" placeholder="Zip code" />
                </FormItem>

                <FormItem name="email">
                    <Input v-model:value="form.email" placeholder="Email(optional)" />
                </FormItem>

                <FormItem name="number">
                    <div class="flex gap-2">
                        <Select v-model:value="form.numberCode" class="!w-24" show-search
                            :options="countryCodeOptions" />
                        <Input v-model:value="form.number" placeholder="Your number" class="flex-1" />
                    </div>
                </FormItem>

                <FormItem>
                    <Checkbox v-model:checked="form.master">Set as default address</Checkbox>
                </FormItem>

                <div class="flex justify-between gap-4">
                    <Button type="default" class="flex-1" @click="closeModal">Cancel</Button>
                    <Button type="primary" @click="subform" :loading="loading" class="flex-1 bg-primary">Submit</Button>
                </div>
            </Form>
        </div>
    </UModal>
</template>

<script setup lang="ts">
import { message, Input, Select, Form, FormItem, Checkbox, Button, AutoComplete } from 'ant-design-vue'
import { ref, watch, nextTick, onMounted, onUnmounted, computed } from 'vue'
import { useGoogleMapsLoader } from '@/composables/useGoogleMapsLoader'

const { createUserAddress, editUserAddress } = AddressAuth()
const { listCountryAll, listProvinceByCountryId, listCityByRegionId } = LocationAuth()
const locationinfo = useCookie<any>('locationinfo')

import { usePlacesAutocomplete, pickAddress, getCity, getStreet, normalizeStr } from '@/composables/usePlacesAutocomplete'

// ===== Props / Emits =====
const props = defineProps<{ isshow: boolean; addressinfo?: any }>()
const emit = defineEmits(['close', 'updateData'])

// ===== Refs / State =====
const formRef = ref()
const loading = ref(false)
const hydrating = ref(false)

const countryarr = ref<any[]>([])
const provincearr = ref<any[]>([])
const cityarr = ref<any[]>([])

const DEFAULT_DIAL_CODE = '+1'

const countries = [
    '+1', '+44', '+93', '+355', '+213', '+1684', '+376', '+244', '+1264', '+1268',
    '+54', '+374', '+297', '+61', '+43', '+994', '+1242', '+973', '+880', '+1246',
    '+375', '+32', '+501', '+229', '+1441', '+975', '+591', '+387', '+267', '+55',
    '+246', '+1284', '+673', '+359', '+226', '+257', '+855', '+237', '+238', '+599',
    '+1345', '+236', '+235', '+56', '+86', '+57', '+269', '+243', '+242', '+682',
    '+506', '+225', '+385', '+53', '+599', '+357', '+420', '+45', '+253', '+1767',
    '+593', '+20', '+503', '+240', '+291', '+372', '+251', '+500', '+298', '+679',
    '+358', '+33', '+594', '+689', '+241', '+220', '+995', '+49', '+233', '+350',
    '+30', '+299', '+1473', '+590', '+1671', '+502', '+44', '+224', '+245', '+592',
    '+509', '+504', '+852', '+36', '+354', '+91', '+62', '+98', '+964', '+353',
    '+972', '+39', '+1876', '+81', '+962', '+7', '+254', '+686', '+383', '+965',
    '+996', '+856', '+371', '+961', '+266', '+231', '+218', '+423', '+370', '+352',
    '+853', '+389', '+261', '+265', '+60', '+960', '+223', '+356', '+692', '+596',
    '+222', '+230', '+262', '+52', '+691', '+373', '+377', '+976', '+382', '+1664',
    '+212', '+258', '+95', '+264', '+674', '+977', '+31', '+687', '+64', '+505',
    '+227', '+234', '+683', '+672', '+850', '+1670', '+47', '+968', '+92', '+680',
    '+970', '+507', '+675', '+595', '+51', '+63', '+48', '+351', '+974', '+262',
    '+40', '+7', '+250', '+590', '+290', '+1869', '+1758', '+508', '+1784', '+685',
    '+378', '+239', '+966', '+221', '+381', '+248', '+232', '+65', '+1721', '+421',
    '+386', '+677', '+252', '+27', '+82', '+211', '+34', '+94', '+249', '+597',
    '+268', '+46', '+41', '+963', '+886', '+992', '+255', '+66', '+670', '+228',
    '+690', '+676', '+1868', '+216', '+90', '+993', '+1649', '+688', '+1340',
    '+256', '+380', '+971', '+598', '+998', '+678', '+58', '+84', '+681', '+212',
    '+967', '+260', '+263', '+358'
]

const form = ref({
    id: '',
    firstName: '',
    lastName: '',
    address: '',
    postalCode: '',
    country: null as null | string,
    province: null as null | string,
    city: '',
    numberCode: DEFAULT_DIAL_CODE,
    number: '',
    master: false,
    email: ''
})

// ===== 规则（对 AutoComplete 建议 blur+change） =====
const rules = {
    country: [{ required: true, message: 'Please select country', trigger: 'change' }],
    firstName: [{ required: true, message: 'Please input firstName', trigger: ['blur', 'change'] }],
    lastName: [{ required: true, message: 'Please input lastName', trigger: ['blur', 'change'] }],
    address: [{ required: true, message: 'Please input address', trigger: ['blur', 'change'] }],
    province: [{ required: true, message: 'Please select State/Province', trigger: 'change' }],
    city: [{ required: true, message: 'Please select city', trigger: ['blur', 'change'] }],
    postalCode: [{ required: true, message: 'Please input postalCode', trigger: ['blur', 'change'] }],
    number: [{ required: true, message: 'Please input number', trigger: ['blur', 'change'] }],
    // email:     [{ type: 'email', message: 'Invalid email', trigger: ['blur','change'] }]
}

// ===== 选项 =====
const countryOptions = computed(() =>
    (countryarr.value ?? []).map(c => ({ label: c.countryName, value: c.countryCode }))
)
const provinceOptions = computed(() =>
    (provincearr.value ?? []).map(p => ({ label: p.regionName, value: p.regionName }))
)
const cityOptions = computed(() =>
    (cityarr.value ?? []).map(c => ({ label: c.cityName, value: c.cityName }))
)
const countryCodeOptions = computed(() =>
    (countries ?? []).map(code => ({ label: code, value: code }))
)

// ===== Places Autocomplete =====
const { loading: addrLoading, options: addressOptionsRaw, search, getDetails, resetPlacesSession } = usePlacesAutocomplete()

const addressQuery = ref('')
const addressOptions = computed(() =>
    addressOptionsRaw.value.map(o => ({ value: o.label, label: o.label, placeId: o.placeId }))
)
let addressSearchTimer: any = null

const onAddressSearch = (val: string) => {
    addressQuery.value = val
    clearTimeout(addressSearchTimer)

    const q = (val ?? '').trim()
    if (q.length < 3) return

    addressSearchTimer = setTimeout(() => {
        const country = (form.value.country || '').toUpperCase() || undefined
        // 核心：清偏置 + 强制全国矩形（抵消加州 IP 偏置）
        search(q, { country, clearBias: true, enforceCountryBounds: true })
    }, 250)
}

// 选中联想 → 详情 → 回填（带城市智能匹配）
const onAddressSelect = async (option: { value: string; label: string; placeId: string }) => {
    const place = await getDetails(option.placeId)
    if (!place) return
    hydrating.value = true
    try {
        const comp = place.address_components || []
        const countryCode = pickAddress(comp, 'country', true) // ISO-2
        const provinceName = pickAddress(comp, 'administrative_area_level_1')
        const cityNameFromGmp = getCity(comp)
        const postal = pickAddress(comp, 'postal_code')
        const street = getStreet(comp)

        // 1) 基本字段
        form.value.address = street || (place.formatted_address || option.label)
        addressQuery.value = form.value.address
        if (postal) form.value.postalCode = postal

        // 2) 国家切换 → 拉省
        if (countryCode && form.value.country !== countryCode) {
            form.value.country = countryCode
            const c = countryarr.value?.find(x => x.countryCode === countryCode)
            if (c?.phone) form.value.numberCode = c.phone
            await nextTick()
            await getProvince()
        }

        // 3) 省 → 拉市列表
        if (provinceName) {
            form.value.province = provinceName
            await nextTick()
            await getCityList()
        }

        // 4) 智能匹配城市（对齐你接口返回的标准名）
        if (cityNameFromGmp) {
            const target = normalizeStr(cityNameFromGmp)
            const list = (cityarr.value ?? []).map((c: any) => c.cityName).filter(Boolean)

            let hit =
                list.find((n: string) => normalizeStr(n) === target) ||
                list.find((n: string) => normalizeStr(n).startsWith(target)) ||
                list.find((n: string) => target.startsWith(normalizeStr(n))) ||
                list.find((n: string) => normalizeStr(n).includes(target) || target.includes(normalizeStr(n)))

            form.value.city = hit || cityNameFromGmp

            // 列表里没有则临时塞一条，避免下拉里看不到
            if (!hit) {
                cityarr.value = [{ cityName: form.value.city }, ...(cityarr.value || [])]
            }
        }
    } finally {
        hydrating.value = false
    }
}

// ===== Utils =====
const closeModal = () => emit('close')
const filterOptionByLabel = (input: string, option?: { label?: string }) =>
    (option?.label ?? '').toLowerCase().includes((input ?? '').toLowerCase())

// ===== API 封装 =====
const getCountrylist = async () => {
    try {
        const res = await listCountryAll()
        countryarr.value = res?.result ?? []
    } catch (e) {
        console.error(e)
        countryarr.value = []
    }
}

const getProvince = async () => {
    if (!form.value.country) { provincearr.value = []; cityarr.value = []; return }
    const c = countryarr.value?.find(x => x.countryCode === form.value.country)
    if (!c) { provincearr.value = []; cityarr.value = []; return }
    if (c.phone) form.value.numberCode = c.phone
    try {
        const res = await listProvinceByCountryId({ countryId: c.id })
        provincearr.value = res?.result ?? []
    } catch (e) {
        console.error(e)
        provincearr.value = []
    }
}

// 拉城市列表（避免与 getCity(解析城市名) 重名）
const getCityList = async () => {
    if (!form.value.province) { cityarr.value = []; return }
    const p = provincearr.value?.find(x => x.regionName === form.value.province)
    if (!p) { cityarr.value = []; return }
    try {
        const res = await listCityByRegionId({ regionId: p.id })
        cityarr.value = res?.result ?? []
    } catch (e) {
        console.error(e)
        cityarr.value = []
    }
}

// ===== 关键守卫：国家列表先加载 =====
const ensureCountriesLoaded = async () => {
    if (!countryarr.value.length) {
        await getCountrylist()
        await nextTick()
    }
}

// ===== 级联重置 =====
watch(() => form.value.country, async (newVal) => {
    // 先重置联想会话，避免旧 session 偏向“加州”
    resetPlacesSession?.()

    form.value.province = null
    form.value.city = ''
    provincearr.value = []
    cityarr.value = []
    if (!newVal) { form.value.numberCode = DEFAULT_DIAL_CODE; return }
    const c = countryarr.value?.find(x => x.countryCode === newVal)
    if (c?.phone) form.value.numberCode = c.phone
    await nextTick()
    await getProvince()
})

watch(() => form.value.province, async (newVal) => {
    if (hydrating.value) return
    form.value.city = ''
    cityarr.value = []
    if (!newVal) return
    await nextTick()
    await getCityList()
})

// ===== 提交 =====
const subform = async (event?: Event) => {
    event?.preventDefault?.()
    try {
        await formRef.value.validate()
        loading.value = true
        const countryName = countryarr.value?.find(c => c.countryCode === form.value.country)?.countryName || ''
        const payload: any = {
            id: form.value.id || undefined,
            fullName: `${form.value.firstName} ${form.value.lastName}`.trim(),
            firstName: form.value.firstName,
            lastName: form.value.lastName,
            address: form.value.address,
            city: form.value.city,
            country: form.value.country,
            master: form.value.master ? 1 : 0,
            province: form.value.province,
            postalCode: form.value.postalCode,
            number: form.value.number,
            numberCode: form.value.numberCode,
            email: form.value.email,
            countryName,
            provinceName: form.value.province
        }
        if (form.value.id) {
            await editUserAddress(payload)
            message.success('Update successful')
        } else {
            await createUserAddress(payload)
            message.success('Add successful')
        }
        emit('close'); emit('updateData')
    } catch (err) {
        console.error('Submit Error:', err)
        message.error('Validation or submit failed')
    } finally {
        loading.value = false
    }
}

// ===== 默认国家（基于 cookie） =====
function readLocationCookie():
    | null
    | {
        countryCode: string
        countryName?: string
        provinceName?: string | null
        cityName?: string | null
    } {
    const raw = locationinfo.value
    if (!raw) return null

    if (typeof raw === 'object') {
        const r: any = raw
        if (r.countryCode) {
            return {
                countryCode: String(r.countryCode),
                countryName: r.countryName ? String(r.countryName) : undefined,
                provinceName: r.provinceName ? String(r.provinceName) : null,
                cityName: r.cityName ? String(r.cityName) : null
            }
        }
        return null
    }

    if (typeof raw === 'string') {
        try {
            const obj = JSON.parse(raw)
            if (obj?.countryCode) {
                return {
                    countryCode: String(obj.countryCode),
                    countryName: obj.countryName ? String(obj.countryName) : undefined,
                    provinceName: obj.provinceName ? String(obj.provinceName) : null,
                    cityName: obj.cityName ? String(obj.cityName) : null
                }
            }
        } catch { }
    }
    return null
}
const getdefaultcountry = async () => {
    const cached = readLocationCookie()
    if (!cached) return

    const code = cached.countryCode
    // 触发 watch(country)：会清省/市并拉省列表
    if (code && form.value.country !== code) {
        form.value.country = null
        await nextTick()
        form.value.country = code
    } else if (!form.value.country && code) {
        form.value.country = code
    }

    // 等省份列表到位
    await getProvince()

    // 回填省
    if (cached.provinceName) {
        const hitProvince = (provincearr.value || []).find((p: any) => p.regionName === cached.provinceName)
        if (hitProvince) form.value.province = hitProvince.regionName
    }

    // 拉市列表
    await nextTick()
    await getCityList()

    // 回填市
    if (cached.cityName) {
        const hitCity = (cityarr.value || []).find((c: any) => c.cityName === cached.cityName)
        if (hitCity) form.value.city = hitCity.cityName
    }
}

watch(addressQuery, v => {
    form.value.address = (v ?? '').trim()
})

// ===== 回填 addressinfo（顺序修复 + 同步 addressQuery） =====
watch(() => props.addressinfo, async (val) => {
    if (!val) return
    hydrating.value = true
    try {
        await ensureCountriesLoaded()

        // 1) 先设表单
        form.value = {
            id: val.id || '',
            firstName: val.firstName || '',
            lastName: val.lastName || '',
            address: val.address || '',
            postalCode: val.postalCode || '',
            country: val.country || null,
            province: null,
            city: '',
            numberCode: val.numberCode || DEFAULT_DIAL_CODE,
            number: val.number || '',
            master: val.master == 1,
            email: val.email || ''
        }

        // 2) 同步到 addressQuery
        addressQuery.value = form.value.address || ''

        // 3) 拉省/市并回填
        if (form.value.country) {
            const c = countryarr.value?.find(x => x.countryCode === form.value.country)
            if (c?.phone) form.value.numberCode = c.phone
            await getProvince()
            if (val.province) {
                form.value.province = val.province
                await nextTick()
                await getCityList()
            }
            if (val.city) form.value.city = val.city
        } else {
            await getdefaultcountry()
        }
    } finally {
        hydrating.value = false
    }
}, { immediate: true })

onMounted(async () => {
    await getCountrylist()

    const g = await useGoogleMapsLoader({ libraries: ['places'] })

    // ✅ 可以安全使用 Google Maps 对象了
    const ac = new g.maps.places.AutocompleteService()
})
onUnmounted(() => { clearTimeout(addressSearchTimer) })
</script>


<style scoped>
.ant-input,
.ant-select-selector {
    height: 32px !important;
    display: flex;
    align-items: center;
    padding: 4px 11px !important;
    font-size: 14px;
    border-radius: 4px;
    border-color: #d9d9d9;
}

.ant-input:focus {
    border-color: #00B2E3;
    border: none;
}

.ant-form-item {
    margin-bottom: 12px;
}

/* 去掉 antd Select 的 hover / focus 外边框与阴影 */
:deep(.ant-select:not(.ant-select-disabled):hover .ant-select-selector) {
    border-color: #d9d9d9 !important;
}

:deep(.ant-select-focused .ant-select-selector) {
    border-color: #d9d9d9 !important;
    box-shadow: none !important;
    outline: none !important;
}

/* 去掉 show-search 内部 input 的聚焦轮廓/阴影（内边框） */
:deep(.ant-select .ant-select-selector .ant-select-selection-search-input),
:deep(.ant-select .ant-select-selector .ant-select-selection-search-input:focus),
:deep(.ant-select .ant-select-selector .ant-select-selection-search-input:focus-visible),
:deep(.ant-select .ant-select-selector input[type="search"]),
:deep(.ant-select .ant-select-selector input[type="search"]:focus),
:deep(.ant-select .ant-select-selector input[type="search"]:focus-visible) {
    outline: none !important;
    box-shadow: none !important;
}

:deep(.ant-select .ant-select-selector::after) {
    box-shadow: none !important;
    outline: none !important;
    border: 0 !important;
}

:deep(.ant-select-selection-search-input) {
    font-size: 14px !important;
}
</style>
