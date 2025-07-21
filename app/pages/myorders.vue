<template>
    <div class="bg-white">
        <div class="flex min-h-screen text-sm max-row">
            <!-- Sidebar -->
            <Userleft class="hidden sm:block" />
            <!-- Main Content -->
            <main class="flex-1 p-0 py-6 sm:p-6 bg-white">
                <div class="flex flex-wrap items-center gap-3">
                    <div class="text-sm whitespace-nowrap sm:px-3 sm:justify-center dark:text-gray-900">Order Number
                    </div>

                    <!-- 输入框：最大宽度限制 -->
                    <UInput v-model="ordervalue" color="white" class="w-full max-w-[130px] sm:max-w-[200px] "
                        placeholder="search" :ui="{ base: 'dark:!bg-white' }" />

                    <!-- 按钮 -->
                    <div @click="searchordernumber()"
                        class="flex justify-center items-center bg-primary text-white px-4 h-[38px] cursor-pointer rounded-xl whitespace-nowrap">
                        Search
                    </div>
                </div>


                <section class="mt-8">
                    <!-- 移动端下拉选择 -->
                    <div class="block md:hidden my-4">
                        <USelect v-model="selectedindex" :options="tabs" option-attribute="label"
                            value-attribute="value" @change="val => {
                                const index = tabs.findIndex(t => String(t.value) === String(val));
                                console.log(val);
                                if (index !== -1) onChange(index);
                            }" size="md" class="w-full" placeholder="Select status" />
                    </div>

                    <!-- 桌面端 Tabs -->
                    <UTabs v-model="selected" :items="tabs" @change="onChange" class="hidden md:block" :ui="{
                        container: 'w-full dark:bg-white',
                        wrapper: 'px-4',
                        list: {
                            tab: {
                                active: 'text-primary font-bold border-b-2 border-sky-400',
                                inactive: 'text-gray-500',
                                background: 'bg-transparent',
                                rounded: ''
                            },
                            background: 'bg-transparent dark:bg-white'
                        }
                    }" />

                    <div v-if="orders.length > 0" class="mx-auto px-4">
                        <div class="bg-white rounded-lg shadow-sm">
                            <!-- Order Table Header -->
                            <div
                                class="hidden md:grid grid-cols-12 px-6 py-3 text-sm font-medium bg-[#F6F6F6] text-gray-600">
                                <div class="col-span-6">Product</div>
                                <div class="col-span-3 text-center">Total($)</div>
                                <div class="col-span-3 text-right">Actions</div>
                            </div>

                            <!-- Order Items -->
                            <div class="divide-y">
                                <div v-for="order in orders" :key="order.id"
                                    class="px-4 md:px-6 py-4 flex flex-col gap-4">
                                    <!-- Order Header -->
                                    <div
                                        class="flex flex-col md:flex-row md:items-center text-sm text-gray-500 gap-2 md:gap-4">
                                        <div class="flex items-center text-gray-600">
                                            Order Number:
                                            <span class="text-[#AEAEAE] mx-2">{{ order.orderNumber }}</span>
                                            <UTooltip text="Copy the order number" :popper="{ arrow: true }">
                                                <UIcon @click="copyToClipboard(order.orderNumber)"
                                                    name="i-ri:file-copy-2-line"
                                                    class="w-5 h-5 cursor-pointer hover:text-primary" />
                                            </UTooltip>
                                        </div>
                                        <span>{{ formatTimestamp(order.createDate) }}</span>
                                        <span class="text-primary-500 cursor-pointer hover:underline">
                                            {{ getOrderStatus(order.status) }}
                                        </span>
                                        <ULink :to="`/orderinfo?orderNumber=${order.orderNumber}`"
                                            class="md:ml-auto text-primary-500 hover:underline">
                                            Order Detail
                                        </ULink>
                                    </div>

                                    <!-- Products -->
                                    <div class="grid grid-cols-1 md:grid-cols-12 gap-4">
                                        <div class="md:col-span-6 flex flex-col gap-3">
                                            <div class="gap-4 items-center" v-for="item in displayedItems(order)"
                                                :key="item.productSku">
                                                <div class="flex gap-3 md:gap-4">
                                                    <div
                                                        class="w-24 md:w-28 aspect-square overflow-hidden rounded-lg bg-white flex items-center justify-center">
                                                        <img :src="item.productImage" :alt="item.productName"
                                                            class="max-w-full max-h-full object-contain" />
                                                    </div>
                                                    <div class="flex-1">
                                                        <Tooltip :title="item.productName">
                                                            <div class="font-medium text-customblack truncate-1-lines">
                                                                {{ item.productName }}
                                                            </div>
                                                        </Tooltip>
                                                        <Tooltip
                                                            :title="item.skuPropList.map(spec => spec.value).join(' ')">
                                                            <p class="text-sm text-[#AEAEAE] my-1 truncate-1-lines">
                                                                <span v-for="spec in item.skuPropList" :key="spec.value"
                                                                    class="mr-2">
                                                                    {{ spec.value }}
                                                                </span>
                                                            </p>
                                                        </Tooltip>
                                                        <p class="text-sm text-customblack">
                                                            Price × Qty：${{ item.priceOrdered }} × {{ item.qtyOrdered }}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            <!-- Show more -->
                                            <div v-if="order.orderItemList.length > 3">
                                                <button @click="toggleShowMore(order.id)"
                                                    class="text-blue-500 text-sm mt-1">
                                                    {{ showMore[order.id] ? 'Show Less' : 'Show More' }}
                                                </button>
                                            </div>
                                        </div>

                                        <!-- Total Price -->
                                        <div class="md:col-span-3 flex items-start justify-start md:justify-center">
                                            <span class="font-medium text-base mt-1 md:mt-0 dark:text-gray-900">${{
                                                order.paymentAmount
                                                }}</span>
                                        </div>

                                        <!-- Actions -->
                                        <div
                                            class="md:col-span-3 flex flex-wrap gap-2 items-start md:flex-col md:items-end">
                                            <UButton class="w-auto px-4 md:w-28 flex justify-center items-center"
                                                v-if="order.status == 500" @click="gotopay(order.orderNumber)">Pay
                                            </UButton>
                                            <UButton color="white"
                                                class="w-auto px-4 md:w-28 flex justify-center items-center"
                                                variant="solid" v-if="order.status <= 1000"
                                                @click="setCancleOrder(order.id)">Cancel
                                            </UButton>
                                            <UButton class="w-auto px-4 md:w-28 flex justify-center items-center"
                                                v-if="order.status == 2500">Write a
                                                review
                                            </UButton>
                                            <UButton class="w-auto px-4 md:w-28 flex justify-center items-center"
                                                v-if="order.status == 2000">View Tracks
                                            </UButton>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Pagination -->
                            <div class="flex justify-center md:justify-end mt-6" v-show="ordercount > 0">
                                <UPagination v-model="page" :page-count="pageSize" :total="ordercount"
                                    :prev-button="{ icon: 'i-material-symbols:chevron-left' }"
                                    :next-button="{ icon: 'i-material-symbols:chevron-right' }" />
                            </div>

                        </div>
                    </div>

                    <div v-if="orders.length == 0"
                        class="flex flex-col items-center justify-center min-h-[300px] text-center">
                        <img src="/empty.png" alt="Empty" class="w-32 h-32 mt-6" />

                        <p class="text-gray-400 text-sm mt-4">
                            There is no historical order, you can go to buy the products you like!
                        </p>
                        <NuxtLink to="/"
                            class="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-600 transition-colors mt-12">
                            Go shopping
                        </NuxtLink>
                    </div>
                </section>
            </main>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { formatTimestamp } from '~/utils/format';
import { message, Modal, Tooltip } from 'ant-design-vue';
const { createPayment } = PayAuth();
const { cancleOrder } = OrderAuth();
import { useUI } from '#imports';
import { useRouter } from 'vue-router'

const router = useRouter()
const { confirm } = useUI();

const orders = ref([]);
const tabs = ref([]);
const payarr = [500];
const canclearr = [500];
const selectedindex = ref('')
const selected = ref(tabs.value[0]);
const page = ref(1);
const status = ref([]);
const pageSize = ref(5);
const ordervalue = ref('');
const ordercount = ref(0);
const showMore = ref({}); // Tracks which orders show all SKUs
const { getOrderlists, groupUserOrderStatusCount } = OrderAuth();

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
            getOrderlist();
            getOrderstatuslist()
        },
        onCancel() { },
    });
};

const getOrderlist = async () => {
    try {
        let params = {
            needCount: true,
            pageNum: page.value,
            pageSize: pageSize.value,
        };
        if (ordervalue.value) {
            params.orderNumber = ordervalue.value;
        }
        if (status.value && status.value.length > 0) {
            params.statusList = status.value;
        }
        let res = await getOrderlists(params);
        let lists = res.result.list;
        orders.value = lists;
        ordercount.value = res.result.total;
    } catch (error) { }
};

const getOrderstatuslist = async () => {
    try {
        let res = await groupUserOrderStatusCount();
        let getttabs = res.result;
        tabs.value = getttabs.map(item => ({
            label: item.statusEnName + (item.count > 0 ? '(' + item.count + ')' : ''),
            value: item.statusList,
            count: item.count,
        }));
        // let newItems = {
        //     label: 'All',
        //     value: '',
        //     count: '',
        // };
        // tabs.value.unshift(newItems);
    } catch (error) { }
};

const gotopay = async (orderNumber) => {
    // let payparmes = {
    //     payType: 'paypal',
    //     createSource: 'orderPay',
    //     bindIdList: [id],
    // };
    // let res = await createPayment(payparmes);
    // let payPalResult = res.result.payPalResult;
    // let payPalOrder = payPalResult.payPalOrder;
    // let links = payPalOrder.links;
    // const payerActionHref = links.find(item => item.rel === "payer-action")?.href;
    // window.open(payerActionHref, '_blank');
    router.push('/checkout?from=order&orderNo=' + orderNumber)

};
const checkdetail = () => {
    router.push('/orderInfo?from=order&orderNo=' + orderNumber)

}
getOrderlist();
getOrderstatuslist();

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

function onChange(index) {
    console.log(index);
    let item = tabs.value[index];
    status.value = item.value;
    console.log(status.value)

    getOrderlist();
}

function searchordernumber() {
    getOrderlist();
}

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

// Function to determine displayed items for an order
const displayedItems = (order) => {
    if (showMore.value[order.id]) {
        return order.orderItemList;
    }
    return order.orderItemList.slice(0, 2);
};

// Toggle show more/less for an order
const toggleShowMore = (orderId) => {
    showMore.value[orderId] = !showMore.value[orderId];
};

watch(() => page.value, (newvalue, oldvalue) => {

    if (newvalue) {
        page.value
        getOrderlist();

    }
});
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
</style>
