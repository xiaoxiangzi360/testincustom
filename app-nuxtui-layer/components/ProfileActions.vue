<script setup lang="ts">
import { onMounted } from 'vue';
import { message } from 'ant-design-vue'
import { useRouter } from 'vue-router'
import { Tooltip, Select } from 'ant-design-vue'
import { ref, computed, watch } from 'vue'
import { useCartStore } from '@/stores/cart'
import { useRoute } from 'vue-router'
const route = useRoute()
// ========= 类型 =========
type CountryItem = { id: string | number; countryCode: string; countryName: string }
type ProvinceItem = { id: string | number; regionName: string }
type CityItem = { id: string | number; cityName: string }
type LocationInfo = {
  countryCode: string
  countryName: string
  provinceName: string | null
  cityName: string | null
}
const redirectPath = useCookie<string | null>('redirectPath', {
  sameSite: 'lax',
  path: '/',
  maxAge: 60 * 10
})
const savingLocation = ref(false)
const router = useRouter()
const usermenu = [
  { lable: 'Order', url: '/myorders', type: 'link', img: '/order.png' },
  { lable: 'Account Setting', url: '/userinfo', type: 'link', img: '/setting.png' },
  { lable: 'Sign Out', url: '', type: 'button', img: '/loginout.png' }
]

// ========= 位置相关状态 =========
const countryarr = ref<CountryItem[]>([])
const provinceArr = ref<ProvinceItem[]>([])
const cityArr = ref<CityItem[]>([])

const countryLoading = ref(false)
const provinceLoading = ref(false)
const cityLoading = ref(false)

const selectedCountryId = ref<string | number | null>(null)
const selectedProvinceId = ref<string | number | null>(null)
const selectedCityId = ref<string | number | null>(null)

const selectedCountryObj = computed<CountryItem | null>(() =>
  countryarr.value.find(c => c.id === selectedCountryId.value) ?? null
)
const selectedProvinceObj = computed<ProvinceItem | null>(() =>
  provinceArr.value.find(p => p.id === selectedProvinceId.value) ?? null
)
const selectedCityObj = computed<CityItem | null>(() =>
  cityArr.value.find(ci => ci.id === selectedCityId.value) ?? null
)

// a-select 的 options（含 search 字段，用于本地过滤）
const countryOptions = computed(() =>
  countryarr.value.map(c => ({
    label: `${c.countryName} (${c.countryCode})`,
    value: c.id,
    search: `${c.countryName} ${c.countryCode}`.toLowerCase(),
  }))
)
const provinceOptions = computed(() =>
  provinceArr.value.map(p => ({
    label: p.regionName,
    value: p.id,
    search: p.regionName.toLowerCase(),
  }))
)
const cityOptions = computed(() =>
  cityArr.value.map(ci => ({
    label: ci.cityName,
    value: ci.id,
    search: ci.cityName.toLowerCase(),
  }))
)

// 通用：a-select 的模糊搜索
const filterBySearch = (input: string, option?: any) =>
  (option?.search ?? '').includes((input || '').toLowerCase())

// 顶部展示用：国家/省/市 名称（来自 nowLocation）
const joinNonEmpty = (arr: (string | null | undefined)[]) =>
  arr.filter(Boolean).join(' , ')

// 统一的位置信息（显示 & 写入 cookie）
const nowLocation = ref<LocationInfo>({
  countryCode: '',
  countryName: '',
  provinceName: null,
  cityName: null
})

// 顶部右侧仅显示文本（国家/省/市）
const displayLocationLabel = computed(() =>
  joinNonEmpty([nowLocation.value.countryName, nowLocation.value.provinceName, nowLocation.value.cityName])
)

// 旧代码的 nowCountry 仍保留（兼容用途）
const nowCountry = ref({ countryCode: nowLocation.value.countryCode, countryName: nowLocation.value.countryName })

const token = useCookie('token')
const userType = useCookie<string | number | null>('userType', { sameSite: 'lax', path: '/' })
const isuserTokenValid = computed(() => {
  const isMember = userType.value != 2
  return !!token.value && isMember
})
const isTokenValid = computed(() => !!token.value)

const menuOpen = ref(false);
const infoOpen = ref(false);
const signUpOpen = ref(false);
// ✅ langOpen 改为控制 UModal
const langOpen = ref(false);

const { getCart } = cartAuth();
const { logout, updateUserInfo } = useAuth();
const { getUserlPBylp2Location, listCountryAll, listProvinceByCountryId, listCityByRegionId } = LocationAuth();

/**
 * 位置 Cookie（强类型 + 长期有效）
 */
const locationinfo = useCookie<LocationInfo | string | null>('locationinfo', {
  sameSite: 'lax',
  path: '/',
  maxAge: 60 * 60 * 24 * 180 // 180天
})

// 兼容读取：对象 或 旧版字符串
function readLocationCookie(): LocationInfo | null {
  const raw = locationinfo.value
  if (!raw) return null
  if (typeof raw === 'object') {
    const r = raw as any
    if (r.countryCode && r.countryName) {
      return {
        countryCode: String(r.countryCode),
        countryName: String(r.countryName),
        provinceName: r.provinceName ? String(r.provinceName) : null,
        cityName: r.cityName ? String(r.cityName) : null,
      }
    }
    return null
  }
  if (typeof raw === 'string') {
    try {
      const obj = JSON.parse(raw)
      if (obj && obj.countryCode && obj.countryName) {
        return {
          countryCode: String(obj.countryCode),
          countryName: String(obj.countryName),
          provinceName: obj.provinceName ? String(obj.provinceName) : null,
          cityName: obj.cityName ? String(obj.cityName) : null,
        }
      }
    } catch { /* ignore */ }
  }
  return null
}

// 统一写入
function writeLocationCookie(data: LocationInfo) {
  locationinfo.value = data
  synclocation(data)
}
const synclocation = async (locationdata: LocationInfo) => {
  try {
    if (locationdata) {
      const data = {
        countryCode: locationdata.countryCode,
        countryName: locationdata.countryName,
        stateOrProvince: locationdata.provinceName,
        city: locationdata.cityName
      }
      await updateUserInfo(data)
    }
  } catch (error) {
    console.log(error);
  }
}

// ========= 购物车逻辑 =========
const cart = useCartStore()
const handleGetCart = async () => {
  try {
    await cart.refreshCart()
  } catch (error) {
    console.error('Failed to refresh cart:', error)
  }
};
onMounted(() => {
  if (isTokenValid.value) {
    handleGetCart(); // 页面加载完成后请求购物车数据
  }
});
const shipping = ref(0);
const increaseproductQuantity = (index: number) => { cart.increaseQuantity(index) };
const decreaseproductQuantity = (index: number) => { cart.decreaseQuantity(index) };
const removeItem = async (index: number) => {
  const item = cart.itemList[index]
  if (!item) return

  await cart.removeOne({
    id: item.id,
    productQuantity: item.productQuantity ?? 0,
  })

  message.success('Delete successful')

}

const subtotal = computed(() => cart.itemList.reduce((sum, item) => sum + item.productPrice * item.productQuantity, 0));
const total = computed(() => subtotal.value + shipping.value);
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
  cart.itemList[index].productQuantity = String(val).replace(/\D/g, '').slice(0, 3)
}
function goToCart() { router.push('/cart'); menuOpen.value = false }
function goShopping() { router.push('/'); menuOpen.value = false }
const checkdetai = (id: any, sku: any, name: string) => { router.push('/product/' + id + '/' + slugify(name) + '?sku=' + sku) }
// 从 propList 构建规格属性字符串

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

// ========= 位置：请求函数 =========
const getCountrylist = async () => {
  countryLoading.value = true
  try {
    const res = await listCountryAll();
    countryarr.value = (res?.result ?? []) as CountryItem[]
  } finally {
    countryLoading.value = false
  }
}

const fetchProvincesByCountry = async (countryId: string | number) => {
  provinceLoading.value = true
  provinceArr.value = []
  cityArr.value = []
  selectedProvinceId.value = null
  selectedCityId.value = null
  try {
    const res = await listProvinceByCountryId({ countryId })
    provinceArr.value = (res?.result ?? []) as ProvinceItem[]
  } finally {
    provinceLoading.value = false
  }
}

const fetchCitiesByProvince = async (provinceId: string | number) => {
  cityLoading.value = true
  cityArr.value = []
  selectedCityId.value = null
  try {
    const res = await listCityByRegionId({ regionId: provinceId })
    cityArr.value = (res?.result ?? []) as CityItem[]
  } finally {
    cityLoading.value = false
  }
}

// ========= 初始化位置（优先 cookie，其次 IP）=========
const locationResolved = ref(false)
const initLocation = async () => {
  if (locationResolved.value) return
  locationResolved.value = true

  const cached = readLocationCookie()
  if (cached) {
    nowLocation.value = {
      countryCode: cached.countryCode,
      countryName: cached.countryName,
      provinceName: cached.provinceName ?? null,
      cityName: cached.cityName ?? null
    }
    nowCountry.value = { countryCode: cached.countryCode, countryName: cached.countryName }
    return
  }

  try {
    const res = await getUserlPBylp2Location();
    const r = res?.result
    if (r) {
      nowLocation.value = {
        countryCode: r.country_short,
        countryName: r.country_long,
        provinceName: r.region || null,
        cityName: r.city || null
      }
      nowCountry.value = { countryCode: r.country_short, countryName: r.country_long }
      writeLocationCookie(nowLocation.value)
    }
  } catch (error) { /* 静默失败 */ }
}

// ========= 打开时懒加载（Modal 版本也适用）=========
const countriesLoadedOnce = ref(false)
const ensureOptionsOnOpen = async () => {
  if (!countriesLoadedOnce.value) {
    await getCountrylist()
    countriesLoadedOnce.value = true
  }
  const c = countryarr.value.find(
    k => k.countryCode === nowLocation.value.countryCode || k.countryName === nowLocation.value.countryName
  )
  if (c) {
    if (selectedCountryId.value !== c.id) {
      selectedCountryId.value = c.id
      await fetchProvincesByCountry(c.id)
    }
    if (nowLocation.value.provinceName) {
      const p = provinceArr.value.find(p => p.regionName === nowLocation.value.provinceName!)
      if (p) {
        if (selectedProvinceId.value !== p.id) {
          selectedProvinceId.value = p.id
          await fetchCitiesByProvince(p.id)
        }
        if (nowLocation.value.cityName) {
          const ci = cityArr.value.find(ci => ci.cityName === nowLocation.value.cityName!)
          if (ci) selectedCityId.value = ci.id
        }
      }
    }
  }
}

// ========= 监听：选择变化 =========
watch(selectedCountryId, async (val) => {
  const c = countryarr.value.find(x => x.id === val)
  if (!c) return
  nowLocation.value.countryCode = c.countryCode
  nowLocation.value.countryName = c.countryName
  nowCountry.value = { countryCode: c.countryCode, countryName: c.countryName }
  await fetchProvincesByCountry(c.id)
})

watch(selectedProvinceId, async (val) => {
  const p = provinceArr.value.find(x => x.id === val)
  if (!p) {
    nowLocation.value.provinceName = null
    nowLocation.value.cityName = null
    cityArr.value = []
    selectedCityId.value = null
    return
  }
  nowLocation.value.provinceName = p.regionName
  await fetchCitiesByProvince(p.id)
})

watch(selectedCityId, (val) => {
  const ci = cityArr.value.find(x => x.id === val)
  nowLocation.value.cityName = ci ? ci.cityName : null
})

// ========= Modal 打开：在打开那一刻加载并默认选中 =========
watch(langOpen, async (open) => {
  if (open) {
    await ensureOptionsOnOpen()
  }
})

// ========= 退出登录 =========
const loginout = async () => {
  await logout();
}

// ========= 提交（写 cookie）=========
const handleSubmit = () => {
  const c = selectedCountryObj.value
  const p = selectedProvinceObj.value
  const ci = selectedCityObj.value

  const data: LocationInfo = {
    countryCode: c?.countryCode ?? nowLocation.value.countryCode,
    countryName: c?.countryName ?? nowLocation.value.countryName,
    provinceName: p?.regionName ?? null,
    cityName: ci?.cityName ?? null
  }
  nowLocation.value = data
  nowCountry.value = { countryCode: data.countryCode, countryName: data.countryName }
  writeLocationCookie(data)
  langOpen.value = false
}

const checkout = () => {
  const itemsParam = cart.itemList.map(item => `${item.id}:${item.productQuantity}`).join(',')

  router.push(`/checkout?from=cart&items=${encodeURIComponent(itemsParam)}`)

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
function goLogin(overrideTarget?: string) {
  const target = overrideTarget || route.fullPath
  if (target.startsWith('/cart') || target.startsWith('/checkout')) {
    redirectPath.value = target
  } else {
    redirectPath.value = null
  }
  navigateTo('/login')
}

function goRegister(path: string) {
  redirectPath.value = null
  navigateTo(path)
}

// ========= 启动 =========
if (process.client) {
  await initLocation()
}
</script>

<template>
  <div class="flex flex-nowrap items-center justify-center pr-4 rounded-lg gap-x-4">
    <!-- Cart Popover（保留） -->
    <div class="h-full flex items-center justify-center">
      <UPopover color="white" v-model:open="menuOpen" mode="hover" :ui="{
        base: 'pb-0 mb-0'
        , shadow: 'shadow-none', ring: 'ring-0'
      }" class="mb-0 pb-0" :popper="{
        placement: 'bottom'
      }">
        <template #default>
          <div class="relative flex items-center justify-center pt-[3px]">
            <HoverImg class="w-[24px] h-[24px] object-cover" defaultImg="/home/cart_default.webp"
              hoverImg="/home/cart_highlight.webp" />
            <div v-if="cart.itemCount > 0"
              class="absolute top-[-7px] right-[-8px] w-4 h-4 flex items-center justify-center rounded-full text-white bg-primary text-[12px] font-semibold">
              {{ cart.itemCount }}</div>
          </div>
        </template>

        <template #panel>
          <div class="flex">
            <div class="max-w-2xl mx-auto pb-2">
              <div class="bg-white rounded-lg" v-if="cart.itemList.length > 0">
                <div class="max-h-[60vh] overflow-y-auto p-4">
                  <div v-for="(item, index) in cart.itemList" :key="index" :class="[
                    'flex items-start py-4 transition-colors border-solid border-[#F8F8F8]',
                    index !== cart.itemList.length - 1 ? 'border-b' : ''
                  ]">
                    <div class="w-20 rounded-lg overflow-hidden">
                      <NuxtImg :src="`${item.productImage || item.product?.mainPic?.url}?x-oss-process=image/auto-orient,1/resize,w_500,limit_0`" :alt="item.productName"
                        class="w-full h-full object-cover object-top cursor-pointer"
                        @click="checkdetai(item.product?.id, item.productSku, item.productName)" />
                    </div>

                    <div class="ml-6 ">
                      <Tooltip color="white" :overlayInnerStyle="{ color: '#333' }" :title="item.productName"
                        :overlayStyle="{ maxWidth: '300px', whiteSpace: 'pre-line', wordBreak: 'break-word' }">
                        <div class="text-sm text-blackcolor line-clamp-[1] w-52">
                          {{ item.productName }}
                        </div>
                      </Tooltip>
                      <div class="text-xs text-[#8E8E8E] w-52">
                        <div class="mt-1" v-for="citem in getSpecArray(item.skuData?.propList)" :key="citem">
                          <span class="text-customblack">{{ citem.label
                            }}</span>
                          <span class="text-gray-400 ml-1">{{ citem.value
                            }}</span>
                        </div>
                      </div>
                      <!-- <Tooltip color="white" :overlayInnerStyle="{ color: '#333' }"
                      :title="getSpecAttrFromPropList(item.skuData?.propList)"
                      :overlayStyle="{ maxWidth: '300px', whiteSpace: 'pre-line', wordBreak: 'word-break' }">
                      <div class="text-sm text-[#8E8E8E]  line-clamp-[1] w-52 mt-1">
                        {{ getSpecAttrFromPropList(item.skuData?.propList) }}
                      </div>
                    </Tooltip> -->

                      <div class="flex items-center mt-2">
                        <div class="mr-6">
                          <div class="flex items-center">
                            <div class="flex items-center border rounded-md w-26 justify-between px-2">
                              <button @click="decreaseproductQuantity(index)"
                                class="text-gray-500 hover:text-black disabled:text-gray-300"
                                :disabled="item.productQuantity <= min">-</button>
                              <input v-model.number="item.productQuantity" @input="onInputNumber($event, index)"
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

                <div class="p-6">
                  <div class="flex items-center justify-between mb-6">
                    <span class="font-semibold text-black text-base">Total</span>
                    <span class="text-base font-semibold text-black cursor-pointer flex"
                      @click="showDetails = !showDetails">
                      ${{ total.toFixed(2) }}
                      <BaseIcon name="i-heroicons-chevron-down-20-solid" width="24px" height="24px"
                        class="transition-transform duration-200 h-6 w-6" :class="{ 'rotate-180': showDetails }" />
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
        </template>
      </UPopover>
    </div>
    <!-- 登录按钮 / 用户信息（保留） -->
    <div v-if="!isuserTokenValid" class="flex items-center text-white h-full text-sm gap-1" @click.prevent="goLogin()">
      <HoverImg class="w-[24px] h-[24px] " defaultImg="/home/user_default.webp" hoverImg="/home/user_highlight.webp" />
    </div>

    <div class="text-white cursor-pointer h-full flex items-center justify-center" v-if="isuserTokenValid">
      <UPopover color="white" v-model:open="infoOpen" mode="hover"
        :ui="{ base: 'border-none  shadow-2xl bg-white rounded-md focus:outline-none focus:ring-0 !ring-0 custom-popover-shadow' }"
        :popper="{ placement: 'bottom' }">
        <template #default>
          <NuxtLink to="/userinfo" class=" pt-[3px]">
            <HoverImg class=" w-[24px] h-[24px] text-white ml-1 cursor-pointer" defaultImg="/home/in_default.webp"
              hoverImg="/home/in_highlight.webp" />

            <!-- <HoverImg class="w-[24px] h-[24px]" defaultImg="/home/user_default.webp" hoverImg="/home/user_highlight.webp" /> -->
          </NuxtLink>
        </template>

        <template #panel>
          <div class="text-customblack p-1">
            <div v-for="item in usermenu" :key="item.lable" class="p-2 text-gray-400 hover:bg-primary-50">
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


    <!-- ============ 位置选择：改为 UModal ============ -->
    <!-- 触发按钮（原来是 UPopover #default，现在是一个按钮） -->
    <button type="button" class="flex items-center space-x-2 pr-4 py-2 rounded-lg transition focus:outline-none"
      @click="langOpen = true">
      <UTooltip :text="displayLocationLabel || 'Select location'">
        <div class="text-white hover:text-primary flex items-center">
          <HoverImg class="w-[24px] h-[24px] mr-2" defaultImg="/home/map_mark_default.webp"
            hoverImg="/home/map_mark_highlight.webp" />
          <div class="truncate max-w-[120px] text-sm cursor-pointer text-left">
            <div class="text-[12px]">Delivery to</div>
            <div class="truncate">
              {{ displayLocationLabel || 'Select location' }}
            </div>
          </div>
        </div>
      </UTooltip>
      <BaseIcon name="i-heroicons-chevron-down-16-solid"
        class="w-5 h-5 transition-transform text-gray-400 dark:text-gray-500" :class="[langOpen && 'rotate-180']" />
    </button>

    <!-- Modal 本体 -->
    <UModal v-model="langOpen" :ui="{ width: 'sm:max-w-[500px]', base: 'p-0' }">
      <UCard :ui="{ ring: 'ring-0', body: { padding: 'p-6' }, header: 'hidden', footer: 'hidden' }">
        <div class="text-base font-semibold text-black mb-4">
          Choose Your Location
        </div>
        <form @submit.prevent="handleSubmit">
          <!-- 国家（AntD Select） -->
          <div class="mb-4">
            <label class="block text-sm text-gray-400 mb-2">Select Country/Region</label>
            <Select v-model:value="selectedCountryId" :options="countryOptions" show-search
              :filter-option="filterBySearch" :loading="countryLoading" placeholder="Select Country/Region"
              style="width: 100%;" />
          </div>

          <!-- 省（AntD Select） -->
          <div class="mb-4">
            <label class="block text-sm text-gray-400 mb-2">Select State/Province</label>
            <Select v-model:value="selectedProvinceId" :options="provinceOptions" show-search
              :filter-option="filterBySearch" :loading="provinceLoading" placeholder="Select State/Province"
              style="width: 100%;" />
          </div>

          <!-- 市（AntD Select） -->
          <div class="mb-4">
            <label class="block text-sm text-gray-400 mb-2">City</label>
            <Select v-model:value="selectedCityId" :options="cityOptions" show-search :filter-option="filterBySearch"
              :loading="cityLoading" placeholder="Select City" style="width: 100%;" />
          </div>

          <!-- 提交按钮 -->
          <div class="flex justify-end mt-4 gap-2">
            <!-- <UButton color="gray" variant="ghost" class="rounded-md" @click="langOpen = false">Cancel</UButton> -->
            <UButton type="submit" color="primary" class="rounded-md">Done</UButton>
          </div>
        </form>
      </UCard>
    </UModal>
    <!-- ============ /位置选择 Modal ============ -->
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


:deep(.custom-popover-shadow) {
  box-shadow: -2px 2px 10px 0px rgba(46, 46, 12, 0.06) !important;
}

.text-xxs {
  font-size: 0.625rem;
}

/* 去掉 antd Select 的 hover / focus 外边框与阴影 */
:deep(.ant-select:not(.ant-select-disabled):hover .ant-select-selector) {
  border-color: #d9d9d9 !important;
}

:deep(.ant-select-focused .ant-select-selector) {
  border-color: #d9d9d9 !important;
  box-shadow: none !important;
  outline: none !important;
}

/* 去掉 show-search 内部 input 的聚焦轮廓/阴影（内边框） */
:deep(.ant-select .ant-select-selector .ant-select-selection-search-input),
:deep(.ant-select .ant-select-selector .ant-select-selection-search-input:focus),
:deep(.ant-select .ant-select-selector .ant-select-selection-search-input:focus-visible),
:deep(.ant-select .ant-select-selector input[type="search"]),
:deep(.ant-select .ant-select-selector input[type="search"]:focus),
:deep(.ant-select .ant-select-selector input[type="search"]:focus-visible) {
  outline: none !important;
  box-shadow: none !important;
}

/* 有些版本用 ::after 做焦点边框，保险起见也关掉 */
:deep(.ant-select .ant-select-selector::after) {
  box-shadow: none !important;
  outline: none !important;
  border: 0 !important;
}
</style>
