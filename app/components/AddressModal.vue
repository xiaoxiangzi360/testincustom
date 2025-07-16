<template>
    <UModal v-model="props.isshow">
        <UCard>
            <template #header>
                <div class="text-lg font-semibold">{{ form.id ? 'Edit' : 'Add' }} Address</div>
            </template>

            <Form ref="formRef" :model="form" :rules="rules" layout="vertical" @keydown.enter.prevent>
                <FormItem name="country">
                    <Select v-model:value="form.country" show-search
                        :options="countryarr.map(c => ({ label: c.countryName, value: c.countryCode }))"
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
                    <Select allowClear v-model:value="form.province" show-search
                        :options="provincearr.map(p => ({ label: p.regionName, value: p.regionName }))"
                        placeholder="Select State/Province" :filter-option="filterOptionByLabel" />
                </FormItem>

                <FormItem name="city">
                    <AutoComplete allowClear v-model:value="form.city" show-search
                        :options="cityarr.map(c => ({ label: c.cityName, value: c.cityName }))"
                        :filter-option="filterOptionByLabel" placeholder="Select City" />
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
                            :options="countries.map(code => ({ label: code, value: code }))" />
                        <Input v-model:value="form.number" placeholder="Your number" class="flex-1" />
                    </div>
                </FormItem>

                <FormItem>
                    <Checkbox v-model:checked="form.master">Set as default address</Checkbox>
                </FormItem>

                <div class="flex justify-between gap-4 pt-2">
                    <Button type="default" class="flex-1" @click="closeModal">Cancel</Button>
                    <Button type="primary" @click="subform" :loading="loading" class="flex-1 bg-primary">Submit</Button>
                </div>
            </Form>
        </UCard>
    </UModal>
</template>

<script setup>
const { createUserAddress, editUserAddress, deleteUserAddressByIdList } = AddressAuth();
const { listCountryAll, listProvinceByCountryId, listCityByRegionId } = LocationAuth();

import { message, Input, Select, Form, FormItem, Checkbox, Button, AutoComplete } from 'ant-design-vue'
import { watch, onMounted } from 'vue'
const locationinfo = useCookie('locationinfo')

let props = defineProps({
    form: Object,
    countryarr: Array,
    provincearr: Array,
    cityarr: Array,
    countries: Array,
    isshow: Boolean,
    addressinfo: Object
})
const formRef = ref();
const rules = {
    country: [
        { required: true, message: 'Please select country', trigger: 'change' },
    ],
    firstName: [{ required: true, message: 'Please input firstName', trigger: 'blur' }],
    lastName: [{ required: true, message: 'Please input lastName', trigger: 'blur' }],
    address: [{ required: true, message: 'Please input address', trigger: 'blur' }],
    province: [{ required: true, message: 'Please select State/Province', trigger: 'blur' }],
    city: [{ required: true, message: 'Please select city', trigger: 'change' }],
    postalCode: [{ required: true, message: 'Please input postalCode', trigger: 'blur' }],
    number: [{ required: true, message: 'Please input number', trigger: 'blur' }],

};
const emit = defineEmits(['close', 'updateData'])
const provincearr = ref([])
const loading = ref(false)
const cityarr = ref([])
const addressarr = ref([])
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
];
const form = ref({
    firstName: '',
    lastName: '',
    address: '',
    postalCode: '',
    country: null,
    province: null,
    city: '',
    numberCode: '+1',
    number: '',
    master: false,
    email: ''
});
const closeModal = () => {

    emit('close');
};
const countryarr = ref([

])
const filterOptionByLabel = (input, option) => {
    return option.label.toLowerCase().includes(input.toLowerCase())
}
const getCountrylist = async () => {

    try {

        let res = await listCountryAll();
        let countrylist = res.result;
        countryarr.value = countrylist


    } catch (error) {

    }
}
const getProvince = async () => {
    // console.log(countryarr.value);

    let selectcountry = countryarr.value.find(c => c.countryCode === form.value.country)
    let countryphone = selectcountry.phone;
    let countryid = selectcountry.id;
    form.value.numberCode = countryphone
    try {
        let parmes = {
            countryId: countryid,
        }
        let res = await listProvinceByCountryId(parmes);
        let provincelist = res.result;
        provincearr.value = provincelist

    } catch (error) {

    }
}
const getCity = async () => {

    try {
        let selectprovince = provincearr.value.find(c => c.regionName === form.value.province)
        let provinceid = selectprovince.id
        let parmes = {
            regionId: provinceid,
        }
        let res = await listCityByRegionId(parmes);
        let citylist = res.result;
        cityarr.value = citylist

    } catch (error) {

    }
}
const subform = async (event) => {
    event.preventDefault();
    try {
        await formRef.value.validate();

        loading.value = true;

        const countryName = countryarr.value.find(c => c.countryCode === form.value.country)?.countryName || '';

        const addparmes = {
            fullName: form.value.firstName + form.value.lastName,
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
            provinceName: form.value.province,
        };

        if (form.value.id) {
            addparmes.id = form.value.id;
            await editUserAddress(addparmes);
            message.success('Update successful');
        } else {
            await createUserAddress(addparmes);
            message.success('Add successful');
        }

        emit('close');
        emit('updateData');
    } catch (error) {
        console.error('Submit Error:', error);
        message.error('Validation or submit failed');
    } finally {
        loading.value = false;
    }
};

const getdefaultcountry = async () => {
    if (locationinfo.value) {
        const countryCode = locationinfo.value.countryCode;
        if (form.value.country !== countryCode) {
            form.value.country = null
            await nextTick()
            form.value.country = countryCode
        }
    }
}

getCountrylist();

watch(
    () => props.addressinfo,
    (newVal) => {
        if (newVal) {
            // 使用深拷贝避免引用问题
            form.value = JSON.parse(JSON.stringify({
                id: newVal.id || '',
                firstName: newVal.firstName || '',
                lastName: newVal.lastName || '',
                address: newVal.address || '',
                postalCode: newVal.postalCode || '',
                country: newVal.country || null,
                province: newVal.province || null,
                city: newVal.city || '',
                numberCode: newVal.numberCode || '+1',
                number: newVal.number || '',
                master: newVal.master == 1 ? true : false,
                email: newVal.email || ''
            }))

            // 若已有国家和省份信息，自动加载对应城市
            if (form.value.country && form.value.province) {
                getCity()
            } else if (form.value.country) {
                getProvince()
            }
            if (!newVal.id) {
                getdefaultcountry()

            }
        }
    },
    { immediate: true } // 初始化时执行一次
)
watch(() => form.value.country, (newVal) => {
    if (newVal) {

        getProvince()

    }
})

watch(() => form.value.province, (newVal) => {

    if (newVal) {
        getCity()

    }
})
// 组件挂载时，若addressinfo有值则初始化表单
onMounted(() => {
    if (props.addressinfo && Object.keys(props.addressinfo).length) {
        // 触发watch中的赋值逻辑
    }
})
onUnmounted(() => {
    // 这里写清理逻辑，例如清空 form、取消定时器等
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
    border-color: #2563eb;
    border: none;
}

.ant-form-item {
    margin-bottom: 16px;
}
</style>