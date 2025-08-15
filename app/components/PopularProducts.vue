<template>
    <div class="mt-[30px]">
        <div class="max-row">
            <!-- 标题 -->
            <h1
                class="text-xl md:text-[30px] mb-3 lg:mb-5 bg-clip-text font-medium text-blackcolor text-center dark:text-white">
                Most Popular Products
            </h1>

            <div class="relative">
                <!-- 骨架屏 -->
                <div v-if="isLoading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                    <div v-for="n in 5" :key="n" class="rounded-lg overflow-hidden shadow-md bg-white">
                        <!-- 图片骨架 -->
                        <div class="relative w-full aspect-square bg-gray-200 animate-pulse"></div>
                        <!-- 内容骨架 -->
                        <div class="py-4">
                            <div class="h-4 bg-gray-200 rounded w-3/4 mb-2 animate-pulse"></div>
                            <div class="h-4 bg-gray-200 rounded w-1/2 mb-2 animate-pulse"></div>
                            <div class="flex items-center justify-between">
                                <div class="h-4 bg-gray-200 rounded w-1/4 animate-pulse"></div>
                                <div class="h-4 bg-gray-200 rounded w-1/4 animate-pulse"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Splide 轮播 -->
                <Splide v-else class="product-splide" :options="splideOptions" aria-label="Popular Products">
                    <SplideSlide v-for="(product, index) in products" :key="index">
                        <ULink :to="`/product/${product.id}/${slugify(product.erpProduct.productEnglishName)}`"
                            class="rounded-lg overflow-hidden shadow-md bg-white transition-transform duration-300 hover:scale-[1.05] hover:-translate-y-1 hover:shadow-xl cursor-pointer">
                            <!-- 产品图片 -->
                            <div class="relative w-full aspect-square overflow-hidden">
                                <NuxtImg format="webp" :src="product.erpProduct.mainPic ?? '/images/empty.jpg'"
                                    :alt="product.erpProduct.productEnglishName" loading="lazy" :width="400"
                                    :height="400" quality="70"
                                    class="w-full h-full object-cover object-top transition-all duration-300 hover:rounded-[8px]" />
                            </div>

                            <!-- 产品详情 -->
                            <div class="py-3">
                                <h3 class="text-sm sm:text-base font-normal mb-2 line-clamp-2 min-h-[3em]">
                                    {{ product.erpProduct.productEnglishName }}
                                </h3>
                                <div class="flex items-center justify-between">
                                    <span class="text-customblack font-medium text-sm sm:text-lg dark:text-primary">
                                        $ {{ product.erpProduct.customPrice }}
                                    </span>
                                    <!-- <span class="text-[#4A4A4A] text-sm">{{ product.thirtyDaysSales }} sold</span> -->
                                </div>
                            </div>
                        </ULink>
                    </SplideSlide>
                </Splide>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Splide, SplideSlide } from '@splidejs/vue-splide'
import '@splidejs/splide/dist/css/splide.min.css'

const { getUserProductRollPage } = ProductAuth()
const router = useRouter()

const products = ref<any[]>([])
const isLoading = ref(true)

/** Splide 配置（等价于你原先的 Swiper 配置） */
const splideOptions = {
    type: 'loop',
    autoplay: true,
    interval: 5000,          // 自动播放间隔
    pauseOnHover: true,
    arrows: false,
    pagination: true,
    speed: 1000,             // 动画速度
    gap: '24px',             // 卡片间距
    perPage: 5,
    perMove: 5,              // 与 slidesPerGroup 等效
    // 断点是“最大宽度”，从大到小写，覆盖默认 perPage/perMove
    breakpoints: {
        1279: { perPage: 4, perMove: 4 },
        1023: { perPage: 3, perMove: 3 },
        767: { perPage: 2, perMove: 2 },
        639: { perPage: 2, perMove: 2 },
    },
}

const getpopularlist = async () => {
    try {
        isLoading.value = true
        const params = {
            sortKey: 'thirtyDaysSales',
            pageNum: 1,
            pageSize: 15,
            sortOrder: 'desc',
            fields:
                'id,productState,erpProduct.productEnglishName,erpProduct.customPrice,erpProduct.mainPic,thirtyDaysSales',
        }
        const res = await getUserProductRollPage(params)
        products.value = res.result.list
    } catch (error) {
        console.error('Error fetching products:', error)
    } finally {
        isLoading.value = false
    }
}
const slugify = (str: string) => {
    return encodeURIComponent(
        str
            .normalize('NFKD')           // 去掉重音符号
            .replace(/[^\w\s-]/g, '')    // 去掉非字母数字/下划线/空格/连字符
            .trim()
            .replace(/\s+/g, '-')        // 空格转-
            .replace(/-+/g, '-')         // 合并多个-
            .toLowerCase()
    )
}

getpopularlist()
</script>

<style scoped>
/* 为分页留出下方空间（与原先 Swiper 一致） */
.product-splide {
    padding-bottom: 60px;
}

/* Splide 分页小圆点样式 */
.product-splide :deep(.splide__pagination) {
    margin-top: 30px;
}

.product-splide :deep(.splide__pagination__page) {
    width: 12px;
    height: 12px;
    background: #B9B9B9;
    opacity: 1;
    border-radius: 9999px;
}

.product-splide :deep(.splide__pagination__page.is-active) {
    background: #222222;
    transform: none;
    /* 去掉默认缩放动画 */
}

/* 移动端分页尺寸 */
@media (max-width: 640px) {
    .product-splide {
        padding-bottom: 20px;
    }

    .product-splide :deep(.splide__pagination) {
        margin-top: 20px;
    }

    .product-splide :deep(.splide__pagination__page),
    .product-splide :deep(.splide__pagination__page.is-active) {
        width: 8px;
        height: 8px;
    }
}

/* 维持 1:1 图片比例 */
.aspect-square {
    aspect-ratio: 1 / 1;
}

/* 骨架屏动画 */
@keyframes pulse {
    0% {
        opacity: 1;
    }

    50% {
        opacity: 0.5;
    }

    100% {
        opacity: 1;
    }
}

.animate-pulse {
    animation: pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>
