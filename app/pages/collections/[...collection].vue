<template>
    <div class="bg-white">
        <div class="max-row py-4">
            <UBreadcrumb divider=">" :links="breadcrumbLinks"
                class="mb-3 custom-breadcrumb text-lg sm:text-2xl" :ui="{
                    base: 'hover:underline font-normal',
                    ol: 'mb-4',
                    li: 'text-sm sm:text-sm font-normal text-customblack',
                    active: 'text-gray-300 dark:text-primary-300 no-underline hover:no-underline',
                    divider: { base: 'px-2 text-text-gray-400 no-underline' },
                }" />

            <!-- Hero Section -->
            <div class="relative h-[180px] sm:h-[300px] overflow-hidden" v-if="bannerInfo?.contentConfigView">
                <div class="absolute inset-0">
                    <NuxtImg :src="bannerInfo?.contentConfigImageUrl"
                        class="w-full h-full object-cover object-center sm:object-top rounded-lg"
                        :alt="bannerInfo?.categoryalt" />
                </div>
                <div class="relative z-10 px-4 h-full flex flex-col justify-center sm:items-start"
                    style="text-shadow: 0px 2px 4px rgba(34,34,34,0.6);">
                    <h1 class="text-xl sm:text-5xl font-bold text-white mb-2 sm:mb-4 leading-snug">
                        {{ bannerInfo?.contentConfigTitle }}
                    </h1>
                    <p class="text-sm sm:text-xl text-white max-w-md sm:max-w-none">
                        {{ bannerInfo?.contentConfigSubtitle }}
                    </p>
                </div>
            </div>

            <!-- Main Content -->
            <div class="">
                <!-- Filters -->
                <!-- 占位元素，防止布局跳动 -->
                <div :class="[isFixed ? 'h-16' : 'h-0',]" aria-hidden="true" />
                <!-- <div>{{ JSON.stringify(tagId) }}--{{ JSON.stringify(initTop) }}</div> -->

                <!-- Sticky 元素 -->
                <div ref="stickyElement" :class="[
                    'py-4 max-lg:py-2 bg-white',
                    isFixed
                        ? 'fixed top-[100px] left-0 right-0 z-50 max-lg:top-[80px] shadow-sm'
                        : ''
                ]">
                    <!-- Filters -->
                    <div :class="[isFixed ? 'max-row' : '', isLoadedFilterTree ? '' : 'hidden']">
                        <div class="flex gap-2">
                            <UButton @click="openFilterDrawer"
                                v-show="!(filterTree.levelTwoCatalog.length == 0 && filterTree.spuCatalogProp.length == 0)"
                                class="flex items-center rounded-[4px] border border-[#ccc] hover:border-[#00B2E3]"
                                variant="none">
                                <span class="text-[#0C1013] font-hind font-normal font-Inter">Filter</span>
                                <img src="/filter_icon.png" alt="Filter Icon" class="w-4 h-4" />
                            </UButton>

                            <div class="flex items-center">
                                <USelect v-model="selectedsort" :options="sortarray" variant="none"
                                    class="rounded-[4px] border border-[#ccc] hover:border-[#00B2E3] dark:text-[#0C1013]"
                                    color="white" />
                            </div>
                        </div>
                        <TagList :tagList="deepToRaw(filterLabelList)" @clear="handleTagClear" @more="handleTagMore" />
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
                                <h3 class="text-sm sm:text-sm text-customblack my-2 cursor-default font-normal line-clamp-[2]"
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
    <FilterDrawer :open="deepToRaw(drawerData?.open)" :data="deepToRaw(drawerData?.data)" @close="closeFilterDrawer"
        @ok="handleFilterSure" />
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

const { getProductTagById, getUserProductRollPage, getSpuCatalogTwoLevelByTagId } = ProductAuth()
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

const drawerData = ref({ open: false, data: null })
const isLoadedFilterTree = ref(false)
const filterTree = ref({
    levelTwoCatalog: [],
    spuCatalogProp: [],
})
const curFilter = ref({
    curCatalogId: '',
    curCatalogPropIds: [],
    curAllCatalogProps: []
})
// 打开和关闭 FilterDrawer 的方法
const openFilterDrawer = () => {
    drawerData.value = {
        open: true,
        data: {
            //   cateid: cateid,
            tagId: tagId,
            cateLevel: 1,
            filterTree: filterTree.value,
            curFilter: curFilter.value
        }
    }
}

const closeFilterDrawer = () => {
    drawerData.value.open = false
}

const fetchCateListById = async () => {
    try {
        const params = {
            tagId: tagId,
        }
        const res = await getSpuCatalogTwoLevelByTagId(params)
        console.log('结果=========', res)
        filterTree.value.levelTwoCatalog = res.result || []
        isLoadedFilterTree.value = true
    } catch (error) {
        console.error('Load filter tree failed:', error)
    }
}

const handleFilterSure = (data: any) => {
    console.log('筛选结果:', data);
    curFilter.value = { ...data };
    drawerData.value.open = false;
    // 根据筛选条件重新获取商品列表
    pageNum.value = 1
    hasMore.value = true
    getlistlist(true)
}

const filterLabelList = computed(() => {
    const { curCatalogId, curCatalogPropIds, curAllCatalogProps } = curFilter.value;

    // 遍历 curCatalogPropIds，找到对应的 propValueList，并组装成指定格式
    let matchingTags = curCatalogPropIds.flatMap((propValueId) =>
        curAllCatalogProps.flatMap((prop) =>
            prop.propValueList
                .filter((value) => value.propValueId === propValueId) // 找到匹配的 propValueId
                .map((value) => ({
                    label: value.propValueEnName, // 使用 propValueEnName 作为 label
                    value: value.propValueId, // 使用 propValueId 作为 value
                    type: 'PropValue', // 使用 propEnName 作为 type
                }))
        )
    );

    if (filterTree.value.levelTwoCatalog.length > 0 && curCatalogId) {
        const matchedCatalog = filterTree.value.levelTwoCatalog.find(catalog => catalog.catalogId === curCatalogId);
        if (matchedCatalog) {
            matchingTags.unshift({
                label: matchedCatalog.catalogEnName,
                value: matchedCatalog.id,
                type: 'Category',
            });
        }
    }
    if (filterTree.value.spuCatalogProp.length > 0 && curCatalogPropIds?.length > 0) {
        matchingTags = filterTree.value.spuCatalogProp.flatMap((prop) => {
            // console.log('propValueList:', prop.propValueList);
            return prop.propValueList
                .filter((value) => curCatalogPropIds.includes(String(value.propValueId)))
                .map((value) => ({
                    label: value.propValueEnName, // 使用 propValueEnName 作为 label
                    value: value.propValueId, // 使用 propValueId 作为 value
                    type: 'PropValue', // 使用 propEnName 作为 type
                }));
        });
    }
    return matchingTags;
});


const handleTagClear = ({ isClearAll, tag }: { isClearAll?: boolean; tag?: any }) => {
    const curV = toRaw(curFilter.value)
    if (isClearAll) {
        // 清除所有标签
        curFilter.value = {
            curCatalogId: '',
            curCatalogPropIds: [],
            curAllCatalogProps: []
        };
    } else {
        if (tag?.type === 'Category') {
            // 清除分类标签
            curFilter.value.curCatalogId = ''
            curFilter.value.curCatalogPropIds = []
        } else if (tag?.type === 'PropValue') {
            // 清除属性标签
            curFilter.value.curCatalogPropIds = curV.curCatalogPropIds.filter(
                id => tag?.value !== id
            );
        }

    }
    pageNum.value = 1
    hasMore.value = true
    getlistlist(true)
    return;
};

const handleTagMore = () => {
    console.log('Show More Tags');
};
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
        const { curCatalogId, curCatalogPropIds, curAllCatalogProps } = toRaw(curFilter.value)
        const tagIdList = tagId ? [tagId] : []
        const catalogPathIdList = curCatalogId ? [curCatalogId] : []

        // const catalogPropValueIdList = curCatalogPropIds || []
        let catalogPropList = []
        catalogPropList = curAllCatalogProps.map(item => {
            return {
                propId: item.propId,
                propValueIdList: item.propValueList.map((val: any) => curCatalogPropIds.includes(val.propValueId) ? val.propValueId : null).filter((v: any) => v !== null)
            }
        }).filter((prop: any) => prop.propValueIdList.length > 0)
        const parmes: any = {
            catalogPathIdList,
            catalogPropList,
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

const isFixed = ref(false)
const stickyElement = ref(null)
const { navBarHeight } = useNavBar() // 默认监听 id 为 "navBar" 的元素
const initTop = ref(0)
const handleScroll = () => {
    if (!stickyElement.value) return

    // 获取滚动位置
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop

    // 获取元素距离顶部的距离
    const { top: elementTop, height: elementHeight } = stickyElement.value.getBoundingClientRect()
    if (initTop.value <= 0) {
        initTop.value = elementTop - navBarHeight.value - 10
        isFixed.value = false
        return
    }
    console.log('scrollTop:', scrollTop, 'elementTop:', elementTop, 'initTop:', initTop.value, 'navBarHeight:', navBarHeight.value)

    isFixed.value = scrollTop > initTop.value
}

const { throttledFunction: throttledHandleScroll } = useThrottled(handleScroll, 100)

onMounted(() => {
    getlistlist(true)
    fetchProductTagById()
    fetchCateListById()
    window.addEventListener('scroll', throttledHandleScroll)
    handleScroll()

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

const bannerInfo = ref<any>(null)
watch(() => bannerInfo.value, async () => {
    initTop.value = 0
    await nextTick()
    handleScroll()
}, { deep: true })
const fetchProductTagById = async () => {
    try {
        const res = await getProductTagById({ id: tagId })
        if (res.result) {
            const result = res.result
            bannerInfo.value = res.result
            useHead({
                title: result.seoPageTitle || result.tagName,
                meta: [
                    {
                        name: 'description',
                        content: result.seoMetaDescription
                    }
                ]
            })
        }
    } catch (error) {
        console.error('获取标签信息失败:', error)
        return null
    }
}

onUnmounted(() => {
    window.removeEventListener('scroll', throttledHandleScroll)

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
