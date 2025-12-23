<script setup lang="ts">
import { toRaw } from 'vue'
const route = useRoute()

definePageMeta({
  title: 'category',
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
const contentConfigView = ref(null)
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
const cateLevel = ref(0)
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

const { getSpuCatalogPropByCatalogId, getProductSpuLevelTwo, getUserProductRollPage, getMallProductCatalogById } = ProductAuth()

const breadcrumbLinks = computed(() => [
  { label: 'Home', to: '/', title: 'Home' },
  { label: catename.value, to: '/' + catename.value + '-' + cateid, title: catename.value },
])

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
      cateid: cateid,
      cateLevel: cateLevel.value,
      filterTree: filterTree.value,
      curFilter: curFilter.value
    }
  }
}

const closeFilterDrawer = () => {
  drawerData.value.open = false
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
  // console.log('scrollTop:', scrollTop, 'elementTop:', elementTop, 'initTop:', initTop.value, 'navBarHeight:', navBarHeight.value)
  isFixed.value = scrollTop > initTop.value
}

const { throttledFunction: throttledHandleScroll } = useThrottled(handleScroll, 100)

// ====== 列表数据加载（客户端分页/懒加载） ======
// 将数据加载放到 onMounted 生命周期钩子中
onMounted(async () => {
  await getlistlist(true)
  await getcateinfo()
})

const fetchCateListById = async () => {
  try {
    const params = {
      catalogId: cateid,
    }
    let res
    if (cateLevel.value === 1) {
      res = await getProductSpuLevelTwo(params)
      filterTree.value.levelTwoCatalog = res.result || []
    } else {
      res = await getSpuCatalogPropByCatalogId(params)
      filterTree.value.spuCatalogProp = res.result || []
    }
    isLoadedFilterTree.value = true
  } catch (error) {
    console.error('Load filter tree failed:', error)
  }
}

const getlistlist = async (isReset = false) => {
  if (loading.value || isBottomLoading.value || (!hasMore.value && !isReset)) return

  if (isReset) {
    loading.value = true
    pageNum.value = 1
    hasMore.value = true
  } else {
    isBottomLoading.value = true
  }
  // let catalogPropValueIdList = []
  let catalogPropList = []
  const { curCatalogId, curCatalogPropIds, curAllCatalogProps } = toRaw(curFilter.value)
  // catalogPropValueIdList = curCatalogPropIds;
  let catalogPropAllList = cateLevel.value > 1 ? filterTree.value.spuCatalogProp : curAllCatalogProps;
  catalogPropList = catalogPropAllList.map(item => {
    return {
      propId: item.propId,
      propValueIdList: item.propValueList.map((val: any) => curCatalogPropIds.includes(val.propValueId) ? val.propValueId : null).filter((v: any) => v !== null)
    }
  }).filter((prop: any) => prop.propValueIdList.length > 0)

  // console.log('curFilter-----:', curCatalogPropIds, catalogPropAllList);
  // if (cateLevel.value > 1) {
  //   tagIdList = curCatalogPropIds || []
  // } else {
  //   if (curCatalogPropIds.length > 0) {
  //     tagIdList = curCatalogPropIds
  //   }else{
  //     // 如果没有选中任何属性，则使用所有属性进行过滤
  //     tagIdList = curAllCatalogProps.map((prop: any) => prop.propId)
  //   }
  // }
  try {
    const parmes: Record<string, any> = {
      catalogPropList,
      catalogPathIdList: curCatalogId ? [curCatalogId] : [cateid],
      pageNum: pageNum.value,
      needCount: true,
      pageSize,
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

// ====== 分类信息加载（包含 Banner + SEO） ======
const getcateinfo = async () => {
  if (!cateid) return
  try {
    const parmes = { id: cateid }
    const res = await getMallProductCatalogById(parmes)
    const result = res.result
    if (result) {
      categorybanner.value = result.contentConfigImageUrl || ''
      categoryalt.value = result.contentConfigAltText || 'Outdoor Shade Solution'
      categorytitle.value = result.contentConfigTitle || result.catalogEnName || ''
      categorydesc.value = result.contentConfigSubtitle || result.desc || ''
      catename.value = result.catalogEnName || ''
      contentConfigView.value = result.contentConfigView || false
      cateLevel.value = result.level || 0
      fetchCateListById();
      if (categorybanner.value) {
        bannerLoading.value = true
        const img = new Image()
        img.src = categorybanner.value
        img.onload = () => {
          bannerLoading.value = false
        }
        img.onerror = () => {
          bannerLoading.value = false
          categorybanner.value = '/images/empty.jpg'
        }
      } else {
        bannerLoading.value = false
      }

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
    bannerLoading.value = false
  }
}

watch(() => contentConfigView.value, async () => {
  initTop.value = 0
  await nextTick()
  handleScroll()
})

// IntersectionObserver 懒加载更多
const bottomRef = ref<HTMLElement | null>(null)
const observer = ref<IntersectionObserver | null>(null)

onMounted(() => {
  window.addEventListener('scroll', throttledHandleScroll)

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
  initTop.value = 0

  window.removeEventListener('scroll', throttledHandleScroll)

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
// 在商品点击时触发的函数
const { viewItemList, selectItem } = useTrack()

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
// const filterLabelList = Array.from({ length: 28 }, (_, index) => ({
//   label: `Property ${index + 1}`, // 属性名称
//   options: Array.from({ length: 5 }, (_, optionIndex) => ({
//     label: `Option ${optionIndex + 1}`, // 属性值名称
//     value: `prop-${index + 1}-value-${optionIndex + 1}`, // 属性值 ID
//     count: Math.floor(Math.random() * 50) + 1, // 随机商品数量
//   })),
// }));

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
</script>


<template>
  <div class="bg-white">
    <!-- <div>{{ JSON.stringify(`${filterLabelList}----${JSON.stringify(curFilter)}`) }}
    </div> -->
    <div class="max-row py-4">
      <!-- 面包屑 -->
      <UBreadcrumb divider=">" :links="breadcrumbLinks" class=" text-lg sm:text-2xl" :ui="{
        base: 'hover:underline font-normal',
        ol: 'mb-4',
        li: 'text-sm sm:text-sm font-normal text-customblack',
        active: 'text-gray-300 dark:text-primary-400 no-underline hover:no-underline',
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
        <div class="relative z-10 px-4 h-full flex flex-col justify-center sm:items-start"
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
      <div class="mx-auto">
        <!-- 占位元素，防止布局跳动 -->
        <div :class="[isFixed ? 'h-16' : 'h-0',]" aria-hidden="true" />

        <!-- Sticky 元素 -->
        <div ref="stickyElement" :class="[
          isFixed
            ? 'fixed top-[100px] left-0 right-0 z-50 max-lg:top-[80px] shadow-sm'
            : '',
          contentConfigView || isFixed ? '' : '!pt-0',
          'py-4 max-lg:py-2 bg-white',
        ]">
          <!-- Filters -->
          <div :class="[isFixed ? 'max-row' : '', isLoadedFilterTree ? '' : 'hidden']">
            <div class="flex gap-2">
              <UButton @click="openFilterDrawer"
                v-show="!(filterTree.levelTwoCatalog.length == 0 && filterTree.spuCatalogProp.length == 0)"
                class="flex items-center rounded-[4px] border border-[#ccc] hover:border-[#00B2E3]" variant="none">
                <span class="text-[#0C1013] font-hind font-normal font-Inter">Filter</span>
                <img src="/filter_icon.png" alt="Filter Icon" class="w-4 h-4" />
              </UButton>

              <div class="flex items-center">
                <USelect v-model="selectedsort" :options="sortarray" variant="none"
                  class=" rounded-[4px] border border-[#ccc] hover:border-[#00B2E3] dark:text-[#0C1013]"
                  color="white" />
              </div>
            </div>
            <TagList :tagList="deepToRaw(filterLabelList)" @clear="handleTagClear" @more="handleTagMore" />
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
  <UIcon name="adjustments" class="hidden animate-spin" />

  <FilterDrawer :open="deepToRaw(drawerData?.open)" :data="deepToRaw(drawerData?.data)" @close="closeFilterDrawer"
    @ok="handleFilterSure" />
  <!-- 底部懒加载提示区 -->
  <div ref="bottomRef" class="flex justify-center items-center h-16">
    <span v-if="isBottomLoading" class="text-sm text-gray-400">Loading more products...</span>
    <span v-else-if="!hasMore && products.length > 0" class="text-sm text-gray-300">No more products</span>
  </div>
</template>
