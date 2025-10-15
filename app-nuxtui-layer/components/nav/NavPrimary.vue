<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted, defineEmits, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { Select } from 'ant-design-vue'
import { useCookie } from '#app'

// ============ 你现有的菜单开关 ============
const router = useRouter()
const { isMobileMenuOpen, openMobileMenu } = useMobileMenu()

// ============ 类型 ============
interface CatalogItem {
  catalogId: number;
  catalogEnName: string;
  catalogName: string;
  children?: CatalogItem[];
  recommend?: boolean;
}

// emits
const emit = defineEmits<{ (e: 'closeSlideover'): void }>()

// API（你原有）
const { getlistOnlineCatalogTree } = ProductAuth();

// ============ 分类数据 ============
const catemenu = ref<CatalogItem[]>([])
const menuData = ref<CatalogItem[]>([])
const recommendData = ref<CatalogItem[]>([])
const isMobile = ref(false)
const isLoading = ref(true)

// 移动端展开状态
const expandedLevel1 = ref<number | null>(null)
const expandedLevel2 = reactive<{ [key: number]: number | null }>({})

// 获取分类
const getcatelist = async () => {
  isLoading.value = true
  try {
    const res = await getlistOnlineCatalogTree()
    if (!res || !res.result || !Array.isArray(res.result) || res.result.length === 0) {
      console.warn('未获取到有效的分类数据')
      return
    }
    const result = res.result
    const cate = result[0]
    if (cate?.children?.length) {
      catemenu.value = cate.children
      menuData.value = cate.children
      recommendData.value = cate.children.filter(item => item.recommend === true)
    }
  } catch (e) {
    console.error('获取产品分类错误:', e)
  } finally {
    isLoading.value = false
  }
}

// 屏幕尺寸
const checkScreenSize = () => {
  isMobile.value = window.innerWidth < 1024
}

onMounted(() => {
  getcatelist()
  checkScreenSize()
  window.addEventListener('resize', checkScreenSize)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkScreenSize)
})

// 导航
const navigate = (link: string, e?: Event) => {
  // 如果点击的是箭头，不跳转
  if (e && (e.target as HTMLElement).closest('.arrow-icon')) return
  openMobileMenu()
  emit('closeSlideover')
  router.push(link)
}

// 移动端：一级
const toggleLevel1 = (index: number, e?: Event) => {
  e?.stopPropagation()
  if (expandedLevel1.value === index) {
    expandedLevel1.value = null
    Object.keys(expandedLevel2).forEach(key => { delete expandedLevel2[Number(key)] })
  } else {
    expandedLevel1.value = index
  }
}

// 移动端：二级
const toggleLevel2 = (level1Index: number, level2Index: number, e?: Event) => {
  e?.stopPropagation()
  if (expandedLevel2[level1Index] === level2Index) {
    expandedLevel2[level1Index] = null
  } else {
    expandedLevel2[level1Index] = level2Index
  }
}

// 桌面端悬停
const hoverRecommend = ref<number | null>(null)
const hoverRecommendSub = ref<number | null>(null)
const hoverLevel1 = ref<number | null>(null)
const hoverLevel2 = ref<number | null>(null)
const hoverSub = ref<number | null>(null)
const close = () => { openMobileMenu() }

// ====================================================================================
// ============ 定位选择（与购物车头部同接口 & 同结构；改为折叠行，不用 UPopover） ============
// ====================================================================================

type CountryItem = { id: string | number; countryCode: string; countryName: string }
type ProvinceItem = { id: string | number; regionName: string }
type CityItem = { id: string | number; cityName: string }
type LocationInfo = {
  countryCode: string
  countryName: string
  provinceName: string | null
  cityName: string | null
}

// 开关（代替 UPopover）
const deliverOpen = ref(false)

// 统一展示 & cookie
const nowLocation = ref<LocationInfo>({
  countryCode: '',
  countryName: '',
  provinceName: null,
  cityName: null
})
const joinNonEmpty = (arr: (string | null | undefined)[]) => arr.filter(Boolean).join(' , ')
const displayLocationLabel = computed(() =>
  joinNonEmpty([nowLocation.value.countryName, nowLocation.value.provinceName, nowLocation.value.cityName])
)

const locationinfo = useCookie<LocationInfo | string | null>('locationinfo', {
  sameSite: 'lax',
  path: '/',
  maxAge: 60 * 60 * 24 * 180
})

// API（与你给的一致）
const { getUserlPBylp2Location, listCountryAll, listProvinceByCountryId, listCityByRegionId } = LocationAuth()
const { updateUserInfo } = useAuth()

// 选项/选中
const countryarr = ref<CountryItem[]>([])
const provinceArr = ref<ProvinceItem[]>([])
const cityArr = ref<CityItem[]>([])
const countryLoading = ref(false)
const provinceLoading = ref(false)
const cityLoading = ref(false)

const selectedCountryId = ref<string | number | null>(null)
const selectedProvinceId = ref<string | number | null>(null)
const selectedCityId = ref<string | number | null>(null)

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
const filterBySearch = (input: string, option?: any) =>
  (option?.search ?? '').includes((input || '').toLowerCase())

// cookie 读取（兼容旧字符串）
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
    } catch { }
  }
  return null
}

function writeLocationCookie(data: LocationInfo) {
  locationinfo.value = data
  synclocation(data)
}
const synclocation = async (locationdata: LocationInfo) => {
  try {
    if (!locationdata) return
    const data = {
      countryCode: locationdata.countryCode,
      countryName: locationdata.countryName,
      stateOrProvince: locationdata.provinceName,
      city: locationdata.cityName
    }
    await updateUserInfo(data)
  } catch (e) { /* 静默 */ }
}

// 数据加载
const getCountrylist = async () => {
  countryLoading.value = true
  try {
    const res = await listCountryAll()
    countryarr.value = (res?.result ?? []) as CountryItem[]
  } finally { countryLoading.value = false }
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
  } finally { provinceLoading.value = false }
}
const fetchCitiesByProvince = async (provinceId: string | number) => {
  cityLoading.value = true
  cityArr.value = []
  selectedCityId.value = null
  try {
    const res = await listCityByRegionId({ regionId: provinceId })
    cityArr.value = (res?.result ?? []) as CityItem[]
  } finally { cityLoading.value = false }
}

// 初始化：cookie 优先，其次 IP
const initDeliverLocation = async () => {
  const cached = readLocationCookie()
  if (cached) {
    nowLocation.value = { ...cached }
    return
  }
  try {
    const res = await getUserlPBylp2Location()
    const r = res?.result
    if (r) {
      nowLocation.value = {
        countryCode: r.country_short,
        countryName: r.country_long,
        provinceName: r.region || null,
        cityName: r.city || null
      }
      writeLocationCookie(nowLocation.value)
    }
  } catch { }
}

// 打开时懒加载 + 回显
const deliverLoadedOnce = ref(false)
const ensureOptionsOnOpen = async () => {
  if (!deliverLoadedOnce.value) {
    await getCountrylist()
    deliverLoadedOnce.value = true
  }
  const c = countryarr.value.find(k =>
    k.countryCode === nowLocation.value.countryCode || k.countryName === nowLocation.value.countryName
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

const toggleDeliver = async (e?: Event) => {
  e?.stopPropagation()
  deliverOpen.value = !deliverOpen.value
  if (deliverOpen.value) await ensureOptionsOnOpen()
}

// 级联写入 nowLocation
watch(selectedCountryId, async (val) => {
  const c = countryarr.value.find(x => x.id === val)
  if (!c) return
  nowLocation.value.countryCode = c.countryCode
  nowLocation.value.countryName = c.countryName
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

// 保存并关闭
const handleDeliverSubmitInline = () => {
  const data: LocationInfo = { ...nowLocation.value }
  writeLocationCookie(data)
  deliverOpen.value = false
}
const formatCatalogPath = (name: string, id: number | string) => {
  // 去掉首尾空格并把中间连续空格替换为单个横杠
  const safeName = name.trim().replace(/\s+/g, '-')
  return `/${safeName}-${id}`
}

// 启动
onMounted(async () => {
  await initDeliverLocation()
})
</script>

<template>
  <!-- 加载状态 -->
  <div v-if="isLoading" class="loading-state p-3 text-center h-10"></div>

  <!-- 移动端视图 -->
  <div v-else-if="isMobile" class="mobile-categories font-hind">
    <!-- 顶部关闭 -->
    <div class="w-full text-right text-gray-400 mt-3 border-b border-b-blackcolor/10">
      <BaseIcon name="i-material-symbols:close-small-rounded" width="30" height="30" @click="close()"></BaseIcon>
    </div>

    <!-- ===== Delivering to（折叠行 + 右侧箭头） ===== -->
    <div class="mobile-category-item">
      <div class="category-level-1 flex items-center justify-between p-3 border-b border-b-blackcolor/10 last:border-0"
        @click="toggleDeliver($event)">
        <div class="flex items-center space-x-2 rounded-lg transition">
          <BaseIcon name="i-material-symbols:location-on-outline-rounded" class="w-5 h-5 text-primary" />
          <div class="truncate max-w-[200px] text-sm">
            <div class="text-gray-500">Delivering to</div>
            <div class="truncate text-gray-900">
              {{ displayLocationLabel || 'Select location' }}
            </div>
          </div>
        </div>
        <BaseIcon class="arrow-icon w-5 h-5 text-gray-500 transition-transform duration-300 ease-in-out"
          name="i-material-symbols:expand-more" :class="{ 'rotate-180': deliverOpen }" />
      </div>

      <transition name="slide-down">
        <div v-if="deliverOpen" class="px-3 py-3 border-b border-b-blackcolor/10 bg-white">
          <!-- 国家 -->
          <div>
            <label class="block text-sm text-gray-400 mb-2">Select Country/Region</label>
            <Select v-model:value="selectedCountryId" :options="countryOptions" show-search
              :filter-option="filterBySearch" :loading="countryLoading" placeholder="Select Country/Region"
              style="width: 100%;" />
          </div>
          <!-- 省 -->
          <div class="mt-4">
            <label class="block text-sm text-gray-400 mb-2">Select State/Province</label>
            <Select v-model:value="selectedProvinceId" :options="provinceOptions" show-search
              :filter-option="filterBySearch" :loading="provinceLoading" placeholder="Select State/Province"
              style="width: 100%;" />
          </div>
          <!-- 市 -->
          <div class="mt-4">
            <label class="block text-sm text-gray-400 mb-2">City</label>
            <Select v-model:value="selectedCityId" :options="cityOptions" show-search :filter-option="filterBySearch"
              :loading="cityLoading" placeholder="Select City" style="width: 100%;" />
          </div>

          <div class="pt-4 flex justify-end">
            <UButton type="submit" color="primary" class="rounded-md" :disabled="!nowLocation.countryCode"
              @click.stop="handleDeliverSubmitInline()">
              Done
            </UButton>
          </div>

        </div>
      </transition>
    </div>

    <!-- All Products -->
    <div class="mobile-category-item">
      <div class="category-level-1 flex items-center justify-between p-3 border-b border-b-blackcolor/10 last:border-0"
        @click="toggleLevel1(-1, $event)">
        <div class="flex items-center" @click="navigate('/products', $event)">
          <span>All Products</span>
        </div>
        <BaseIcon class="arrow-icon w-5 h-5 text-gray-500 transition-transform duration-300 ease-in-out"
          name="i-material-symbols:expand-more" :class="{ 'rotate-180': expandedLevel1 === -1 }" />
      </div>

      <transition name="slide-down">
        <div v-if="expandedLevel1 === -1" class="pl-4">
          <div v-for="(item, i) in menuData" :key="item.catalogId" class="category-level-2">
            <div class="flex items-center justify-between p-3 border-b border-b-blackcolor/10 "
              @click="toggleLevel2(-1, i, $event)">
              <div @click="navigate(formatCatalogPath(item.catalogEnName || item.catalogName, item.catalogId), $event)">
                <span>{{ item.catalogEnName || item.catalogName }}</span>
              </div>

              <BaseIcon v-if="item?.children?.length"
                class="arrow-icon w-5 h-5 text-gray-500 transition-transform duration-300 ease-in-out"
                name="i-material-symbols:expand-more" :class="{ 'rotate-180': expandedLevel2[-1] === i }" />
            </div>

            <transition name="slide-down">
              <div v-if="expandedLevel2[-1] === i" class="pl-4">
                <div v-for="(sub, j) in item?.children" :key="sub.catalogId" class="category-level-3">
                  <div class="flex items-center justify-between p-3 border-b border-b-blackcolor/10">
                    <div
                      @click="navigate(formatCatalogPath(sub.catalogEnName || sub.catalogName, sub.catalogId), $event)">
                      <span>{{ sub.catalogEnName || sub.catalogName }}</span>
                    </div>

                  </div>
                </div>
              </div>
            </transition>
          </div>
        </div>
      </transition>
    </div>

    <!-- 推荐分类 -->
    <div v-for="(category, index) in recommendData" :key="category.catalogId" class="mobile-category-item">
      <div class="category-level-1 flex items-center justify-between p-3 border-b border-b-blackcolor/10 last:border-0"
        @click="toggleLevel1(index, $event)">
        <div
          @click="navigate(formatCatalogPath(category.catalogEnName || category.catalogName, category.catalogId), $event)">
          <span>{{ category.catalogEnName || category.catalogName }}</span>
        </div>

        <BaseIcon v-if="category?.children?.length"
          class="arrow-icon w-5 h-5 text-gray-500 transition-transform duration-300 ease-in-out"
          name="i-material-symbols:expand-more" :class="{ 'rotate-180': expandedLevel1 === index }" />
      </div>

      <transition name="slide-down">
        <div v-if="expandedLevel1 === index" class="pl-4">
          <div v-for="(sub, j) in category?.children" :key="sub.catalogId" class="category-level-2">
            <div class="flex items-center justify-between p-3 border-b border-b-blackcolor/10"
              @click="toggleLevel2(index, j, $event)">
              <div @click="navigate(formatCatalogPath(sub.catalogEnName || sub.catalogName, sub.catalogId), $event)">
                <span>{{ sub.catalogEnName || sub.catalogName }}</span>
              </div>

              <BaseIcon v-if="sub?.children?.length"
                class="arrow-icon w-5 h-5 text-gray-500 transition-transform duration-300 ease-in-out"
                name="i-material-symbols:expand-more" :class="{ 'rotate-180': expandedLevel2[index] === j }" />
            </div>

            <transition name="slide-down">
              <div v-if="expandedLevel2[index] === j" class="pl-4">
                <div v-for="child in sub?.children" :key="child.catalogId" class="category-level-3">
                  <div class="flex items-center justify-between p-3 border-b border-b-blackcolor/10"
                    @click="navigate(formatCatalogPath(child.catalogEnName || child.catalogName, child.catalogId), $event)">
                    <span>{{ child.catalogEnName || child.catalogName }}</span>
                  </div>

                </div>
              </div>
            </transition>
          </div>
        </div>
      </transition>
    </div>
  </div>

  <!-- 桌面端视图（原样保留） -->
  <div v-else class="relative flex flex-wrap whitespace-nowrap gap-2 md:flex-nowrap md:flex-row md:gap-2">
    <!-- All Products Hover 多级 -->
    <div class="relative group" @mouseleave="hoverLevel1 = null">
      <NuxtLink to="/products">
        <div class="flex items-center p-2 pl-0 cursor-pointer" @mouseenter="hoverLevel1 = 0">
          <NuxtImg src="cell.png" width="24" class="mr-2" />
          All Products
        </div>
      </NuxtLink>

      <div class="absolute top-full left-0 bg-white shadow-2xl flex z-50 py-1" v-if="hoverLevel1 !== null"
        @mouseleave="hoverLevel1 = null; hoverLevel2 = null; hoverSub = null">
        <!-- 一级 -->
        <ul class="text-sm w-60">
          <li v-for="(item, i) in menuData" :key="item.catalogId" class="group"
            @mouseenter="hoverLevel2 = i; hoverSub = null">
            <NuxtLink :to="formatCatalogPath(item.catalogEnName || item.catalogName, item.catalogId)"
              class="block p-3 text-gray-800 hover:text-primary hover:bg-[#00B2E30A] flex justify-between items-center whitespace-nowrap w-full"
              @click="emit('closeSlideover')">
              <span>{{ item.catalogEnName || item.catalogName }}</span>
              <BaseIcon v-if="hoverLevel2 === i && item?.children" name="i-material-symbols:chevron-right"
                class="w-5 h-5 text-gray-400 transition-opacity duration-200" />
            </NuxtLink>
          </li>
        </ul>

        <!-- 二级 -->
        <ul v-if="hoverLevel2 !== null && menuData[hoverLevel2]?.children" class="text-sm w-60">
          <li v-for="(sub, j) in menuData[hoverLevel2]?.children" :key="sub.catalogId" class="group"
            @mouseenter="hoverSub = j">
            <NuxtLink :to="formatCatalogPath(sub.catalogEnName || sub.catalogName, sub.catalogId)"
              class="block p-3 text-gray-800 hover:text-primary hover:bg-[#00B2E30A] flex justify-between items-center whitespace-nowrap"
              @click="emit('closeSlideover')">
              <span>{{ sub.catalogEnName || sub.catalogName }}</span>
              <BaseIcon v-if="hoverSub === j && sub?.children" name="i-material-symbols:chevron-right"
                class="w-5 h-5 text-gray-400 transition-opacity duration-200" />
            </NuxtLink>
          </li>
        </ul>

        <!-- 三级 -->
        <ul v-if="hoverLevel2 !== null && hoverSub !== null && menuData[hoverLevel2]?.children?.[hoverSub]?.children"
          class="text-sm w-60">
          <li v-for="child in menuData[hoverLevel2]?.children?.[hoverSub]?.children" :key="child.catalogId">
            <NuxtLink :to="formatCatalogPath(child.catalogEnName || child.catalogName, child.catalogId)"
              class="block p-3 text-gray-800 hover:text-primary hover:bg-[#00B2E30A] cursor-pointer whitespace-nowrap"
              @click="emit('closeSlideover')">
              {{ child.catalogEnName || child.catalogName }}
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>

    <!-- 分类按钮 -->
    <div v-for="(category, index) in recommendData" :key="category.catalogId"
      class="relative flex items-center p-2 cursor-pointer whitespace-nowrap" @mouseenter="hoverRecommend = index"
      @mouseleave="hoverRecommend = null; hoverRecommendSub = null">
      <NuxtLink :to="formatCatalogPath(category.catalogEnName || category.catalogName, category.catalogId)"
        class="text-base duration-200 border border-transparent md:border-none leading-none"
        @click="emit('closeSlideover')">
        {{ category.catalogEnName || category.catalogName }}
      </NuxtLink>

      <div class="absolute top-full left-0 top-full bg-white shadow-2xl  z-50 py-1 flex"
        v-if="hoverRecommend === index && category?.children?.length">
        <!-- 二级 -->
        <ul class="text-sm w-60">
          <li v-for="(sub, j) in category?.children" :key="sub.catalogId" class="group"
            @mouseenter="hoverRecommendSub = j">
            <NuxtLink :to="formatCatalogPath(sub.catalogEnName || sub.catalogName, sub.catalogId)"
              class="block p-3 text-gray-800 hover:text-primary hover:bg-[#00B2E30A] flex justify-between items-center whitespace-nowrap"
              @click="emit('closeSlideover')">
              <span>{{ sub.catalogEnName || sub.catalogName }}</span>
              <BaseIcon v-if="hoverRecommendSub === j && sub?.children" name="i-material-symbols:chevron-right"
                class="w-5 h-5 text-gray-400 transition-opacity duration-200" />
            </NuxtLink>
          </li>
        </ul>
        <!-- 三级 -->
        <ul v-if="hoverRecommendSub !== null && category?.children?.[hoverRecommendSub]?.children" class="text-sm w-60">
          <li v-for="child in category?.children?.[hoverRecommendSub]?.children" :key="child.catalogId">
            <NuxtLink :to="formatCatalogPath(child.catalogEnName || child.catalogName, child.catalogId)"
              class="block p-3 text-gray-800 hover:text-primary hover:bg-[#00B2E30A] cursor-pointer whitespace-nowrap"
              @click="emit('closeSlideover')">
              {{ child.catalogEnName || child.catalogName }}
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.mobile-categories {
  width: 100%;
}

.mobile-category-item {
  border-bottom: 1px solid #eee;
}

.category-level-1,
.category-level-2,
.category-level-3 {
  cursor: pointer;
}

/* 防止点击箭头时触发导航 */
.arrow-icon {
  pointer-events: auto !important;
}

/* 加载状态样式 */
.loading-state {
  color: #666;
  font-size: 14px;
}

/* slide-down 过渡（高度动画） */
.slide-down-enter-active,
.slide-down-leave-active {
  transition: max-height 0.25s ease, opacity 0.2s ease;
}

.slide-down-enter-from,
.slide-down-leave-to {
  max-height: 0;
  opacity: 0;
}

.slide-down-enter-to,
.slide-down-leave-from {
  max-height: 520px;
  opacity: 1;
}

@media (max-width: 768px) {

  .category-level-1 span,
  .category-level-2 span,
  .category-level-3 span {
    font-size: 14px;
  }
}

/* （若你全局已处理可删除）去掉 antd Select 的 hover/focus 强边框与阴影 */
:deep(.ant-select:not(.ant-select-disabled):hover .ant-select-selector) {
  border-color: #d9d9d9 !important;
}

:deep(.ant-select-focused .ant-select-selector) {
  border-color: #d9d9d9 !important;
  box-shadow: none !important;
  outline: none !important;
}

:deep(.ant-select .ant-select-selector .ant-select-selection-search-input),
:deep(.ant-select .ant-select-selector .ant-select-selection-search-input:focus),
:deep(.ant-select .ant-select-selector .ant-select-selection-search-input:focus-visible),
:deep(.ant-select .ant-select-selector input[type="search"]),
:deep(.ant-select .ant-select-selector input[type="search"]:focus),
:deep(.ant-select .ant-select-selector input[type="search"]:focus-visible) {
  outline: none !important;
  box-shadow: none !important;
}

:deep(.ant-select .ant-select-selector::after) {
  box-shadow: none !important;
  outline: none !important;
  border: 0 !important;
}
</style>
