<template>
    <div class="mt-6 pb-4" v-if="products.length > 0">
        <div class="text-lg font-semibold mb-3 md:mb-4 dark:text-black">Similar item you might like</div>
        <div class="grid grid-cols-2 md:grid-cols-5 gap-4">
            <NuxtLink :to="`/products/${slugify(product.seoUrlKeyword || product.productEnglishName)}-${product.id}`"
                v-for="(product, index) in products" :key="index"
                class="product-card rounded-lg transition-transform duration-300  hover:scale-[1.02] md:hover:-translate-y-0.5 cursor-pointer">
                <div class="relative overflow-hidden">
                    <NuxtImg :src="product.mainPic?.url
                        ? `${product.mainPic.url}?x-oss-process=image/auto-orient,1/resize,w_500,limit_0/format,webp`
                        : '/images/empty.jpg'"
                        format="webp"
                        :alt="product.mainPic?.altText || product.productEnglishName || 'Product image'" loading="lazy"
                        class="w-full h-full object-cover object-top rounded" />
                </div>
                <div class="mt-2">
                    <h3 class="text-sm font-normal mb-2 line-clamp-2 dark:text-black">{{ product.productEnglishName
                    }}
                    </h3>
                    <p class="text-sm font-medium text-primary">
                        <span class="text-[16px] md:text-[18px] font-medium text-primary">
                            ${{ product.basePrice }}
                        </span>
                        <!-- Crossed-out price -->
                        <span v-if="product.originPrice"
                            class="text-[16px] md:text-[18px] text-gray-400 line-through ml-3">
                            ${{ product.originPrice }}
                        </span>
                    </p>
                </div>
            </NuxtLink>
        </div>
    </div>
</template>

<script setup>
const { randomRecommendationProductByCatalogId } = ProductAuth()
const props = defineProps({
    productId: { type: String, required: true },
    catalogPathIdList: { type: String, required: true },
})

const products = ref([])


const getRecommendProducts = async () => {
    try {
        if (!props.productId || !props.catalogPathIdList || props.catalogPathIdList.length === 0) return
        let params = { catalogId: props.catalogPathIdList, size: 5, excludeProductId: props.productId }
        let res = await randomRecommendationProductByCatalogId(params)
        products.value = res.result
    } catch (error) { console.error(error) }
}

onMounted(() => {
    getRecommendProducts()
})

</script>