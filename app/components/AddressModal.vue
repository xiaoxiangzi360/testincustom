<template>
    <UModal v-model="props.isshow" :ui="{ rounded: 'rounded', container: 'items-center' }">
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

                <FormItem name="address">
                    <Input v-model:value="form.address" placeholder="Street Address" />
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

const { createUserAddress, editUserAddress } = AddressAuth()
const { listCountryAll, listProvinceByCountryId, listCityByRegionId } = LocationAuth()
const locationinfo = useCookie<any>('locationinfo')

// ===== Props / Emits =====
const props = defineProps<{
    isshow: boolean
    addressinfo?: any
}>()
const emit = defineEmits(['close', 'updateData'])

// ===== Refs / State =====
const formRef = ref()
const loading = ref(false)
const hydrating = ref(false) // ⚑ 回填阶段关闭级联 watcher

const countryarr = ref<any[]>([]) // 国家列表
const provincearr = ref<any[]>([]) // 省份列表
const cityarr = ref<any[]>([]) // 城市列表

const DEFAULT_DIAL_CODE = '+1' // 国家清空时的默认区号（可改为 ''）

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

// ===== Rules =====
const rules = {
    country: [{ required: true, message: 'Please select country', trigger: 'change' }],
    firstName: [{ required: true, message: 'Please input firstName', trigger: 'blur' }],
    lastName: [{ required: true, message: 'Please input lastName', trigger: 'blur' }],
    address: [{ required: true, message: 'Please input address', trigger: 'blur' }],
    province: [{ required: true, message: 'Please select State/Province', trigger: 'change' }],
    city: [{ required: true, message: 'Please select city', trigger: 'change' }],
    postalCode: [{ required: true, message: 'Please input postalCode', trigger: 'blur' }],
    number: [{ required: true, message: 'Please input number', trigger: 'blur' }]
}

// ===== Computed options (兜底 []) =====
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

// ===== Utils =====
const closeModal = () => emit('close')
const filterOptionByLabel = (input: string, option?: { label?: string }) =>
    (option?.label ?? '').toLowerCase().includes((input ?? '').toLowerCase())

// ===== API =====
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
    if (!form.value.country) {
        provincearr.value = []
        cityarr.value = []
        return
    }
    const c = countryarr.value?.find(x => x.countryCode === form.value.country)
    if (!c) {
        console.warn('[getProvince] 未找到国家：', form.value.country, 'countries:', countryarr.value.length)
        provincearr.value = []
        cityarr.value = []
        return
    }

    // 同步国家区号（双保险）
    if (c.phone) form.value.numberCode = c.phone

    try {
        const res = await listProvinceByCountryId({ countryId: c.id })
        provincearr.value = res?.result ?? []
    } catch (e) {
        console.error(e)
        provincearr.value = []
    }
}

const getCity = async () => {
    if (!form.value.province) {
        cityarr.value = []
        return
    }
    const p = provincearr.value?.find(x => x.regionName === form.value.province)
    if (!p) {
        console.warn('[getCity] 未找到省份：', form.value.province, 'provinces:', provincearr.value.length)
        cityarr.value = []
        return
    }
    try {
        const res = await listCityByRegionId({ regionId: p.id })
        cityarr.value = res?.result ?? []
    } catch (e) {
        console.error(e)
        cityarr.value = []
    }
}

// ===== 关键守卫：确保国家列表已加载 =====
const ensureCountriesLoaded = async () => {
    if (!countryarr.value.length) {
        await getCountrylist()
        await nextTick()
    }
}

// ===== 级联重置（带 hydrating 短路） =====
// 国家变化：清空省/市并拉省，选择国家时同步区号；回填阶段跳过
watch(
    () => form.value.country,
    async (newVal) => {
        if (hydrating.value) return

        form.value.province = null
        form.value.city = ' '
        provincearr.value = []
        cityarr.value = []

        if (!newVal) {
            form.value.numberCode = DEFAULT_DIAL_CODE // allowClear 时回默认
            return
        }

        const c = countryarr.value?.find(x => x.countryCode === newVal)
        if (c?.phone) form.value.numberCode = c.phone

        await nextTick()
        await getProvince()
    }
)

// 省份变化：清空城市并拉城市；回填阶段跳过
watch(
    () => form.value.province,
    async (newVal) => {
        if (hydrating.value) return

        form.value.city = ' '
        cityarr.value = []
        if (!newVal) return

        await nextTick()
        await getCity()
    }
)

// ===== 提交 =====
const subform = async (event?: Event) => {
    event?.preventDefault?.()
    try {
        await formRef.value.validate()
        loading.value = true

        const countryName =
            countryarr.value?.find(c => c.countryCode === form.value.country)?.countryName || ''
        const payload: any = {
            id: form.value.id || undefined,
            fullName: `${form.value.firstName}${form.value.lastName}`,
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
        emit('close')
        emit('updateData')
    } catch (err) {
        console.error('Submit Error:', err)
        message.error('Validation or submit failed')
    } finally {
        loading.value = false
    }
}

// ===== 默认国家（基于 cookie） =====
const getdefaultcountry = async () => {
    const code = locationinfo.value?.countryCode
    if (!code) return
    if (form.value.country !== code) {
        form.value.country = null
        await nextTick()
        form.value.country = code
    }
}

// ===== 回填 addressinfo（带 hydrating，按“先拉后设”顺序） =====
watch(
    () => props.addressinfo,
    async (val) => {
        if (!val) return

        hydrating.value = true
        try {
            // 关键：先确保国家列表已加载
            await ensureCountriesLoaded()

            // 1) 回填基础字段（省/市暂清空，避免触发 watcher）
            form.value = {
                id: val.id || '',
                firstName: val.firstName || '',
                lastName: val.lastName || '',
                address: val.address || '',
                postalCode: val.postalCode || '',
                country: val.country || null,
                province: null, // 暂置空
                city: '',
                numberCode: val.numberCode || DEFAULT_DIAL_CODE,
                number: val.number || '',
                master: val.master == 1,
                email: val.email || ''
            }

            // 2) 若已有国家，拉省份并设省
            if (form.value.country) {
                const c = countryarr.value?.find(x => x.countryCode === form.value.country)
                if (c?.phone) form.value.numberCode = c.phone

                await getProvince()

                if (val.province) {
                    form.value.province = val.province // value=regionName
                    await nextTick()
                    await getCity()
                }

                // 3) 省份选项到位后再设城市（value=cityName）
                if (val.city) {
                    form.value.city = val.city
                }
            } else {
                // 没有国家，尝试默认国家
                await getdefaultcountry()
            }
        } finally {
            hydrating.value = false // 恢复级联
        }
    },
    { immediate: true }
)

// ===== 生命周期 =====
onMounted(async () => {
    await getCountrylist() // 双保险：组件挂载时确保拉取到
})
onUnmounted(() => {
    // 可按需清理
})
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

/* 有些版本用 ::after 做焦点边框，保险起见也关掉 */
:deep(.ant-select .ant-select-selector::after) {
    box-shadow: none !important;
    outline: none !important;
    border: 0 !important;
}

:deep(.ant-select-selection-search-input) {
    font-size: 14px !important;
}
</style>
