<template>
    <div class="border-t border-t-blackcolor/10">
        <div class="bg-white px-6 py-2 rounded-lg w-2/3">
            <form>
                <div>
                    <input type="text" v-model="form.firstName" placeholder="First name"
                        class="w-full p-2 border rounded text-xs mt-4" />
                    <input type="text" v-model="form.lastName" placeholder="Last name"
                        class="w-full p-2 border rounded text-xs mt-4" />

                    <select v-model="form.country" @change="getProvince" class="w-full p-2 border rounded mt-2 text-sm">
                        <option value="">Select Country</option>
                        <option v-for="country in countryarr" :key="country.iso" :value="country.iso">
                            {{ country.country }}
                        </option>
                    </select>

                    <!-- Dynamic Province -->
                    <select v-model="form.province" @change="getCity" class="w-full p-2 border rounded mt-2 text-sm">
                        <option value="">Select Province/State</option>
                        <option v-for="province in provincearr" :key="province.admin1Code" :value="province.admin1Code">
                            {{ province.asciiName }}
                        </option>
                    </select>

                    <!-- Dynamic City -->
                    <select v-model="form.city" class="w-full p-2 border rounded mt-2 text-sm">
                        <option value="">Select City</option>
                        <option v-for="city in cityarr" :key="city.code" :value="city.name">
                            {{ city.name }}
                        </option>
                    </select>
                    <input type="text" v-model="form.address" placeholder="Address"
                        class="w-full p-2 border rounded text-xs mt-4" />
                    <input type="text" v-model="form.postalCode" placeholder="Zip code"
                        class="w-full p-2 border rounded text-xs mt-4" />
                    <input type="text" v-model="form.email" placeholder="email"
                        class="w-full p-2 border rounded text-xs mt-4" />
                    <div class="flex items-center space-x-2 mt-4">
                        <USelectMenu searchable-placeholder="" searchable v-model="form.numberCode" :options="countries"
                            size="sm" class="mr-2" />
                        <UInput v-model="form.number" size="sm" placeholder="Your number"
                            class="flex-1 bg-gray-50 border-0 focus:ring-0" />
                    </div>
                    <div class="flex items-center mt-4 text-sm">
                        <input type="checkbox" v-model="form.master" />
                        <span class="ml-2">Set as default address</span>
                    </div>
                </div>
                <div class="mt-4 flex justify-between space-x-2">
                    <button @click="subform($event)" class="flex-1 px-4 py-2 bg-primary-500 text-white rounded">Add
                        address</button>
                </div>
            </form>
        </div>
    </div>
</template>
<script setup>
const { findCityByAdmin1Code, findCountryList, findProvincesByCountryCode, createUserAddress, editUserAddress, deleteUserAddressByIdList } = AddressAuth();
import { message } from 'ant-design-vue'
import { watch, onMounted } from 'vue'
let props = defineProps({
    form: Object,
    countryarr: Array,
    provincearr: Array,
    cityarr: Array,
    countries: Array,
    isshow: Boolean,
    addressinfo: Object
})
const emit = defineEmits(['close', 'updateData'])
const provincearr = ref([])
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
    country: '',
    province: '',
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
    {
        country: 'China',
        iso: 'CN',
    },
    {
        country: 'United States',
        iso: 'US',
    },
    {
        country: 'India',
        iso: 'IN',
    }
])
const getCountrylist = async () => {

    try {

        let res = await findCountryList();
        let countrylist = res.result.countries;
        countryarr.value = countrylist

    } catch (error) {

    }
}
const getProvince = async () => {

    try {
        let parmes = {
            countryCode: form.value.country,
        }
        let res = await findProvincesByCountryCode(parmes);
        let countrylist = res.result.provinces;
        provincearr.value = countrylist

    } catch (error) {

    }
}
const getCity = async () => {

    try {
        let parmes = {
            countryCode: form.value.country,
            admin1Code: form.value.province,
        }
        let res = await findCityByAdmin1Code(parmes);
        let citylist = res.result.citys;
        cityarr.value = citylist

    } catch (error) {

    }
}
const subform = async (event) => {
    event.preventDefault();
    // 获取国家名称
    const countryName = countryarr.value.find(c => c.iso === form.value.country).country;
    // 获取省份的asciiName
    const provinceName = provincearr.value.find(p => p.admin1Code === form.value.province).asciiName;
    let addparmes = {
        fullName: form.value.firstName,
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
        countryName: countryName,
        provinceName: provinceName
    }
    if (form.value.id) {
        addparmes.id = form.value.id

        let res = await editUserAddress(addparmes);
        message.success('Update successfull')

    } else {
        let res = await createUserAddress(addparmes);
        message.success('Add successfull')

    }

    emit('close');
    emit('updateData');

};
getCountrylist();

watch(() => form.value.country, (newvalue, oldvalue) => {

    if (newvalue) {

        getProvince()
    }
});
watch(
    () => props.addressinfo,
    (newVal) => {
        if (newVal && Object.keys(newVal).length) {

            // 使用深拷贝避免引用问题
            form.value = JSON.parse(JSON.stringify({
                id: newVal.id || '',
                firstName: newVal.firstName || '',
                lastName: newVal.lastName || '',
                address: newVal.address || '',
                postalCode: newVal.postalCode || '',
                country: newVal.country || '',
                province: newVal.province || '',
                city: newVal.city || '',
                numberCode: newVal.numberCode || '+1',
                number: newVal.number || '',
                master: newVal.master === 1 || newVal.master === true,
                email: newVal.email || ''
            }))

            // 若已有国家和省份信息，自动加载对应城市
            if (form.value.country && form.value.province) {
                getCity()
            } else if (form.value.country) {
                getProvince()
            }
        }
    },
    { immediate: true } // 初始化时执行一次
)

// 组件挂载时，若addressinfo有值则初始化表单
onMounted(() => {
    if (props.addressinfo && Object.keys(props.addressinfo).length) {
        // 触发watch中的赋值逻辑
    }
})
</script>