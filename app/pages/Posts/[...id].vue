<template>
    <div class="">
        <div class="max-row text-[#0C1013] dark:text-customblack px-[60px] py-4 relative flex justify-between max-md:flex-col  min-h-[80vh] gap-6 max-md:gap-0">
            <div class="w-[76%] max-md:w-full">
                <div>
                    <CustomBreadcrumb :links="links" wrapper-class="mb-4"/>
                    <h1 class="text-[24px] text-[#3D3D3D] mb-6">{{ pageInfo.enTitle }}</h1>
                    <div class="flex gap-8 items-center mb-4">
                        <div style="grid-area: logo" class="">
                            <ULink data-pg-name="Logo" class="" to="/">
                                <NuxtImg src="/incustom_white.webp" loading="lazy" alt="InCustom"
                                    class="h-8 w-[150px]" />
                            </ULink>
                        </div>
                        <p class="text-[rgba(34,34,34,0.5033)] ">{{ formatShanghaiToLocalDate(pageInfo.createDate) }}
                        </p>
                    </div>
                </div>
                <!-- <div>
                <ShadowHtml :html="pageInfo.content" class="prose max-w-none whitespace-pre-line" />
            </div> -->
                <div v-if="isPageLoaded" class="prose max-w-none whitespace-pre-line" v-shadow-html="pageInfo.content">
                </div>
                <div class="py-4 text-primary underline underline-offset-4 flex flex-col gap-2">
                    <span class="max-w-fit cursor-pointer" @click="allBlogs">View All Posts</span>
                    <span class="max-w-fit cursor-pointer" @click="prevBlog">View Previous ></span>
                    <span class="max-w-fit cursor-pointer" @click="nextBlog">View Next ></span>
                </div>
            </div>
            <div class="w-[24%] max-md:w-full sticky max-md:relative max-md:top-0 top-[240px] right-0 self-start ">
                <h2 class="font-[600] text-[18px]  mb-4">Related Products</h2>
                <RelatedProductList :id="pageInfo.id" :topic-id="pageInfo.blogTopicId" />
                <div class="mt-4">
                    <div class="font-[700] text-[18px] mb-2">Get More Ideas & Inspiration</div>
                    <div class="text-[#5A5B5B] shadow-sm mb-4">Follow us on Social media to explore more real-life
                        examples,
                        customer
                        projects, and creative ideas for different spaces.</div>

                    <div class="flex gap-2">
                        <a v-for="(item, index) in platformLinks" :href="item.url" target="_blank"
                            rel="noopener noreferrer">
                            <NuxtImg :src="`/blog/link${index + 1}.webp`" class="w-6 h-6 hover:scale-105" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { message } from 'ant-design-vue';
import RelatedProductList from '~/components/Posts/RelatedProductList.vue';

const { getUserProductRollPage, randomRecommendationProductByCatalogId } = ProductAuth();
const { getBlogPostById, getLastBlogPostById, getNextBlogPostById } = BlogAuth();

const PageTag = 'Posts_page_view页面======';
const route = useRoute()
const routeParam = route.params.id[0]
const splitCollection = routeParam.split('-')
const blogName = splitCollection.slice(0, -1).join('-').replace(/-/g, ' ')
const blogId = splitCollection.pop()
console.log(PageTag, 'routeParam===', blogName, blogId)
const { isPageLoaded } = usePageInteraction();
const links = computed(() => {
    return [
        {
            label: 'Home',
            to: convertToAbsolutePath('/')
        },
        {
            label: pageInfo.value.blogTopic?.name,
            to: convertToAbsolutePath(`/topic/${pageInfo.value.blogTopicId}`)
        },
        {
            label: pageInfo.value?.enTitle,
            hidden: true,
            to: convertToAbsolutePath(`/Posts/${slugify(pageInfo.value.seoUrlKeyword || pageInfo.value.enTitle)}-${pageInfo.value.id}`)
        },
    ]
});
const pageInfo = ref<any>({})

const platformLinks = [
    {
        url: 'https://www.instagram.com/incustom_home/',
    },
    {
        url: 'https://www.facebook.com/profile.php?id=61585363529171',
        img: '/icons/instagram.svg'
    },
    {
        url: 'https://www.linkedin.com/company/incustom/',
        img: '/icons/pinterest.svg'
    },
    {
        url: 'https://www.tiktok.com/@incustomofficial',
        img: '/icons/linkedin.svg'
    },
    {
        url: 'https://www.pinterest.com/incustomstore/',
        img: '/icons/instagram.svg'
    },
    {
        url: 'https://www.youtube.com/@Incustom-official',
        img: '/icons/pinterest.svg'
    },
]
// 服务端拿数据
const { data: serverInfo, pending: pending, error: error } = await useAsyncData(
    () => `getBlogPostById-${blogId}`, () => {
        return getBlogPostById({ id: blogId })
    }
);

const createJsonLd = (dataInfo) => {
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

    const params = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: dataInfo.enTitle || '',
        description: dataInfo.contentText || '',
        articleBody: dataInfo.content || '',
        // 作者信息
        "author": {
            "@type": "Person",
            "name": "inCustom", // 替换为实际作者
            "url": "https://www.incustom.com/" // 作者页面链接
        },
        dateModified: formatTimestamp(dataInfo.createDate) || '',
        image: dataInfo.coverImageUrl || '',
    };
    console.log(PageTag, 'jsonLd params===', breadcrumbParams, params);
    useHead({
        title: dataInfo.seoPageTitle || dataInfo.enTitle || 'Blog Post',
        meta: [
            { name: 'description', content: dataInfo.seoMetaDescription || dataInfo.summary || '' },
            { name: 'keywords', content: dataInfo.seoUrlKeyword || '' },
        ],
        script: [
            { type: 'application/ld+json', innerHTML: JSON.stringify(breadcrumbParams) },
            { type: 'application/ld+json', innerHTML: JSON.stringify(params) }
        ]
    });
}
const initData = (dataInfo) => {
    if (dataInfo.id) {
        pageInfo.value = dataInfo
        console.log(PageTag, 'pageInfo.value===', pageInfo.value)
        createJsonLd(dataInfo)
    } else {
        throwPageError('No BlogPost found.')
    }
}
initData(serverInfo.value?.result || {})


const prevBlog = async () => {
    const res = await getLastBlogPostById({ blogTopicId: pageInfo.value.blogTopicId, id: blogId })
    if (res.result?.id) {
        navigateTo(`/Posts/${slugify(res.result.seoUrlKeyword || res.result.enTitle)}-${res.result.id}`)
    } else {
        message.info('Sorry, there are no more articles available.')
    }
}

const nextBlog = async () => {
    const res = await getNextBlogPostById({ blogTopicId: pageInfo.value.blogTopicId, id: blogId })
    if (res.result?.id) {
        navigateTo(`/Posts/${slugify(res.result.seoUrlKeyword || res.result.enTitle)}-${res.result.id}`)
    } else {
        message.info('Sorry, there are no more articles available.')
    }
}

const allBlogs = () => {
    navigateTo(`/topic/${pageInfo.value.blogTopicId}`)
}

onUnmounted(() => {
    if (!process.client) return
    clearAllJsonLdScripts()
})
</script>