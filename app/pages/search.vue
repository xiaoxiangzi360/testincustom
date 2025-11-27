<template>
    <div class="bg-white">
        <div class="max-row md:py-6">


            <!-- Main Content -->
            <div class="container mx-auto px-6">
                <!-- Filters -->
                <div class="sticky [top:96px] bg-white z-10 flex justify-between items-center mb-8 py-4"
                    v-show="products.length != 0">
                    <div class="flex gap-6">

                    </div>
                    <div class="relative flex items-center" v-show="products.length != 0">
                        <span class="mr-4 text-sm">Sort</span>
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
                    <div v-if="loading"
                        class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-12 px-1 sm:px-0">
                        <div v-for="n in (products.length > 0 ? products.length : 8)" :key="n"
                            class="bg-white rounded-lg shadow p-3 sm:p-4">
                            <!-- 图片骨架 -->
                            <div class="aspect-square bg-gray-200 rounded w-full mb-3 sm:mb-4 animate-pulse"></div>

                            <!-- 标题骨架 -->
                            <div class="h-4 bg-gray-200 rounded w-3/4 mb-2 animate-pulse"></div>

                            <!-- 副标题骨架 -->
                            <div class="h-3 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                        </div>
                    </div>


                    <!-- Product List -->
                    <div v-show="products.length > 0 && !loading"
                        class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mb-6">
                        <ULink :to="`/product/${product.id}/${slugify(product.productEnglishName)}`"
                            v-for="(product, index) in products" :key="index"
                            class="bg-white rounded-lg cursor-pointer group">
                            <div class="aspect-square overflow-hidden rounded-t-lg">
                                <img :src="product.productMainPic ?? '/images/empty.jpg'"
                                    :alt="product.productEnglishName"
                                    class="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                                    style="aspect-ratio: 1 / 1;" />
                            </div>
                            <div class="py-2">
                                <h3 class="text-sm sm:text-sm mb-1 sm:mb-2 text-customblack mt-2 sm:mt-3 line-clamp-2 cursor-default font-normal"
                                    :title="product.productEnglishName">
                                    {{ product.productEnglishName }}
                                </h3>
                                <p class="text-sm sm:text-sm text-[#AEAEAE] mb-1 sm:mb-2">{{ product.size }}</p>
                                <div class="flex items-center">
                                    <span class="text-sm sm:text-base font-medium text-primary">
                                        ${{ product.customPriceStr }}
                                    </span>
                                    <!-- Crossed-out price -->
                                    <span v-if="product.originPrice" class="text-sm text-gray-400 line-through ml-3">
                                        ${{ product.originPriceStr }}
                                    </span>
                                </div>
                            </div>
                        </ULink>
                    </div>
                    <div class="my-12" v-show="products.length === 0 && !loading">
                        <div class="flex flex-col items-center text-center space-y-4 text-gray-200 text-sm">
                            <img src="/empty.png" alt="Empty" class="w-32 h-32" />
                            <div>
                                <div class="mt-2">No results for “{{ keyword }}”</div>
                                <div class="mt-2">Try checking your spelling or use more general terms</div>
                                <div class="mt-2">Check each product page for other buying options.</div>
                            </div>
                        </div>
                    </div>

                    <div class="flex justify-between items-center text-customblack text-xl mb-2"
                        v-show="products.length === 0 && !loading">
                        <span>New Product</span>
                        <button class="text-sm text-gray-500 hover:text-primary hover:underline"
                            @click="getproductSearchRecommendation">
                            Refresh the items
                        </button>
                    </div>
                    <!-- 推荐产品 Skeleton -->
                    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-6 mb-12 mt-4 px-1 sm:px-0"
                        v-if="recommendLoading">
                        <div v-for="n in 5" :key="n" class="bg-white rounded-lg shadow-sm p-2 sm:p-3">
                            <div class="aspect-square bg-gray-200 rounded w-full mb-3 animate-pulse"></div>
                            <div class="h-4 bg-gray-200 rounded w-3/4 mb-2 animate-pulse"></div>
                            <div class="h-3 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                        </div>
                    </div>


                    <div v-show="recommendproducts.length > 0 && !recommendLoading"
                        class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-6 mb-12 mt-4 px-1 sm:px-0">
                        <div @click="checkdetail(product.id, product.productEnglishName)"
                            v-for="(product, index) in recommendproducts" :key="index"
                            class="bg-white rounded-lg cursor-pointer group shadow-sm">
                            <div class="aspect-square overflow-hidden rounded-t-lg">
                                <img :src="product.productMainPic ?? '/images/empty.jpg'"
                                    :alt="product.productEnglishName"
                                    class="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                                    style="aspect-ratio: 1 / 1;" />
                            </div>
                            <div class="p-2 sm:p-3">
                                <h3 class="text-xs sm:text-sm mb-1 sm:mb-2 font-normal text-customblack mt-2 sm:mt-3 line-clamp-2 cursor-default"
                                    :title="product.productEnglishName">
                                    {{ product.productEnglishName }}
                                </h3>
                                <p class="text-[#AEAEAE] mb-1 sm:mb-2 text-xs sm:text-sm">{{ product.size }}</p>
                                <div class="flex items-center">
                                    <span class="text-sm sm:text-base font-medium text-primary">
                                        ${{ product.customPriceStr }}
                                    </span>
                                    <!-- Crossed-out price -->
                                    <span v-if="product.originPriceStr" class="text-sm text-gray-400 line-through ml-3">
                                        ${{ product.originPriceStr }}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { message } from 'ant-design-vue'
import { ref, watch } from 'vue'

const sortarray = [
    "Best match",
    'Price Low to High',
    'Price High to Low',
]

const sortarraymapping = {
    'Best match': {
        value: '',
        sort: ''
    },
    'Price Low to High': {
        value: 'customPrice',
        sort: 'asc'
    },
    'Price High to Low': {
        value: 'customPrice',
        sort: 'desc'
    },
}
const recommendLoading = ref(false)
const selectedsort = ref(sortarray[0])
const selected = ref('')
const products = ref([])
const loading = ref(false)
const recommendproducts = ref([])
const { getproductSearch, productSearchRecommendation } = ProductAuth()
const route = useRoute()
const router = useRouter()
const keyword = route.query.query;
const lastPublishTime = ref(0)
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
            keyword: keyword,
            pageNum: 1,
            pageSize: 12,
        }
        if (selectedsort.value) {
            parmes['sortKey'] = sortarraymapping[selectedsort.value].value
            parmes['sortOrder'] = sortarraymapping[selectedsort.value].sort
        }

        const res = await getproductSearch(parmes)
        products.value = res.result.list
        if (res.result.list.length == 0) {
            getproductSearchRecommendation()
        }
    } catch (error) {
        console.error('Load product list failed:', error)
        getproductSearchRecommendation()

    } finally {
        loading.value = false
    }
}
const getproductSearchRecommendation = async () => {
    recommendLoading.value = true
    try {
        const parmes = {
            lastPublishTime: lastPublishTime.value
        }
        const res = await productSearchRecommendation(parmes)
        if (res.result.list.length > 0) {
            recommendproducts.value = res.result.list

            lastPublishTime.value = res.result.list[res.result.list.length - 1]['publishTime']
        } else {
            message.warning('No more Products')
        }
    } catch (error) {
        console.error('Load product list failed:', error)
    } finally {
        recommendLoading.value = false
    }
}

getlistlist()

const checkdetail = (id, productName) => {

    router.push(`/product/${id}/${slugify(productName)}`);

}
const slugify = (str) => {
    return str
        .normalize('NFKD')           // 去掉重音符号
        .replace(/[^\w\s-]/g, '')    // 去掉非字母数字/下划线/空格/连字符
        .trim()
        .replace(/\s+/g, '-')        // 空格转-
        .replace(/-+/g, '-')         // 合并多个-
        .toLowerCase()
}
</script>

<style scoped>
.container {
    max-width: 1440px;
}

select {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
}
</style>
