<template>
    <div class="bg-white">
        <div class="flex min-h-screen text-sm max-row">
            <!-- Sidebar -->
            <Userleft class="hidden sm:block" v-show="isLoggedIn" />
            <!-- Main Content -->
            <main class="flex-1 space-y-6 bg-white">
                <div>
                    <div class="mx-auto py-8">
                        <!-- ================= Skeleton ================= -->
                        <template v-if="loading">
                            <div class="mb-8">
                                <Skeleton.Input style="width: 200px" active size="default" />
                                <Skeleton.Input style="width: 100px; margin-left: 20px" active size="small" />
                                <Skeleton.Input style="width: 120px; margin-left: 20px" active size="small" />
                            </div>
                            <div class="flex items-center mb-6">
                                <div class="w-full h-6 rounded"></div>
                            </div>
                            <div class="bg-white rounded-lg shadow-sm p-4 mb-8">
                                <Skeleton active :paragraph="{ rows: 2 }" />
                            </div>
                            <div class="bg-white rounded-lg shadow-sm p-4 mb-8">
                                <div class="mb-4 flex justify-between">
                                    <Skeleton.Input style="width: 120px" />
                                    <Skeleton.Input style="width: 100px" />
                                </div>
                                <div v-for="i in 2" :key="i"
                                    class="flex justify-between items-center py-4 border-t border-gray-100">
                                    <div class="flex gap-4 items-center">
                                        <Skeleton.Image style="width: 80px; height: 80px" />
                                        <Skeleton active :paragraph="{ rows: 2 }" />
                                    </div>
                                    <Skeleton.Input style="width: 80px" />
                                </div>
                                <div class="mt-6 space-y-2">
                                    <Skeleton.Input style="width: 200px" />
                                    <Skeleton.Input style="width: 200px" />
                                    <Skeleton.Input style="width: 200px" />
                                </div>
                            </div>
                            <div class="bg-white rounded-lg shadow-sm p-6">
                                <div class="flex gap-4 mb-6">
                                    <Skeleton.Input v-for="i in 3" :key="i" style="width: 100px" />
                                </div>
                                <Skeleton active :paragraph="{ rows: 3 }" />
                            </div>
                        </template>

                        <!-- ================= Real Content ================= -->
                        <template v-else>
                            <!-- Order Header -->
                            <div class="flex items-center mb-8 flex-wrap">
                                <div class="text-xl font-bold">
                                    <span class="text-gray-200">Order: </span>#{{ orderInfo.orderNumber }}
                                </div>
                                <img src="/copyoutlined.png" class="w-3 mx-2 cursor-pointer"
                                    @click="copyToClipboard(orderInfo.orderNumber)" />
                                <img src="/calendar.png" class="w-6 mx-2" />
                                <span>{{ orderInfo.createDate ? formatTimestamp(orderInfo.createDate) : '' }}</span>
                                <span class="rounded-2xl px-3 py-2 bg-[#FAAD14] ml-4 text-xs text-white">
                                    {{ getOrderStatus(orderInfo.status) }}
                                </span>
                            </div>

                            <!-- Progress Tracker -->
                            <Steps :current="currentStep" label-placement="vertical" :items="items" size="small" />

                            <!-- Order Status -->
                            <div class="bg-white rounded-lg py-6 mb-4">
                                <div class="flex items-center justify-between mb-6">
                                    <h2 class="text-lg font-medium mb-0">{{ currentstatustitle }}</h2>
                                    <div class="flex gap-4">
                                        <button @click="gotopay(orderInfo.orderNumber)" v-if="orderInfo.status == 500"
                                            class="whitespace-nowrap px-5 py-2 border border-[rgba(0,178,227,0.4)] bg-[rgba(166,236,255,0.2)] text-primary rounded">
                                            Pay
                                        </button>
                                        <button v-if="orderInfo.status <= 1200" @click="setCancleOrder(orderInfo.id)"
                                            class="whitespace-nowrap p-2 px-3 border border-[rgba(255,173,28,0.4)] bg-[rgba(255,213,215,0.2)] rounded">
                                            <img src="/deletered.png" class="w-5" />
                                        </button>
                                    </div>
                                </div>
                                <p class="text-gray-600">{{ currentstatusdesc }}</p>
                            </div>

                            <!-- ============== Package List (orderInfo.deliveryList) ============== -->
                            <div v-if="orderInfo.deliveryList?.length" class="bg-white rounded-lg mb-4 py-4">
                                <div class="text-sm text-black font-medium mb-3">
                                    Package
                                    <span class="text-gray-300 ml-1">Total {{ orderInfo.deliveryList.length }}
                                        Packages:</span>
                                </div>

                                <div v-for="(pkg, i) in orderInfo.deliveryList" :key="pkg.logisticsTrackNo"
                                    class="flex items-center justify-between py-3 border-b border-[#D9D9D9]">
                                    <div class="flex items-center gap-2">
                                        <img src="/package-icon.png" class="w-[30px] h-[30px]" alt="" />
                                        <div class="text-gray-300">Tracking Num:</div>
                                        <div class="text-black">{{ pkg.logisticsTrackNo }}</div>
                                        <img src="/copyoutlined.png" class="w-3 cursor-pointer"
                                            @click="copyToClipboard(pkg.logisticsTrackNo)" />
                                        <div class="text-sm" :class="pkg.signFor ? 'text-[#52C41A]' : 'text-gray-400'">
                                            {{ pkg.signFor ? 'Package recieved' : 'In transit' }}
                                        </div>
                                    </div>

                                    <!-- 点击时按需拉接口：orderNumber + logisticsTrackNo -->
                                    <button class="text-primary-500 underline text-sm"
                                        @click="openLogistics(pkg.logisticsTrackNo)">
                                        View Logistics Details
                                    </button>
                                </div>
                            </div>

                            <!-- Order Details -->
                            <div class="bg-white rounded-lg mb-8">
                                <div class="flex justify-between mb-4 bg-[#F6F6F6] text-black/45 py-4 px-6">
                                    <span class="font-medium">Product</span>
                                    <span class="font-medium">Price×QTY</span>
                                </div>

                                <div v-for="(product, index) in orderInfo.orderItemList" :key="index"
                                    class="flex items-center justify-between py-4 border-b border-gray-100 px-6">
                                    <div>
                                        <div class="flex items-center gap-4">
                                            <img :src="product.productImage" alt="Product"
                                                class="w-20 h-20 object-cover rounded" />
                                            <div>
                                                <h3 class="font-medium text-sm">{{ product.productName }}</h3>
                                                <p class="text-sm text-gray-200">
                                                    <span v-for="spec in product.skuPropList" :key="spec.value"
                                                        class="mr-2">{{ spec.value }}</span>
                                                </p>
                                                <!-- <button class="text-primary-500 text-sm mt-1">View details</button> -->
                                            </div>
                                        </div>
                                        <div class="flex items-center text-sm gap-2 mt-2"
                                            v-if="product.logisticsWaybillNoList">
                                            <img src="/car.png" class="w-7" />
                                            <span class="text-gray-300">Tracking Num:</span>
                                            <span>{{ product.logisticsWaybillNoList?.join(', ') }}</span>
                                            <img src="/copyoutlined.png" class="w-3 mx-2 cursor-pointer"
                                                @click="copyToClipboard(product.logisticsWaybillNoList?.join(', '))" />
                                            <!-- 这里保留入口：默认打开第一个单号 -->
                                            <button class="underline text-primary-500"
                                                @click="openLogistics(product.logisticsWaybillNoList?.[0])">
                                                View Logistics Details
                                            </button>
                                        </div>
                                    </div>
                                    <span>${{ product.priceOrdered }}×{{ product.qtyOrdered }}</span>
                                </div>

                                <!-- Order Summary -->
                                <div class="mt-10 p-6 rounded-lg border border-[#D9D9D9]">
                                    <div class="flex justify-between">
                                        <span>Subtotal:</span>
                                        <span>${{ orderInfo.orderItemAmountOrdered }}</span>
                                    </div>
                                    <div class="flex justify-between mt-4">
                                        <span>Shipping:</span>
                                        <span>${{ orderInfo.shippingRule?.calFee || 0 }}</span>
                                    </div>
                                    <div class="flex justify-between mt-4">
                                        <span>Total(excl.tax):</span>
                                        <span class="text-primary-500">${{ orderInfo.orderItemAmountOrdered }}</span>
                                    </div>
                                </div>
                            </div>

                            <!-- Payment Info Tabs -->
                            <div class="bg-white rounded-lg border border-[#D9D9D9] p-6">
                                <div class="flex gap-8 mb-6 text-sm sm:text-base">
                                    <button v-for="tab in tabs" :key="tab"
                                        :class="`pb-4 ${activeTab === tab ? 'font-bold text-black border-b-2 border-black' : 'text-gray-500'}`"
                                        @click="activeTab = tab">
                                        {{ tab }}
                                    </button>
                                </div>

                                <!-- Pay Info -->
                                <div v-if="activeTab === 'Pay Info'" class="space-y-4">
                                    <div class="flex items-center text-gray-600 gap-2">
                                        <div>Payment:</div>
                                        <NuxtImg v-if="paymentIcon" :src="paymentIcon" alt="Payment Method"
                                            class="h-8 w-auto" />
                                        <span class="capitalize" v-else>{{ paymentLabel }}</span>
                                    </div>
                                    <div class="flex items-center text-gray-600 gap-2"
                                        v-if="orderInfo.actualPaymentTransactionSerialNumber">
                                        <div class="font-mediumtext-sm text-gray-200">Transaction Num:</div>
                                        <div>{{ orderInfo.actualPaymentTransactionSerialNumber }}</div>
                                        <img src="/copy.png" class="h-4 cursor-pointer"
                                            @click="copyToClipboard(orderInfo.actualPaymentTransactionSerialNumber)" />
                                    </div>
                                </div>

                                <!-- Shipping & Address -->
                                <div v-if="activeTab === 'Shipping & Address'" class="space-y-4">
                                    <div class="bg-white rounded-xl">
                                        <div class="mb-6">
                                            <p class="font-semibold mb-1">Shipping method:</p>
                                            <p class="text-sm">{{ orderInfo.shippingRule.feeEnName }}</p>
                                        </div>

                                        <div class="text-sm">
                                            <p class="font-semibold mb-2">Address:</p>
                                            <div class="text-sm">
                                                <p><span class="text-gray-200">Full name:</span> {{
                                                    orderInfo.buyerFullName }}</p>
                                                <p class="mt-2"><span class="text-gray-200">Number:</span> ({{
                                                    orderInfo.buyerPhoneAreaCode }}) {{ orderInfo.buyerPhoneNumber }}
                                                </p>
                                                <p class="mt-2">
                                                    <span class="text-gray-200">Address:</span>
                                                    {{ orderInfo.buyerCountryName }} {{ orderInfo.buyerStateOrProvince
                                                    }} {{ orderInfo.buyerCity }} {{ orderInfo.buyerAddress }}
                                                </p>
                                                <p class="mt-2"><span class="text-gray-200">Zip code:</span> {{
                                                    orderInfo.buyerPostalCode }}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Order timeline -->
                                <div v-if="activeTab === 'Order timeline'" class="space-y-4">
                                    <Steps progress-dot :current="0" direction="vertical" :items="itemstimeline" />
                                </div>

                                <!-- Note -->
                                <div v-if="activeTab === 'Note'" class="space-y-4">
                                    <div>{{ orderInfo.buyerNotes }}</div>
                                </div>
                            </div>
                        </template>
                    </div>
                </div>
            </main>
        </div>

        <!-- ================= Logistics Modal ================= -->
        <Modal v-model:open="logisticsModal.open" :footer="null" width="560px" :destroyOnClose="true">
            <template #title>
                <div class="flex items-center gap-3">
                    <span class="font-semibold">Tracking Details</span>
                </div>
            </template>

            <div v-if="logisticsModal.loading" class="py-6">
                <Skeleton active :paragraph="{ rows: 4 }" />
            </div>

            <div v-else>
                <div class="flex items-center justify-between mb-3">
                    <div class="text-sm">
                        <span class="text-gray-400">Tracking Number</span>
                        <span class="font-medium mx-2">{{ logisticsModal.currentNo }}</span>
                        <span :class="logisticsModal.signFor ? 'text-[#52C41A]' : 'text-gray-600'">
                            {{ logisticsModal.signFor ? 'Package recieved' : 'In transit' }}
                        </span>
                    </div>
                </div>

                <!-- 限高滚动 -->
                <div style="max-height: 60vh; overflow-y: auto; padding-right: 8px;">
                    <Steps progress-dot :current="0" direction="vertical" :items="logisticsModal.steps" />
                </div>

                <div class="mt-6 text-right">
                    <button class="px-4 py-1 rounded border" @click="logisticsModal.open = false">Ok</button>
                </div>
            </div>
        </Modal>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { Steps, Skeleton, Modal, message } from 'ant-design-vue'
import { formatTimestamp } from '~/utils/format'

const loading = ref(true)
const route = useRoute()
const router = useRouter()
const orderNumber = route.query.orderNumber ?? '2507051715427353680'

const { createPayment } = PayAuth()
const { getUserOrderDocByOrderNumber, cancleOrder, groupOrderTrackInfo } = OrderAuth()
const userType = useCookie('userType');
const isLoggedIn = computed(() => userType.value === 1 || userType.value === '1');
const itemstimeline = ref([])
const currentstatustitle = ref('')
const currentstatusdesc = ref('')
const items = ref([
    { title: 'Order Submitted', orderstatus: 500, ordertitle: 'Waiting fo payment', orderdesc: 'The order has been Submitted successfully, please pay as soon as possible!', key: 1 },
    { title: 'Pending Confirm', orderstatus: 1000, ordertitle: 'we are confirming', orderdesc: 'We are communicating with the factory whether your order can be produced', key: 2 },
    { title: 'Awaiting Shipment', orderstatus: 1500, ordertitle: 'In production or Warehouse processing', orderdesc: 'Your product is being produced or packaged in the warehouse', key: 3 },
    { title: 'Shipped', orderstatus: 2000, ordertitle: 'Warehouse has shipped', orderdesc: 'Your order has started to be delivered, please pay attention to the logistics information', key: 4 },
    { title: 'Delivered', orderstatus: 2500, ordertitle: 'Product delivery completed', orderdesc: 'You have signed for all the goods. If you have any questions, please contact us in time.', key: 5 },
])
const currentStep = ref(0)
const activeTab = ref('Pay Info')
const tabs = ['Pay Info', 'Shipping & Address', 'Order timeline', 'Note']

function getOrderStatus(status) {
    switch (status) {
        case 0: return 'none'
        case 500: return 'Unpaid'
        case 1000:
        case 1200: return 'Pending Confirm'
        case 1500: return 'Awaiting Shipment'
        case 2000: return 'Shipped'
        case 2500: return 'Delivered'
        case 3000: return 'Cancelled'
        default: return 'unknown'
    }
}

const orderInfo = ref({})

const PAYMENT_ICON = {
    paypal: '/images/paypal.png',
    airwallex: '/images/creditcard.png',
}

const paymentType = computed(() =>
    String(orderInfo.value?.actualPaymentMethodType || '').toLowerCase().trim()
)

const paymentIcon = computed(() =>
    PAYMENT_ICON[paymentType.value] || '/images/payment-generic.png'
)

// ======== 弹窗状态（按需拉接口）=======
const logisticsModal = ref({
    open: false,
    loading: false,
    currentNo: '',
    steps: /** @type {{title:string, description:string, key?:string}[]} */ ([]),
    signFor: false,
})

const lastEventText = computed(() => {
    const s = logisticsModal.value.steps?.[0]
    return s ? s.description : ''
})

const handleGetOrder = async () => {
    try {
        loading.value = true
        const res = await getUserOrderDocByOrderNumber({ orderNumber })
        const result = res.result
        orderInfo.value = result

        const idx = items.value.findIndex(i => i.orderstatus === result.status)
        if (idx !== -1) {
            currentStep.value = Number(idx)
            currentstatustitle.value = items.value[idx].ordertitle
            currentstatusdesc.value = items.value[idx].orderdesc
        }
        if (result.status == 3000) {
            currentstatustitle.value = 'Order Cancelled'
            currentstatusdesc.value = 'You can buy other products.'
            currentStep.value = -1
        }
        if (result.status == 1200) {
            currentstatustitle.value = 'we are confirming'
            currentstatusdesc.value = 'We are communicating with the factory whether your order can be produced'
        }

        let orderTimelineList = result.orderTimelineList || []
        orderTimelineList.forEach(el => {
            el.title = el.desc
            el.description = formatTimestamp(el.time)
        })
        itemstimeline.value = orderTimelineList.reverse()
    } finally {
        loading.value = false
    }
}
handleGetOrder()

/** 点击列表项时再拉接口：groupOrderTrackInfo({ orderNumber, logisticsTrackNo }) */
async function openLogistics(logisticsTrackNo) {
    if (!logisticsTrackNo) return
    logisticsModal.value.open = true
    logisticsModal.value.loading = true
    logisticsModal.value.currentNo = logisticsTrackNo
    try {
        const res = await groupOrderTrackInfo({
            orderNumber: orderInfo.value.orderNumber || orderNumber,
            logisticsTrackNo,
        })
        const row = (res?.result || [])[0]
        if (row) {
            const steps = (row.trackList || [])
                .slice()
                .sort((a, b) => b.trackTime - a.trackTime)
                .map(t => ({
                    title: formatTimestamp(t.trackTime),
                    description: t.eventString || '',
                    key: t.id,
                }))
            logisticsModal.value.steps = steps.length ? steps : [{ title: '', description: '' }]
            logisticsModal.value.signFor = !!row.signFor
        } else {
            logisticsModal.value.steps = []
            logisticsModal.value.signFor = false
        }
    } catch (e) {
        console.warn('load tracking failed', e)
        logisticsModal.value.steps = []
        logisticsModal.value.signFor = false
    } finally {
        logisticsModal.value.loading = false
    }
}

const copyToClipboard = async (text) => {
    try {
        if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(text)
            message.success('Copy completed')
        } else {
            const input = document.createElement('textarea')
            input.value = text
            input.readOnly = true
            input.style.position = 'absolute'
            input.style.left = '-9999px'
            document.body.appendChild(input)
            input.select()
            const ok = document.execCommand('copy')
            document.body.removeChild(input)
            ok ? message.success('Copy completed') : message.error('Copy failed')
        }
    } catch {
        message.error('Copy failed')
    }
}

const gotopay = (orderNo) => {
    router.push('/checkout?from=order&orderNo=' + orderNo)
}

const setCancleOrder = async (id) => {
    Modal.confirm({
        title: 'Confirm',
        content: `Confirm Cancel This Order`,
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No',
        async onOk() {
            await cancleOrder({ id })
            message.success('Cancel successful')
            handleGetOrder()
        },
    })
}
</script>

<style scoped>
input,
select {
    border: 1px solid #d1d5db;
}

input::placeholder,
select::placeholder {
    color: #AEAEAE !important;
}

.truncate-1-lines {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.order-progress {
    position: relative;
}

.order-progress::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 2px;
    background: #e5e7eb;
    transform: translateY(-50%);
    z-index: 0;
}

::v-deep(.ant-steps .ant-steps-item-process .ant-steps-item-icon) {
    background-color: #00B2E3 !important;
    border-color: #00B2E3 !important;
}

::v-deep(.ant-steps .ant-steps-item-finish>.ant-steps-item-container>.ant-steps-item-tail::after) {
    background-color: #00B2E3;
}

::v-deep(.ant-steps .ant-steps-item-finish .ant-steps-item-icon >.ant-steps-icon) {
    color: #00B2E3;
}

::v-deep(.ant-steps .ant-steps-item-finish .ant-steps-item-icon >.ant-steps-icon .ant-steps-icon-dot) {
    background: #00B2E3;
}

::v-deep(.ant-steps .ant-steps-item-process .ant-steps-item-icon >.ant-steps-icon .ant-steps-icon-dot) {
    background: #00B2E3;
}

::v-deep(.ant-steps .ant-steps-item:not(.ant-steps-item-active):not(.ant-steps-item-process)>.ant-steps-item-container[role='button']:hover .ant-steps-item-icon) {
    border-color: #00B2E3;
}

::v-deep(.ant-steps .ant-steps-item:not(.ant-steps-item-active)>.ant-steps-item-container[role='button']:hover .ant-steps-item-title) {
    color: #00B2E3;
}

::v-deep(.ant-steps .ant-steps-item:not(.ant-steps-item-active):not(.ant-steps-item-process)>.ant-steps-item-container[role='button']:hover .ant-steps-item-icon .ant-steps-icon) {
    color: #00B2E3;
}

::v-deep(.ant-steps.ant-steps-label-vertical .ant-steps-item-icon) {
    display: flex;
    align-items: center;
    justify-content: center;
}

::v-deep(.ant-steps .ant-steps-item-process>.ant-steps-item-container>.ant-steps-item-content>.ant-steps-item-title) {
    color: #00B2E3;
}
</style>
