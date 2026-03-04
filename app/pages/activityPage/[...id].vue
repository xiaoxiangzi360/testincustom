<template>
    <div class="max-row py-4 min-h-screen max-md:min-h-0 relative">
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
                <NuxtImg fetchpriority="high"
                    :src="isMobile ? pageInfo.venueBanner?.backgroundMobileImageUrl : pageInfo.venueBanner?.backgroundImageUrl"
                    :alt="isMobile ? pageInfo.venueBanner?.pcImageAlt : pageInfo.venueBanner?.mobileImageAlt"
                    class="w-full h-auto rounded-[8px]" />
                <!-- <TopActivityBanner :data="pageInfo.venueBanner" /> -->
                <div class="mt-4 mb-4 max-md:mb-4 sticky z-[20] py-2 bg-[white]" :style="{ top: `${headerHeight}px` }">
                    <ComTabs :tabs="tabs" :active-tab="curTab" @update:active-tab="handleTabChange" />
                </div>
                <div v-for="item in pageInfo.venueColumnList" :id="item._columnId" class="mb-6">
                    <ProductList :title="item.columnName" :productList="item._productList"
                        :more-link="item._moreLink" />
                </div>
            </template>
        </ComRender>
        <NuxtImg :src="logisticsImg" class="w-full" />
        <!-- <div class="grid grid-cols-4 max-md:grid-cols-2 mb-4">
            <div v-for="(item, index) in logisticsList" :key="index">
                <div class="flex gap-2 justify-center items-center">
                        <NuxtImg class="w-[65px] object-cover" :src="item.img" loading="lazy" />
                    <p class="text-[18px] text-customblack font-[500]">{{ item.text }}</p>
                </div>
            </div>
        </div> -->
        <!-- <div class="grid grid-cols-4 max-md:grid-cols-2 mb-4">
            <div v-for="(item, index) in measurementList" :key="index">
                <div  class="relative">
                    <NuxtImg v-if="item.img" class="w-full object-cover" :src="item.img" loading="lazy" />
                    <p class="text-[22px] text-[#4D8552] absolute bottom-[20px] left-0">{{ item.text }}</p>
                </div>
            </div>
        </div> -->
        <NuxtImg :src="measurementImg" class="w-full mb-4" />
        <div :style="{ display: pageInfo.venueFaqView ? 'block' : 'none' }">
            <ComFAQ :list="faqItems" :is-html="true" />
        </div>
        <!-- <div v-show="!(pageInfo.id > 0)" class=" relative w-full min-h-[300px] flex items-center justify-center">
            <p class="text-center text-gray-400">
                No activity found.
            </p>
        </div> -->
    </div>
</template>

<script setup lang="ts">
const getTabElementId = (id) => {
    return `activity-tab-${id}`
}
const cdnBase = getImgCdnSrc('activityPage')
const logisticsList = [
    {
        img: `${cdnBase}/logistics_1_1.webp`,
        text: 'Trusted by Thousands of Homes'
    },
    {
        img: `${cdnBase}/logistics_1_2.webp`,
        text: '30-Day Returns & Refunds'
    },
    {
        img: `${cdnBase}/logistics_1_3.webp`,
        text: 'Free Shipping'
    },
    {
        img: `${cdnBase}/logistics_1_4.webp`,
        text: 'Lifetime Warranty'
    },
]
const measurementList = [
    {
        img: `${cdnBase}/measurement_1.webp`,
        text: 'Design from Home'
    },
    {
        img: `${cdnBase}/measurement_2.webp`,
        text: 'Custmize on inCustom'
    },
    {
        img: `${cdnBase}/measurement_3.webp`,
        text: 'Delivered to You'
    },
    {
        img: `${cdnBase}/measurement_4.webp`,
        text: 'Easy DIY Install'
    },
]

const faqItems = computed(() => {
    return pageInfo.value.venueFaqList?.map(item => ({ label: item.question, content: item.answer })) || []
})
// const faqItems = [
//     {
//         label: "What are your Spring Sale offers?",
//         content:
//             `Celebrate the season of renewal with our exclusive Spring Sale discounts, available from February 15th to March 15th. Enjoy instant savings on your order—no future vouchers needed.

//             🌱 Instant Discount Tiers (Store-wide):
//             Spend $200, Get $30 OFF
//             Spend $300, Get $60 OFF
//             Spend $500, Get $100 OFF

//             ✨ How to Redeem:
//             Simply enter the code SPRING at checkout to apply your discount automatically.

//             ⚡ Priority Processing:
//             All Spring Sale orders will be prioritized in production and shipping, helping you refresh your home in time for the season.`
//     },
//     {
//         label: "What if I measure my windows incorrectly?",
//         content:
//             `At inCutsom, we want your custom blinds to fit perfectly—the first time and every time. That’s why we’ve built a Measurement Assurance Program just for you.

//             1. We double‑check your measurements
//             Once you place your order, our team reviews the window sizes you submitted before production begins. If we notice anything unusual or potentially incorrect, we’ll proactively reach out to confirm with you.

//             2. Free one‑time remake, even after delivery
//             If, despite our review, your blinds still don’t fit due to measurement errors, we will remake them once – completely free of charge. Simply contact our support team with your order details and corrected measurements, and we’ll start the remake process right away.

//             No extra costs, no hassle. Just the perfect fit you deserve.

//             This policy applies to one free remake per order for size‑related issues. Terms and conditions apply.`
//     },
//     {
//         label: "How does the customization process work?",
//         content:
//             `Select a base product → 2. Go to the product details page → 3. Follow the steps to choose color, size, etc. → 4. Reconfirm your custom measurements (we recommend contacting customer service for a secondary measurement check) → 5. Add to cart and checkout.`
//     },
//     {
//         label: "Will the product photos match the actual item?",
//         content:
//             `We strive to ensure that screen displays match the actual product as closely as possible. However, due to differences in monitor settings and material characteristics, slight color variations may occur. The final product color is subject to the actual item received.`
//     },
//     {
//         label: "Can I modify or cancel my order after customization?",
//         content:
//             `Once your order payment is successful, the system will automatically lock and enter the production queue after 24 hours. Therefore, customized orders cannot be modified or canceled once 24 hours have passed since payment. We strongly recommend reviewing your design carefully before confirming your order.`
//     },
//     {
//         label: "Do you accept returns or exchanges?",
//         content:
//             `Because our products are personalized and made-to-order, we generally do not accept returns or exchanges unless there is a quality issue or a significant mismatch in custom measurements. Please double-check your design and measurements before confirming your order.`
//     },
//     {
//         label: "When will my order ship?",
//         content:
//             `We will review your order within 72 hours after it is placed and begin production. The estimated shipping time depends on the product and its custom specifications, but generally takes around 10 business days. Once your order ships, we will send the tracking information to your email address.`
//     },
// ];
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
const PageTag = 'activity_page_view会场页面======';
const route = useRoute()
const routeParam = route.params.id[0]
const splitCollection = routeParam.split('-')
const collectionName = splitCollection.slice(0, -1).join('-').replace(/-/g, ' ')
const activityId = splitCollection.pop()
const pageInfo = ref<any>({})
const { isMobile } = useMobile()
const offsetTop = computed(() => isMobile.value ? 135 : 155)
const productInfoMaps = ref({})
const curTab = ref('')
const { headerHeight } = useHeaderHeight()
const tabs = computed(() => {
    return pageInfo.value.venueColumnList.map(item => ({
        label: item.columnName,
        key: item._columnId
    }))
})
let tabElements = [];

const logisticsImg = computed(() => {
    if (isMobile.value) {
        return getImgCdnSrc(`activityPage/logistics_mobile1.webp`)
    }
    return getImgCdnSrc(`activityPage/logistics_pc1.webp`)
})
const measurementImg = computed(() => {
    if (isMobile.value) {
        return getImgCdnSrc(`activityPage/measurement_mobile.webp`)
    }
    return getImgCdnSrc(`activityPage/measurement_pc.webp`)
})
// 服务端拿数据
const { data: serverInfo, pending: pending, error: error } = await useAsyncData(
    () => `getMarketingActivityById-${activityId}`, () => {
        return getMarketingActivityById({ marketingActivityId: activityId })
    }
);
console.log(PageTag, 'serverInfo===', serverInfo.value)
const initData = (dataInfo) => {
    if (dataInfo.id) {
        pageInfo.value = dataInfo
    } else {
        throwPageError('No activity found.')
    }
}
initData(serverInfo.value?.result || {})

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

const fetchList = async (ids) => {
    try {
        const params = {
            productSpuV2IdList: ids,
            fields: "id,productEnglishName,basePrice,mainPic,seoUrlKeyword"
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
    if (item.viewMoreType === 30) { // 链接
        return item.viewMoreUrl
    }
    return null
}
</script>