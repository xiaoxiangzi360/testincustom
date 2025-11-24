<script setup lang="ts">
const route = useRoute()

definePageMeta({
  title: 'category',
  // 这里用一个静态 description，真正的 SEO description 在下面 useHead / useServerSeoMeta 和 getcateinfo 里覆盖
  description: 'Category page',
  hidden: true,
  navOrder: 1,
  type: 'primary',
  icon: 'i-mdi-home',
})

const categorybanner = ref('')
const categorytitle = ref('')
const categorydesc = ref('')
const categoryalt = ref('')
const contentConfigView = ref(false)
const bannerLoading = ref(true)   // ✅ 背景图骨架屏状态
const capitalize = (s: string) => (s && s[0].toUpperCase() + s.slice(1)) || ''

// 基于 URL slug 的原始 category
const rawCategory = computed(() => {
  const c = route.params.category
  return Array.isArray(c) ? c[0] : (c as string)
})

// 纯 slug 做一个兜底 SEO
useHead(() => ({
  title: capitalize(String(rawCategory.value || 'Category')),
}))
useServerSeoMeta({
  description: capitalize(String(rawCategory.value || 'Category')),
})

const catename = ref('')
const cateid = rawCategory.value?.split?.('-')?.pop() ?? ''

const sortarray = [
  'Name Alphabetic, a-z',
  'Name Alphabetic, z-a',
  'Price Low to High',
  'Price High to Low',
  'Date, Old to New',
  'Date, New to Old'
] as const

const sortarraymapping: Record<(typeof sortarray)[number], { value: string; sort: 'asc' | 'desc' }> = {
  'Name Alphabetic, a-z': {
    value: 'ProductEnglishName',
    sort: 'asc'
  },
  'Name Alphabetic, z-a': {
    value: 'ProductEnglishName',
    sort: 'desc'
  },
  'Price Low to High': {
    value: 'basePrice',
    sort: 'asc'
  },
  'Price High to Low': {
    value: 'basePrice',
    sort: 'desc'
  },
  'Date, Old to New': {
    value: 'createDate',
    sort: 'asc'
  },
  'Date, New to Old': {
    value: 'createDate',
    sort: 'desc'
  }
}

const selectedsort = ref<(typeof sortarray)[number]>(sortarray[0])
const selected = ref('')
const products = ref<any[]>([])
const loading = ref(false)

// ✅ 分页相关
const pageNum = ref(1)
const pageSize = 12
const hasMore = ref(true)
const isBottomLoading = ref(false)

const { getUserProductRollPage, getMallProductCatalogById } = ProductAuth()
const router = useRouter()

const breadcrumbLinks = computed(() => [
  { label: 'Home', to: '/', title: 'Home' },
  { label: catename.value, to: '/' + catename.value + '-' + cateid, title: catename.value },
])

// 监听筛选
const handleChange = (value: string) => {
  selected.value = selected.value === value ? '' : value
  pageNum.value = 1
  hasMore.value = true
  getlistlist(true)
}

watch(selectedsort, () => {
  pageNum.value = 1
  hasMore.value = true
  getlistlist(true)
})

// ====== 列表数据加载（SSR + 客户端分页/懒加载 共用） ======
const getlistlist = async (isReset = false) => {
  // 防止重复触发
  if (loading.value || isBottomLoading.value || (!hasMore.value && !isReset)) return

  if (isReset) {
    loading.value = true
    pageNum.value = 1
    hasMore.value = true
  } else {
    isBottomLoading.value = true
  }

  try {
    const parmes: Record<string, any> = {
      catalogPathIdList: [cateid],
      pageNum: pageNum.value,
      needCount: true,
      pageSize,
    }

    // 排序
    if (selectedsort.value) {
      parmes['sortKey'] = sortarraymapping[selectedsort.value].value
      parmes['sortOrder'] = sortarraymapping[selectedsort.value].sort
    }

    // 过滤（如果后端支持，可以加上；此处保持你的原逻辑不动）
    // if (selected.value) { parmes['tag'] = selected.value }

    const res = await getUserProductRollPage(parmes)
    const list = res.result?.list || []

    if (isReset) {
      products.value = list
    } else {
      products.value.push(...list)
    }

    if (list.length < pageSize) {
      hasMore.value = false
    } else {
      pageNum.value += 1
    }
  } catch (error) {
    console.error('Load product list failed:', error)
  } finally {
    loading.value = false
    isBottomLoading.value = false
  }
}

// ====== 分类信息加载（包含 Banner + SEO） ======
const getcateinfo = async () => {
  if (!cateid) return
  try {
    const parmes = { id: cateid }
    const res = await getMallProductCatalogById(parmes)
    const result = res.result
    if (result) {
      // 原有赋值逻辑保持不变
      categorybanner.value = result.contentConfigImageUrl || ''
      categoryalt.value = result.contentConfigAltText || 'Outdoor Shade Solution' // 给 alt 加兜底值
      categorytitle.value = result.contentConfigTitle || result.catalogEnName || ''
      categorydesc.value = result.contentConfigSubtitle || result.desc || ''
      catename.value = result.catalogEnName || ''
      contentConfigView.value = result.contentConfigView || false
      console.log('Category Info:', categorybanner.value, categorytitle.value, categorydesc.value, contentConfigView.value)

      // ✅ 新增：监听 Banner 图片加载状态，控制骨架屏
      if (categorybanner.value) {
        bannerLoading.value = true // 开始加载，显示骨架屏
        const img = new Image()
        img.src = categorybanner.value
        // 图片加载完成：隐藏骨架屏
        img.onload = () => {
          bannerLoading.value = false
        }
        // 图片加载失败：隐藏骨架屏 + 显示兜底图
        img.onerror = () => {
          bannerLoading.value = false
          categorybanner.value = '/images/empty.jpg' // 兜底图，避免空白
        }
      } else {
        bannerLoading.value = false // 没有图片，直接隐藏骨架屏
      }

      // SEO 相关逻辑保持不变
      useHead({
        title: result.seoPageTitle || categorytitle.value || capitalize(String(rawCategory.value || 'Category')),
        meta: [
          {
            name: 'description',
            content: result.seoMetaDescription || categorydesc.value || capitalize(String(rawCategory.value || 'Category'))
          }
        ]
      })

      useServerSeoMeta({
        title: result.seoPageTitle || categorytitle.value || capitalize(String(rawCategory.value || 'Category')),
        description: result.seoMetaDescription || categorydesc.value || capitalize(String(rawCategory.value || 'Category')),
      })
    }
  } catch (error) {
    console.error('Load cateinfo failed:', error)
    bannerLoading.value = false // 异常时也隐藏骨架屏
  }
}

// ⚠️ 关键：在 SSR 阶段就等待首屏数据加载完成
// 这样服务器返回的 HTML 里就已经有产品列表和分类文案了
if (import.meta.env.SSR) {
  // 服务端渲染时等待
  await Promise.all([getlistlist(true), getcateinfo()])
} else {
  // 客户端首次进入（如切换路由）也等待一次，避免闪烁
  await Promise.all([getlistlist(true), getcateinfo()])
}


// ✅ IntersectionObserver 懒加载更多
const bottomRef = ref<HTMLElement | null>(null)
const observer = ref<IntersectionObserver | null>(null)

onMounted(() => {
  observer.value = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && hasMore.value && !loading.value && !isBottomLoading.value) {
      getlistlist()
    }
  })
  nextTick(() => {
    if (bottomRef.value && observer.value) observer.value.observe(bottomRef.value)
  })
})

onUnmounted(() => {
  if (observer.value && bottomRef.value) {
    observer.value.unobserve(bottomRef.value)
    observer.value.disconnect()
  }
})

const slugify = (str: string) => {
  return str
    .normalize('NFKD')
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .toLowerCase()
}

// ====================== 埋点：GA4 view_item_list / select_item ======================
const { viewItemList, selectItem } = useTrack()

// 列表ID/名称（发给 GA4 的 item_list_id / item_list_name）
const listId = computed(() => `cate_${cateid}`)
const listName = computed(() => categorytitle.value || catename.value || 'Category')

// 转换接口返回的产品为 GA4 items
const toGa4Items = (list: any[]) =>
  (list || []).map((p, i) => ({
    item_id: String(p.id),
    item_name: p?.erpProduct?.productEnglishName || p?.productEnglishName || '',
    price: Number(p?.erpProduct?.basePrice ?? p?.basePrice ?? 0),
    index: i,
    item_list_id: listId.value,
    item_list_name: listName.value
  }))

// 上报“查看商品列表”
const reportListImpression = () => {
  if (process.server) return
  if (!products.value?.length) return
  viewItemList(toGa4Items(products.value), listId.value, listName.value)
}

// 点击上报“选择了商品”
const onSelectItem = (p: any, index: number) => {
  selectItem(
    [
      {
        item_id: String(p.id),
        item_name: p?.erpProduct?.productEnglishName || p?.productEnglishName || '',
        price: Number(p?.erpProduct?.basePrice ?? p?.basePrice ?? 0),
        index,
        item_list_id: listId.value,
        item_list_name: listName.value
      }
    ],
    listId.value,
    listName.value
  )
}

// 当“列表加载完成/排序改变/过滤改变”后，上报 view_item_list
watch([products, loading, selectedsort, () => selected.value], () => {
  if (!loading.value && products.value?.length) reportListImpression()
})
</script>

<template>
  <div class="bg-white">
    <div class="max-row py-3 md:py-8">
      <!-- 面包屑 -->
      <UBreadcrumb divider=">" :links="breadcrumbLinks"
        class="mb-3 text-blackcolor custom-breadcrumb text-lg sm:text-2xl" :ui="{
          base: 'hover:underline font-normal',
          li: 'text-sm sm:text-sm font-normal text-gray-400',
          active: 'text-customblack dark:text-primary-400 no-underline hover:no-underline',
          divider: { base: 'px-2 text-text-gray-400 no-underline' }
        }" />

      <!-- Hero Section -->
      <div class="relative h-[180px] sm:h-[300px] overflow-hidden rounded-lg" v-show="contentConfigView">
        <!-- 骨架屏 -->
        <div v-if="bannerLoading" class="absolute inset-0 bg-gray-200 rounded-lg animate-pulse"></div>

        <!-- 背景图 -->
        <div v-else class="absolute inset-0">
          <NuxtImg :src="categorybanner" class="w-full h-full object-cover object-center sm:object-top rounded-lg"
            :alt="categoryalt" />
        </div>

        <!-- 文字层 -->
        <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 h-full flex flex-col justify-center sm:items-start"
          style="text-shadow: 0px 2px 4px rgba(34,34,34,0.6);">
          <h1 class="text-xl sm:text-5xl font-bold text-white mb-2 sm:mb-4 leading-snug">
            {{ categorytitle }}
          </h1>
          <p class="text-sm sm:text-xl text-white max-w-md sm:max-w-none">
            {{ categorydesc }}
          </p>
        </div>
      </div>

      <!-- Main Content -->
      <div class="container mx-auto px-4 sm:px-6 mt-3 md:mt-12">
        <!-- Filters -->
        <div class="flex flex-col sm:flex-row justify-between sm:items-center gap-2 mb-3 md:mb-8"
          v-show="products.length != 0">
          <div class="flex flex-wrap gap-4">
            <UCheckbox :checked="selected === 'Hot Selling'" @change="handleChange('Hot Selling')" label="Hot Selling"
              class="text-sm" :ui="{ label: 'font-normal' }" />
            <UCheckbox :checked="selected === 'New Arrival'" @change="handleChange('New Arrival')" label="New Arrival"
              class="text-sm font-normal" :ui="{ label: 'font-normal' }" />
            <UCheckbox :checked="selected === 'Discount'" @change="handleChange('Discount')" label="Discount"
              class="text-sm font-normal" :ui="{ label: 'font-normal' }" />
          </div>
          <div class="flex items-center gap-2">
            <span class="text-sm dark:text-gray-900">Sort</span>
            <USelect size="xs" v-model="selectedsort" :options="sortarray" color="white" :ui="{
              color: {
                white: {
                  outline:
                    'bg-white dark:bg-white dark:text-gray-900 ring-1 ring-gray-300 dark:ring-gray-300'
                }
              }
            }" />
          </div>
        </div>

        <!-- Product Grid with Loading -->
        <div class="relative min-h-[200px]">
          <!-- Loading Layer -->
          <div v-if="loading"
            class="absolute inset-0 bg-white/80 z-10 flex flex-col items-center justify-center space-y-4">
            <svg class="animate-spin h-6 w-6 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none"
              viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
            </svg>
            <div class="text-gray-500 text-sm">Loading products...</div>
          </div>

          <!-- Skeleton -->
          <div v-if="loading" class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mb-6">
            <div v-for="n in 4" :key="n" class="bg-white rounded-lg shadow p-4">
              <div class="h-48 bg-gray-200 rounded-lg w-full mb-4 animate-pulse"></div>
              <div class="h-4 bg-gray-200 rounded-lg w-3/4 mb-2 animate-pulse"></div>
              <div class="h-3 bg-gray-200 rounded-lg w-1/2 animate-pulse"></div>
            </div>
          </div>

          <!-- Product List -->
          <div v-show="products.length > 0 && !loading"
            class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mb-6">
            <ULink :to="`/product/${product.id}/${slugify(product.productEnglishName)}`"
              @click="onSelectItem(product, index)" v-for="(product, index) in products" :key="index"
              class="bg-white rounded-lg cursor-pointer group">
              <div class="aspect-square overflow-hidden rounded-t-lg">
                <NuxtImg :src="product.mainPic?.url
                  ? `${product.mainPic.url}?x-oss-process=image/auto-orient,1/resize,w_500,limit_0`
                  : '/images/empty.jpg'
                  " :alt="product.mainPic?.altText || product.productEnglishName || 'Product image'"
                  class="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                  style="aspect-ratio: 1 / 1;" loading="lazy" />
              </div>
              <div>
                <h3 class="text-sm sm:text-sm text-customblack my-2 lg:my-4 cursor-default font-normal mb-4 title"
                  :title="product.productEnglishName">
                  {{ product.productEnglishName }}
                </h3>
                <div class="flex items-center">
                  <!-- Regular price -->
                  <span class="text-sm sm:text-base font-medium text-primary">
                    ${{ product.basePrice }}
                  </span>
                  <!-- Crossed-out price -->
                  <span v-if="product.originPrice" class="text-sm text-gray-400 line-through ml-3">
                    ${{ product.originPrice }}
                  </span>
                </div>
              </div>
            </ULink>
          </div>

          <!-- Empty -->
          <div class="text-center my-12 flex flex-col items-center justify-center"
            v-show="products.length === 0 && !loading">
            <img src="/empty.png" alt="Empty" class="w-24 h-24 sm:w-32 sm:h-32" />
            <p class="text-gray-400 text-sm mt-4">
              Not Found Products
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- 底部懒加载提示区 -->
  <div ref="bottomRef" class="flex justify-center items-center h-16">
    <span v-if="isBottomLoading" class="text-sm text-gray-400">Loading more products...</span>
    <span v-else-if="!hasMore && products.length > 0" class="text-sm text-gray-300">No more products</span>
  </div>
</template>

<style scoped>
.title {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  /* Ensure two lines max */
  -webkit-box-orient: vertical;
  overflow: hidden;
  height: 2.4rem;
  /* Adjust this value to fit two lines */
  line-height: 1.2rem;
  /* This should match the height of one line */
}
</style>
