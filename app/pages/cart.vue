<template>
    <div class="min-h-screen bg-[#F8F8F8]">
        <div class="max-w-7xl mx-auto px-4 py-8">
            <div class="text-lg mb-6 font-bold dark:text-black">Shopping Cart</div>
            <div class="rounded-lg shadow-sm ">
                <div class="flex flex-col lg:flex-row gap-8 items-stretch">
                    <!-- Cart Items -->
                    <div class="flex-1">
                        <table class="w-full bg-white rounded">
                            <thead class="shadow-sm">
                                <tr class="p-6">
                                    <th class="pb-4 text-left p-6 w-8">
                                        <input type="checkbox" v-model="selectAll" @change="toggleSelectAll"
                                            class="rounded">
                                    </th>
                                    <th class="pb-4 text-left font-bold text-gray-600 p-6 w-80 bg-blue">Product
                                    </th>
                                    <th class="pb-4 text-center font-bold text-gray-600 p-6">Price($)</th>
                                    <th class="pb-4 text-center font-bold text-gray-600 p-6 w-28">Qty</th>
                                    <th class="pb-4 text-center font-bold text-gray-600 p-6">Subtotal($)</th>
                                    <th class="pb-4 text-center font-bold text-gray-600 p-6">Action</th>
                                </tr>
                            </thead>
                        </table>
                        <div class="max-h-[75vh] md:overflow-y-auto mt-4">
                            <table class="w-full bg-white rounded">
                                <tbody class="block">
                                    <tr v-for="(item, index) in cart.itemList" :key="item.id" :class="[
                                        'p-6 border-solid border-[#F8F8F8]',
                                        index !== cart.itemList.length - 1 ? 'border-b' : ''
                                    ]">
                                        <td class="py-4 p-6 w-8 bg-blue">
                                            <input type="checkbox" v-model="item.selected" @change="updateSelection"
                                                class="rounded">
                                        </td>
                                        <td class="py-4 w-80">
                                            <div class="flex items-center gap-4 ">
                                                <div class="w-24 h-24 overflow-hidden rounded-lg">
                                                    <img :src="item.product.erpProduct.mainPic"
                                                        @click="checkdetai(item.product.id, item.productSku, item.product.erpProduct.productEnglishName)"
                                                        alt="Product image"
                                                        class="w-24 h-24 object-cover cursor-pointer">
                                                </div>
                                                <div class="w-52">
                                                    <Tooltip color="white" :overlayInnerStyle="{ color: '#333' }"
                                                        :title="item.product.erpProduct.productEnglishName"
                                                        :overlayStyle="{ maxWidth: '300px', whiteSpace: 'pre-line', wordBreak: 'break-word' }">
                                                        <div class="text-lg text-blackcolor truncate-1-lines max-w-52">
                                                            {{ item.product.erpProduct.productEnglishName }}
                                                        </div>
                                                    </Tooltip>

                                                    <Tooltip color="white" :overlayInnerStyle="{ color: '#333' }"
                                                        :title="item.product.skuSpec.specAttr"
                                                        :overlayStyle="{ maxWidth: '300px', whiteSpace: 'pre-line', wordBreak: 'break-word' }">
                                                        <div
                                                            class="text-sm text-[#8E8E8E]  truncate-1-lines max-w-52 mt-1">
                                                            {{
                                                                item.product.skuSpec.specAttr
                                                            }}</div>
                                                    </Tooltip>

                                                </div>
                                            </div>
                                        </td>
                                        <td class="py-4 pl-4 text-center p-6 text-gray-900">{{
                                            item.product.skuSpec.customPrice.toFixed(2)
                                        }}
                                        </td>
                                        <td class="py-4 text-center w-28">
                                            <!-- <InputNumber v-model:value="item.productQuantity" :min="1" :max="9999" /> -->
                                            <div class="flex items-center border rounded-md w-24 justify-between px-2">
                                                <button @click="decreaseproductQuantity(index)"
                                                    class="text-gray-500 hover:text-black disabled:text-gray-300"
                                                    :disabled="item.productQuantity <= min">
                                                    -
                                                </button>
                                                <input v-model.number="item.productQuantity" @blur="validate(index)"
                                                    class="w-12 h-8 text-center outline-none border-none focus:ring-0 focus:outline-none"
                                                    :min="min" :max="max" />

                                                <button @click="increaseproductQuantity(index)"
                                                    class="text-gray-500 hover:text-black disabled:text-gray-300"
                                                    :disabled="item.productQuantity >= max">
                                                    +
                                                </button>
                                            </div>

                                        </td>
                                        <td class="py-4 pl-4 text-center p-6 text-gray-900">{{
                                            (item.product.skuSpec.customPrice *
                                            item.productQuantity).toFixed(2) }}</td>
                                        <td class="py-4 pl-4 text-center p-6 ">
                                            <img @click="deleteItem(item)" src="/del.png" class="w-6 cursor-pointer">

                                            <!-- <button @click="deleteItem(item)"
                                                class="text-primary hover:text-primary-600">Delete</button> -->
                                        </td>
                                    </tr>
                                    <tr v-if="cart.itemList.length === 0">
                                        <td colspan="6" class="text-center py-10 text-gray-400 p-6">
                                            <div
                                                class="bg-white rounded-lg  flex flex-col items-center justify-center h-80 px-8 ">

                                                <p class="text-black">There are no more items in your cart</p>
                                                <NuxtLink to="/"
                                                    class="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-600 transition-colors mt-8">
                                                    Go shopping
                                                </NuxtLink>
                                            </div>
                                        </td>
                                    </tr>

                                </tbody>
                            </table>
                            <div class="flex justify-between items-center my-6" v-show="Invalidlist.length > 0">
                                <div>Discontinued product</div>
                                <div> <button class="text-primary hover:text-primary-600 mr-4"
                                        @click="deleteInvalid">Delete
                                        All</button></div>
                            </div>
                            <table class="w-full bg-white rounded">

                                <tbody class="md:max-h-[480px] md:overflow-y-auto block">
                                    <tr v-for="(item, index) in Invalidlist" :key="item.id" :class="[
                                        'p-6 border-solid border-[#F8F8F8]',
                                        index !== cart.itemList.length - 1 ? 'border-b' : ''
                                    ]">
                                        <!-- <td class="py-4 p-6 w-8">
                                            <input type="checkbox" v-model="item.selected" @change="updateSelection"
                                                class="rounded outline-none">
                                        </td> -->
                                        <td class="py-4 pl-6 p-6">
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
                                                    <div class="font-medium text-lg">{{
                                                        item.product ? item.product.erpProduct.productEnglishName : ''
                                                    }}
                                                    </div>
                                                    <p class="text-sm text-gray-500">{{ item.product.skuSpec.specAttr }}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td class="py-4 pl-4 text-center p-6">
                                        </td>
                                        <td class="py-4 pl-4 text-center p-6">


                                        </td>
                                        <td class="py-4 pl-4 text-center p-6"></td>
                                        <td class="py-4 pl-4 text-center p-6">

                                        </td>
                                    </tr>

                                </tbody>
                            </table>
                        </div>
                        <div class="mt-4 flex items-center gap-6 p-6 bg-white sticky bottom-0 shadow-md">
                            <input type="checkbox" v-model="selectAll" @change="toggleSelectAll" class="rounded">
                            <span class="text-gray-600"><span class="font-normal mr-2 cursor-pointer"
                                    @click="setSelectAll">Select
                                    all</span> (select {{
                                        selectedQuantity }} items)</span>
                            <button @click="deleteSelected" :disabled="selectedItems.length === 0"
                                class="text-primary hover:text-primary-600 disabled:text-gray-300 disabled:cursor-not-allowed">
                                Delete
                            </button>

                        </div>
                    </div>
                    <!-- Cart Summary -->
                    <div class="md:w-80 bg-white rounded-lg shadow-sm flex flex-col justify-between min-h-[200px]">
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
import { ref, computed, watch } from 'vue';
import { InputNumber } from 'ant-design-vue'
const { getCart, deleteCart } = cartAuth();
import { message, Tooltip } from 'ant-design-vue'
import { useRouter } from 'vue-router'
const router = useRouter()
import { useCartStore } from '@/stores/cart'
const cart = useCartStore()
// const cart.itemList = ref([

// ]);
const activeTab = ref<'cart' | 'expired'>('cart');
const min = 1
const max = 999
const validate = (index: any) => {
    if (cart.itemList[index].productQuantity < min) cart.itemList[index].productQuantity = min
    if (cart.itemList[index].productQuantity > max) cart.itemList[index].productQuantity = max
}
const selectAll = ref(false);
const shipping = ref(0);
const selectedItems = computed(() => cart.itemList.filter(item => item.selected));
const selectedTotal = computed(() => {
    return selectedItems.value.reduce((total, item) => total + item.product.skuSpec.customPrice * item.productQuantity, 0);
});
const selectedQuantity = computed(() => {
    return selectedItems.value.reduce((sum, item) => sum + item.productQuantity, 0);
});
const Invalidlist = ref([

])
const handleGetCart = async () => {


    try {

        let res = await getCart();
        let result = res.result
        cart.updateCart(result)
        Invalidlist.value = res.saleDownList
        // cart.itemList = result
        setSelectAll()

    } catch (error) {

    }
};
const token = useCookie('token')
const isTokenValid = computed(() => !!token.value) // 如果有 token，返回 true
if (isTokenValid) {
    handleGetCart()
}
const toggleSelectAll = () => {

    cart.itemList.forEach(item => {
        item.selected = selectAll.value;
    });
};
const setSelectAll = () => {
    selectAll.value = !selectAll.value
    cart.itemList.forEach(item => {
        item.selected = selectAll.value;
    });
};

const checkout = () => {
    if (!selectAll.value) {
        const selectedIds = selectedItems.value.map(item => item.id).join(',');
        router.push(`/checkout?from=cart&ids=${selectedIds}`);
    } else {
        router.push(`/checkout?from=cart`);
    }
}

const updateSelection = () => {
    selectAll.value = cart.itemList.every(item => item.selected);
};
const checkdetai = (id, sku, name) => {

    router.push('/product/' + id + '/' + name + '?sku=' + sku)
}
const deleteItem = async (item) => {
    const index = cart.itemList.indexOf(item);
    if (index > -1) {
        cart.itemList.splice(index, 1);
    }
    let data = {
        idList: [item.id],
    }
    let res = await deleteCart(data);
    message.success('Delete successful')
};
const deleteSelected = async () => {
    let selectitems = cart.itemList.filter(item => item.selected);
    selectAll.value = false;
    let ids = [];
    selectitems.forEach(element => {
        ids.push(element['id']);
    });
    let data = {
        idList: ids,
    }
    let res = await deleteCart(data);
    message.success('Delete successful')
    handleGetCart()

};
const deleteInvalid = async () => {

    let ids = [];
    Invalidlist.value.forEach(element => {
        ids.push(element['id']);
    });
    let data = {
        idList: ids,
    }
    let res = await deleteCart(data);
    message.success('Delete successful')
    handleGetCart()
    // Invalidlist.value = []

};
const increaseproductQuantity = (index: number) => {
    cart.increaseQuantity(index)

};

const decreaseproductQuantity = (index: number) => {
    cart.decreaseQuantity(index)

};
watch(() => cart.itemList, (newvalue, oldvalue) => {

    if (newvalue) {
        cart.updateCart(cart.itemList)
    }
});
onMounted(() => {
    // selectAll.value = !selectAll.value
    // cart.itemList.forEach(item => {
    //     item.selected = selectAll.value;
    // });
});
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
</style>