<template>
    <div>
        <div>
            <div v-show="listData.list.length > 0">
                <div>
                    <NuxtLink v-for="(product, index) in showListData" :key="product?.id"
                        :to="`/products/${slugify(product?.seoUrlKeyword || product?.productEnglishName)}-${product?.id}`"
                        class="bg-white cursor-pointer flex mb-4 gap-3">
                        <div class="overflow-hidden rounded-[4px] w-[100px] h-[100px] flex-shrink-0">
                            <NuxtImg
                                :src="`${product?.mainPic?.url}?x-oss-process=image/auto-orient,1/resize,w_300,m_lfit`"
                                :alt="product?.mainPic?.altText || product?.productEnglishName || 'Product image'"
                                class="w-full h-full loadObserveImg aspect-square object-cover object-center transition-transform duration-300 hover:scale-105" />
                        </div>
                        <div class="flex flex-col justify-between">
                            <h3 class="text-sm sm:text-sm text-customblack font-normal line-clamp-3"
                                :title="product?.productEnglishName">
                                {{ product?.productEnglishName }}
                            </h3>
                            <div class="flex gap-2 items-center">
                                <p class="text-primary text-[14px]">
                                    ${{ product?.basePrice?.toFixed(2) }}
                                </p>
                                <p class="text-[#222] text-[16px] line-through"
                                    v-if="product?.originPrice > product?.basePrice">
                                    ${{ product?.originPrice?.toFixed(2) }}
                                </p>
                            </div>
                        </div>
                    </NuxtLink>
                </div>
            </div>

            <!-- Empty -->
            <div class="text-center my-12 flex flex-col items-center justify-center" v-show="listData.list.length == 0">
                <NuxtImg src="/empty.png" alt="Empty" class="w-24 h-24 sm:w-32 sm:h-32" />
                <p class="text-gray-400 text-sm mt-4">
                    Not Found Products
                </p>
            </div>
        </div>
        <div class="flex justify-center pr-8 gap-6" v-show="listData.total > pageSize">
            <div disabled
                class="w-[44px] h-[44px] bg-white rounded-full flex items-center justify-center shadow text-primary :hover:scale-105 transition-transform duration-300"
                :class="[currentPage == 1 ? 'opacity-50' : '', currentPage == 1 ? 'cursor-not-allowed' : ' cursor-pointer']"
                @click="handlePrev">
                <ComSvg href="#icon-left" class="text-primary w-[18px] h-[18px]" />
                <!-- <BaseIcon name="i-raphael:arrowleft2" class="text-primary w-4 h-4" /> -->
            </div>
            <div class="w-[44px] h-[44px] bg-white rounded-full flex items-center justify-center shadow text-primary :hover:scale-105 transition-transform duration-300"
                :class="[!canNextPage ? 'opacity-50' : '', !canNextPage ? 'cursor-not-allowed' : ' cursor-pointer']"
                @click="handleNext">
                <ComSvg href="#icon-right" class="text-primary w-[18px] h-[18px]" />
            </div>
        </div>
    </div>

</template>

<script setup lang="ts">

import { slugify } from '~/utils/tools';

const PageTag = 'RelatedProductList组件======';
const { getUserProductRollPage, randomRecommendationProductByCatalogId } = ProductAuth();

const props = defineProps({
    id: {
        type: String,
        required: true
    },
    topicId: {
        type: String,
        required: true
    },
});

const listData = ref<any>({
    list: [],
    total: 0,
});
const showListData = computed(() => {
    if (isLocalRelation.value) {
        const startIndex = (currentPage.value - 1) * pageSize;
        const endIndex = currentPage.value * pageSize;
        return listData.value.list.slice(startIndex, endIndex);
    } else {
        return listData.value.list;
    }
})

const currentPage = ref(1);
const pageSize = 4;
const isLocalRelation = ref(false);
const canNextPage = computed(() => {
    if (listData.value.total <= 0) {
        return false;
    }
    return currentPage.value * pageSize < listData.value.total;
})
onMounted(() => {
    fetchList()
})
const fetchList = async () => {
    try {
        if (!props.id) {
            return;
        }
        const params = {
            pageNum: currentPage.value,
            pageSize: pageSize,
            blogPostIdList: [props.id],
            needCount: true,
            blogTopicId: props.topicId
        };
        const res = await getUserProductRollPage(params)
        if (res.result?.total > 0) {
            isLocalRelation.value = false;
            listData.value = res.result;
        } else {
            if (isLocalRelation.value) {
                return;
            }
            const res2 = await randomRecommendationProductByCatalogId({
                size: 12,
            })
            isLocalRelation.value = true;
            listData.value = { list: res2.result, total: 12 };
        }
        console.log(PageTag, 'res=getUserProductRollPage==', listData.value)
    } catch (error) {

    } finally {
        // 
    }

}

const handlePrev = async () => {
    if (currentPage.value > 1) {
        currentPage.value -= 1;
        await fetchList();
    }
}
const handleNext = async () => {
    if (!canNextPage.value) {
        return;
    }
    const totalPages = Math.ceil(listData.value.total / 4);
    if (currentPage.value < totalPages) {
        currentPage.value += 1;
        await fetchList();
    }
}
</script>