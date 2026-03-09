<template>
    <div class="max-row py-4 min-h-screen max-md:min-h-0 relative">
        <div v-if="!pageInfo.id" class="w-full min-h-[300px]">
            <ComSkeleton class="min-h-[300px] w-full" />
            <ComSkeleton class="h-[45px] w-full mt-4 mb-4  py-2" />
            <ComSkeleton class="h-[40px] w-[300px] max-md:w-[120px] mt-4 mb-4  py-2 mx-auto" />
            <div class="grid grid-cols-4 max-md:grid-cols-2  gap-2">
                <ProductSkeleton v-for="m in 4" :key="m" />
            </div>
        </div>
        <div v-else>
            <CustomBreadcrumb :links="links" />
            <TopConfigBanner :data="pageInfo" />
            <div class="py-4 max-md: max-md:py-2 sticky bg-[white] z-[20] text-customblack"
                :style="{ top: `${headerHeight}px` }">
                <USelectMenu class="w-[200px]" v-model="curTag" :options="filterArr" placeholder="All Posts"
                    value-attribute="id" option-attribute="name" variant="none" :ui="{
                        base: 'ring-1 ring-[#d5d5d5] dark:text-[#0C1013]',
                        variant: { outline: 'ring-1 ring-[red]' },
                    }" :ui-menu="{
                        ring: 'ring-[#d5d5d5]',
                        option: {
                            active: 'bg-primary-50',
                        }
                    }" />
            </div>
            <div class="mb-6">
                <BlogList :id="pageInfo.id" :topicName="pageInfo.name" :curTag="curTag" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import TopConfigBanner from '~/components/TopConfigBanner.vue';
const PageTag = 'topic_page_view页面======';
const { getBlogTopicById, listPublishBlogPostTagByBlogTopicId } = BlogAuth();
const route = useRoute()
const routeParam = route.params.id[0]
const splitCollection = routeParam.split('-')
const collectionName = splitCollection.slice(0, -1).join('-').replace(/-/g, ' ')
const topicId = splitCollection.pop()
const { headerHeight } = useHeaderHeight()
console.log('routeParam===', collectionName, topicId)
const currentSeoUrl = computed(() => {
    return convertToAbsolutePath(`/topic/${slugify(pageInfo.value.seoUrlKeyword || pageInfo.value.name)}-${pageInfo.value.id}`)
})
const links = computed(() => {
    if (pageInfo.value.id) {
        return [
            {
                label: 'Home',
                to: convertToAbsolutePath('/')
            },
            {
                disabled: true,
                label: pageInfo.value.name || 'Activity Page',
                to: convertToAbsolutePath(`/topic/${slugify(pageInfo.value.seoUrlKeyword || pageInfo.value.name)}-${pageInfo.value.id}`)
            }
        ]
    }
});

const pageInfo = ref<any>({})
const curTag = ref<any>('0');
const filterArr = ref([{ name: 'All Posts', id: '0' }]);
// 服务端拿数据
const { data: serverInfo, pending: pending, error: error } = await useAsyncData(
    () => `getBlogTopicById-${topicId}`, () => {
        return getBlogTopicById({ id: topicId })
    }
);
const initData = (dataInfo) => {
    if (dataInfo.id) {
        pageInfo.value = dataInfo
        console.log(PageTag, 'pageInfo.value===', pageInfo.value)
        const breadcrumbParams = {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": links.value.map((link, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "name": link.label,
                "item": link.to
            }))

        };
        // console.log(PageTag, '-----------ld+json------', breadcrumbParams)
        useHead({
            title: dataInfo.seoPageTitle || dataInfo.name || 'Blog Topic',
            meta: [
                { name: 'description', content: dataInfo.seoMetaDescription || dataInfo.desc || '' },
                { name: 'keywords', content: dataInfo.seoUrlKeyword || '' },
            ],
            link: [
                {
                    rel: 'canonical',
                    href: currentSeoUrl.value,
                },
            ],
            script: [
                { type: 'application/ld+json', innerHTML: JSON.stringify(breadcrumbParams) }
            ]
        });
    } else {
        throwPageError('No activity found.')
    }
}
initData(serverInfo.value?.result || {})

onMounted(() => {
    fetchBlogTags();
})

const fetchBlogTags = async () => {
    try {
        const res = await listPublishBlogPostTagByBlogTopicId({
            blogTopicId: topicId
        });
        if (res && res.result) {
            // console.log(PageTag, 'Blog tags fetched successfully:', res.result);
            filterArr.value = filterArr.value.concat(res.result.map(tag => ({ name: tag.name, id: tag.id })));
        }
    } catch (error) {
        console.error('Failed to fetch blog tags:', error);
    }
};

onUnmounted(() => {
    if (!process.client) return
    clearAllJsonLdScripts()
})
</script>