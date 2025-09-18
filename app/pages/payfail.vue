<template>
    <div class="max-row">
        <div class="flex flex-col items-center justify-center bg-white mt-3 md:py-10">
            <!-- 失败图标（内联SVG，免静态资源） -->
            <div class="mb-3">
                <img src="/payfail.png" alt="payfail" class="p-2 w-[100px] md:w-52" />
            </div>
            <!-- 标题与描述 -->
            <h1 class="text-base md:text-2xl font-medium mb-2">Payment Failed</h1>
            <p class="text-base md:text-base text-center mb-1 text-gray-500">
                Your order has not been paid.
            </p>
            <!-- 失败原因 -->
            <div class="text-sm md:text-base text-gray-500 mb-1 px-4 max-w-[800px]">
                <span class="font-medium">Cause of failure：</span>
                <span class="text-red-400">{{ failReason || 'Insufficient balance, payment failed' }}</span>
            </div>
            <p class="px-4 sm:px-0 text-sm md:text-base text-sm text-gray-500 text-center mb-4 text-[#F8F8F8]">
                You can change other payment methods to pay for your order.
            </p>
            <!-- Pay info -->
            <h2 class="text-base font-semibold mb-3">Pay info</h2>
            <div class="w-full px-4">
                <div class="bg-[#F5FCFE]  rounded-lg shadow-sm p-8 text-sm md:mb-8">
                    <div class="grid grid-cols-2 sm:grid-cols-4 gap-y-2 gap-x-4 text-gray-500 text-sm">
                        <div class="text-right sm:text-right">Amount Pay:</div>
                        <div class="text-left text-primary font-medium">{{ upperCurrency }} {{ amount }}</div>

                        <div class="text-right sm:text-right">Order No:</div>
                        <div class="text-left text-primary font-medium">{{ orderNo || '' }}</div>
                    </div>
                </div>
            </div>


            <!-- 操作按钮（仅“Repayment”） -->
            <div class="my-6">
                <NuxtLink :to="`/checkout?from=order&orderNo=${orderNoParam}`">
                    <button class="bg-primary text-white px-5 py-2 rounded hover:bg-primary-600 transition text-sm">
                        Repayment
                    </button>
                </NuxtLink>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
const route = useRoute()

// 来自路由参数
const amount = route.query.totalAmount as string | string[] | undefined
const orderNo = route.query.orderNo as string | string[] | undefined
const currency = route.query.currency as string | string[] | undefined
const failReason = route.query.errorMsg as string | string[] | undefined
const orderNoParam = computed(() => Array.isArray(orderNo) ? orderNo[0] : (orderNo || ''))

const upperCurrency = computed(() => {
    if (!currency) return ''
    return Array.isArray(currency) ? currency.join(',').toUpperCase() : currency.toUpperCase()
})

const numericAmount = computed(() => {
    const raw = Array.isArray(amount) ? amount[0] : amount
    const n = Number(raw)
    return isNaN(n) ? 0 : n
})

const formattedAmount = computed(() => {
    try {
        return new Intl.NumberFormat(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
            .format(numericAmount.value)
    } catch {
        return numericAmount.value.toFixed(2)
    }
})
</script>

<style scoped>
/* 可选的小动效（淡入） */
:root {}
</style>
