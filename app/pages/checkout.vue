<template>
    <div class="min-h-screen bg-[#F8F8F8]">
        <div class="max-w-7xl mx-auto px-4 py-8">
            <div class="rounded-lg shadow-sm">
                <div class="flex flex-col lg:flex-row gap-8 items-stretch">
                    <!-- Cart Items -->
                    <div class="flex-1">
                        <main class="flex-1 space-y-6">
                            <section class="border border-blackcolor/10 rounded-lg bg-white"
                                v-if="addressarr.length == 0">
                                <div class="p-3 px-6 text-customblack font-semibold text-lg">Address
                                    <span style="color: red;">*</span>
                                </div>
                                <div class="border-t border-t-blackcolor/10">
                                    <div class="bg-white px-6 py-2 rounded-lg w-2/3">
                                        <Form layout="vertical">

                                            <FormItem name="country">
                                                <Select v-model:value="form.country" show-search
                                                    :options="countryarr.map(c => ({ label: c.countryName, value: c.countryCode }))"
                                                    placeholder="Select Country/Region"
                                                    :filter-option="filterOptionByLabel" allowClear />
                                            </FormItem>

                                            <FormItem>
                                                <Input v-model:value="form.firstName" placeholder="First name"
                                                    size="large" />
                                            </FormItem>

                                            <FormItem>
                                                <Input v-model:value="form.lastName" placeholder="Last name"
                                                    size="small" />
                                            </FormItem>

                                            <FormItem>
                                                <Input v-model:value="form.address" placeholder="Street address" />
                                            </FormItem>

                                            <FormItem name="province">
                                                <Select allowClear v-model:value="form.province" show-search
                                                    :options="provincearr.map(p => ({ label: p.regionName, value: p.regionName }))"
                                                    placeholder="Select State/Province"
                                                    :filter-option="filterOptionByLabel" />
                                            </FormItem>

                                            <FormItem name="city">
                                                <AutoComplete allowClear v-model:value="form.city" show-search
                                                    :options="cityarr.map(c => ({ label: c.cityName, value: c.cityName }))"
                                                    :filter-option="filterOptionByLabel" placeholder="Select City" />
                                            </FormItem>

                                            <FormItem>
                                                <Input v-model:value="form.postalCode" placeholder="Zip code" />
                                            </FormItem>

                                            <FormItem>
                                                <Input v-model:value="form.email" placeholder="Email(optional)" />
                                            </FormItem>

                                            <FormItem>
                                                <div class="flex gap-2">
                                                    <Select v-model:value="form.numberCode" class="!w-24" show-search
                                                        :options="countries.map(code => ({ label: code, value: code }))" />
                                                    <Input v-model:value="form.number" placeholder="Your number"
                                                        class="flex-1" />
                                                </div>
                                            </FormItem>

                                            <FormItem>
                                                <Checkbox v-model:checked="form.master">Set as default address
                                                </Checkbox>
                                            </FormItem>

                                        </Form>
                                    </div>
                                </div>
                            </section>
                            <!-- Account Info -->
                            <section class="border border-blackcolor/10 rounded-lg bg-white"
                                v-if="addressarr.length > 0">
                                <div class="p-3 px-6 text-customblack font-semibold text-lg">Address <span
                                        style="color: red;">*</span></div>
                                <div class="grid grid-cols-3 gap-y-4 gap-x-12 border-t border-t-blackcolor/10 p-6">
                                    <div><span class="text-blackcolor/50 mb-2">Full name</span>
                                        <div class="font-medium mt-1">{{ addressinfo.firstName }}{{ addressinfo.lastName
                                        }}</div>
                                    </div>
                                    <div><span class="text-blackcolor/50 mb-2">Number</span>
                                        <div class="font-medium mt-1">({{ addressinfo.numberCode }}) {{
                                            addressinfo.number
                                        }}
                                        </div>
                                    </div>
                                    <div v-show="from != 'order'">

                                        <div class="mt-1 text-primary cursor-pointer" @click="changeaddress()">Change
                                            another address</div>
                                        <div class="mt-1 text-primary cursor-pointer" @click="addnewaddress()">Add new
                                            address</div>
                                    </div>

                                </div>
                                <div class="px-6 pb-6"><span class="text-blackcolor/50 mb-2">Address detail</span>
                                    <div class="font-medium mt-1">{{ addressinfo.countryName }} {{
                                        addressinfo.provinceName
                                    }} {{ addressinfo.city }} {{ addressinfo.address }}</div>
                                </div>
                            </section>
                            <section class="border border-blackcolor/10 rounded-lg bg-white">
                                <div class="p-3 px-6 text-customblack font-semibold text-lg">Shipping methods <span
                                        style="color: red;">*</span></div>
                                <div class="border-t border-t-blackcolor/10 py-6 px-6">
                                    <!-- 引入 USelectMenu 和 UButton -->
                                    <USelectMenu v-model="templateid" :options="templates" option-attribute="label"
                                        value-attribute="feeId"
                                        :ui="{ rounded: 'rounded-md', option: { padding: 'px-2 py-2', base: 'py-2' } }"
                                        :disabled="from == 'order' || templateid == '-1'">
                                        <template #default="{ open }">
                                            <UButton size="lg" color="white" variant="outline"
                                                class="w-full justify-between h-10 rounded-md"
                                                :class="{ 'ring-2 ring-primary': open }">
                                                <!-- 当前选中项显示 -->
                                                <span>
                                                    {{
                                                        templates.find(item => item.feeId === templateid)?.label ||
                                                        'Select Shipping Method'
                                                    }}
                                                </span>
                                                <UIcon name="i-heroicons-chevron-down" />
                                            </UButton>
                                        </template>


                                    </USelectMenu>

                                </div>
                            </section>
                            <section class="border border-blackcolor/10 rounded-lg bg-white">
                                <div class="p-3 px-6 text-customblack font-semibold text-lg">Payment methods <span
                                        style="color: red;">*</span>
                                </div>
                                <div class="grid grid-cols-3 gap-6 border-t border-t-blackcolor/10 p-6">
                                    <div v-for="option in options" :key="option.value"
                                        class="flex items-center space-x-4 p-2 rounded-md"
                                        :class="selected === option.value ? 'border-2 border-gray-200' : 'border border-transparent'">
                                        <input type="radio" :value="option.value" v-model="selected" class="form-radio">
                                        <label class="flex items-center space-x-2 cursor-pointer">
                                            <img :src="option.icon" class="h-[50px]" />
                                        </label>
                                    </div>
                                </div>
                            </section>
                            <section class="border border-blackcolor/10 rounded-lg bg-white">
                                <div class="p-3 px-6 text-customblack font-semibold text-lg">Notes</div>
                                <div class="border-t border-t-blackcolor/10 py-6 px-8">
                                    <UTextarea v-model="notes" />
                                </div>
                            </section>
                        </main>
                    </div>
                    <!-- Cart Summary -->
                    <div class="sm:w-80 bg-white rounded-lg shadow-sm flex flex-col justify-between min-h-[200px]">
                        <div class="p-6">
                            <div class="flex justify-between">
                                <span class="text-gray-600">Selected {{ selectedQuantity }} items</span>
                                <span>${{ selectedTotal.toFixed(2) }}</span>
                            </div>
                            <div class="max-h-96 overflow-y-auto">
                                <div class="flex items-center space-x-4 bg-white rounded-md shadow-sm py-4"
                                    v-for="item in productlists">
                                    <img :src="item.mainPic" alt="Product Image"
                                        class="w-20 h-20 rounded-md object-cover" />
                                    <div class="flex flex-col justify-between">
                                        <Tooltip color="white" :overlayInnerStyle="{ color: '#333' }"
                                            :title="item.productName"
                                            :overlayStyle="{ maxWidth: '300px', whiteSpace: 'pre-line', wordBreak: 'break-word' }">
                                            <div
                                                class="font-semibold text-sm text-blackcolor truncate-1-lines max-w-52">
                                                {{ item.productName }}
                                            </div>
                                        </Tooltip>
                                        <Tooltip color="white" :overlayInnerStyle="{ color: '#333' }"
                                            :title="item.specAttr"
                                            :overlayStyle="{ maxWidth: '300px', whiteSpace: 'pre-line', wordBreak: 'break-word' }">
                                            <div class="text-gray-300 text-sm my-2 truncate-1-lines max-w-52">
                                                {{ item.specAttr }}
                                            </div>
                                        </Tooltip>
                                        <p class="text-lg font-semibold">{{ item.productPrice }} x {{ item.qtyOrdered }}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <!-- Coupon Code Input -->
                            <div class="mt-4">

                                <div class="flex gap-2 text-white">
                                    <Input v-model:value="couponCode" placeholder="Enter the coupon code"
                                        class="flex-1 border border-gray-300 focus:border-blue-500 focus:ring-blue-500" />

                                    <UButton @click="applyCoupon" :disabled="!couponCode || applyLoading"
                                        :loading="applyLoading" class="shrink-0 rounded px-4 text-white" :class="[
                                            (!couponCode)
                                                ? '!bg-gray-300 cursor-not-allowed'
                                                : 'bg-primary hover:bg-[#00a9d8]'
                                        ]">
                                        Apply
                                    </UButton>


                                </div>
                                <div v-if="couponError" class="text-red-500 text-sm mt-1">
                                    {{ couponError }}
                                </div>
                            </div>
                            <div v-if="activeCoupon" class="mt-3 inline-flex items-center px-2 py-1 rounded-md text-xs"
                                style="background-color: #F0F0F0; color: #333;">
                                <img src="/tag.png" class="w-4 h-4 mr-2">
                                <span class="mr-2 text-xs">{{ activeCoupon }}</span>
                                <UIcon name="i-material-symbols-close-rounded"
                                    class="w-4 h-4 text-gray-100 hover:text-red-500 cursor-pointer"
                                    @click="removeCoupon" />
                            </div>

                            <!-- Discount Display -->
                            <div class="flex justify-between mt-4" v-if="discount > 0">
                                <span class="text-gray-600">Discount</span>
                                <span class="text-green-600 font-semibold">- ${{ discount.toFixed(2) }}</span>
                            </div>

                            <div class="flex justify-between mt-4">
                                <span class="text-gray-600">Shipping</span>
                                <span>${{ shipping.toFixed(2) }}</span>
                            </div>
                            <div class="pt-4 flex justify-between font-bold mt-4">
                                <span>Total</span>
                                <span>${{ ((selectedTotal || 0) + (shipping || 0) - discount).toFixed(2) }}</span>
                            </div>

                        </div>
                        <div id="paypal-button-container" class="sticky bottom-1 px-2"></div>
                    </div>
                </div>
            </div>


        </div>
    </div>
    <UModal v-model="showModal" width="w-full" :ui="{ width: 'sm:max-w-5xl' }">
        <section class="border border-blackcolor/10 rounded-lg">
            <div class="relative p-3 px-6 text-customblack font-semibold text-lg">
                Address
                <!-- 关闭按钮 -->
                <button @click="showModal = false"
                    class="absolute top-2  right-2 text-gray-500 hover:text-gray-800 px-2 py-1">
                    ✕
                </button>
            </div>
            <div class="grid grid-cols-3 gap-6 border-t border-t-blackcolor/10 p-6">

                <div v-for="(item, idx) in addressarr" :key="idx"
                    class="relative border border-blackcolor/10 rounded-lg p-4 hover:shadow cursor-pointer"
                    :class="{ 'border-primary-500 bg-primary-50': item.selected == 1 }" @click="selectaddress(idx)">
                    <div class="space-y-1">
                        <p><span class="text-gray-500">Full name:</span> {{ item.firstName }}{{ item.lastName }}</p>
                        <p><span class="text-gray-500">Number:</span>({{ item.numberCode }}) {{ item.number }}</p>
                        <p><span class="text-gray-500">Address:</span> {{ item.countryName }} {{ item.provinceName }} {{
                            item.city }} {{
                                item.address }}</p>
                    </div>
                    <span v-if="item.selected == 1"
                        class="absolute top-0 right-0 bg-primary-100 text-primary-600 text-xs px-2 py-0.5 rounded">
                        Selected
                    </span>
                </div>

            </div>
        </section>
    </UModal>
    <UModal v-model="isOpen">
        <div class="p-8 flex justify-center">
            <div class="text-center">
                <div>{{ changedesc }}</div>
                <UButton class="mt-6 rounded" @click="refreshPage">Refresh</UButton>
            </div>
        </div>

    </UModal>
    <AddressModal :isshow="isshow" @close="isshow = false" @updateData="updateAddresslist()" />
</template>
<script lang="ts" setup>
import { ref, computed, watch } from 'vue';
import { Input, Select, Form, FormItem, Checkbox, Button, AutoComplete } from 'ant-design-vue'

const { getuserAddressRollPage, createUserAddress } = AddressAuth();
const { getmapProductByProductSkuList } = ProductAuth();
const { generateOrderId, createOrder, getUserOrderDocByOrderNumber, tryOrder } = OrderAuth();
const { getlistOldShippingRule } = ShippingAuth();
const { createPayment } = PayAuth();
const { getUserlPBylp2Location, listCountryAll, listProvinceByCountryId, listCityByRegionId } = LocationAuth();

const { completePayment, getAvailablePaymentByBindId } = PayAuth();
import { formatPaypalUtcToLocal } from '~/utils/format'
const locationinfo = useCookie('locationinfo') as any

import { loadScript } from '@paypal/paypal-js'
import { useCartStore } from '@/stores/cart'
const paypalpaymentid = ref(0)
const cart = useCartStore()
const { getCart } = cartAuth();
const changedesc = ref('')
const isOpen = ref(false)
const { $showLoading, $hideLoading } = useNuxtApp()
const payloading = ref(false)
import { message, Tooltip } from 'ant-design-vue'
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute();
const orderNo = ref('') as any
const orderInfo = ref({}) as any
const productlists = ref([])
const skuList = ref([])
const orderId = ref(0)
const nowpayPalOrderid = ref('')
const from = route.query.from;
const sku = route.query.sku as any;
const number = route.query.number;
const cartarr = ref([])
let skunum = {} as any;
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
const couponCode = ref('')
const couponError = ref('')
const discount = ref(0)
const activeCoupon = ref('') // 当前有效优惠码
const applyLoading = ref(false)

const applyCoupon = async () => {
    couponError.value = ''
    if (!couponCode.value) {
        couponError.value = 'Please enter a coupon code'
        return
    }
    let orderItemListarr = [];
    productlists.value.forEach(element => {
        orderItemListarr.push({
            productSku: element.productSku,
            qtyOrdered: Number(element.qtyOrdered),
            priceOrdered: element.productPrice,
            amountOrdered: element.productPrice * Number(element.qtyOrdered)
        })
    });
    let addparmes = {
        buyerCity: addressinfo.value.city,
        buyerCountryCode: addressinfo.value.country,
        buyerCountryName: addressinfo.value.countryName,
        buyerEmail: addressinfo.value.email,
        buyerFirstName: addressinfo.value.firstName,
        buyerAddress: addressinfo.value.address,
        buyerLastName: addressinfo.value.lastName,
        buyerNotes: notes.value,
        buyerPhoneAreaCode: addressinfo.value.numberCode,
        buyerPhoneNumber: addressinfo.value.number,
        buyerPostalCode: addressinfo.value.postalCode,
        buyerStateOrProvince: addressinfo.value.province,
        id: orderId.value,
        shippingRuleFeeId: templateid.value,
        shippingRule: {
            calFee: shipping.value
        },
        create: false,
        orderItemList: orderItemListarr,
        marketingActivityCouponCode: couponCode.value
    }

    applyLoading.value = true

    try {
        let tryres = await tryOrder(addparmes); // 保留你原有逻辑
        if (tryres.result) {
            activeCoupon.value = couponCode.value; // 应用优惠码
            discount.value = tryres.result.marketingActivityDiscountAmount || 0; // 假设返回的折扣值
            couponCode.value = ''; // 清空输入框
        } else {
            couponError.value = tryres.message || 'Invalid coupon code';
        }
    } catch (error) {
        let errormsg = JSON.parse(error.message)
        couponError.value = errormsg.enDesc || 'Failed to apply coupon';
    } finally {
        applyLoading.value = false
    }
}
const removeCoupon = () => {
    activeCoupon.value = '';
    discount.value = 0;
}

const getProductlist = async () => {

    try {
        let params = {
            skuList: skuList.value
        }
        let res = await getmapProductByProductSkuList(params);
        let lists = res.result;
        for (const key in lists) {

            let obj = lists[key]
            productlists.value.push({
                productName: obj.erpProduct.productEnglishName,
                mainPic: obj.erpProduct.mainPic,
                productSku: key,
                specAttr: obj.skuSpec.specAttr,
                qtyOrdered: skunum[key],
                productPrice: obj.skuSpec.customPrice,
                productStyle: obj.erpProduct.productStyle,
            })
        }
        getShippingRulelist()

    } catch (error) {

    }
}
const filterOptionByLabel = (input, option) => {
    return option.label.toLowerCase().includes(input.toLowerCase())
}
const getShippingRulelist = async () => {
    if (from == 'order') {
        return
    }
    try {
        let detailarr = [];
        productlists.value.forEach(element => {
            detailarr.push({
                productRealSku: element.productStyle,
                sku: element.productSku,
                num: Number(element.qtyOrdered),
            })
        });
        let addresspbj = {} as any;
        if (form.value.country) {

            addresspbj.country = form.value.country
        }
        if (addressinfo.value.country) {

            addresspbj.country = addressinfo.value.country;

        }
        if (!addresspbj.country || detailarr.length == 0) {
            return;
        }
        let params = {
            detailList: detailarr,
            address: addresspbj
        }
        let res = await getlistOldShippingRule(params);
        if (res.result.length > 0) {
            templates.value = res.result
            templates.value.forEach(item => {
                item.label = `${item.feeEnName}　　${item.daysFrom}–${item.daysTo} days　　$${item.calFee.toFixed(2)}`
            })
        } else {
            console.log(111)
            templates.value = [{
                feeId: -1,
                label: 'The current country does not support delivery, please change the delivery address',
                calFee: 0

            }]
        }

        templateid.value = templates.value[0].feeId
    } catch (error) {

    }
}
const handleGetOrder = async () => {

    let orderNumber = route.query.orderNo;
    orderNo.value = orderNumber

    try {
        let params = {
            orderNumber: orderNumber
        }
        let res = await getUserOrderDocByOrderNumber(params);
        let result = res.result
        orderInfo.value = result
        orderId.value = result.id

        let orderItemList = result.orderItemList
        productlists.value = [];
        orderItemList.forEach(element => {
            productlists.value.push({
                productName: element.productName,
                mainPic: element.productImage,
                productSku: element.productSku,
                qtyOrdered: element.qtyOrdered,
                productPrice: element.priceOrdered,
                productStyle: '',
            })
        });
        addressinfo.value.city = result.buyerCity;
        addressinfo.value.country = result.buyerCountryCode;
        addressinfo.value.countryName = result.buyerCountryName;
        addressinfo.value.email = result.buyerEmail;
        addressinfo.value.firstName = result.buyerFirstName;
        addressinfo.value.address = result.buyerAddress;
        addressinfo.value.lastName = result.buyerLastName;
        notes.value = result.buyerNotes;
        addressinfo.value.numberCode = result.buyerPhoneAreaCode;
        addressinfo.value.number = result.buyerPhoneNumber;
        addressinfo.value.postalCode = result.buyerPostalCode;
        addressinfo.value.province = result.buyerStateOrProvince;
        addressarr.value = [addressinfo]
        templates.value = [result.shippingRule]
        templates.value.forEach(item => {
            item.label = `${item.feeEnName}　　${item.daysFrom}–${item.daysTo} days　　$${item.calFee.toFixed(2)}`
        })
        templateid.value = result.shippingRule.feeId
    } catch (error) {

    }
};
const handleGetCart = async () => {
    try {
        let cartids = route.query.ids;
        // 如果是字符串，转成数组（例如 "123,456" => ["123", "456"]）
        if (typeof cartids === 'string') {
            cartids = cartids.split(',');
        }

        let res = await getCart();
        let result = res.result;

        // 根据 cartids 过滤 result
        if (Array.isArray(cartids) && cartids.length > 0) {
            result = result.filter(item => cartids.includes(String(item.id)));
        }

        cartarr.value = result;
        skuList.value = []; // 先清空或初始化
        result.forEach(item => {
            skuList.value.push(item.productSku);
            skunum[item.productSku] = item.productQuantity;
        });
        getProductlist();
    } catch (error) {
        console.error('getCart error:', error);
    }
};

if (sku) {
    skuList.value = [sku]
    skunum[sku] = number
    getProductlist()
}
if (from == 'cart') {
    handleGetCart()
}
if (from == 'order') {
    handleGetOrder()
}
const showModal = ref(false)
const isshow = ref(false)
const options = [
    { value: 1, label: 'paypal', icon: '/images/paypal.png' },
    // { value: 2, label: 'xtransfer', icon: '/images/xtransfer.png' },
    // { value: 3, label: 'airwallex', icon: '/images/airwallex.png' },
    // { value: 4, label: 'payoneer', icon: '/images/payoneer.png' },
    // { value: 5, label: 'mastercard', icon: '/images/mastercard.png' },
    // { value: 6, label: 'creditcard', icon: '/images/creditcard.png' },
]
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
    email: '',
    master: true,
});
const notes = ref('')
const selected = ref(1)
const countryarr = ref([])
const provincearr = ref([])
const cityarr = ref([])
const addressarr = ref([])
const templateid = ref(0) as any
const templates = ref([])
const nowtemplate = ref({})
const changeaddress = () => {
    showModal.value = true
}
const addressinfo = ref({}) as any;
const getAddresslist = async () => {

    try {
        let params = {}
        let res = await getuserAddressRollPage(params);
        let addressist = res.result.records;
        if (addressist.length > 0) {
            addressist[0].selected = true
            addressinfo.value = addressist[0]
        }
        addressist.filter(item => item.master == '1').forEach(item => {
            item.selected = true;
            addressinfo.value = item
        });
        addressarr.value = addressist
    } catch (error) {

    }
}

const updateAddresslist = async () => {
    try {
        let params = {}
        let res = await getuserAddressRollPage(params);
        let addressist = res.result.records;
        addressist.forEach(item => {
            item.selected = false;
        });
        const lastAddress = addressist[addressist.length - 1];
        lastAddress.selected = true;
        addressinfo.value = lastAddress;
        addressarr.value = addressist
    } catch (error) {

    }
}
const addnewaddress = () => {

    isshow.value = true;

}
function isEmptyObject(obj) {
    return obj && typeof obj === 'object' && !Array.isArray(obj) && Object.keys(obj).length === 0;
}
const addaddress = async () => {
    if (!form.value.firstName) {
        message.error('firstName is required')
        return null;
    }
    if (!form.value.country) {
        message.error('country is required')
        return null;
    }

    if (!form.value.province) {
        message.error('province is required')
        return null;
    }
    if (!form.value.city) {
        message.error('city is required')
        return null;
    }
    if (!form.value.address) {
        message.error('address is required')
        return null;
    }
    if (!form.value.postalCode) {
        message.error('postalCode is required')
        return null;
    }

    if (!form.value.number) {
        message.error('PhoneNumber is required')
        return null;
    }
    const countryName = countryarr.value.find(c => c.countryCode === form.value.country)?.countryName || '';
    let addparmes = {
        fullName: form.value.firstName,
        firstName: form.value.firstName,
        lastName: form.value.lastName,
        address: form.value.address,
        city: form.value.city,
        country: form.value.country,
        master: 1,
        province: form.value.province,
        postalCode: form.value.postalCode,
        number: form.value.number,
        numberCode: form.value.numberCode,
        email: form.value.email,
        countryName: countryName,
        provinceName: form.value.province
    }
    let res = await createUserAddress(addparmes);

    return true

};
const paynow = async () => {
    try {
        if (isEmptyObject(addressinfo.value)) {

            let res = await addaddress()
            if (!res) {
                return;
            }
            addressinfo.value = form.value

            getAddresslist()
        }

        if (!addressinfo.value.address) {
            message.error('Please add a address')
            return null;
        }
        if (templateid.value < 0) {
            message.error('The current country does not support delivery, please change the delivery address')
            return null;
        }
        if (!templateid.value) {
            message.error('Shipping methods is required')
            return null;
        }
        if (productlists.value.length > 0) {
            if (!orderId.value) {
                let res = await generateOrderId();
                orderId.value = res.result
            } else if (!nowpayPalOrderid.value) {
                //直接创建支付单
                let payparmes = {
                    payType: 'paypal',
                    createSource: 'orderPay',
                    bindIdList: [orderId.value],
                }
                let res = await createPayment(payparmes);
                let payPalResult = res.result.payPalResult
                let payPalOrder = payPalResult.payPalOrder
                let payPalOrderid = payPalOrder.id
                nowpayPalOrderid.value = payPalOrderid
                return payPalOrderid
            }
            payloading.value = true;
            if (nowpayPalOrderid.value) {
                return nowpayPalOrderid.value
            }
            return handleSubmit()
        }
    } catch (err) {
        message.error(err.message || 'Failed to create order, please try again later')
        throw err
    }
};
const handleSubmit = async () => {

    let orderItemListarr = [];
    productlists.value.forEach(element => {
        orderItemListarr.push({
            productSku: element.productSku,
            qtyOrdered: Number(element.qtyOrdered),
            priceOrdered: element.productPrice,
            amountOrdered: element.productPrice * Number(element.qtyOrdered)
        })
    });
    let addparmes = {
        buyerCity: addressinfo.value.city,
        buyerCountryCode: addressinfo.value.country,
        buyerCountryName: addressinfo.value.countryName,
        buyerEmail: addressinfo.value.email,
        buyerFirstName: addressinfo.value.firstName,
        buyerAddress: addressinfo.value.address,
        buyerLastName: addressinfo.value.lastName,
        buyerNotes: notes.value,
        buyerPhoneAreaCode: addressinfo.value.numberCode,
        buyerPhoneNumber: addressinfo.value.number,
        buyerPostalCode: addressinfo.value.postalCode,
        buyerStateOrProvince: addressinfo.value.province,
        id: orderId.value,
        shippingRuleFeeId: templateid.value,
        shippingRule: {
            calFee: shipping.value
        },
        create: true,
        orderItemList: orderItemListarr,
        marketingActivityCouponCode: activeCoupon.value
    }
    if (from == 'cart') {
        let choiceUserShoppingCartIdList = [];
        cartarr.value.forEach(element => {
            choiceUserShoppingCartIdList.push(element.id)
        });
        addparmes['choiceUserShoppingCartIdList'] = choiceUserShoppingCartIdList
    }

    try {

        let createres = await createOrder(addparmes);
        orderNo.value = createres.result.orderNumber
        cart.refreshCart()
        let payparmes = {
            payType: 'paypal',
            createSource: 'orderPay',
            bindIdList: [orderId.value],
        }
        let res = await createPayment(payparmes);
        let payPalResult = res.result.payPalResult
        let payPalOrder = payPalResult.payPalOrder
        let payPalOrderid = payPalOrder.id
        nowpayPalOrderid.value = payPalOrderid
        return payPalOrderid
        // let links = payPalOrder.links
        // const payerActionHref = links.find(item => item.rel === "payer-action")?.href;
        // window.open(payerActionHref, '_blank');
        // payloading.value = false;
        // message.success('Order successfull')
    } catch (error) {
        console.log(error)

        let errormsg = JSON.parse(error.message)

        if (errormsg.errorKey == "calFee" || errormsg.errorKey == "priceOrdered" || errormsg.errorKey == "amountOrdered") {
            changedesc.value = errormsg.enDesc
            isOpen.value = true
        }

        payloading.value = false;

        message.error(errormsg.enDesc || 'Order failed')

    }


};
const closeModal = () => {
    showModal.value = false;
};
const selectaddress = (index) => {
    addressarr.value
        .forEach(element => {
            element.selected = false
        });
    addressarr.value[index].selected = true
    addressinfo.value = addressarr.value[index]
    shipping.value = 0
    showModal.value = false;

}
getAddresslist();
const shipping = ref(0);
const selectedItems = computed(() => cart.itemList.filter(item => item.selected));
const selectedTotal = computed(() => {
    return productlists.value.reduce((total, item) => total + item.productPrice * item.qtyOrdered, 0) ?? 0;
});
const selectedQuantity = computed(() => {
    return productlists.value.reduce((sum, item) => sum + Number(item.qtyOrdered), 0);
});

const getCountrylist = async () => {

    try {

        let res = await listCountryAll();
        let countrylist = res.result;
        countryarr.value = countrylist
        getdefaultcountry()

    } catch (error) {

    }
}
const getProvince = async () => {

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
const Invalidlist = ref([
])
watch(() => addressinfo.value, (newvalue, oldvalue) => {

    if (newvalue) {
        console.log(1111, newvalue)
        getShippingRulelist()
    }
});
watch(() => form.value.country, (newvalue, oldvalue) => {

    if (newvalue) {
        getShippingRulelist()
        getProvince()

    }
});
watch(() => form.value.province, (newvalue, oldvalue) => {

    if (newvalue) {
        getCity()
    }
});
watch(() => templateid.value, (newvalue, oldvalue) => {

    if (newvalue) {
        templates.value.filter(item => item.feeId == templateid.value).forEach(item => {
            shipping.value = item.calFee
        });
    }
});
const payPalCaptureOrder = async (token) => {

    try {
        let params = {
            payPalOrderId: token,
        }

        let res = await completePayment(params);
        console.log('上报完成')

        // router.push('/myorders')


    } catch (error) {

    }
}
onMounted(async () => {
    getCountrylist()
    const config = useRuntimeConfig()

    const paypal = await loadScript({
        clientId: config.public.paypalClientId,
        currency: 'USD'
    })

    if (paypal) {
        paypal.Buttons({
            onClick: async (data, actions) => {
                try {
                    let paymentId;

                    if (from === 'order') {
                        const params = {
                            createSource: 'orderPay',
                            bindId: orderInfo.value.id
                        };

                        const payresult = await getAvailablePaymentByBindId(params);

                        if (payresult?.result?.payPalResult?.payPalOrder?.id) {
                            paymentId = payresult.result.payPalResult.payPalOrder.id;
                        } else {
                            paymentId = await paynow();
                        }
                    } else {
                        paymentId = await paynow();
                    }

                    // 3. 验证paymentId是否有效
                    if (!paymentId) {
                        console.error('无法获取有效的支付ID');
                        return actions.reject(); // 阻止支付继续
                    }

                    // 4. 存储paymentId
                    paypalpaymentid.value = paymentId;

                    // 5. 只有所有逻辑完成才允许继续支付
                    return actions.resolve();

                } catch (e) {
                    console.error('支付准备失败:', e);
                    return actions.reject(); // 出错时阻止支付
                }
            },
            createOrder: () => Promise.resolve(String(paypalpaymentid.value)),
            onApprove(data, actions) {
                return actions.order.capture().then((details) => {
                    nowpayPalOrderid.value = ''
                    const referenceId = details.purchase_units?.[0]?.reference_id
                    const paypalOrderId = details.id
                    const payerName = details.payer.name.given_name
                    console.log(details);
                    const totalAmount = details.purchase_units[0].amount.value; // 总金额
                    const currency = details.purchase_units[0].amount.currency_code; // 货币（例如 USD）

                    const paymentTime = formatPaypalUtcToLocal(details.purchase_units[0].payments.captures[0].create_time); // 支付时间
                    console.log(paymentTime);

                    console.log('✅ pay successful：', {
                        referenceId,
                        paypalOrderId,
                        payerName
                    })
                    let res = payPalCaptureOrder(paypalOrderId)
                    // router.push('/myorders')
                    router.push({
                        path: '/paysuccess',
                        query: { orderNo: orderNo.value, createTime: paymentTime, currency: currency, paymentMethod: 'PayPal', totalAmount: totalAmount }
                    });
                })
            },
            onError(err) {
                console.error('❌ PayPal SDK 出错：', err)
            }
        }).render('#paypal-button-container')



    } else {
        console.error('PayPal SDK failed to load.')
    }
});
function refreshPage() {
    window.location.reload()
}
</script>
<style scoped>
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

[type='checkbox']:checked,
[type='radio']:checked {
    background-color: #00B2E3;
}

input[type="checkbox"]:focus {
    outline: none;
}

[type='checkbox']:focus,
[type='radio']:focus {
    outline: none;
    --tw-ring-color: none;
}


table thead,
tbody tr {
    display: table;
    width: 100%;
    /* table-layout: fixed; */
}


.cart-table__checkbox {
    @apply w-5 h-5 rounded border-gray-300;
}

.cart-table__action-button {
    @apply text-primary-500 hover:text-primary-600 transition-colors;
}

.truncate-1-lines {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

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