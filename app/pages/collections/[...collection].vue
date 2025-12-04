<template>
    <div class="bg-white">
        <div class="max-row py-3 md:py-8">
            <UBreadcrumb divider=">" :links="breadcrumbLinks"
                class="mb-3 text-blackcolor custom-breadcrumb text-lg sm:text-2xl" :ui="{
                    base: 'hover:underline font-normal',
                    li: 'text-sm sm:text-sm font-normal text-gray-400',
                    active: 'text-customblack dark:text-primary-400 no-underline hover:no-underline',
                    divider: { base: 'px-2 text-text-gray-400 no-underline' },
                }" />

            <!-- Hero Section -->
            <div class="relative h-[180px] sm:h-[300px] overflow-hidden">
                <div class="absolute inset-0">
                    <img src="/images/categorybanner.png" class="w-full h-full object-cover object-center sm:object-top"
                        alt="hero background" />
                </div>
                <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 h-full flex flex-col justify-center sm:items-start"
                    style="text-shadow: 0px 2px 4px rgba(34,34,34,0.6);">
                    <h1 class="text-xl sm:text-5xl font-bold text-white mb-2 sm:mb-4 leading-snug">
                        {{ decodeURIComponent(collectionName) }}
                    </h1>
                    <p class="text-sm sm:text-xl text-white max-w-md sm:max-w-none">
                        Discover our best picks for this collection
                    </p>
                </div>
            </div>

            <!-- Main Content -->
            <div class="container mx-auto px-4 sm:px-6 mt-3 md:mt-12">
                <!-- Filters -->
                <div class="flex flex-col sm:flex-row justify-between sm:items-center gap-2 mb-3 md:mb-8"
                    v-show="products.length != 0">
                    <div class="flex flex-wrap gap-4">
                        <UCheckbox :checked="selected === 'Hot Selling'" @change="handleChange('Hot Selling')"
                            label="Hot Selling" class="text-sm" :ui="{ label: 'font-normal' }" />
                        <UCheckbox :checked="selected === 'New Arrival'" @change="handleChange('New Arrival')"
                            label="New Arrival" class="text-sm font-normal" :ui="{ label: 'font-normal' }" />
                        <UCheckbox :checked="selected === 'Discount'" @change="handleChange('Discount')"
                            label="Discount" class="text-sm font-normal" :ui="{ label: 'font-normal' }" />
                    </div>
                    <div class="flex items-center gap-2">
                        <span class="text-sm">Sort</span>
                        <USelect size="xs" v-model="selectedsort" :options="sortarray" />
                    </div>
                </div>

                <!-- Product Grid with Loading -->
                <div class="relative min-h-[200px]">
                    <!-- 全屏 Loading -->
                    <div v-if="loading && pageNum === 1"
                        class="absolute inset-0 bg-white/80 z-10 flex flex-col items-center justify-center space-y-4">
                        <svg class="animate-spin h-6 w-6 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none"
                            viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                        </svg>
                        <div class="text-gray-500 text-sm">Loading products...</div>
                    </div>

                    <!-- Skeleton -->
                    <div v-if="loading && pageNum === 1"
                        class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mb-6">
                        <div v-for="n in 4" :key="n" class="bg-white rounded-lg shadow p-4">
                            <div class="h-48 bg-gray-200 rounded-lg w-full mb-4 animate-pulse"></div>
                            <div class="h-4 bg-gray-200 rounded-lg w-3/4 mb-2 animate-pulse"></div>
                            <div class="h-3 bg-gray-200 rounded-lg w-1/2 animate-pulse"></div>
                        </div>
                    </div>

                    <!-- Product List -->
                    <div v-show="products.length > 0 && !loading"
                        class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
                        <NuxtLink :to="`/product/${product.id}/${slugify(product.productEnglishName)}`"
                            v-for="(product, index) in products" :key="index"
                            class="bg-white rounded-lg cursor-pointer group">
                            <div class="aspect-square overflow-hidden rounded-t-lg">
                                <NuxtImg :src="product.mainPic?.url
                                    ? `${product.mainPic.url}?x-oss-process=image/auto-orient,1/resize,w_500,limit_0`
                                    : '/images/empty.jpg'"
                                    :alt="product.mainPic?.altText || product.productEnglishName || 'Product image'"
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
                        </NuxtLink>
                    </div>

                    <!-- Empty -->
                    <div class="text-center my-12 flex flex-col items-center justify-center"
                        v-show="products.length === 0 && !loading">
                        <img src="/empty.png" alt="Empty" class="w-24 h-24 sm:w-32 sm:h-32" />
                        <p class="text-gray-400 text-sm mt-4">Not Found Products</p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- ✅ 底部懒加载提示区 -->
    <div ref="bottomRef" class="flex justify-center items-center h-16" v-show="hasMore && !loading">
        <span v-if="isBottomLoading" class="text-sm text-gray-400">Loading more products...</span>
    </div>
</template>

<script lang="ts" setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'
const sortarray = [
    'Name Alphabetic, a-z',
    'Name Alphabetic, z-a',
    'Price Low to High',
    'Price High to Low',
    'Date, Old to New',
    'Date, New to Old',
]

const sortarraymapping = {
    'Name Alphabetic, a-z': { value: 'ProductEnglishName', sort: 'asc' },
    'Name Alphabetic, z-a': { value: 'ProductEnglishName', sort: 'desc' },
    'Price Low to High': { value: 'basePrice', sort: 'asc' },
    'Price High to Low': { value: 'basePrice', sort: 'desc' },
    'Date, Old to New': { value: 'createDate', sort: 'asc' },
    'Date, New to Old': { value: 'createDate', sort: 'desc' },
}
const collectionobj = {
    'Outdoor Shade Solutions': 'dbf1f7231114cafb50f4e5d4bec84d85',
    'Privacy & Garden Decor': '16734fe26787804eddd06f0ca822ee8a',
    'Indoor Window Shades': 'cefdb0c4d04b8af49ce9dc75c01d61d3',
    'Printed Shade & Screen': 'ee937647151abc05acbcd98da6159fe3',
}
const selectedsort = ref(sortarray[0])
const selected = ref('')
const loading = ref(false)
const isBottomLoading = ref(false)
const products = ref<any[]>([])
const pageNum = ref(1)
const pageSize = 12
const hasMore = ref(true)

const { getUserProductRollPage } = ProductAuth()
const route = useRoute()
const collection = route.params.collection[0].replace(/-/g, ' ')
// Get collection name and tagid from the URL
const collectionFull = route.params.collection[0] // "Outdoor-Shade-Solutions-dbf1f7231114cafb50f4e5d4bec84d85"

// Extract the collection name (everything before the last hyphen) and tagid (after the last hyphen)
const splitCollection = collectionFull.split('-')
const collectionName = splitCollection.slice(0, -1).join('-').replace(/-/g, ' ')
const tagId = splitCollection.pop() // Tagid (the last part)

const breadcrumbLinks = [
    { label: 'Home', to: '/', title: 'Home' },
    { label: decodeURIComponent(collectionName), to: '/collections/' + collectionFull, title: collectionName },
]

const handleChange = (value: string) => {
    selected.value = selected.value === value ? '' : value
    getlistlist(true)
}

watch(selectedsort, () => getlistlist(true))

const getlistlist = async (isReset = false) => {
    if (loading.value || isBottomLoading.value || (!hasMore.value && !isReset)) return

    if (isReset) {
        loading.value = true
        pageNum.value = 1
        hasMore.value = true
    } else {
        isBottomLoading.value = true
    }

    try {

        const tagIdList = tagId ? [tagId] : []

        const parmes: any = {
            pageNum: pageNum.value,
            pageSize,
            needCount: true,
            tagIdList,  // 添加 tagIdList 到请求参数
        }

        if (selectedsort.value) {
            parmes.sortKey = sortarraymapping[selectedsort.value].value
            parmes.sortOrder = sortarraymapping[selectedsort.value].sort
        }

        const res = await getUserProductRollPage(parmes)
        const newList = res?.result?.list || []

        if (isReset) {
            products.value = newList
        } else {
            products.value.push(...newList)
        }

        if (newList.length < pageSize) {
            hasMore.value = false
        } else {
            pageNum.value++
        }
    } catch (error) {
        console.error('加载产品失败', error)
    } finally {
        loading.value = false
        isBottomLoading.value = false
    }
}

const bottomRef = ref<HTMLElement | null>(null)
const observer = ref<IntersectionObserver | null>(null)
onMounted(() => {
    getlistlist(true)
    observer.value = new IntersectionObserver((entries) => {
        if (
            entries[0].isIntersecting &&
            hasMore.value &&
            !loading.value &&
            !isBottomLoading.value
        ) {
            getlistlist()
        }
    })
    if (bottomRef.value) observer.value.observe(bottomRef.value)
})

onUnmounted(() => {
    if (observer.value && bottomRef.value) observer.value.unobserve(bottomRef.value)
    observer.value = null
})



const slugify = (str: string) =>
    str
        .normalize('NFKD')
        .replace(/[^\w\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .toLowerCase()
</script>

<style scoped>
.container {
    max-width: 1440px;
}

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
