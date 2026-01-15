<template>
    <div class="min-h-[450px]">
        <div class="text-customblack text-[18px] font-[600] pb-4 text-center max-md:text-[16px]">{{ props.title }}</div>
        <!-- Product List -->
        <div v-show="props.productList?.length > 0">
            <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mb-2">
                <NuxtLink :to="`/products/${slugify(product.seoUrlKeyword || product.productEnglishName)}-${product.id}`"
                    @click="handleProductClick(product)" v-for="(product, index) in productList" :key="index"
                    class="bg-white cursor-pointer">
                    <div class="aspect-square overflow-hidden rounded-[4px]">
                        <!-- 使用原生 img 标签 -->
                        <img :data-src="`${product.mainPic.url}?x-oss-process=image/auto-orient,1/resize,w_500,m_lfit`"
                            :alt="product.mainPic?.altText || product.productEnglishName || 'Product image'"
                            class="w-full h-full loadObserveImg aspect-square object-cover object-center transition-transform duration-300 hover:scale-105"
                            style="aspect-ratio: 1 / 1;" />
                    </div>
                    <div>
                        <h3 class="text-sm sm:text-sm text-customblack my-2 cursor-default font-normal line-clamp-[2]"
                            :title="product.productEnglishName">
                            {{ product.productEnglishName }}
                        </h3>
                        <div class="flex items-center">
                            <span class="text-sm sm:text-base font-medium text-primary">
                                ${{ product.basePrice }}
                            </span>
                            <span v-if="product.originPrice" class="text-sm text-gray-400 line-through ml-3">
                                ${{ product.originPrice }}
                            </span>
                        </div>
                    </div>
                </NuxtLink>
            </div>
            <div class="flex items-center justify-center pb-2 mt-4">
                <NuxtLink :to="moreLink" class=" text-[18px] max-md:text-[14px] text-primary border border-primary px-4 py-2 flex items-center justify-center rounded-[4px] cursor-pointer
                    hover:scale-105 transition-all duration-300">
                    View More
                </NuxtLink>
            </div>
        </div>

        <!-- Empty -->
        <!-- <div class="text-center my-12 flex flex-col items-center justify-center" v-show="productList?.length == 0">
            <img src="/empty.png" alt="Empty" class="w-24 h-24 sm:w-32 sm:h-32" />
            <p class="text-gray-400 text-sm mt-4">
                Not Found Products
            </p>
        </div> -->
    </div>
</template>

<script setup lang="ts">
import { slugify } from '~/utils/tools';

const placeholderImage = '/home/place_img.png';

const props = defineProps({
    id: {
        type: String,
        required: false
    },
    title: {
        type: String,
        required: false
    },
    productList: {
        type: Array<any>,
        required: true,
        default: () => []
    },
    moreLink: {
        type: String,
        required: false
    }
});
const pageTag = 'ProductList页面======';
// console.log(pageTag, 'ProductList props:', props.productList);
const emit = defineEmits<{
    (e: 'onProductClick', data?: { product: any }): void;
    (e: 'more'): void;
}>();

const handleProductClick = (product: any) => {
    emit('onProductClick', { product });
};

const observer = ref<IntersectionObserver | null>(null);
watch(() => props.productList, () => {
    startObserve();
});
onMounted(() => {
    startObserve();
});

const startObserve = () => {
    // 清除当前的观察者
    if (observer.value) {
        observer.value.disconnect();
    }
    nextTick(() => {
        // 创建 IntersectionObserver
        observer.value = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const img = entry.target as HTMLImageElement;
                    const src = img.getAttribute('data-src');
                    if (src && !img.src) {
                        img.src = src;
                        observer.value?.unobserve(img);
                    }
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '50px' // 提前 50px 开始加载
        });

        // 观察每个图片
        const images = document.querySelectorAll('.loadObserveImg');
        images.forEach((img) => {
            observer.value?.observe(img);
        });
    });
};

onUnmounted(() => {
    observer.value?.disconnect();
});
</script>