<template>
    <div>
        <div>
            <div v-show="listData.list.length > 0">
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-2">
                    <NuxtLink
                        :to="`/posts/${slugify(`${(product.seoUrlKeyword || product.enTitle)}-${topicName}`)}-${product.id}`"
                        v-for="(product, index) in listData.list" :key="index" class="group cursor-pointer">
                        <div class=" overflow-hidden rounded-[4px]">
                            <NuxtImg :src="getImageSrc(product.coverImageUrl)"
                                :alt="product.coverImageAltText || product.enTitle"
                                class="w-full h-full aspect-square object-cover object-center group-hover:scale-105 transition-transform duration-300"
                                style="aspect-ratio: 1.76 / 1;" />
                        </div>
                        <div class="text-[14px]">
                            <p class="mt-2 max-md:mt-1 text-[#909090]">{{ formatShanghaiToLocalDate(product.createDate)
                            }}</p>
                            <h3 class="text-sm sm:text-sm text-[#0C1013] my-2 cursor-pointer font-normal line-clamp-[2] max-md:my-1  group-hover:text-primary"
                                :title="product.enTitle">
                                {{ product.enTitle }}
                            </h3>
                            <div class="text-[#909090] line-clamp-[3]" :title="product.summary || product.contentText">
                                {{ product.summary || product.contentText }}
                            </div>
                        </div>
                    </NuxtLink>
                </div>
            </div>

            <div class="text-center my-12 flex flex-col items-center justify-center"
                v-show="!isPending && listData.list.length == 0">
                <img src="/empty.png" alt="Empty" class="w-24 h-24 sm:w-32 sm:h-32" />
                <p class="text-gray-400 text-sm mt-4">
                    Not Found Blogs
                </p>
            </div>
        </div>
        <div class="flex justify-center mt-3 md:mt-6" v-show="listData.total > 0">
            <UPagination v-model="currentPage" :page-count="pageSize" :total="listData.total" :ui="{
                base: 'ring-0 dark:ring-0 shadow-none dark:!bg-white dark:!text-[#0c1013]',
                default: {
                    activeButton: {
                        color: 'dark:white',
                        class: 'dark:!bg-white dark:!text-primary  bg-white text-primary border border-primary rounded-[4px]',
                    },
                    inactiveButton: {
                        color: 'dark:white',
                        class: 'dark:!bg-white dark:!text-[#0c1013] dark:hover:text-primary !text-[#0c1013] hover:text-primary',
                    },
                    prevButton: {
                        color: 'white',
                        variant: 'none',
                    },
                    nextButton: {
                        color: 'white',
                        variant: 'none',
                    },
                },
            }" />
        </div>
    </div>

</template>

<script setup lang="ts">
import { slugify } from '~/utils/tools';
const { blogPostRollPage } = BlogAuth();
const props = defineProps({
    id: {
        type: String,
        required: false
    },
    topicName: {
        type: String,
        required: false
    },
    curTag: {
        type: [String, Number],
        required: false
    }
});
const PageTag = 'BlogList页面======';

const currentPage = ref(1);
const pageSize = ref(16);
const isPending = ref(false);
const listData = ref<any>({
    list: [],
    total: 0,
});

const getImageSrc = (url: string) => {
    // 检查是否是 GIF 格式
    if (url.endsWith('.gif')) {
        return `${url}?x-oss-process=image/resize,w_320,m_lfit`; // 如果是 GIF，直接返回原始 URL
    }
    // 如果不是 GIF，添加处理参数
    return `${url}?x-oss-process=image/auto-orient,1/resize,w_320,m_lfit/format,webp`;
};

const fetchList = async (id, curTag) => {
    try {
        const params = {
            blogTopicId: id,
            needCount: true,
            pageSize: pageSize.value,
            pageNum: currentPage.value,
            blogTagIdList: curTag && curTag != '0' ? [curTag] : [],
            sortKey: "createDate",
            sortOrder: "desc",
            status: 20
        };
        isPending.value = true;
        const res = await blogPostRollPage(params)
        listData.value = res.result || { list: [], total: 0 };
        // console.log(PageTag, 'blogPostRollPage===res===', res)
    } catch (error) {

    } finally {
        isPending.value = false;
    }

}

watch([() => currentPage.value, () => props.id, () => props.curTag], () => {
    console.log(PageTag, 'watch currentPage or props.id change:', currentPage.value, props.id, props.curTag);
    if (!props.id) return;
    fetchList(props.id, props.curTag);
}, { immediate: true });

</script>