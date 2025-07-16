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

const capitalize = (s) => (s && s[0].toUpperCase() + s.slice(1)) || ''

useHead({
  title: () => capitalize(route.params.category),
})

useServerSeoMeta({
  description: () => capitalize(route.params.category),
})

const rawCategory = Array.isArray(route.params.category)
  ? route.params.category[0]
  : route.params.category;

const catename = rawCategory?.split?.('-')?.[0] ?? ''
const cateid = rawCategory?.split?.('-')?.[1] ?? ''

const sortarray = [
  'Name Alphabetic, a-z',
  'Name Alphabetic, z-a',
  'Price Low to High',
  'Price High to Low',
  'Date, Old to New',
  'Date, New to Old'
]

const sortarraymapping = {
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

const selectedsort = ref(sortarray[0])
const selected = ref('')
const products = ref([])
const loading = ref(false)

const { getUserProductRollPage } = ProductAuth()
const router = useRouter()

const breadcrumbLinks = [
  { label: 'Home', to: '/', title: 'Home' },
  { label: catename, to: '/' + catename + '-' + cateid, title: catename },
]

const handleChange = (value) => {
  selected.value = selected.value === value ? '' : value
  getlistlist()
}

watch(selectedsort, () => {
  getlistlist()
})

const getlistlist = async () => {
  loading.value = true
  try {
    const parmes = {
      catalogId: cateid,
      pageNum: 1,
      pageSize: 12,
      fields: "id,erpProduct.productEnglishName,erpProduct.customPrice,erpProduct.mainPic",
    }
    if (selectedsort.value) {
      parmes['sortKey'] = sortarraymapping[selectedsort.value].value
      parmes['sortOrder'] = sortarraymapping[selectedsort.value].sort
    }

    const res = await getUserProductRollPage(parmes)
    products.value = res.result.list
  } catch (error) {
    console.error('Load product list failed:', error)
  } finally {
    loading.value = false
  }
}

getlistlist()
</script>

<template>
  <div class="bg-white">
    <div class="max-row py-8">
      <UBreadcrumb divider=">" :links="breadcrumbLinks"
        class="mb-6 text-blackcolor custom-breadcrumb text-lg sm:text-2xl" :ui="{
          base: 'hover:underline',
          li: 'text-xs sm:text-sm font-normal text-gray-400',
          active: 'text-customblack dark:text-primary-400 no-underline hover:no-underline',
          divider: { base: 'px-2 text-text-gray-400 no-underline' }
        }" />

      <!-- Hero Section -->
      <div class="relative h-[180px] sm:h-[300px] overflow-hidden">
        <!-- 背景图 -->
        <div class="absolute inset-0">
          <img src="/images/categorybanner.png" class="w-full h-full object-cover object-center sm:object-top"
            alt="hero background" />
        </div>

        <!-- 文字层 -->
        <div
          class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 h-full flex flex-col justify-center items-center sm:items-start text-center sm:text-left"
          style="text-shadow: 0px 2px 4px rgba(34,34,34,0.6);">
          <h1 class="text-2xl sm:text-5xl font-bold text-white mb-2 sm:mb-4 leading-snug">
            Shade Solutions
          </h1>
          <p class="text-sm sm:text-xl text-white max-w-md sm:max-w-none">
            Transform Your Outdoor Space with Premium Sun Protection
          </p>
        </div>
      </div>


      <!-- Main Content -->
      <div class="container mx-auto px-4 sm:px-6 mt-12">
        <!-- Filters -->
        <div class="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-8" v-show="products.length != 0">
          <div class="flex flex-wrap gap-4">
            <UCheckbox :checked="selected === 'Hot Selling'" @change="handleChange('Hot Selling')" label="Hot Selling"
              class="text-sm" />
            <UCheckbox :checked="selected === 'New Arrival'" @change="handleChange('New Arrival')" label="New Arrival"
              class="text-sm" />
            <UCheckbox :checked="selected === 'Discount'" @change="handleChange('Discount')" label="Discount"
              class="text-sm" />
          </div>
          <div class="flex items-center gap-2">
            <span class="text-sm">Sort</span>
            <USelect size="xs" v-model="selectedsort" :options="sortarray" />
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

          <!-- Skeleton 卡片 -->
          <div v-if="loading" class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
            <div v-for="n in 4" :key="n" class="bg-white rounded-lg shadow p-4">
              <div class="h-48 bg-gray-200 rounded w-full mb-4 animate-pulse"></div>
              <div class="h-4 bg-gray-200 rounded w-3/4 mb-2 animate-pulse"></div>
              <div class="h-3 bg-gray-200 rounded w-1/2 animate-pulse"></div>
            </div>
          </div>

          <!-- Product List -->
          <div v-show="products.length > 0 && !loading"
            class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
            <NuxtLink :to="`/product/${product.id}/${product.erpProduct.productEnglishName}`"
              v-for="(product, index) in products" :key="index" class="bg-white rounded-lg cursor-pointer group">
              <div class="aspect-square overflow-hidden rounded-t-lg">
                <img :src="product.erpProduct.mainPic ?? '/images/empty.jpg'"
                  :alt="product.erpProduct.productEnglishName"
                  class="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                  style="aspect-ratio: 1 / 1;" />
              </div>
              <div class="p-2 sm:p-4">
                <h3
                  class="text-xs sm:text-sm mb-1 sm:mb-2 text-customblack mt-2 sm:mt-3 line-clamp-2 cursor-default font-normal"
                  :title="product.erpProduct.productEnglishName">
                  {{ product.erpProduct.productEnglishName }}
                </h3>
                <p class="text-xs sm:text-sm text-[#AEAEAE] mb-1 sm:mb-2">{{ product.size }}</p>
                <div class="flex justify-between items-center">
                  <span class="text-sm sm:text-base font-medium text-primary">
                    ${{ product.erpProduct.customPrice }}
                  </span>
                </div>
              </div>
            </NuxtLink>
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
</template>

<style scoped></style>
