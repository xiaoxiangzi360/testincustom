<template>
    <main class="bg-white">
        <div class="min-h-screen max-row max-md:px-6 max-md:min-h-0">
            <div class="rounded-s">
                <UBreadcrumb divider=">" :links="breadcrumbLinks"
                    class="mb-3 text-blackcolor custom-breadcrumb text-lg sm:text-2xl" :ui="{
                        base: 'hover:underline font-normal',
                        ol: 'py-4 max-md:pb-0 mb-0',
                        li: 'text-sm sm:text-sm font-normal text-customblock',
                        active: 'text-gray-300 dark:text-gray-300 no-underline hover:no-underline',
                        divider: { base: 'px-2 text-text-gray-400 no-underline' }
                    }" />
                <div class="rounded-[4px] h-full ">
                    <div class="flex gap-6">
                        <!-- Cart Items -->
                        <div
                            class="w-[70%] max-h-[75vh] bg-white border border-[#F8F8F8] rounded-[4px] max-md:w-full max-md:max-h-full overflow-y-auto">
                            <div class="w-full rounded text-[#0C1013] font-medium ">
                                <div v-for="(item, index) in cart.itemList" :key="item.id"
                                    class="border-b p-4 border-solid border-[#F8F8F8] ">
                                    <div :class="[
                                        ' max-md:flex-col flex gap-4 max-md:gap-3 items-stretch max-md:px-0',
                                        ,
                                    ]">
                                        <div class="flex gap-2">
                                            <NuxtImg
                                                :src="`${item.productImage || item.product?.mainPic.url}?x-oss-process=image/auto-orient,1/resize,w_500,limit_0`"
                                                @click="checkdetai(item.product?.id, item.productSku, item.productName)"
                                                alt="Product image"
                                                class="w-[120px] h-[120px] max-md:w-[82px] max-md:h-[82px] object-cover rounded-[4px] cursor-pointer" />
                                            <Tooltip color="white" :overlayInnerStyle="{ color: '#333' }"
                                                :title="item.productName"
                                                :overlayStyle="{ maxWidth: '250px', whiteSpace: 'pre-line', wordBreak: 'break-word' }">
                                                <div @click="checkdetai(item.product?.id, item.productSku, item.productName)"
                                                    class="text-sm hover:underline cursor-pointer line-clamp-[4] hidden max-md:block">
                                                    {{ item.productName }}
                                                </div>
                                            </Tooltip>
                                        </div>
                                        <div class="flex-1">
                                            <Tooltip color="white" :overlayInnerStyle="{ color: '#333' }"
                                                :title="item.productName"
                                                :overlayStyle="{ maxWidth: '250px', whiteSpace: 'pre-line', wordBreak: 'break-word' }">
                                                <div @click="checkdetai(item.product?.id, item.productSku, item.productName)"
                                                    class="text-sm hover:underline cursor-pointer line-clamp-1 max-md:hidden">
                                                    {{ item.productName }}
                                                </div>
                                            </Tooltip>
                                            <div class=" text-[#AEAEAE] font-normal text-[14px] leading-5 mt-1">
                                                <div v-for="(spec, i) in getSpecArray(item.skuData?.propList)" :key="i"
                                                    class="whitespace-normal">
                                                    {{ spec.label }}
                                                    <span class="text-[#0C1013] ml-1">{{ spec.value
                                                        }}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="flex flex-col  justify-between items-center h-full max-md:w-full gap-1 max-md:items-end max-md:gap-2
                                        md:h-[112px]">
                                            <!-- 数量控制和删除按钮 -->
                                            <div
                                                class="flex flex-col w-full max-md:flex-row max-md:justify-between items-center justify-between gap-2">
                                                <div class="flex items-center rounded">
                                                    <div class="flex items-center rounded">
                                                        <div class="text-gray-500 px-2 hover:opacity-80 cursor-pointer bg-[#F8F8F8] border-[#F8F8F8] h-[26px] flex items-center justify-center rounded-tl-[6px] rounded-bl-[6px]"
                                                            @click="decreaseproductQuantity(index)">
                                                            -
                                                        </div>

                                                        <input type="number" @blur="validate(index)"
                                                            v-model.number="item.productQuantity" :min="min" :max="max"
                                                            class="focus:outline-none focus:ring-0 focus:border-transparent w-12 h-[26px] text-center outline-none border-0 py-1 bg-[#F8F8F8] mx-0.5" />
                                                        <div class="text-gray-500 border-[#F8F8F8] px-2 hover:opacity-80 cursor-pointer bg-[#F8F8F8] h-[26px] flex items-center justify-center rounded-tr-[6px] rounded-br-[6px]"
                                                            @click="increaseproductQuantity(index)"
                                                            :disabled="item.productQuantity >= max">
                                                            +
                                                        </div>
                                                    </div>

                                                </div>
                                                <div class="text-[16px] font-[500] text-[#00B2E3] mt-2">
                                                    <span class="mr-1">$</span>{{ (item.productPrice *
                                                        item.productQuantity).toFixed(2) }}
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    <div @click="deleteItem(item)"
                                        class="cursor-pointer text-[#BCBCBC] font-medium text-[14px] flex justify-end w-full px-4 max-md:px-0 max-md:pt-1">
                                        Remove</div>
                                </div>
                                <!-- Empty Cart -->
                                <div v-if="cart.itemList.length === 0">
                                    <div colspan="6" class="text-center py-10 text-gray-400 p-6">
                                        <div
                                            class="bg-white rounded-lg flex flex-col items-center justify-center h-80 px-8">
                                            <p class="text-gray-400">There are no more items in your cart</p>
                                            <ULink to="/"
                                                class="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-600 transition-colors mt-8">
                                                Go shopping
                                            </ULink>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Invalid Items -->
                            <div class="flex justify-between items-center mt-4" v-show="cart.saleDownList?.length > 0">
                                <div>Out of Stock & Invalid Items</div>
                                <div>
                                    <button class="text-primary hover:text-primary-600 mr-4"
                                        @click="deleteInvalid">Remove All</button>
                                </div>
                            </div>
                            <div class="w-full bg-white rounded" v-if="cart.saleDownList?.length > 0">
                                <div v-for="(item, index) in cart.saleDownList" :key="item.id" :class="[
                                    'p-4 max-md:px-0 border-solid border-[#F8F8F8]',
                                    index !== cart.saleDownList.length - 1 ? 'border-b' : '',
                                ]">
                                    <!-- Desktop View -->
                                    <div class="flex items-start gap-4 max-md:flex-col max-md:gap-2">
                                        <div class="flex max-md:flex-row gap-2   w-[120px] max-md:w-full">
                                            <div
                                                class="relative rounded-[4px] w-[120px] h-[120px] max-md:w-[82px] max-md:h-[82px]  ">
                                                <NuxtImg :src="item.product ? item.product.mainPic.url : ''"
                                                    alt="Product image"
                                                    class="w-full h-full object-cover rounded-[4px]" />
                                                <div
                                                    class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-[4px]">
                                                    <span class="text-white text-base">Invalid</span>
                                                </div>
                                            </div>
                                            <div class=" flex-1 text-sm font-medium line-clamp-3 hidden max-md:flex">
                                                {{ item.product ? item.product.productEnglishName ||
                                                    item.product.productName : '' }}
                                            </div>
                                        </div>
                                        <div class="flex-1">
                                            <div class="text-sm w-full font-medium line-clamp-1 max-md:hidden">
                                                {{ item.product ? item.product.productEnglishName ||
                                                    item.product.productName : '' }}
                                            </div>
                                            <div class=" text-[#AEAEAE] font-normal text-[14px] leading-5 mt-1">
                                                <div v-for="(spec, i) in getSpecArray(item.product.skuData.propList)"
                                                    :key="i" class="whitespace-normal">
                                                    {{ spec.label }}
                                                    <span class="text-[#0C1013] ml-1">{{ spec.value
                                                        }}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- <div
                            class="mt-4 flex items-center text-sm md:text-base gap-2 md:gap-4 lg:gap-6 p-3 md:p-4 lg:p-6 bg-white sticky bottom-0">
                            <input type="checkbox" v-model="selectAll" @change="toggleSelectAll" class="rounded" />
                            <span class="text-gray-600  flex items-center leading-none">
                                <span class="font-normal mr-2 cursor-pointer" @click="setSelectAll">
                                    Select all
                                </span>
                                (select {{ selectedQuantity }} items)
                            </span>

                            <button @click="deleteSelected" :disabled="selectedItems.length === 0"
                                class="text-primary hover:text-primary-600 disabled:text-gray-300 disabled:cursor-not-allowed">
                                Delete
                            </button>
                        </div> -->
                        </div>

                        <!-- Cart Summary -->
                        <div
                            class="w-[30%]  border border-[#F8F8F8] max-md:hidden bg-white rounded-[4px] flex flex-col px-4 h-[75vh] text-sm md:text-base">
                            <div class="py-4 text-[#0C1013] font-medium text-[14px]">
                                <div class="text-lg font-semibold">Order Summary</div>
                                <!-- <div class="flex justify-between my-2">
                                    <span>Selected {{ selectedQuantity }} items</span>
                                    <span class="text-primary">$ {{ selectedTotal.toFixed(2) }}</span>
                                </div> -->
                                <div class="flex justify-between">
                                    <span>Total </span>
                                    <span class="text-primary">$ {{ (selectedTotal + shipping).toFixed(2) }}</span>
                                </div>
                            </div>
                            <div class="text-[14px] text-[#00B2E3] flex items-start mb-2 mt-4" v-show="false">
                                <span>Get up to 15% off, Made the Coupon: <span
                                        class='underline mx-1'>Order15</span></span>
                            </div>
                            <button @click="checkout()"
                                class="!rounded-button rounded w-full bg-primary text-white py-3 whitespace-nowrap hidden md:block sticky  bottom-1">
                                Secure Checkout </button>
                            <div class='text-center max-md:hidden'>
                                <div class="py-4 text-lg text-[#0C1013] font-semibold">Payment Methods We Support</div>
                                <div class="flex items-center justify-center px-3 flex-wrap">
                                    <div class="w-[76px] h-[45px] flex items-center justify-center  "
                                        v-for="(item, index) in payList" :key="index">
                                        <NuxtImg :src="item" class="w-full h-full object-contain" />
                                    </div>
                                </div>
                            </div>

                        </div>
                        <!-- Mobile fixed checkout bar -->
                        <div
                            class="md:hidden fixed left-0 right-0 bottom-0 bg-white p-4 shadow-[0_-2px_10px_rgba(0,0,0,0.06)] z-50">
                            <div class="flex gap-4 mb-2">
                                <span>TOTAL PRICE：</span>
                                <span class="text-primary">$ {{ (selectedTotal + shipping).toFixed(2) }}</span>
                            </div>
                            <div class="text-[14px] text-[#00B2E3] flex items-start " v-show="false">
                                <span>Get up to 15% off, Made the Coupon: <span
                                        class='underline mx-1'>Order15</span></span>
                            </div>
                            <button @click="checkout()"
                                class="rounded w-full bg-primary text-white py-3 whitespace-nowrap  mt-4">
                                Secure Checkout
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { message, Tooltip } from 'ant-design-vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cart'

const payList = ['/product/pay1.webp', '/product/pay2.webp', '/product/pay3.webp', '/product/pay4.webp', '/product/pay5.webp', '/product/pay6.webp', '/product/pay7.webp']

const router = useRouter()
const cart = useCartStore() // ✅ 只通过 Pinia 操作删除
const breadcrumbLinks = [
    { label: 'Home', to: '/', title: 'Home' },
    { label: 'Shopping Cart', title: 'Shopping Cart' },
]
const activeTab = ref<'cart' | 'expired'>('cart')
const min = 1
const max = 999
const selectAll = ref(false)
const shipping = ref(0)
const isDesktop = ref(false)

const selectedItems = computed(() => cart.itemList.filter(item => item.selected))
const selectedTotal = computed(() =>
    selectedItems.value.reduce((total, item) => total + item.productPrice * item.productQuantity, 0),
)
const selectedQuantity = computed(() =>
    selectedItems.value.reduce((sum, item) => sum + item.productQuantity, 0),
)

// 从 propList 构建规格属性字符串
const getSpecAttrFromPropList = (propList: any[]) => {
    if (!propList || !Array.isArray(propList)) return ''

    const specParts = propList.map(prop => {
        if (prop.inputList && prop.inputList.length > 0) {
            // 自定义输入属性
            const inputValues = prop.inputList.map((input: any) => `${input.inputName}: ${input.inputValue}`).join(', ')
            return `${prop.propEnName}: ${inputValues}`
        } else {
            // 标准属性
            return `${prop.propEnName}: ${prop.propValueEnName}`
        }
    })

    return specParts.join(' | ')
}
const getSpecArray = (propList: any[]) => {
    if (!propList || !Array.isArray(propList)) return []

    const result: any[] = []

    propList.forEach(prop => {
        if (prop.inputList?.length > 0) {
            // ⚠️ 一个 prop 可能包含多个 input，拆成多行
            prop.inputList.forEach((input: any) => {
                result.push({
                    label: `${input.inputName}:`,
                    value: input.inputValue
                })
            })
        } else {
            // 普通属性
            result.push({
                label: `${prop.propEnName}:`,
                value: prop.propValueEnName
            })
        }
    })

    return result
}


const validate = (index: number) => {
    if (cart.itemList[index].productQuantity < min) cart.itemList[index].productQuantity = min
    if (cart.itemList[index].productQuantity > max) cart.itemList[index].productQuantity = max
}

const token = useCookie('token')
const isTokenValid = computed(() => !!token.value)

// 初始化从 store 拉
const refreshFromStore = async () => {
    try {
        await cart.refreshCart()
        // 初始化时强制全选
        selectAll.value = true
        cart.itemList.forEach(item => {
            item.selected = true
        })
    } catch (e) {
        console.error(e)
    }
}


const toggleSelectAll = () => {
    cart.itemList.forEach(item => {
        item.selected = selectAll.value
    })
}
const setSelectAll = () => {
    selectAll.value = !selectAll.value
    cart.itemList.forEach(item => {
        item.selected = selectAll.value
    })
}

const checkout = () => {
    if (selectedItems.value.length === 0) {
        message.warning('Please select at least one item')
        return
    }

    // id:qty 组成的字符串，例如 "123:2,456:1"
    const itemsParam = selectedItems.value.map(item => `${item.id}:${item.productQuantity}`).join(',')

    router.push(`/checkout?from=cart&items=${encodeURIComponent(itemsParam)}`)
}

const updateSelection = () => {
    selectAll.value = cart.itemList.length > 0 && cart.itemList.every(item => item.selected)
}

const checkdetai = (id: string, sku: string, name: string) => {
    router.push('/product/' + id + '/' + slugify(name) + '?sku=' + sku)
}
const slugify = (str: string) => {
    return str
        .normalize('NFKD')
        .replace(/[^\w\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .toLowerCase()
}

/** =========================
 * ✅ 删除逻辑全部走 Pinia
 * ========================= */

// 删除单个（由调用方传入 id 和当前数量）
const deleteItem = async (item: any) => {
    await cart.removeOne({
        id: item.id,
        productQuantity: item.productQuantity ?? 0,
    })
    message.success('Delete successful')
    // 如需强一致可再拉一次：
    // await cart.refreshCart()
}

// 删除已选
const deleteSelected = async () => {
    const list = selectedItems.value.map(it => ({
        id: it.id,
        productQuantity: it.productQuantity ?? 0,
    }))
    if (!list.length) return
    selectAll.value = false
    await cart.removeItems(list)
    message.success('Delete successful')
    // await cart.refreshCart()
}

// 删除失效
const deleteInvalid = async () => {
    await cart.removeInvalidAll()
    message.success('Delete successful')
    // await cart.refreshCart()
}

/** 数量加减仍走 store */
const increaseproductQuantity = (index: number) => cart.increaseQuantity(index)
const decreaseproductQuantity = (index: number) => cart.decreaseQuantity(index)

/** 响应式判断桌面端 */
const handleResize = () => {
    // if (typeof window !== 'undefined') {
    //     isDesktop.value = window.innerWidth >= 1024
    // }
}
onMounted(() => {
    handleResize()
    window.addEventListener('resize', handleResize)
    if (isTokenValid.value) {
        refreshFromStore()
    }

})
onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
})
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
</style>
