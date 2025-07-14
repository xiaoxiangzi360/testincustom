<template>
    <div class="max-row">
        <div class="flex flex-col items-center justify-center bg-white mt-4 p-4">
            <!-- 成功图标 -->
            <div class="mb-6">
                <img src="/paysuccess.png" alt="Success" class="p-2 w-52" />
            </div>

            <!-- 标题与描述 -->
            <h1 class="text-2xl font-semibold mb-4">Payment Successful</h1>
            <p class="text-gray-500 text-center mb-6">
                You have completed the order payment<br />
                now you can check the order detail or return to the homepage to continue to go shipping
            </p>

            <!-- 支付信息 -->
            <h1 class="text-base font-semibold mb-4">Pay info</h1>

            <div class="bg-[#F5FCFE] w-full rounded-lg shadow-sm p-8 text-sm mb-8">
                <div class="grid grid-cols-4 gap-y-4 gap-x-4 text-gray-500 text-sm">

                    <!-- 第一行 -->
                    <div class="text-right">Amount Pay:</div>
                    <div class="text-left text-primary font-medium">{{ currency }} {{ amount }}</div>
                    <div class="text-right">Order No.:</div>
                    <div class="text-left text-black">{{ orderNo || '' }}</div>

                    <!-- 第二行 -->
                    <div class="text-right">Payment Time:</div>
                    <div class="text-left text-black">{{ payTime || '' }}</div>
                    <div class="text-right">Payment Method:</div>
                    <div class="text-left text-black">{{ payMethod || 'PayPal' }}</div>

                </div>
            </div>




            <!-- 按钮组 -->
            <div class="flex gap-12 my-6">
                <NuxtLink to="/">
                    <button class="bg-primary text-white px-6 py-2 rounded hover:bg-primary-600 transition text-base">Go
                        Shipping</button>
                </NuxtLink>
                <NuxtLink :to="`/orderinfo?orderNumber=${orderNo}`">
                    <button
                        class="border border-gray-300 text-gray-700 px-6 py-2 rounded hover:bg-gray-100 transition text-base">View
                        Order Details</button>
                </NuxtLink>

            </div>
        </div>
    </div>
</template>



<script lang="ts" setup>
import { useRouter } from 'vue-router'
const router = useRouter()
const route = useRoute();

// definePageMeta({
//     layout: 'blank',
//     name: 'Paysuccess',
//     title: 'Paysuccess',
//     description: 'INcustom Paysuccess',
// });
import { ref, onMounted } from 'vue';

const amount = route.query.totalAmount;
const payTime = route.query.createTime;
const payMethod = route.query.paymentMethod;
const iconWrapper = ref<HTMLElement | null>(null);
const orderNo = route.query.orderNo;
const currency = route.query.currency;

const handleComplete = () => {

    router.push('/myorders')

};

const handleViewOrder = () => {
    console.log('View Order Details');
    router.push('/')
};

const handleBackHome = () => {
    console.log('Back to Homepage');
    router.push('/')
};

onMounted(() => {
    if (iconWrapper.value) {
        iconWrapper.value.classList.add('animate-success');
    }
});
</script>

<style scoped>
.success-icon-wrapper {
    animation: scale-up 0.4s ease-out;
}

@keyframes scale-up {
    0% {
        transform: scale(0.5);
        opacity: 0;
    }

    100% {
        transform: scale(1);
        opacity: 1;
    }
}

.animate-success {
    animation: bounce 1s ease;
}

@keyframes bounce {

    0%,
    20%,
    50%,
    80%,
    100% {
        transform: translateY(0);
    }

    40% {
        transform: translateY(-20px);
    }

    60% {
        transform: translateY(-10px);
    }
}
</style>
