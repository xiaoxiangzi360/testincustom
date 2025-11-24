<script setup>
const { randomRecommendationProductByCatalogId, } = ProductAuth()

const props = defineProps({
  error: {
    type: Object,
    default(/*rawProps*/) {
      return {
        url: '-',
        statusCode: 404,
        statusMessage: 'Not Found',
        message: '(404 Not Found)',
        stack: '',
        data: '{"error":"FetchError:  (404 Not Found)"}',
      }
    },
  },
})
const products = ref([])
onMounted(() => {
  handleGetrelated()
})
const handleGetrelated = async () => {
  try {
    let parmes = { catalogId: '', size: 5 }
    let res = await randomRecommendationProductByCatalogId(parmes)
    products.value = res.result
  } catch (error) { console.error(error) }
}
const message = computed(() => String(props.error?.message || ''))
const is404 = computed(
  () => props.error?.statusCode === 404 || message.value?.includes('404'),
)
const isDev = import.meta.dev

function handleError() {
  return clearError({ redirect: '/' })
}
const slugify = (str) => {
  return str
    .normalize('NFKD')           // 去掉重音符号
    .replace(/[^\w\s-]/g, '')    // 去掉非字母数字/下划线/空格/连字符
    .trim()
    .replace(/\s+/g, '-')        // 空格转-
    .replace(/-+/g, '-')         // 合并多个-
    .toLowerCase()
}
</script>
<template>
  <NuxtLoadingIndicator />
  <NuxtLayout>
    <div class="lg:min-h-[500px] flex flex-col bg-white">
      <!-- 主体 -->
      <main class="flex flex-col flex-1 items-center justify-center  p-6">
        <!-- <h1 class="text-[60px] font-extrabold text-primary mb-2">404</h1>
        <p class="text-xl font-medium text-gray-800 mb-3">Page Not Found</p> -->
        <NuxtImg src="/empty.png" alt="404 Not Found" width="180" class="lg:mt-10" />
        <p class="text-[#5A5B5B] mb-8 max-w-md ">
          The product you want to access has been removed from the shelves. We recommend you to view similar products.
        </p>
        <!-- 推荐产品部分（原样） -->
        <div class="max-row">
          <div class="mt-6 pb-4" v-if="products.length > 0">
            <h1 class="text-lg font-semibold mb-3 md:mb-4 dark:text-black text-left">Similar item you might like</h1>
            <div class="grid grid-cols-2 md:grid-cols-5 gap-4">
              <NuxtLink :to="`/product/${product.id}/${slugify(product.productEnglishName)}`"
                v-for="(product, index) in products" :key="index"
                class="product-card rounded-lg transition-transform duration-300  hover:scale-[1.02] md:hover:-translate-y-0.5 cursor-pointer">
                <div class="relative overflow-hidden">
                  <img :src="product.mainPic?.url
                    ? `${product.mainPic.url}?x-oss-process=image/auto-orient,1/resize,w_500,limit_0`
                    : '/images/empty.jpg'"
                    :alt="product.mainPic?.altText || product.productEnglishName || 'Product image'"
                    class="w-full h-full object-cover object-top rounded">
                </div>
                <div class="mt-2">
                  <h3 class="text-sm font-normal mb-2 line-clamp-1 dark:text-black">{{ product.productEnglishName
                  }}
                  </h3>
                  <div class="flex items-center">

                    <!-- Regular price -->
                    <span class="text-sm sm:text-base font-medium text-primary">
                      ${{ product.basePrice }}
                    </span>
                    <!-- Crossed-out price -->
                    <span v-if="product.originPrice" class="text-sm text-gray-400 line-through ml-3">
                      ${{ product.originPrice }}
                    </span>
                  </div>
                </div>
              </NuxtLink>
            </div>
          </div>
        </div>

        <!-- <UButton color="primary" size="lg" class="px-8 py-3 rounded-md" @click="handleError">
          Back to Home
        </UButton> -->
      </main>

    </div>
  </NuxtLayout>
</template>
