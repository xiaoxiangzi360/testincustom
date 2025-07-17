<template>
    <div class="bg-white">
        <div class="flex min-h-screen text-sm max-row">
            <!-- Sidebar -->
            <Userleft class="hidden sm:block" />
            <!-- Main Content -->
            <main class="flex-1 space-y-6 bg-white">
                <div>
                    <div class="mx-auto py-8">
                        <template v-if="loading">
                            <!-- Header Skeleton -->
                            <div class="mb-8">
                                <Skeleton.Input style="width: 200px" active size="default" />
                                <Skeleton.Input style="width: 100px; margin-left: 20px" active size="small" />
                                <Skeleton.Input style="width: 120px; margin-left: 20px" active size="small" />
                            </div>

                            <!-- Step Skeleton -->
                            <div class="flex items-center mb-6">
                                <div class="w-full h-6  rounded"></div>
                            </div>

                            <!-- Order Status -->
                            <div class="bg-white rounded-lg shadow-sm p-4 mb-8">
                                <Skeleton active paragraph="{ rows: 2 }" />
                            </div>

                            <!-- Product List Skeleton -->
                            <div class="bg-white rounded-lg shadow-sm p-4 mb-8">
                                <div class="mb-4 flex justify-between">
                                    <Skeleton.Input style="width: 120px" />
                                    <Skeleton.Input style="width: 100px" />
                                </div>

                                <div v-for="i in 2" :key="i"
                                    class="flex justify-between items-center py-4 border-t border-gray-100">
                                    <div class="flex gap-4 items-center">
                                        <Skeleton.Image style="width: 80px; height: 80px" />
                                        <Skeleton active paragraph="{ rows: 2 }" />
                                    </div>
                                    <Skeleton.Input style="width: 80px" />
                                </div>

                                <!-- Summary -->
                                <div class="mt-6 space-y-2">
                                    <Skeleton.Input style="width: 200px" />
                                    <Skeleton.Input style="width: 200px" />
                                    <Skeleton.Input style="width: 200px" />
                                </div>
                            </div>

                            <!-- Payment & Address Tabs -->
                            <div class="bg-white rounded-lg shadow-sm p-6">
                                <div class="flex gap-4 mb-6">
                                    <Skeleton.Input v-for="i in 3" :key="i" style="width: 100px" />
                                </div>

                                <Skeleton active paragraph="{ rows: 3 }" />
                            </div>
                        </template>
                        <template v-else>
                            <!-- Order Header -->
                            <div class="flex items-center mb-8 flex-wrap
">
                                <div class="text-xl font-bold">
                                    <span class="text-gray-200">Order: </span>#{{ orderInfo.orderNumber }}
                                </div>
                                <img src="/copyoutlined.png" class="w-3 mx-2 cursor-pointer"
                                    @click="copyToClipboard(orderInfo.orderNumber)" />
                                <img src="/calendar.png" class="w-6 mx-2" />
                                <span>{{ orderInfo.createDate ?
                                    formatTimestamp(orderInfo.createDate) : '' }}</span>
                                <span class="rounded-2xl px-3 py-2 bg-[#FAAD14] ml-4 text-xs text-white">
                                    {{ getOrderStatus(orderInfo.status) }}
                                </span>
                            </div>

                            <!-- Progress Tracker -->
                            <Steps :current="currentStep" label-placement="vertical" :items="items" size="small" />

                            <!-- Order Status -->
                            <div class="bg-white rounded-lg py-6 mb-4">
                                <div class="flex items-center justify-between mb-6 ">
                                    <h2 class="text-lg font-medium mb-0">{{ currentstatustitle }}</h2>
                                    <div class="flex gap-4">
                                        <button @click="gotopay(orderInfo.orderNumber)" v-if="orderInfo.status == 500"
                                            class=" whitespace-nowrap px-5 py-2 border border-[rgba(0,178,227,0.4)] bg-[rgba(166,236,255,0.2)] text-primary rounded">
                                            Pay
                                        </button>
                                        <button v-if="orderInfo.status <= 1000" @click="setCancleOrder(orderInfo.id)"
                                            class="whitespace-nowrap p-2 px-3 border border-[rgba(255,173,28,0.4)] bg-[rgba(255,213,215,0.2)] rounded">
                                            <img src="/deletered.png" class="w-5" />
                                        </button>
                                    </div>
                                </div>
                                <p class="text-gray-600">{{ currentstatusdesc }}</p>
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
                                                <p class="text-sm text-gray-200"><span
                                                        v-for="spec in product.skuPropList" class="mr-2">{{
                                                            spec.value }}</span></p>
                                                <button class="text-primary-500 text-sm mt-1">View details</button>
                                            </div>
                                        </div>
                                        <div class="flex items-center text-sm gap-2 mt-2"
                                            v-if="product.logisticsWaybillNoList">
                                            <img src="/car.png" class="w-7" />
                                            <span class="text-gray-300">Tracking Num:</span>
                                            <span>{{ product.logisticsWaybillNoList?.join(', ') }}</span>
                                            <img src="/copyoutlined.png" class="w-3 mx-2"
                                                @click="copyToClipboard(product.logisticsWaybillNoList?.join(', '))" />
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
                                        <span class="text-primary-500">${{ orderInfo.orderItemAmountOrdered
                                        }}</span>
                                    </div>
                                </div>
                            </div>

                            <!-- Payment Info Tabs -->
                            <div class="bg-white rounded-lg border border-[#D9D9D9] p-6">
                                <div class="flex gap-8  mb-6 text-sm sm:text-base">
                                    <button v-for="tab in tabs" :key="tab"
                                        :class="`pb-4 ${activeTab === tab ? 'font-bold text-black border-b-2 border-black' : 'text-gray-500'}`"
                                        @click="activeTab = tab">
                                        {{ tab }}
                                    </button>
                                </div>

                                <!-- Pay Info -->
                                <div v-if="activeTab === 'Pay Info'" class="space-y-4">
                                    <div>
                                        <!-- <h3 class="font-medium mb-2 text-lg">Payment Method:</h3> -->
                                        <div class="flex items-center text-gray-600 gap-2">
                                            <div>Payment:</div>
                                            <img src="/images/paypal.png" class="h-8" />
                                            <!-- <div> Paypal-credit card </div> -->
                                        </div>
                                    </div>
                                    <div class="flex items-center text-gray-600 gap-2"
                                        v-if="orderInfo.actualPaymentTransactionSerialNumber">
                                        <div class="font-mediumtext-sm text-gray-200">Transaction Num:</div>
                                        <div>{{ orderInfo.actualPaymentTransactionSerialNumber }}</div>
                                        <img src="/copy.png" class="h-4"
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
                                                <p class="mt-2"><span class="text-gray-200">Number:</span>
                                                    ({{ orderInfo.buyerPhoneAreaCode }}) {{ orderInfo.buyerPhoneNumber
                                                    }}
                                                </p>
                                                <p class="mt-2"><span class="text-gray-200">Address:</span>
                                                    {{ orderInfo.buyerCountryName
                                                    }} {{
                                                        orderInfo.buyerStateOrProvince }} {{ orderInfo.buyerCity }} {{
                                                        orderInfo.buyerAddress }}
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
    </div>
</template>

<script setup>
import {
    ref,
    computed,
    watch
} from 'vue';
import {
    formatTimestamp
} from '~/utils/format';
import {
    message,
    Modal,
    Tooltip
} from 'ant-design-vue';
const {
    createPayment
} = PayAuth();
const {
    getUserOrderDocByOrderNumber,
    cancleOrder
} = OrderAuth();
import {
    useRouter
} from 'vue-router'
import {
    Steps
} from 'ant-design-vue'
import { Skeleton } from 'ant-design-vue'
const loading = ref(true)
const route = useRoute();

const router = useRouter()
const orderNumber = route.query.orderNumber ?? '2507051715427353680';

const itemstimeline = ref([]);
const currentstatustitle = ref('')
const currentstatusdesc = ref('')
const items = ref([{
    title: 'Order Submitted',
    orderstatus: 500,
    ordertitle: 'Waiting fo payment',
    orderdesc: 'The order has been Submitted successfully, please pay as soon as possible!',
},
{
    title: 'Pending Confirm',
    orderstatus: 1000,
    ordertitle: 'we are confirming',
    orderdesc: 'We are communicating with the factory whether your order can be produced',
},
{
    title: 'Awaiting Shipment',
    orderstatus: 1500,
    ordertitle: 'In production or Warehouse processing',
    orderdesc: 'Your product is being produced or packaged in the warehouse',
},
{
    title: 'Shipped',
    orderstatus: 2000,
    ordertitle: 'Warehouse has shipped',
    orderdesc: 'Your order has started to be delivered, please pay attention to the logistics information',
},
{
    title: 'Delivered',
    orderstatus: 2500,
    ordertitle: 'Product delivery completed',
    orderdesc: 'You have signed for all the goods. If you have any questions, please contact us in time.',
},
]);

const currentStep = ref(1);
const activeTab = ref('Pay Info');
const tabs = ['Pay Info', 'Shipping & Address', 'Order timeline', 'Note'];
function getOrderStatus(status) {
    switch (status) {
        case 0:
            return 'none';
        case 500:
            return 'Unpaid';
        case 1000:
            return 'Pending Confirm';
        case 1500:
            return 'Awaiting Shipment';
        case 2000:
            return 'Shipped';
        case 2500:
            return 'Delivered';
        case 3000:
            return 'Cancelled';
        default:
            return 'unknown';
    }
}
const addressinfo = ref({})
const orderInfo = ref({})
const handleGetOrder = async () => {


    try {
        loading.value = true;
        let params = {
            orderNumber: orderNumber
        }
        let res = await getUserOrderDocByOrderNumber(params);
        let result = res.result
        orderInfo.value = result
        const index = items.value.findIndex(item => item.orderstatus === result.status);


        if (index !== -1) {
            currentStep.value = index;
            currentstatustitle.value = items.value[index].ordertitle
            currentstatusdesc.value = items.value[index].orderdesc
        }
        if (result.status == 3000) {
            currentstatustitle.value = 'Order Cancelled'
            currentstatusdesc.value = 'You can buy other products.'
            currentStep.value = -1;
        }

        let orderTimelineList = result.orderTimelineList;
        orderTimelineList.forEach(element => {
            element.title = element.desc
            element.description = formatTimestamp(element.time)
        });
        itemstimeline.value = orderTimelineList.reverse();
    } catch (error) {

    } finally {
        loading.value = false;
    }
};
handleGetOrder()
const copyToClipboard = async (text) => {
    try {
        if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(text);
            message.success('Copy completed');
        } else {
            const input = document.createElement('textarea');
            input.value = text;
            input.readOnly = true;
            input.style.position = 'absolute';
            input.style.left = '-9999px';
            document.body.appendChild(input);
            input.select();
            const result = document.execCommand('copy');
            document.body.removeChild(input);
            if (result) {
                message.success('Copy successful');
            } else {
                throw new Error('Copy failed');
            }
        }
    } catch (err) {
        message.error('Copy failed');
        console.error('Copy failed:', err);
    }
};
const gotopay = async (orderNumber) => {

    router.push('/checkout?from=order&orderNo=' + orderNumber)

};
const setCancleOrder = async (id) => {
    Modal.confirm({
        title: 'Confirm',
        content: `Confirm Cancel This Order`,
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No',
        async onOk() {
            const params = { id };
            const res = await cancleOrder(params);
            message.success('Cancel successful');
            handleGetOrder();
        },
        onCancel() { },
    });
};
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
