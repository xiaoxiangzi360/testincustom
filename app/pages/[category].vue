<script setup lang="ts">
const route = useRoute()

definePageMeta({
  title: 'category',
  description: () => {
    const route = useRoute()
    const rawCategory = Array.isArray(route.params.category)
      ? route.params.category[0]
      : route.params.category;
    return rawCategory;
  },
  hidden: true,
  navOrder: 1,
  type: 'primary',
  icon: 'i-mdi-home',
})

const categorybanner = ref('')
const categorytitle = ref('')
const categorydesc = ref('')
const bannerLoading = ref(true)
const capitalize = (s: string) => (s && s[0].toUpperCase() + s.slice(1)) || ''

useHead({
  title: () => capitalize(String(route.params.category)),
})

useServerSeoMeta({
  description: () => capitalize(String(route.params.category)),
})

const rawCategory = Array.isArray(route.params.category)
  ? route.params.category[0]
  : (route.params.category as string);

const catename = ref('')
const cateid = rawCategory?.split?.('-')?.pop() ?? ''

const sortarray = [
  'Name Alphabetic, a-z',
  'Name Alphabetic, z-a',
  'Price Low to High',
  'Price High to Low',
  'Date, Old to New',
  'Date, New to Old'
]

const sortarraymapping: Record<(typeof sortarray)[number], { value: string; sort: 'asc' | 'desc' }> = {
  'Name Alphabetic, a-z': {
    value: 'erpProduct.ProductEnglishName',
    sort: 'asc'
  },
  'Name Alphabetic, z-a': {
    value: 'erpProduct.ProductEnglishName',
    sort: 'desc'
  },
  'Price Low to High': {
    value: 'erpProduct.customPrice',
    sort: 'asc'
  },
  'Price High to Low': {
    value: 'erpProduct.customPrice',
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

// ✅ 新增分页相关变量
const pageNum = ref(1)
const pageSize = 12
const hasMore = ref(true)
const isBottomLoading = ref(false)

const { getUserProductRollPage, getProductCatalogById } = ProductAuth()
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

// ====== 数据加载（增强：分页 + 懒加载） ======
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
      catalogIdPath: cateid,
      pageNum: pageNum.value,
      needCount: true,
      pageSize,
      fields: 'id,erpProduct.productEnglishName,erpProduct.customPrice,erpProduct.mainPic',
    }
    if (selectedsort.value) {
      parmes['sortKey'] = sortarraymapping[selectedsort.value].value
      parmes['sortOrder'] = sortarraymapping[selectedsort.value].sort
    }

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

const getcateinfo = async () => {
  try {
    const parmes = { id: cateid }
    const res = await getProductCatalogById(parmes)
    const result = res.result
    if (result) {
      categorybanner.value = result.rootPictureUrl
      categorytitle.value = result.rootPictureTitle
      categorydesc.value = result.rootPictureContent
      catename.value = result.catalogEnName || result.catalogName || ''
    }
  } catch (error) {
    console.error('Load catenfo failed:', error)
  }
}

// ✅ SSR 数据预取
const { data: categoryData } = await useAsyncData('categoryData', async () => {
  await Promise.all([
    getlistlist(true),
    getcateinfo()
  ])
  return {
    products: products.value,
    categorybanner: categorybanner.value,
    categorytitle: categorytitle.value,
    categorydesc: categorydesc.value,
    catename: catename.value
  }
})

// ✅ 使用服务端预取的数据初始化响应式变量
if (categoryData.value) {
  products.value = categoryData.value.products
  categorybanner.value = categoryData.value.categorybanner
  categorytitle.value = categoryData.value.categorytitle
  categorydesc.value = categoryData.value.categorydesc
  catename.value = categoryData.value.catename
}

// ✅ 背景图加载完再隐藏骨架（仅客户端）
onMounted(() => {
  if (categorybanner.value) {
    const img = new Image()
    img.src = categorybanner.value
    img.onload = () => {
      bannerLoading.value = false
    }
  } else {
    bannerLoading.value = false
  }
})

// ✅ IntersectionObserver 懒加载更多（仅客户端）
const bottomRef = ref<HTMLElement | null>(null)
const observer = ref<IntersectionObserver | null>(null)

onMounted(() => {
  observer.value = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && hasMore.value && !loading.value && !isBottomLoading.value) {
      getlistlist()
    }
  })
  nextTick(() => {
    if (bottomRef.value) observer.value?.observe(bottomRef.value)
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
    item_name: p?.erpProduct?.productEnglishName || '',
    price: Number(p?.erpProduct?.customPrice ?? 0),
    index: i,
    item_list_id: listId.value,
    item_list_name: listName.value
  }))

// 上报"查看商品列表"（仅客户端）
const reportListImpression = () => {
  if (process.server) return
  if (!products.value?.length) return
  viewItemList(toGa4Items(products.value), listId.value, listName.value)
}

// 点击上报"选择了商品"（仅客户端）
const onSelectItem = (p: any, index: number) => {
  if (process.server) return
  selectItem(
    [
      {
        item_id: String(p.id),
        item_name: p?.erpProduct?.productEnglishName || '',
        price: Number(p?.erpProduct?.customPrice ?? 0),
        index,
        item_list_id: listId.value,
        item_list_name: listName.value
      }
    ],
    listId.value,
    listName.value
  )
}

// 当"列表加载完成/排序改变/过滤改变"后，上报 view_item_list（仅客户端）
watch([products, loading, selectedsort, () => selected.value], () => {
  if (process.server) return
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
      <div class="relative h-[180px] sm:h-[300px] overflow-hidden rounded-lg">
        <!-- 骨架屏 -->
        <div v-if="bannerLoading" class="absolute inset-0 bg-gray-200 rounded-lg animate-pulse"></div>

        <!-- 背景图 -->
        <div v-else class="absolute inset-0">
          <NuxtImg :src="categorybanner" class="w-full h-full object-cover object-center sm:object-top rounded-lg"
            alt="hero background" />
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
                  outline: 'bg-white dark:bg-white dark:text-gray-900 ring-1 ring-gray-300 dark:ring-gray-300'
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
            <ULink :to="`/product/${product.id}/${slugify(product.erpProduct.productEnglishName)}`"
              @click="onSelectItem(product, index)" v-for="(product, index) in products" :key="index"
              class="bg-white rounded-lg cursor-pointer group">
              <div class="aspect-square overflow-hidden rounded-t-lg">
                <NuxtImg :src="product.erpProduct.mainPic
                  ? `${product.erpProduct.mainPic}?x-oss-process=image/auto-orient,1/resize,w_400,limit_0`
                  : '/images/empty.jpg'" :alt="product.erpProduct.productEnglishName"
                  class="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                  style="aspect-ratio: 1 / 1;" loading="lazy" />

              </div>
              <div>
                <h3 class="text-sm sm:text-sm text-customblack my-2 lg:my-4 line-clamp-2 cursor-default font-normal"
                  :title="product.erpProduct.productEnglishName">
                  {{ product.erpProduct.productEnglishName }}
                </h3>
                <p class="text-sm sm:text-sm text-[#AEAEAE] mb-1 sm:mb-2">{{ product.size }}</p>
                <div class="flex justify-between items-center">
                  <span class="text-sm sm:text-base font-medium text-primary">
                    ${{ product.erpProduct.customPrice }}
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

<style scoped></style>