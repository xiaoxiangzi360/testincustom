<template>
    <div class="max-row py-4 min-h-screen relative">
        <ComRender :loading="!pageInfo.id">
            <template #fallback>
                <div class="w-full min-h-[300px]">
                    <ComSkeleton class="min-h-[300px] w-full" />
                    <ComSkeleton class="h-[45px] w-full mt-4 mb-4  py-2" />
                    <ComSkeleton class="h-[40px] w-[300px] max-md:w-[120px] mt-4 mb-4  py-2 mx-auto" />
                    <div class="grid grid-cols-4 max-md:grid-cols-2  gap-2">
                        <ProductSkeleton v-for="m in 4" :key="m" />
                    </div>
                </div>
            </template>
            <template #default>
                <ComBreadcrumb :links="links" />
                <TopActivityBanner :data="pageInfo.venueBanner" />
                <div ref="tabsContainer"
                    class="mt-4 mb-4 max-md:mb-4 sticky max-lg:top-[80px] top-[100px] z-[20] py-2 bg-[white]">
                    <ComTabs :tabs="tabs" :active-tab="curTab" @update:active-tab="handleTabChange" />
                </div>
                <div v-for="item in pageInfo.venueColumnList" :id="item._columnId" class="mb-6">
                    <ProductList :title="item.columnName" :productList="item._productList"
                        :more-link="item._moreLink" />
                </div>
            </template>
        </ComRender>

        <ComFAQ :list="faqItems" />
        <!-- <div v-show="!(pageInfo.id > 0)" class=" relative w-full min-h-[300px] flex items-center justify-center">
            <p class="text-center text-gray-400">
                No activity found.
            </p>
        </div> -->
    </div>
</template>

<script setup lang="ts">

const testData = {
    "id": "",
    "venueView": true,
    "venueBanner": {
        "backgroundImageUrl": "https://cdn.incustom.com/upload/online/2025/12/24/venue/banner-bg.webp",
        "overlayColor": "rgba(156,9,15,0.4)",
        "mainTitle": "Refresh Your Space，Reward Your Future Purchase.",
        "mainTitleColor": "#FFFFFF",
        "sloganText": "UP TO 18% OFF",
        "sloganTextColor": "#FFD54F",
        "codeHintText": "Code: NewYear",
        "codeHintTextColor": "#FFFFFF",
        "activityDescription": "Enjoy Massive Discounts & Get Gift Cards for Your Next Project!",
        "activityDescriptionColor": "#FFFFFF"
    },
    "venueColumnList": [
        // {
        //     "columnId": "1",
        //     "columnName": "20251209是分类",
        //     "recommendSpuIdList": [
        // "1991466001048408064",
        // "1991466001618833408",
        // "1991466001090351104",
        // "1998207388355792896",
        // "1991466001711108096",
        // "1991466002679992320",
        // "1991468224906158080",
        //     ],
        //     "viewMoreType": 10,
        //     "viewMoreCatalogId": "1998203723645587456",
        //     "viewMoreCatalogName": "20251209",
        //     "viewMoreTagId": null,
        //     "viewMoreUrl": null
        // },
        // {
        //     "columnId": "2",
        //     "columnName": "New-Arrivals 是标签",
        //     "recommendSpuIdList": [
        //         "1998207388355792896",
        //         "1991466001711108096",
        //         "1991466002679992320",
        //         "1991468224906158080",
        //         "1991466003527241728",
        //         "1991468229960294400",
        //         "1991468226361581568",
        //         "1991468218363043840",
        //         "1991466007251783680",
        //         "1991466006798798848",
        //         "1991468219680055296",
        //         "1991466003103617024",
        //     ],
        //     "viewMoreType": 20,
        //     "viewMoreCatalogId": null,
        //     "viewMoreTagId": "31d26a6487e08357bd771619e894b0c6",
        //     "viewMoreTagName": "New-Arrivals",
        //     "viewMoreUrl": null
        // },
        // {
        //     "columnId": "3",
        //     "columnName": "More Deals是链接",
        //     "recommendSpuIdList": [
        //         "1998207388355792896",
        //         "1991466001711108096",
        //         "1991466002679992320",
        //         "1991468224906158080",
        //         "1991466003527241728",
        //         "1991468229960294400",
        //         "1991468226361581568",
        //         "1991468218363043840",
        //         "1991466007251783680",
        //         "1991466006798798848",
        //         "1991468219680055296",
        //         "1991466003103617024",
        //     ],
        //     "viewMoreType": 30,
        //     "viewMoreCatalogId": null,
        //     "viewMoreTagId": null,
        //     "viewMoreUrl": "https://www.incustom.com/collections/deals"
        // },
        // {
        //     "columnId": "4",
        //     "columnName": "20251209是分类重复的",
        //     "recommendSpuIdList": [
        //         "1991466001048408064",
        //         "1991466001618833408",
        //         "1991466001090351104",
        //         "1998207388355792896",
        //         "1991466001711108096",
        //         "1991466002679992320",
        //         "1991468224906158080",
        //     ],
        //     "viewMoreType": 10,
        //     "viewMoreCatalogId": "1998203723645587456",
        //     "viewMoreCatalogName": "20251209",
        //     "viewMoreTagId": null,
        //     "viewMoreUrl": null
        // },
        // {
        //     "columnId": "5",
        //     "columnName": "New-Arrivals 是标签重复2",
        //     "recommendSpuIdList": [
        //         "1998207388355792896",
        //         "1991466001711108096",
        //         "1991466002679992320",
        //         "1991468224906158080",
        //         "1991466003527241728",
        //         "1991468229960294400",
        //         "1991468226361581568",
        //         "1991468218363043840",
        //         "1991466007251783680",
        //         "1991466006798798848",
        //         "1991468219680055296",
        //         "1991466003103617024",
        //     ],
        //     "viewMoreType": 20,
        //     "viewMoreCatalogId": null,
        //     "viewMoreTagId": "31d26a6487e08357bd771619e894b0c6",
        //     "viewMoreTagName": "New-Arrivals",
        //     "viewMoreUrl": null
        // },
        // {
        //     "columnId": "6",
        //     "columnName": "More Deals是链接重复3",
        //     "recommendSpuIdList": [
        //         "1998207388355792896",
        //         "1991466001711108096",
        //         "1991466002679992320",
        //         "1991468224906158080",
        //         "1991466003527241728",
        //         "1991468229960294400",
        //         "1991468226361581568",
        //         "1991468218363043840",
        //         "1991466007251783680",
        //         "1991466006798798848",
        //         "1991468219680055296",
        //         "1991466003103617024",
        //     ],
        //     "viewMoreType": 30,
        //     "viewMoreCatalogId": null,
        //     "viewMoreTagId": null,
        //     "viewMoreUrl": "https://www.incustom.com/collections/deals"
        // }
    ]
}
const getTabElementId = (id) => {
    return `activity-tab-${id}`
}
const faqItems = [
    {
        label: "What special offers are available for the launch sale?",
        content:
            "During the launch sale, you can enjoy the following exclusive benefits:\n<b>Discounts:</b> All products are on special launch sale pricing, with a store-wide 18% off discount (equivalent to 82% of the regular price).\n<b>Gifts/Bonuses:</b>\nOrders over $200 will receive a $20 voucher for next purchase.\nOrders over $400 will receive a $50 voucher for next purchase.\nVouchers are valid for 2 months from the date of issue.\n<b>Priority Shipping:</b> All launch sale orders will be prioritized in production and shipping."
    },
    {
        label: "How does the customization process work?",
        content:
            "Select a base product → 2. Go to the product details page → 3. Follow the steps to choose color, size, etc. → 4. Reconfirm your custom measurements (we recommend contacting customer service for a secondary measurement check) → 5. Add to cart and checkout."
    },
    {
        label: "Will the product photos match the actual item?",
        content:
            "We strive to ensure that screen displays match the actual product as closely as possible. However, due to differences in monitor settings and material characteristics, slight color variations may occur. The final product color is subject to the actual item received."
    },
    {
        label: "Can I modify or cancel my order after customization?",
        content:
            "Once your order payment is successful, the system will automatically lock and enter the production queue after 24 hours. Therefore, customized orders cannot be modified or canceled once 24 hours have passed since payment. We strongly recommend reviewing your design carefully before confirming your order."
    },
    {
        label: "Do you accept returns or exchanges?",
        content:
            "Because our products are personalized and made-to-order, we generally do not accept returns or exchanges unless there is a quality issue or a significant mismatch in custom measurements. Please double-check your design and measurements before confirming your order."
    },
    {
        label: "When will my order ship?",
        content:
            "We will review your order within 72 hours after it is placed and begin production. The estimated shipping time depends on the product and its custom specifications, but generally takes around 10 business days. Once your order ships, we will send the tracking information to your email address."
    },
];
const links = computed(() => [
    {
        label: 'Home',
        to: '/'
    },
    {
        label: pageInfo.value.activityName || 'Activity Page',
        to: `/activityPage/${activityId}`
    }
]);
const { listProductSpuV2ByIdList } = ProductAuth();
const { getMarketingActivityById } = ActivityAuth();
const route = useRoute()
const routeParam = route.params.id[0]
const splitCollection = routeParam.split('-')
const collectionName = splitCollection.slice(0, -1).join('-').replace(/-/g, ' ')
const activityId = splitCollection.pop()
console.log('routeParam===', collectionName, activityId)
const pageInfo = ref<any>(testData)
const { isMobile } = useMobile()
const offsetTop = computed(() => isMobile.value ? 135 : 155)
const productInfoMaps = ref({})
const curTab = ref('')
const tabs = computed(() => {
    return pageInfo.value.venueColumnList.map(item => ({
        label: item.columnName,
        key: item._columnId
    }))
})
let tabElements = [];

// 滚动监听函数
const handleScroll = () => {
    const scrollPosition = window.scrollY + 160; // 考虑偏移量
    for (const tab of tabElements) {
        if (scrollPosition >= tab.top && scrollPosition < tab.bottom) {
            if (curTab.value !== tab.key) {
                curTab.value = tab.key; // 更新当前激活的 tab
            }
            break;
        }
    }
};
const { throttledFunction: throttledHandleScroll } = useThrottled(handleScroll, 100)
const pageTag = 'activity_page_view页面======';
// 重新计算 tabElements
const calculateTabElements = () => {
    tabElements = tabs.value.map(tab => {
        const element = document.getElementById(tab.key);
        if (element) {
            const rect = element.getBoundingClientRect();
            const top = rect.top + window.scrollY;
            const bottom = top + rect.height;
            return { key: tab.key, top, bottom };
        }
        return null;
    }).filter(Boolean);
    if (tabElements.length > 0 && !curTab.value) {
        // 初次设置当前激活的 tab
        curTab.value = tabElements[0].key;
    }
};

const handleTabChange = (tabKey) => {
    // curTab.value = tabKey
    const element = document.getElementById(tabKey); // 获取对应 id 的元素
    if (element) {
        const top = element.getBoundingClientRect().top + window.scrollY - offsetTop.value;
        window.scrollTo({
            top: top,
            behavior: 'smooth'
        });
    }
}


onMounted(async () => {
    await fetchActivityInfo(activityId)
    const ids = pageInfo.value.venueColumnList.map(item => item.recommendSpuIdList).flat()
    // pageInfo.value = testData
    await fetchList(ids)

    // 等待 DOM 渲染完成
    await nextTick();
    // 初次计算 tabElements
    calculateTabElements();

    // 添加滚动监听
    window.addEventListener('scroll', throttledHandleScroll);
    window.addEventListener('resize', calculateTabElements);

})

onUnmounted(() => {
    window.removeEventListener('scroll', throttledHandleScroll);
    window.removeEventListener('resize', calculateTabElements);

});

const fetchActivityInfo = async (id) => {
    try {
        const res = await getMarketingActivityById({ marketingActivityId: id })
        // console.log('res', res.result)
        pageInfo.value = res.result
    } catch (error) {

    } finally {
        // 
    }
}

const fetchList = async (ids) => {
    try {
        const params = {
            productSpuV2IdList: ids,
            fields: "id,productEnglishName,basePrice,mainPic"
        };
        const res = await listProductSpuV2ByIdList(params)
        const productMap = {}
        res.result.forEach(item => {
            productMap[item.id] = item
        })
        productInfoMaps.value = productMap
        for (let i = 0; i < pageInfo.value.venueColumnList.length; i++) {
            const product = pageInfo.value.venueColumnList[i]
            const _productList = pageInfo.value.venueColumnList[i].recommendSpuIdList.map(id => productMap[id])
            const _columnId = getTabElementId(product.columnId)
            Object.assign(pageInfo.value.venueColumnList[i], {
                _productList: _productList || [],
                _moreLink: getMoreLink(product),
                _columnId: _columnId
            })
        }
    } catch (error) {

    } finally {
        // 
    }

}

const getMoreLink = (item) => {
    if (item.viewMoreType === 10) { // 分类
        return `/${slugify(item.viewMoreCatalogName)}-${item.viewMoreCatalogId}`
    } else if (item.viewMoreType === 20) { // 标签
        return `/collections/${slugify(item.viewMoreTagName)}-${item.viewMoreTagId}`
    } else if (item.viewMoreType === 30) { // 链接
        return item.viewMoreUrl
    }
    return null
}
</script>