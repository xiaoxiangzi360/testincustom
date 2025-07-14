<script setup lang="ts">
import { message } from 'ant-design-vue'
import { useRouter } from 'vue-router'
import { Tooltip } from 'ant-design-vue'

const router = useRouter()
const usermenu = [
  {
    lable: 'Order',
    url: '/myorders',
    type: 'link',
    img: '/order.png'
  },
  // {
  //   lable: 'My Favorites',
  //   url: '/',
  //   type: 'link',
  //   img: '/favorite.png'
  // },
  {
    lable: 'Account Setting',
    url: '/userinfo',
    type: 'link',
    img: '/setting.png'
  },
  {
    lable: 'Sign Out',
    url: '',
    type: 'button',
    img: '/loginout.png'
  }
]

const countryarr = ref([

])

const token = useCookie('token')
const isTokenValid = computed(() => !!token.value) // 如果有 token，返回 true
const menuOpen = ref(false);
const infoOpen = ref(false);
const langOpen = ref(false);
const { getCart, deleteCart } = cartAuth();
const { logout } = useAuth();
const { getUserlPBylp2Location, listCountryAll } = LocationAuth();
import { useCartStore } from '@/stores/cart'
const locationinfo = useCookie('locationinfo') as any

// 表单数据
const selectedCountry = ref({
  countryCode: 'US',
  countryName: 'United States of America'
})
const nowCountry = ref({
  countryCode: 'US',
  countryName: 'United States of America'
})
const cart = useCartStore()
// const cart.itemList = cart.itemList;
const handleGetCart = async () => {


  try {

    let res = await getCart();
    let result = res.result
    cart.updateCart(result)
    // cart.itemList = result

  } catch (error) {

  }
};

if (isTokenValid.value) {

  handleGetCart()
}
const shipping = ref(0);

const increaseproductQuantity = (index: number) => {
  cart.increaseQuantity(index)

};

const decreaseproductQuantity = (index: number) => {
  cart.decreaseQuantity(index)

};

const removeItem = async (index: number) => {

  let data = {
    idList: [cart.itemList[index].id],
  }
  let res = await deleteCart(data);
  cart.updateCart(cart.itemList);
  cart.itemList.splice(index, 1);

  message.success('Delete successful')
};

const subtotal = computed(() => {
  return cart.itemList.reduce((sum, item) => sum + item.product.skuSpec.customPrice * item.productQuantity, 0);
});

const total = computed(() => {
  return subtotal.value + shipping.value;
});
const showDetails = ref(false);
const min = 1
const max = 999
const onInputNumber = (e: Event, index: number) => {
  let val = parseInt((e.target as HTMLInputElement).value.replace(/[^\d]/g, '')) || 1
  if (val < 1) val = 1
  if (val > 999) val = 999
  cart.itemList[index].productQuantity = val
}

const sanitizeInput = (index: number) => {
  const val = cart.itemList[index].productQuantity
  cart.itemList[index].productQuantity = String(val).replace(/\D/g, '').slice(0, 3) // 最多3位数
}

function goToCart() {
  router.push('/cart')
  menuOpen.value = false
}
function goShopping() {
  router.push('/')
  menuOpen.value = false
}
const checkdetai = (id, sku, name) => {

  router.push('/product/' + id + '/' + name + '?sku=' + sku)
}
const getlocation = async () => {

  try {
    if (locationinfo.value) {
      console.log(locationinfo.value);
      nowCountry.value = {
        countryCode: locationinfo.value.country_short,
        countryName: locationinfo.value.country_long,
      }
      selectedCountry.value = {
        countryCode: locationinfo.value.country_short,
        countryName: locationinfo.value.country_long,
      }
    } else {
      let res = await getUserlPBylp2Location();
      if (res.result) {
        nowCountry.value = {
          countryCode: res.result.country_short,
          countryName: res.result.country_long,
        }
        selectedCountry.value = {
          countryCode: res.result.country_short,
          countryName: res.result.country_long,
        }
      }

      locationinfo.value = JSON.stringify(res.result)

    }

  } catch (error) {

  }
}
const getCountrylist = async () => {

  try {

    let res = await listCountryAll();
    let countrylist = res.result;
    countryarr.value = countrylist

  } catch (error) {

  }
}
const loginout = async () => {
  let res = await logout();

}
getCountrylist();
getlocation();

// 提交表单
const handleSubmit = () => {
  console.log('Form submitted:', {
    country: selectedCountry.value,
  })
  nowCountry.value = selectedCountry.value
  locationinfo.value = JSON.stringify(nowCountry.value)

  langOpen.value = false
}
const checkout = () => {
  // router.push('/checkout?from=cart')
  window.location.href = '/checkout?from=cart'
}
</script>

<template>
  <div class="flex flex-nowrap items-center justify-center px-4 rounded-lg ">
    <UPopover color="white" v-model:open="menuOpen" trigger="manual" mode="hover" :ui="{
      base: 'border-none shadow-2xl bg-white rounded-md focus:outline-none focus:ring-0 !ring-0 custom-popover-shadow'
    }" :popper="{ placement: 'bottom' }">
      <template #default>
        <div class="flex items-center px-4 py-2  rounded-lg transition relative">
          <!-- 购物车图标 -->
          <NuxtImg src="/cart.png" alt="cart" class="h-9" />

          <UBadge v-if="cart.itemCount > 0" :label="cart.itemCount" color="primary" variant="solid"
            class="absolute top-2 right-4 w-4 h-4 flex items-center justify-center rounded-full ring-0 text-white text-xxs font-semibold" />
        </div>
      </template>

      <template #panel>
        <div class="flex">
          <div class="max-w-2xl mx-auto pb-2">
            <div class="bg-white rounded-lg" v-if="cart.itemList.length > 0">

              <div class="mb-8 max-h-[40vh] overflow-y-auto p-4">
                <div v-for="(item, index) in cart.itemList" :key="index" :class="[
                  'flex items-center py-4 transition-colors border-solid border-[#F8F8F8]',
                  index !== cart.itemList.length - 1 ? 'border-b' : ''
                ]">
                  <div class="w-20 rounded-lg overflow-hidden">
                    <img :src="item.product.erpProduct.mainPic" :alt="item.product.erpProduct.productEnglishName"
                      class="w-full h-full object-cover object-top cursor-pointer"
                      @click="checkdetai(item.product.id, item.productSku, item.product.erpProduct.productEnglishName)" />
                  </div>

                  <div class="ml-6 ">
                    <Tooltip color="white" :overlayInnerStyle="{ color: '#333' }"
                      :title="item.product.erpProduct.productEnglishName"
                      :overlayStyle="{ maxWidth: '300px', whiteSpace: 'pre-line', wordBreak: 'break-word' }">
                      <div class="text-sm text-blackcolor truncate-1-lines w-52">
                        {{ item.product.erpProduct.productEnglishName }}
                      </div>
                    </Tooltip>

                    <Tooltip color="white" :overlayInnerStyle="{ color: '#333' }" :title="item.product.skuSpec.specAttr"
                      :overlayStyle="{ maxWidth: '300px', whiteSpace: 'pre-line', wordBreak: 'break-word' }">
                      <div class="text-sm text-[#8E8E8E]  truncate-1-lines w-52 mt-1">{{
                        item.product.skuSpec.specAttr
                      }}</div>
                    </Tooltip>

                    <div class="flex items-center mt-2">

                      <div class="mr-6">
                        <div class="flex items-center">
                          <div class="flex items-center border rounded-md w-26 justify-between px-2">
                            <button @click="decreaseproductQuantity(index)"
                              class="text-gray-500 hover:text-black disabled:text-gray-300"
                              :disabled="item.productQuantity <= min">
                              -
                            </button>
                            <input v-model.number="item.productQuantity" @input="onInputNumber($event, index)"
                              class="w-16 h-8 text-center outline-none border-none focus:ring-0 focus:outline-none"
                              :min="min" :max="max" />

                            <button @click="increaseproductQuantity(index)"
                              class="text-gray-500 hover:text-black disabled:text-gray-300"
                              :disabled="item.productQuantity >= max">
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                      <div class="flex items-center text-black">
                        {{ item.product.skuSpec.customPrice.toFixed(2) }}
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
                    @click="showDetails = !showDetails">${{
                      total.toFixed(2) }}
                    <UIcon name="i-heroicons-chevron-down-20-solid" width="24px" height="24px"
                      class="transition-transform duration-200 h-6 w-6" :class="{ 'rotate-180': showDetails }" />
                  </span>

                </div>

                <!-- 详情内容 -->
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

              <p class="text-black">There are no more items in your cart</p>

              <button @click="goShopping"
                class="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-600 transition-colors mt-8">
                Go shopping
              </button>
            </div>

          </div>
        </div>
      </template>
    </UPopover>

    <NuxtLink class="text-white cursor-pointer" to="/login" v-if="!isTokenValid">
      <NuxtImg src="/user.png" alt="user" class="h-9" />

    </NuxtLink>
    <div class="text-white cursor-pointer" v-if="isTokenValid">
      <UPopover color="white" v-model:open="infoOpen" mode="hover" :ui="{
        base: 'border-none shadow-2xl bg-white rounded-md focus:outline-none focus:ring-0 !ring-0 custom-popover-shadow'
      }" :popper="{ placement: 'bottom' }">
        <template #default>
          <NuxtLink to="/userinfo"><img src="/userfill.png" class="h-9" />
          </NuxtLink>

        </template>

        <template #panel>
          <div class="text-customblack p-1">
            <div v-for="item in usermenu" class="p-2 text-gray-400 hover:bg-primary-50">
              <NuxtLink v-if="item.type == 'link'" :to="item.url">
                <div class="flex items-center">
                  <img :src="item.img" class="w-4 mr-2 h-4" />
                  <div>{{ item.lable }}</div>
                </div>
              </NuxtLink>
              <div v-if="item.type == 'button'" @click="loginout">
                <div class="flex items-center">
                  <img :src="item.img" class="w-4 mr-2 h-4" />
                  <div>{{ item.lable }}</div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </UPopover>

    </div>

    <UPopover color="white" v-model:open="langOpen" mode="hover" trigger="manual" :ui="{
      base: 'overflow-visible border-none shadow-2xl  focus:outline-none focus:ring-0 !ring-0 custom-popover-shadow'
    }" :popper="{ placement: 'bottom' }">
      <template #default>
        <div class="flex items-center space-x-2 px-4 py-2 rounded-lg transition">
          <NuxtImg src="/location.png" alt="location" class="h-6" />

          <div>{{ nowCountry.countryCode }}</div>
          <UIcon name="i-heroicons-chevron-down-16-solid"
            class="w-5 h-5 transition-transform text-gray-400 dark:text-gray-500 "
            :class="[langOpen && 'transform rotate-180']" />

        </div>
      </template>

      <template #panel>
        <div class="flex items-center justify-center bg-gray-100 bg-white rounded-md">
          <UCard class="w-full max-w-xs py-0 h-44" :ui="{
            ring: 'ring-0'
          }">
            <div class="text-sm text-gray-500 mb-4">
              Select the country/region you prefer for shopping.
            </div>
            <form @submit.prevent="handleSubmit">
              <!-- 国家选择 -->
              <div class="mb-2">
                <USelectMenu v-model="selectedCountry" :search-attributes="['countryCode', 'countryName']" searchable
                  :options="countryarr" placeholder="Select Country" class="w-full">
                  <template #label>
                    <div class="flex items-center">
                      <span class="w-5 h-5">{{ selectedCountry.countryCode }}</span>
                      <span class="mx-1">/</span>
                      <span>{{ selectedCountry.countryName }}</span>
                    </div>
                  </template>
                  <template #option="{ option }">
                    <div class="flex items-center">
                      <!-- <img :src="option.flag" alt="flag" class="w-5 h-5 mr-2" /> -->
                      <span class="w-5 h-5">{{ option.countryCode }}</span>
                      <span class="mx-1">/</span>
                      <span>{{ option.countryName }}</span>
                    </div>
                  </template>
                </USelectMenu>
              </div>

              <!-- 提交按钮 -->
              <UButton type="submit" color="primary" block>Submit</UButton>
            </form>
          </UCard>
        </div>
      </template>
    </UPopover>
  </div>
</template>
<style scoped>
:deep(.bg-gray-100) {
  background-color: #F1F1F1 !important;
}

:deep(.ant-tooltip-inner) {
  color: yellow;
  background-color: green;
}

.truncate-1-lines {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

:deep(.custom-popover-shadow) {
  box-shadow: -2px 2px 10px 0px rgba(46, 46, 12, 0.06) !important;
}

.text-xxs {
  font-size: 0.625rem;
}
</style>