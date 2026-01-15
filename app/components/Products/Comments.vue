<template>
    <div id="CommentsId">
        <div class="flex flex-col lg:flex-row gap-8">
            <!-- 左侧：评分汇总（与示例图一致，固定宽度） -->
            <aside class="w-full lg:w-[320px] xl:w-[360px] shrink-0">
                <div class="bg-white rounded-lg">
                    <!-- 顶部标题与副标题（严格按图） -->
                    <div class="text-black font-bold text-lg">
                        <div class="mb-2">Reviews</div>
                        <div class="font-normal mb-2">Customer reviews</div>
                    </div>

                    <!-- 星星 + 平均分 + 分隔符 + Ratings（严格按文案） -->
                    <div class="flex items-center gap-3 mb-4">
                        <div class="flex items-center gap-1 text-[#FFD359] text-xl mr-4">
                            <span v-for="star in 5" :key="star">
                                <UIcon v-if="getStarStatus(star) === 'full'" name="i-mdi:star"
                                    class="text-[#FFD359] w-[24px] h-[24px] block" />
                                <UIcon v-else-if="getStarStatus(star) === 'half'" name="i-mdi:star-half-full"
                                    class="text-[#FFD359] w-[24px] h-[24px] block" />
                                <UIcon v-else name="i-mdi:star-outline" class="text-gray-300 w-[24px] h-[24px]" />
                            </span>
                        </div>
                        <span class="text-primary">{{ averageRating.toFixed(1) }}</span>
                        <span class="h-4 w-px bg-primary inline-block text-primary"></span>
                        <button type="button" class="text-primary">
                            {{ totalReviews.toLocaleString() }} Ratings
                        </button>
                    </div>

                    <!-- 星级分布条 -->
                    <div class="space-y-3">
                        <div v-for="stars in 5" :key="stars" class="flex items-center gap-2">
                            <span class="w-12 text-sm text-gray-700">{{ 6 - stars }} star</span>
                            <div class="flex-1 bg-[rgba(0,178,227,0.1)] h-3 rounded overflow-hidden">
                                <div :style="{ width: `${starPercentages[6 - stars]}%` }"
                                    class="h-full bg-[#FFD359] transition-all duration-300"></div>
                            </div>
                            <span class="w-10 text-sm text-right text-gray-700">{{ starPercentages[6 - stars] }}%</span>
                        </div>
                    </div>
                </div>
            </aside>

            <!-- 右侧：评论列表 -->
            <section class="w-full lg:flex-1">
                <div v-if="reviews.length === 0" class="text-center text-gray-500 py-4">No reviews yet.</div>

                <div v-for="review in reviews" :key="review.date" class="bg-white p-4 border-b border-[#D1D1D1]">
                    <div class="flex items-center">
                        <div class="w-11 h-11 rounded-full flex items-center justify-center mr-3">
                            <NuxtImg format="webp" src="/reviewer.png" class="w-full h-full object-cover"
                                loading="lazy" />
                        </div>
                        <div>
                            <div class="text-sm font-semibold text-black">{{ review.name }}</div>
                            <div class="text-sm text-gray-300">{{ review.date }}</div>
                        </div>
                        <div class="ml-auto flex">
                            <span v-for="star in 5" :key="star" class="text-xl text-[#FFD359]">
                                <UIcon v-if="star <= review.rating" name="i-mdi:star"
                                    class="text-[#FFD359] inline-block w-[24px] h-[24px]" />
                                <UIcon v-else name="i-mdi:star-outline"
                                    class="text-gray-300 inline-block w-[24px] h-[24px]" />
                            </span>
                        </div>
                    </div>

                    <p class="text-sm text-gray-400 my-2 mb-4">{{ review.text }}</p>
                    <div class="flex gap-2 flex-wrap"
                        v-if="review.pictureUrlList?.length || review.videoUrlList?.length">
                        <div class="flex gap-2 flex-wrap cursor-pointer">
                            <div v-for="(image, index) in review.pictureUrlList?.slice(0, 5)" :key="'image-' + index"
                                class="flex justify-center items-center relative group rounded overflow-hidden"
                                @click="selectReview(review, index, 'image')">
                                <NuxtImg format="webp" loading="lazy" :key="'image-' + index"
                                    :src="`${image}?x-oss-process=image/auto-orient,1/resize,w_100,limit_0/format,webp`"
                                    :alt="'Review image ' + (index + 1)" class="w-16 h-16 object-cover"
                                    @error="onImageError(index, review)" />
                                <div
                                    class="absolute text-gray-500 w-full h-full opacity-0 group-hover:opacity-100 flex items-center justify-center bg-black bg-opacity-25 top-0 left-0">
                                    <UIcon name="i-material-symbols:eye-tracking-outline-rounded" style="color: white;"
                                        class="w-[8px] h-[8px] inline-block" />
                                </div>
                            </div>
                        </div>

                        <div v-for="(video, index) in review.videoUrlList?.slice(0, 5)" :key="'video-' + index"
                            class="w-16 h-16 rounded overflow-hidden shadow-md cursor-pointer relative video-thumbnail"
                            @click="openImageModal(video, 'video', review, index)">
                            <!-- <video class="w-full h-full object-cover" :src="video" muted
                                @error="onVideoError(index, review)" preload="metadata" playsinline /> -->
                            <NuxtImg class="w-full h-full object-cover"
                                :src="`${video}?x-oss-process=video/snapshot,t_0,f_jpg,w_80,m_fast`" loading="lazy" />
                            <div class="absolute inset-0 flex items-center justify-center bg-primary bg-opacity-10">
                                <BaseIcon name="i-mdi:play-circle" width="32" height="32" class="text-white w-8 h-8" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex justify-end mt-3 md:mt-6" v-show="totalPages > 1 || true">
                    <UPagination v-model="currentPage" :page-count="pageSize" :total="totalReviews" :ui="{
                        base: 'ring-0 dark:ring-0 shadow-none dark:bg-white dark:text-gray-400 dark:hover:text-primary dark:hover:bg-white hover:bg-white',
                        default: {
                            activeButton: {
                                color: 'dark:primary',
                                class: 'dark:!bg-primary dark:!text-white',
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
            </section>
        </div>
        <ImgListModal :isShow="imgListModal?.isShow" :imgList="imgListModal?.imgList"
            :defaultIndex="imgListModal?.defaultIndex" @close="handleImgListModalClose" />
    </div>
</template>

<script setup>
const { getspuCommentProductRollPage, getgroupComment } = CommentAuth()
const showPreview = ref(false);

const props = defineProps({
    productId: {
        type: String,
        required: true,
    },
})
const averageRating = ref(0);
const totalReviews = ref(0);
const starPercentages = ref({ 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 });
const reviews = ref([]);
const currentPage = ref(1);
const pageSize = ref(5);
const totalPages = ref(1);
const selectedReview = ref(null);
const selectedMediaIndex = ref(0);
const mediaList = ref([]);
const selectedImage = ref('')
const isImageModalOpen = ref(false)
const selectedMediaType = ref('video')
const HEADER_HEIGHT = 100
const TAB_HEIGHT = 40
const sortOption = ref('latest')
const imgListModal = ref(null)
onMounted(() => {
    fetchGroupComments();
    fetchComments();
});

const scrollToSection = (key) => {
    if (!process.client) return // ✅ SSR 保护
    const el = document.getElementById(`section-${key}`)
    if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - HEADER_HEIGHT - TAB_HEIGHT - 10
        window.scrollTo({ top, behavior: 'smooth' })
    }
}


const fetchGroupComments = async () => {
    const groupRes = await getgroupComment({ productId: props.productId })
    const result = groupRes.result
    averageRating.value = result.averageRank || 0
    totalReviews.value = result.total || 0
    starPercentages.value = {
        5: result.groupList.find((g) => g.group === 5)?.percentage || 0,
        4: result.groupList.find((g) => g.group === 4)?.percentage || 0,
        3: result.groupList.find((g) => g.group === 3)?.percentage || 0,
        2: result.groupList.find((g) => g.group === 2)?.percentage || 0,
        1: result.groupList.find((g) => g.group === 1)?.percentage || 0,
    }
    totalPages.value = Math.ceil(totalReviews.value / pageSize.value)
}


const fetchComments = async () => {
    try {
        const rollRes = await getspuCommentProductRollPage({
            pageNum: currentPage.value,
            pageSize: pageSize.value,
            productId: props.productId,
            needCount: true,
        })
        reviews.value = rollRes.result.list.map((review) => ({
            name: review.fullName || 'Anonymous',
            date: formatShanghaiToLocalDate(review.commentDate),
            text: review.content || 'No content',
            pictureUrlList: review.pictureUrlList || [],
            videoUrlList: review.videoUrlList || [],
            rating: review.rank || 1,
            previewVisible: false,
            previewIndex: 0,
        }))
        totalPages.value = Math.ceil(
            (rollRes.result.total > 0 ? rollRes.result.total : reviews.value.length) / pageSize.value
        )
        // if ((!productinfo.value.remarks || productinfo.value.remarks.trim() === '') &&
        //     productinfo.value.printPropertyList?.length === 0 &&
        //     reviews.value.length > 0) {
        //     tabindex.value = 3
        // } else if (reviews.value.length === 0 && tabindex.value === 3) {
        //     tabindex.value = 1
        // }
        sortReviews()
    } catch (error) {
        message.error('Failed to load comments')
        console.error(error)
    } finally { message.destroy() }
}

const sortReviews = () => {
    reviews.value.sort((a, b) => {
        if (sortOption.value === 'rating') return b.rating - a.rating
        return new Date(b.date) - new Date(a.date)
    })
}

watch(currentPage, () => {
    scrollToSection('reviews')
    fetchComments()
})

const getStarStatus = (starIndex) => {
    if (!averageRating.value && averageRating.value !== 0) return 'empty'
    const fullStars = Math.floor(averageRating.value)
    const decimalPart = averageRating.value - fullStars
    if (starIndex <= fullStars) return 'full'
    if (starIndex === fullStars + 1 && decimalPart >= 0.25 && decimalPart <= 0.75) return 'half'
    if (starIndex === fullStars + 1 && decimalPart > 0.75) return 'full'
    return 'empty'
}

const onImageError = (index, review) => {
    console.warn(`Image failed to load at index ${index} for review by ${review.name}`)
    if (review.pictureUrlList) { review.pictureUrlList[index] = '/placeholder-image.jpg' }
}

const onVideoError = (index, review) => {
    console.warn(`Video failed to load at index ${index} for review by ${review.name}`)
    if (review.videoUrlList) { review.videoUrlList[index] = '/placeholder-video.mp4' }
}

const openImageModal = (media, type, review, index) => {
    selectReview(review, index, type)
    selectedImage.value = media
    selectedMediaType.value = type
    isImageModalOpen.value = true
}
const getMediaIndex = (review, index, type) => {
    if (type === 'image') return index
    return (review.pictureUrlList?.length || 0) + index
}

const selectReview = (review, index, type) => {
    selectedReview.value = review
    mediaList.value = [
        ...(review.pictureUrlList || []).map((url) => ({ url, type: 'image' })),
        ...(review.videoUrlList || []).map((url) => ({ url, type: 'video' })),
    ]
    const mediaListT = [
        ...(review.pictureUrlList.map(url => `${url}?x-oss-process=image/auto-orient,1/format,webp`)), ...review.videoUrlList
    ]
    // const t =
    //     [
    //         "https://cdn.incustom.com/upload/online/2025/8/5/1908699907506724865/1952568576246423552.png",
    //         "https://cdn.incustom.com/upload/online/2025/8/5/1908699907506724865/1952568702415282176.png",
    //         "https://cdn.incustom.com/upload/online/2025/8/5/1908699907506724865/1952556173668610048.mp4",
    //         "https://cdn.incustom.com/upload/online/2025/8/5/1908699907506724865/1952568789996544000.png",
    //         "https://cdn.incustom.com/upload/online/2025/8/5/1908699907506724865/1952556173668610048.mp4"
    //     ]
    imgListModal.value = {
        isShow: true,
        imgList: mediaListT || [],
        defaultIndex: index
    }
    if (type === 'image') {
        review.previewVisible = true
        review.previewIndex = index
        selectedMediaIndex.value = index
    } else {
        selectedMediaIndex.value = getMediaIndex(review, index, type)
    }
}

const handleImgListModalClose = () => {
    imgListModal.value = null
}
</script>