<template>
    <div class="mt-4 md:mt-[72px]">
        <div class="max-row">
            <!-- 标题 -->
            <h1
                class="text-xl md:text-[40px] bg-clip-text font-semibold text-primary dark:text-primary text-center mb-3">
                {{ title }}
            </h1>
            <div class="text-[#5A5B5B] text-base text-center">
                {{ subtitle }}
            </div>

            <div class="relative mt-1 md:mt-10">
                <!-- 骨架屏 -->
                <div v-if="isLoading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                    <div v-for="n in 5" :key="n" class="rounded-lg overflow-hidden shadow-md bg-white">
                        <div class="relative w-full aspect-square bg-gray-200 animate-pulse"></div>
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

                <!-- Splide 轮播（不足一屏时不会重复/克隆） -->
                <Splide v-else class="product-splide" :options="computedSplideOptions" aria-label="Popular Products">
                    <SplideSlide v-for="product in products" :key="product.id || product.erpProduct?.productEnglishName"
                        class="px-[14px] pt-3 rounded-[8px] bg-white transition-transform transition-shadow duration-300 shadow-[0_4px_10px_0_rgba(167,167,167,0.2)] hover:scale-[1.02] md:hover:-translate-y-0.5">
                        <ULink :to="`/product/${product.id}/${slugify(product.erpProduct.productEnglishName)}`"
                            class="block rounded-[8px] cursor-pointer focus:outline-none">
                            <!-- 产品图片 -->
                            <div class="relative w-full aspect-square overflow-hidden rounded-[8px]">
                                <NuxtImg format="webp"
                                    :src="`${product.erpProduct.mainPic || '/images/empty.jpg'}?x-oss-process=image/auto-orient,1/resize,w_360,limit_0`"
                                    :alt="product.erpProduct.productEnglishName" loading="lazy" :width="360"
                                    :height="360" quality="70"
                                    class="w-full h-full object-cover object-top transition-all duration-300" />

                            </div>

                            <!-- 产品详情 -->
                            <div class="pt-[14px] pb-[10px]">
                                <h3 class="text-sm font-normal mb-2 truncate dark:text-neutral-900">
                                    {{ product.erpProduct.productEnglishName }}
                                </h3>

                                <div class="flex items-center justify-between">
                                    <span class="text-primary font-medium text-sm sm:text-lg dark:text-primary">
                                        $ {{ product.erpProduct.customPrice }}
                                    </span>
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
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { Splide, SplideSlide } from "@splidejs/vue-splide";
import "@splidejs/splide/dist/css/splide.min.css";

const { getUserProductRollPage } = ProductAuth();
const router = useRouter();

const props = defineProps<{
    title: string;
    subtitle: string;
    tag: string;
}>();

const products = ref<any[]>([]);
const isLoading = ref(true);

/** ------- 保持与你原来一致的基础配置（只用于计算，不直接传给 Splide） ------- */
const baseOptions = {
    autoplay: false,
    interval: 5000,
    pauseOnHover: true,
    arrows: false,
    pagination: true,
    speed: 1000,
    gap: "12px",
    perPage: 5,
    perMove: 5,
    padding: { left: "20px", right: "20px" },
    breakpoints: {
        1279: { perPage: 4, perMove: 4, padding: { left: "20px", right: "20px" } },
        1023: { perPage: 3, perMove: 3, padding: { left: "20px", right: "20px" } },
        767: { perPage: 2, perMove: 2, padding: { left: "20px", right: "20px" } },
        639: {
            perPage: 1,
            perMove: 1,
            focus: "center",
            trimSpace: false,
            pagination: false,
            padding: { left: "15%", right: "15%" },
        },
    },
};

/** ------- 计算当前 viewport 下实际的 perPage & padding ------- */
const viewport = ref<number>(typeof window !== "undefined" ? window.innerWidth : 1280);
function onResize() {
    if (typeof window !== "undefined") viewport.value = window.innerWidth;
}
onMounted(() => {
    onResize();
    window.addEventListener("resize", onResize, { passive: true });
});
onUnmounted(() => {
    window.removeEventListener("resize", onResize);
});

const currentPerPage = computed(() => {
    const w = viewport.value;
    if (w <= 639) return 1;
    if (w <= 767) return 2;
    if (w <= 1023) return 3;
    if (w <= 1279) return 4;
    return 5;
});
const currentPadding = computed(() => {
    const w = viewport.value;
    if (w <= 639) return { left: "15%", right: "15%" };
    return { left: "20px", right: "20px" };
});

/** ------- 不足一屏：不 loop、不克隆、可禁用拖拽与分页 ------- */
const notFull = computed(() => products.value.length <= currentPerPage.value);

const computedSplideOptions = computed(() => {
    const common = {
        gap: baseOptions.gap,
        speed: baseOptions.speed,
        arrows: baseOptions.arrows,
        pauseOnHover: baseOptions.pauseOnHover,
        interval: baseOptions.interval,
        perPage: currentPerPage.value,
        perMove: Math.min(currentPerPage.value, 5),
    };

    if (notFull.value) {
        return {
            ...common,
            type: "slide",
            clones: 0,
            rewind: false,
            drag: false,
            pagination: false,
            trimSpace: true,
            focus: false,
            padding: { left: "10px", right: "10px" },
        };
    }

    const isTiny = viewport.value <= 639;
    return {
        ...common,
        type: "loop",
        clones: undefined,
        rewind: false,
        drag: true,
        pagination: isTiny ? false : true,
        trimSpace: !isTiny,
        focus: isTiny ? "center" : false,
        padding: isTiny ? currentPadding.value : { left: "20px", right: "20px" },
    };
});


const getpopularlist = async () => {
    try {
        isLoading.value = true;
        const params = {
            sortOrder: "desc",
            tag: props.tag,
            fields:
                "id,productState,erpProduct.productEnglishName,erpProduct.customPrice,erpProduct.mainPic,thirtyDaysSales",
        };
        const res = await getUserProductRollPage(params);
        products.value = res.result.list || [];
    } catch (error) {
        console.error("Error fetching products:", error);
    } finally {
        isLoading.value = false;
    }
};

const slugify = (str: string) => {
    return encodeURIComponent(
        str
            .normalize("NFKD")
            .replace(/[^\w\s-]/g, "")
            .trim()
            .replace(/\s+/g, "-")
            .replace(/-+/g, "-")
            .toLowerCase()
    );
};

getpopularlist();
</script>

<style scoped>
/* ✅ Splide 分页小圆圈移到底部居中 */
:deep(.product-splide .splide__pagination) {
    position: static !important;
    margin-top: 30px;
    display: flex;
    justify-content: center;
}

:deep(.splide__pagination__page.is-active) {
    background: #0C1013;
    transform: scale(1);
}

:deep(.splide__pagination__page) {
    width: 12px;
    height: 12px;
}

:deep(.splide__track) {
    padding-bottom: 10px;
    padding-top: 10px;
}

/* 只有一页时（只有 1 个小圆点）隐藏分页 */
:deep(.product-splide .splide__pagination:not(:has(button:nth-child(2)))) {
    display: none !important;
}
</style>
