<template>
    <BaseDrawer :open="open" title="Cart" :width="drawerWidth" cancel-text="" @close="handleClose" @ok="handleSure"
        :headerStyle="{ fontFamily: 'Inter', fontWeight: '600', fontSize: '16px' }" :footerStyle="{ borderTop: 'none' }"
        @cancel="handleClose">
        <div class="flex">
            <div class="max-w-2xl mx-auto pb-2">
                <div class="bg-white rounded-lg" v-if="cart.itemList.length > 0">
                    <div class="mb-8 max-h-[40vh] overflow-y-auto p-4">
                        <div v-for="(item, index) in cart.itemList" :key="index" :class="[
                            'flex items-center py-4 transition-colors border-solid border-[#F8F8F8]',
                            index !== cart.itemList.length - 1 ? 'border-b' : ''
                        ]">
                            <div class="w-20 rounded-lg overflow-hidden">
                                <img :src="item.productImage || item.product?.mainPic?.url" :alt="item.productName"
                                    class="w-full h-full object-cover object-top cursor-pointer"
                                    @click="checkdetai(item.product?.id, item.productSku, item.productName)" />
                            </div>

                            <div class="ml-6 ">
                                <Tooltip color="white" :overlayInnerStyle="{ color: '#333' }" :title="item.productName"
                                    :overlayStyle="{ maxWidth: '300px', whiteSpace: 'pre-line', wordBreak: 'break-word' }">
                                    <div class="text-sm text-blackcolor truncate-1-lines w-52">
                                        {{ item.productName }}
                                    </div>
                                </Tooltip>

                                <Tooltip color="white" :overlayInnerStyle="{ color: '#333' }"
                                    :title="getSpecAttrFromPropList(item.skuData?.propList)"
                                    :overlayStyle="{ maxWidth: '300px', whiteSpace: 'pre-line', wordBreak: 'word-break' }">
                                    <div class="text-sm text-[#8E8E8E]  truncate-1-lines w-52 mt-1">
                                        {{ getSpecAttrFromPropList(item.skuData?.propList) }}
                                    </div>
                                </Tooltip>

                                <div class="flex items-center mt-2">
                                    <div class="mr-6">
                                        <div class="flex items-center">
                                            <div class="flex items-center border rounded-md w-26 justify-between px-2">
                                                <button @click="decreaseproductQuantity(index)"
                                                    class="text-gray-500 hover:text-black disabled:text-gray-300"
                                                    :disabled="item.productQuantity <= min">-</button>
                                                <input v-model.number="item.productQuantity"
                                                    @input="onInputNumber($event, index)"
                                                    class="w-16 h-8 text-center outline-none border-none focus:ring-0 focus:outline-none text-black"
                                                    :min="min" :max="max" />
                                                <button @click="increaseproductQuantity(index)"
                                                    class="text-gray-500 hover:text-black disabled:text-gray-300"
                                                    :disabled="item.productQuantity >= max">+</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="flex items-center text-black">
                                        {{ item.productPrice.toFixed(2) }}
                                    </div>
                                </div>
                            </div>

                            <div class="ml-6 flex flex-col items-end">
                                <img @click="removeItem(index)" src="/del.png" class="w-6 cursor-pointer">
                            </div>
                        </div>
                    </div>

                    <div class="p-6 shadow-[0_-4px_4px_0_rgba(232,231,231,0.5)]">
                        <div class="flex items-center justify-between mb-6">
                            <span class="font-semibold text-black text-base">Total</span>
                            <span class="text-base font-semibold text-black cursor-pointer flex"
                                @click="showDetails = !showDetails">
                                ${{ total.toFixed(2) }}
                                <BaseIcon name="i-heroicons-chevron-down-20-solid" width="24px" height="24px"
                                    class="transition-transform duration-200 h-6 w-6"
                                    :class="{ 'rotate-180': showDetails }" />
                            </span>
                        </div>

                        <div v-if="showDetails">
                            <div class="flex items-center justify-between mb-4">
                                <span class="text-black text-base">Subtotal</span>
                                <span class="text-base font-medium text-black mr-8">${{ subtotal.toFixed(2) }}</span>
                            </div>
                            <div class="flex items-center justify-between mb-4">
                                <span class="text-black text-base">Shipping</span>
                                <span class="text-base font-medium text-black mr-8">${{ shipping.toFixed(2) }}</span>
                            </div>
                        </div>

                        <div class="flex space-x-4">
                            <button @click="goToCart"
                                class="flex-1 px-6 py-3 border border-solid border-[#979797] bg-gray-100 text-gray-800 font-normal rounded-lg hover:bg-gray-200 transition-colors whitespace-nowrap !rounded-button">
                                Go to Cart
                            </button>
                            <button @click="checkout()"
                                class="flex-1 px-6 py-3 bg-primary border border-solid border-primary text-white font-normal rounded-lg hover:bg-primary-600 transition-colors whitespace-nowrap !rounded-button">
                                Checkout
                            </button>
                        </div>
                    </div>

                </div>

                <div v-if="cart.itemList.length === 0"
                    class="bg-white rounded-lg  flex flex-col items-center justify-center h-80 px-8 ">
                    <p class="text-gray-400">There are no more items in your cart</p>
                    <button @click="goShopping"
                        class="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-600 transition-colors mt-8">
                        Go shopping
                    </button>
                </div>

            </div>
        </div>
    </BaseDrawer>
</template>

<script setup lang="ts">
import BaseDrawer from './BaseDrawer.vue'
interface Emits {
    /** 关闭事件 */
    (e: 'close'): void
    /** 确认事件 */
    (e: 'ok', data?: any): void
}

const props = defineProps<{
    open?: boolean
    data?: any
}>()

const emit = defineEmits<Emits>()
const { isMobile, windowWidth } = useMobile(); // 默认断点为 768px
const drawerWidth = computed(() => {
    return isMobile.value ? `${Number(windowWidth.value) * 0.75}px` : '520px'; // 移动端宽度为屏幕的1/3，其他情况为520px
});
</script>