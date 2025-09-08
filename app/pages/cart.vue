<template>
    <div class="min-h-screen bg-[#F8F8F8]">
        <div class="max-w-7xl mx-auto p-3 md:py-4 lg:py-8">
            <div class="mb-3 md:mb-4 lg:mb-6 font-medium dark:text-black text-base">Shopping Cart</div>
            <div class="rounded-lg shadow-sm">
                <div class="flex flex-col md:gap-4 lg:gap-8 lg:flex-row items-stretch">
                    <!-- Cart Items -->
                    <div class="flex-1">
                        <table class="w-full bg-white rounded">
                            <thead v-if="isDesktop" class="shadow-sm">
                                <tr class="p-6">
                                    <th class="pb-3 text-left p-6 w-8">
                                        <input type="checkbox" v-model="selectAll" @change="toggleSelectAll"
                                            class="rounded" />
                                    </th>
                                    <th class="pb-4 text-left font-medium text-gray-600 p-6 w-80 bg-blue text-sm">
                                        Product</th>
                                    <th class="pb-4 text-center font-medium text-gray-600 p-6 text-sm">Price($)</th>
                                    <th class="pb-4 text-center font-medium text-gray-600 p-6 w-28 text-sm">Qty</th>
                                    <th class="pb-4 text-center font-medium text-gray-600 p-6 text-sm">Subtotal($)</th>
                                    <th class="pb-4 text-center font-medium text-gray-600 p-6 text-sm">Action</th>
                                </tr>
                            </thead>

                            <tbody class="block">
                                <!-- Mobile Card Layout -->
                                <tr v-for="(item, index) in cart.itemList" :key="item.id" :class="[
                                    'p-6 border-solid border-[#F8F8F8] md:table-row',
                                    index !== cart.itemList.length - 1 ? 'border-b' : '',
                                ]">
                                    <!-- Mobile View -->
                                    <td colspan="6" class="md:hidden p-4">
                                        <div class="bg-white rounded-lg flex flex-col gap-4">
                                            <div class="flex items-center gap-4">
                                                <input type="checkbox" v-model="item.selected" @change="updateSelection"
                                                    class="rounded w-4 h-4" />
                                                <div class="w-16 h-16 overflow-hidden rounded-lg">
                                                    <img :src="item.product.erpProduct.mainPic"
                                                        @click="checkdetai(item.product.id, item.productSku, item.product.erpProduct.productEnglishName)"
                                                        alt="Product image"
                                                        class="w-16 h-16 object-cover cursor-pointer" />
                                                </div>
                                                <div class="flex-1">
                                                    <Tooltip color="white" :overlayInnerStyle="{ color: '#333' }"
                                                        :title="item.product.erpProduct.productEnglishName"
                                                        :overlayStyle="{ maxWidth: '250px', whiteSpace: 'pre-line', wordBreak: 'break-word' }">
                                                        <div class="text-sm font-medium text-black truncate-1-lines">
                                                            {{ item.product.erpProduct.productEnglishName }}
                                                        </div>
                                                    </Tooltip>
                                                    <Tooltip color="white" :overlayInnerStyle="{ color: '#333' }"
                                                        :title="item.product.skuSpec.specAttr"
                                                        :overlayStyle="{ maxWidth: '250px', whiteSpace: 'pre-line', wordBreak: 'break-word' }">
                                                        <div class="text-xs text-[#8E8E8E] truncate-1-lines mt-1">
                                                            {{ item.product.skuSpec.specAttr }}
                                                        </div>
                                                    </Tooltip>
                                                </div>
                                            </div>

                                            <div class="flex justify-between items-center">
                                                <div>
                                                    <div class="text-sm text-gray-900">
                                                        Price: ${{ item.product.skuSpec.customPrice.toFixed(2) }}
                                                    </div>
                                                    <div class="text-sm text-gray-900 mt-1">
                                                        Subtotal:
                                                        ${{ (item.product.skuSpec.customPrice *
                                                        item.productQuantity).toFixed(2) }}
                                                    </div>
                                                </div>

                                                <div class="flex items-center gap-2">
                                                    <div
                                                        class="flex items-center border rounded-md w-24 justify-between px-2 h-7">
                                                        <button @click="decreaseproductQuantity(index)"
                                                            class="text-gray-500 hover:text-black disabled:text-gray-300 text-base"
                                                            :disabled="item.productQuantity <= min">
                                                            -
                                                        </button>
                                                        <input v-model.number="item.productQuantity"
                                                            @blur="validate(index)"
                                                            class="w-12  h-7 text-center outline-none border-b border-t border-l-0 border-r-0 border-gray-300 focus:ring-0 text-xs"
                                                            :min="min" :max="max" />
                                                        <button @click="increaseproductQuantity(index)"
                                                            class="text-gray-500 hover:text-black disabled:text-gray-300 text-base"
                                                            :disabled="item.productQuantity >= max">
                                                            +
                                                        </button>
                                                    </div>
                                                    <img @click="deleteItem(item)" src="/del.png"
                                                        class="w-5 cursor-pointer" />
                                                </div>
                                            </div>
                                        </div>
                                    </td>

                                    <!-- Desktop View -->
                                    <td class="py-4 p-6 w-8 bg-blue hidden md:table-cell">
                                        <input type="checkbox" v-model="item.selected" @change="updateSelection"
                                            class="rounded" />
                                    </td>

                                    <td class="py-4 w-80 hidden md:table-cell">
                                        <div class="flex lg:items-center gap-4">
                                            <div class="w-20 h-20 lg:w-24 lg:h-24 overflow-hidden">
                                                <img :src="item.product.erpProduct.mainPic"
                                                    @click="checkdetai(item.product.id, item.productSku, item.product.erpProduct.productEnglishName)"
                                                    alt="Product image"
                                                    class="w-20 h-20 lg:w-24 lg:h-24 object-cover cursor-pointer rounded-lg" />
                                            </div>
                                            <div class="w-52">
                                                <Tooltip color="white" :overlayInnerStyle="{ color: '#333' }"
                                                    :title="item.product.erpProduct.productEnglishName"
                                                    :overlayStyle="{ maxWidth: '300px', whiteSpace: 'pre-line', wordBreak: 'break-word' }">
                                                    <div
                                                        class="text-sm lg:text-lg font-medium text-blackcolor truncate-1-lines max-w-52">
                                                        {{ item.product.erpProduct.productEnglishName }}
                                                    </div>
                                                </Tooltip>
                                                <Tooltip color="white" :overlayInnerStyle="{ color: '#333' }"
                                                    :title="item.product.skuSpec.specAttr"
                                                    :overlayStyle="{ maxWidth: '300px', whiteSpace: 'pre-line', wordBreak: 'break-word' }">
                                                    <div class="text-sm text-[#8E8E8E] truncate-1-lines max-w-52 mt-1">
                                                        {{ item.product.skuSpec.specAttr }}
                                                    </div>
                                                </Tooltip>
                                            </div>
                                        </div>
                                    </td>

                                    <td class="py-4 pl-4 text-center p-6 text-gray-900 hidden md:table-cell">
                                        {{ item.product.skuSpec.customPrice.toFixed(2) }}
                                    </td>

                                    <td class="py-4 text-center w-28 hidden md:table-cell">
                                        <div class="flex items-center border rounded-md w-24 justify-between px-2 h-8">
                                            <button @click="decreaseproductQuantity(index)"
                                                class="text-gray-500 hover:text-black disabled:text-gray-300"
                                                :disabled="item.productQuantity <= min">
                                                -
                                            </button>
                                            <input v-model.number="item.productQuantity" @blur="validate(index)"
                                                class="w-12 h-8 text-center outline-none border-b border-t border-l-0 border-r-0 border-gray-300 focus:ring-0 focus:outline-none"
                                                :min="min" :max="max" />
                                            <button @click="increaseproductQuantity(index)"
                                                class="text-gray-500 hover:text-black disabled:text-gray-300"
                                                :disabled="item.productQuantity >= max">
                                                +
                                            </button>
                                        </div>
                                    </td>

                                    <td class="py-4 pl-4 text-center p-6 text-gray-900 hidden md:table-cell">
                                        {{ (item.product.skuSpec.customPrice * item.productQuantity).toFixed(2) }}
                                    </td>

                                    <td class="py-4 pl-4 text-center p-6 hidden md:table-cell">
                                        <img @click="deleteItem(item)" src="/del.png" class="w-6 cursor-pointer" />
                                    </td>
                                </tr>

                                <!-- Empty Cart -->
                                <tr v-if="cart.itemList.length === 0">
                                    <td colspan="6" class="text-center py-10 text-gray-400 p-6">
                                        <div
                                            class="bg-white rounded-lg flex flex-col items-center justify-center h-80 px-8">
                                            <p class="text-black">There are no more items in your cart</p>
                                            <ULink to="/"
                                                class="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-600 transition-colors mt-8">
                                                Go shopping
                                            </ULink>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <!-- Invalid Items -->
                        <div class="flex justify-between items-center my-6" v-show="cart.saleDownList?.length > 0">
                            <div>Out of Stock & Invalid Items</div>
                            <div>
                                <button class="text-primary hover:text-primary-600 mr-4" @click="deleteInvalid">Delete
                                    All</button>
                            </div>
                        </div>

                        <table class="w-full bg-white rounded" v-if="cart.saleDownList?.length > 0">
                            <tbody class="md:max-h-[480px] md:overflow-y-auto block">
                                <tr v-for="(item, index) in cart.saleDownList" :key="item.id" :class="[
                                    'p-6 border-solid border-[#F8F8F8]',
                                    index !== cart.saleDownList.length - 1 ? 'border-b' : '',
                                ]">
                                    <!-- Mobile View -->
                                    <td colspan="5" class="md:hidden p-4">
                                        <div class="flex flex-col gap-4">
                                            <div class="flex items-center gap-4">
                                                <div class="w-20 h-20 overflow-hidden rounded relative cursor-pointer">
                                                    <img :src="item.product ? item.product.erpProduct.mainPic : ''"
                                                        alt="Product image" class="w-full h-full object-cover" />
                                                    <div
                                                        class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                                                        <span class="text-white text-sm">Invalid</span>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div class="font-medium text-base">
                                                        {{ item.product ? item.product.erpProduct.productEnglishName :
                                                        '' }}
                                                    </div>
                                                    <p class="text-xs text-gray-500">{{ item.product?.skuSpec?.specAttr
                                                        }}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </td>

                                    <!-- Desktop View -->
                                    <td class="py-4 pl-6 p-6 hidden md:table-cell">
                                        <div class="flex items-center gap-6">
                                            <div class="w-24 h-24 overflow-hidden rounded relative cursor-pointer">
                                                <img :src="item.product ? item.product.erpProduct.mainPic : ''"
                                                    alt="Product image" class="w-full h-full object-cover" />
                                                <div
                                                    class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                                                    <span class="text-white text-base">Invalid</span>
                                                </div>
                                            </div>
                                            <div>
                                                <div class="font-medium text-lg">
                                                    {{ item.product ? item.product.erpProduct.productEnglishName : '' }}
                                                </div>
                                                <p class="text-sm text-gray-500">{{ item.product?.skuSpec?.specAttr }}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="py-4 pl-4 text-center p-6 hidden md:table-cell"></td>
                                    <td class="py-4 pl-4 text-center p-6 hidden md:table-cell"></td>
                                    <td class="py-4 pl-4 text-center p-6 hidden md:table-cell"></td>
                                    <td class="py-4 pl-4 text-center p-6 hidden md:table-cell"></td>
                                </tr>
                            </tbody>
                        </table>

                        <div
                            class="mt-4 flex items-center text-sm md:text-base md:gap-4 lg:gap-6 p-3 md:p-4 lg:p-6 bg-white sticky bottom-0 shadow-md">
                            <input type="checkbox" v-model="selectAll" @change="toggleSelectAll" class="rounded" />
                            <span class="text-gray-600">
                                <span class="font-normal mr-2 cursor-pointer" @click="setSelectAll">Select all</span>
                                (select {{ selectedQuantity }} items)
                            </span>
                            <button @click="deleteSelected" :disabled="selectedItems.length === 0"
                                class="text-primary hover:text-primary-600 disabled:text-gray-300 disabled:cursor-not-allowed">
                                Delete
                            </button>
                        </div>
                    </div>

                    <!-- Cart Summary -->
                    <div
                        class="lg:w-80 bg-white rounded-lg shadow-sm flex flex-col justify-between min-h-[200px] text-sm md:text-base">
                        <div class="p-6">
                            <div class="flex justify-between text-gray-600">
                                <span>Selected {{ selectedQuantity }} items</span>
                                <span>${{ selectedTotal.toFixed(2) }}</span>
                            </div>
                            <div class="flex justify-between mt-4 text-gray-600">
                                <span>Shipping</span>
                                <span>${{ shipping.toFixed(2) }}</span>
                            </div>
                            <div class="pt-4 flex justify-between font-bold mt-4 text-gray-600">
                                <span>Total</span>
                                <span>${{ (selectedTotal + shipping).toFixed(2) }}</span>
                            </div>
                        </div>
                        <button @click="checkout()"
                            class="!rounded-button rounded w-full bg-primary text-white py-3 whitespace-nowrap sticky bottom-1">
                            Checkout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { message, Tooltip } from 'ant-design-vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cart'

const router = useRouter()
const cart = useCartStore()
const { deleteCart } = cartAuth() // 仅用于删除接口；拉取统一用 cart.refreshCart()

const activeTab = ref<'cart' | 'expired'>('cart')
const min = 1
const max = 999
const selectAll = ref(false)
const shipping = ref(0)
const isDesktop = ref(false)

const selectedItems = computed(() => cart.itemList.filter(item => item.selected))
const selectedTotal = computed(() =>
    selectedItems.value.reduce((total, item) => total + item.product.skuSpec.customPrice * item.productQuantity, 0)
)
const selectedQuantity = computed(() => selectedItems.value.reduce((sum, item) => sum + item.productQuantity, 0))

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
        // 初始化时不要强制全选，保持 false
        selectAll.value = false
    } catch (e) {
        console.error(e)
    }
}
if (isTokenValid.value) {
    refreshFromStore()
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
    if (!selectAll.value) {
        const selectedIds = selectedItems.value.map(item => item.id).join(',')
        router.push(`/checkout?from=cart&ids=${selectedIds}`)
    } else {
        router.push(`/checkout?from=cart`)
    }
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

const deleteItem = async (item: any) => {
    const idx = cart.itemList.indexOf(item)
    if (idx > -1) {
        cart.itemList.splice(idx, 1)
    }
    await deleteCart({ idList: [item.id] })
    message.success('Delete successful')
    await cart.refreshCart()
}

const deleteSelected = async () => {
    const ids = selectedItems.value.map(el => el.id)
    if (!ids.length) return
    selectAll.value = false
    await deleteCart({ idList: ids })
    message.success('Delete successful')
    await cart.refreshCart()
}

const deleteInvalid = async () => {
    const ids = (cart.saleDownList || []).map(el => el.id)
    if (!ids.length) return
    await deleteCart({ idList: ids })
    message.success('Delete successful')
    await cart.refreshCart()
}

// 数量加减走 store
const increaseproductQuantity = (index: number) => cart.increaseQuantity(index)
const decreaseproductQuantity = (index: number) => cart.decreaseQuantity(index)

// Update isDesktop on window resize
const handleResize = () => {
    if (typeof window !== 'undefined') {
        isDesktop.value = window.innerWidth >= 1024
    }
}
onMounted(() => {
    handleResize()
    window.addEventListener('resize', handleResize)
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

table thead,
tbody tr {
    display: table;
    width: 100%;
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
</style>
