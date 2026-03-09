<template>
  <div class="bg-white w-full pt-4 font-hind">
    <!-- Loading 遮罩 -->
    <div v-if="isLoading" class="fixed inset-0 bg-white bg-opacity-80 z-50 flex items-center justify-center">
      <div class="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary"></div>
    </div>

    <!-- 骨架屏 -->
    <div v-if="isLoading" class="max-row">
      <div class="mb-6">
        <!-- 面包屑骨架 -->
        <div class="flex gap-2 mb-6">
          <div v-for="i in 3" :key="i" class="h-6 w-24 bg-gray-200 rounded animate-pulse"></div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-12 gap-8">
          <!-- 左侧图片区域骨架 -->
          <div class="md:col-span-5">
            <div class="sticky top-[124px]">
              <div class="w-full aspect-square bg-gray-200 rounded-xl animate-pulse mb-4"></div>
              <div class="flex gap-2">
                <div v-for="i in 4" :key="i" class="h-20 w-20 bg-gray-200 rounded-xl animate-pulse"></div>
              </div>
            </div>
          </div>

          <!-- 内容区域骨架 -->
          <div class="md:col-span-7">
            <div class="h-8 w-3/4 bg-gray-200 rounded animate-pulse mb-4"></div>
            <div class="h-6 w-1/4 bg-gray-200 rounded animate-pulse mb-4"></div>

            <!-- 属性选择骨架 -->
            <div v-for="i in 3" :key="i" class="mb-6 border-b border-gray-200 pb-6">
              <div class="flex justify-between items-center">
                <div class="h-6 w-1/3 bg-gray-200 rounded animate-pulse"></div>
                <div class="h-5 w-5 bg-gray-200 rounded-full animate-pulse"></div>
              </div>
              <div class="grid grid-cols-6 gap-4 mt-4">
                <div v-for="j in 6" :key="j" class="h-24 w-full bg-gray-200 rounded-xl animate-pulse"></div>
              </div>
            </div>

            <!-- 数量和按钮骨架 -->
            <div class="border-b border-gray-200 pb-6">
              <div class="flex flex-col gap-4">
                <div class="flex justify-between">
                  <div class="h-6 w-1/4 bg-gray-200 rounded animate-pulse"></div>
                  <div class="h-6 w-32 bg-gray-200 rounded animate-pulse"></div>
                </div>
                <div class="flex justify-between">
                  <div class="h-6 w-1/4 bg-gray-200 rounded animate-pulse"></div>
                  <div class="h-6 w-24 bg-gray-200 rounded animate-pulse"></div>
                </div>
                <div class="flex gap-4">
                  <div class="h-12 w-full bg-gray-200 rounded-md animate-pulse"></div>
                  <div class="h-12 w-full bg-gray-200 rounded-md animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 原有内容，只有在非loading状态下显示 -->
    <div v-else class="max-row text-customblack">
      <CustomBreadcrumb :links="breadcrumbLinks" wrapperClass="mb-4" />
      <div class="md:hidden ">
        <div class="flex items-center justify-between">
          <h1 class="text-[18px] font-[500] line-clamp-3 cursor-default leading-normal"
            :title="productinfo.productEnglishName">
            {{ productinfo.productEnglishName }}
          </h1>
        </div>
        <!-- 新增：评分类展示 -->
        <div v-show="reviews.length > 0" class="flex items-center gap-2 max-md:text-sm text-[14px] mb-2">
          <div class="flex items-center gap-0 text-[#FFD359] text-xl">
            <span v-for="star in 5" :key="star">
              <UIcon v-if="getStarStatus(star) === 'full'" name="i-mdi:star"
                class="text-[#FFD359] block w-[24px] h-[24px]" />
              <UIcon v-else-if="getStarStatus(star) === 'half'" name="i-mdi:star-half-full"
                class="text-[#FFD359] block w-[24px] h-[24px]" />
              <UIcon v-else name="i-mdi:star-outline" class="text-gray-300 block w-[24px] h-[24px]" />
            </span>
          </div>
          <span class="text-[#0C1013]">{{ averageRating.toFixed(1) }}</span>
          <span class="text-primary cursor-pointer  underline" @click="scrollToSection('reviews')">
            {{ totalReviews.toLocaleString() }} Reviews
          </span>
        </div>
      </div>
      <!-- 产品详情部分 -->
      <div class="text-gray-800" ref="detailSectionRef">
        <div class="flex flex-row max-md:flex-col gap-6 max-md:gap-4 border-b border-b-[#D1D1D1] pb-4">

          <!-- Left section with image thumbnails (已改：主图手势滑动 + 缩略图联动) -->
          <div
            class="w-[43%] max-md:w-full max-md:pb-2 max-md:border-b max-md:border-b-[#D1D1D1] min-h-[600px] max-md:min-h-[340px]">
            <div class="sticky top-[100px] z-[49]">
              <div>
                <div class="relative mb-4">
                  <MainImgList :curSkuImg="curSkuImage" :showSkuImg="showSkuImg && hasSelectedSku"
                    @img-visible="handleMainImgVisible"
                    :list="isPageLoaded ? productinfo.fileList : (productinfo.fileList?.length > 0 ? [productinfo.fileList[0]] : [])"
                    :current-index="curImgIndex" @img-change="handleImgChange" />
                </div>
                <ScrollImgList :current-index="curImgIndex" :list="productinfo.fileList"
                  @thumbnail-change="handleImgChange" />
              </div>
            </div>
          </div>
          <!-- Right section（原样） -->
          <div class="w-[57%] h-full max-md:w-full">
            <div class="max-md:hidden">
              <div class="flex items-center justify-between">
                <h1 class="text-[18px] font-[500] line-clamp-3 cursor-default leading-normal"
                  :title="productinfo.productEnglishName">
                  {{ productinfo.productEnglishName }}
                </h1>
              </div>
              <!-- 新增：评分类展示 -->
              <div v-show="reviews.length > 0"
                class="flex items-center gap-2 max-md:text-sm text-[14px] mb-2 max-md:mb-0">
                <div class="flex items-center gap-0 text-[#FFD359] text-xl">
                  <span v-for="star in 5" :key="star">
                    <UIcon v-if="getStarStatus(star) === 'full'" name="i-mdi:star"
                      class="text-[#FFD359] block w-[24px] h-[24px]" />
                    <UIcon v-else-if="getStarStatus(star) === 'half'" name="i-mdi:star-half-full"
                      class="text-[#FFD359] block w-[24px] h-[24px]" />
                    <UIcon v-else name="i-mdi:star-outline" class="text-gray-300 block w-[24px] h-[24px]" />
                  </span>
                </div>
                <span class="text-[#0C1013]">{{ averageRating.toFixed(1) }}</span>
                <span class="text-primary cursor-pointer  underline" @click="scrollToSection('reviews')">
                  {{ totalReviews.toLocaleString() }} Reviews
                </span>
              </div>

            </div>
            <div class="flex flex-col gap-2 sm:gap-0  pb-4 max-md:pb-2">
              <div class="flex items-center gap-3 max-md:flex-col max-md:items-start">
                <div class="flex items-center gap-3 max-md:pt-1">
                  <div class="text-base">
                    <span class="text-[#0C1013] text-[14px] font-normal mr-2">From</span>
                    <span class="text-[24px] font-medium">${{ skuPrice }}</span>
                  </div>
                  <!-- SKU已确定：显示SKU的originPrice作为划线价 -->
                  <div v-if="curOriginPrice" class="text-[16px] sm:text-base text-[rgba(34,34,34,0.5033)] line-through">
                    ${{ curOriginPrice }}
                  </div>
                </div>
                <div class="text-[14px] text-[#FF4F63] cursor-pointer" v-show="activityInfo?.mallView"
                  @click="copyCode(activityInfo.couponCode)">
                  <span>{{ activityInfo.discountStr }}:</span>
                  <span class='underline mx-1'>{{ activityInfo.couponCode }}</span>
                </div>
              </div>
            </div>
            <!-- Section 服务类 -->
            <div class="flex items-center flex-wrap gap-2 text-[#0C1013] text-[14px] font-normal mb-4">
              <div v-for="(item, index) in serviceList" class="" :key="index">
                <div class="flex items-center gap-2">
                  <!-- <ComSvg :href="item.svg" class="w-5 h-5" /> -->
                  <NuxtImg :src="item.img" class="w-5 h-5" loading="lazy" />
                  <span class="max-md:text-[12px] text-[#5A5B5B]">{{ item.text }}</span>
                </div>
              </div>
            </div>
            <!-- Section 1:属性显示 THE TYPE（原样） -->
            <PropsList ref="propsListRef" :productInfo="productinfo" :customPriceError="customPriceError"
              @update:curSkuId="handleSkuIdUpdate" @update:has-selected="handleSkuHasSelected"
              @update:skuPropValue="handleSkuValueUpdate" @inputChange="handleInputChange" />
            <!-- 数量/价格/按钮（原样） -->
            <div>
              <div class="w-full mx-auto bg-white rounded-md text-[#0C1013]">
                <div class="flex flex-row sm:items-center gap-4 mt-3">
                  <span class="text-sm font-normal">QUANTITY：</span>
                  <div class="flex items-center rounded px-2">
                    <div class="flex items-center rounded">
                      <div
                        class="text-gray-500 px-2 hover:opacity-80 cursor-pointer bg-[#F8F8F8] border-[#F8F8F8] h-[26px] flex items-center justify-center rounded-tl-[6px] rounded-bl-[6px]"
                        @click="decrement">
                        <UIcon name="i-heroicons-minus-20-solid" />
                      </div>

                      <input @input="onQuantityInput" v-model="quantity"
                        class="focus:outline-none focus:ring-0 focus:border-transparent w-12 h-[26px] text-center outline-none border-0 py-1 bg-[#F8F8F8] mx-0.5" />
                      <div
                        class="text-gray-500 border-[#F8F8F8] px-2 hover:opacity-80 cursor-pointer bg-[#F8F8F8] h-[26px] flex items-center justify-center rounded-tr-[6px] rounded-br-[6px]"
                        @click="increment">
                        <BaseIcon name="i-heroicons-plus-20-solid" />
                      </div>
                    </div>
                    <!-- <span class="ml-2 text-lg">Panels</span> -->
                  </div>
                </div>

                <div class="flex flex-row items-center gap-4 mt-4">
                  <span class="text-sm">TOTAL PRICE：</span>
                  <div class="flex items-center flex-wrap gap-2">
                    <span class="text-2xl font-medium">${{ totalPrice }}</span>
                    <div v-if="offPrice" class="text-[#FF4F63] md:flex hidden text-[14px]">Save ${{ offPrice }} now.
                      Apply
                      code:<span class="text-[#EB001B] underline cursor-pointer ml-2"
                        @click="copyCode(activityInfo.couponCode)">{{
                          activityInfo.couponCode }}</span>
                    </div>
                  </div>
                </div>
                <div v-if="offPrice" class="text-[#FF4F63] flex md:hidden text-[14px]">Save ${{ offPrice }} now. Apply
                  code:<span class="text-[#EB001B] underline cursor-pointer ml-2"
                    @click="copyCode(activityInfo.couponCode)">{{
                      activityInfo.couponCode }}</span>
                </div>
                <div ref="btnSectionRef" class="flex flex-row gap-4 mt-4 max-xl:pr-4">
                  <!-- Add to Cart -->
                  <UButton class="max-xl:flex-1 flex items-center justify-center rounded-md w-[280px] 
           bg-[#00B4F0] text-white hover:bg-[#0099D6] transition-colors dark:text-white" :loading="cartLoading"
                    @click="handleAddToCart" color="primary" variant="solid" size="xl"
                    icon="i-garden:shopping-cart-stroke-16">
                    Add to Cart
                  </UButton>

                  <!-- Order Now -->
                  <UButton class="max-xl:flex-1  flex items-center justify-center rounded-md  w-[280px]
           border border-[#00B4F0] text-[#00B4F0] bg-white hover:opacity-80 dark:hover:bg-white
            transition-colors disabled:bg-primary-100 disabled:text-primary dark:bg-white dark:text-primary"
                    :loading="orderLoading" @click="handleOrder" color="primary" variant="solid" size="xl">
                    Order Now
                  </UButton>
                </div>
                <div class='flex-grow-0 text-center inline-block max-md:w-full'>
                  <div class="py-4 text-lg text-[#0C1013] font-normal">Checkout securely with</div>
                  <div class="flex items-start">
                    <div class="w-[76px] h-[45px] " v-for="(item, index) in payList" :key="index">
                      <NuxtImg :src="item" class="w-full h-full object-contain" loading="lazy" />
                    </div>
                  </div>
                  <div class="flex items-center justify-center mt-4">
                    <div class="w-[110px] h-[56px]"
                      v-for="(item, index) in ['/product/pay8.webp', '/product/pay9.webp']" :key="index">
                      <NuxtImg :src="item" class="w-full h-full object-contain" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div ref="tabsContainer"
        class="z-40 bg-[white] cursor-pointer text-sm flex text-d3black overflow-x-auto scrollbar-hide sticky"
        :style="{ top: `${headerHeight}px` }">
        <div v-for="(tab, i) in tabs" :key="tab.key" class="">
          <div class="cursor-pointer max-md:text-sm text-base py-3 px-4 text-d3black whitespace-nowrap" :class="{
            'border-b-[3px] border-primary text-primary':
              activeSection === tab.key,
            'text-gray-500 hover:text-primary hover:font-semibold': activeSection !== tab.key
          }" @click="scrollToSection(tab.key)">
            {{ tab.label }}
          </div>
        </div>
      </div>



      <!-- ✅ 实际内容段落（统一排序渲染） -->
      <div class="bg-[#F8F8F8] w-[90%] mx-auto max-md:w-full" v-if="isPageLoaded && sections && sections.length">
        <div class="mx-auto mt-4 bg-white">

          <section v-for="item in sections" :key="item.key" :id="'section-' + item.key" class="pt-4 pb-4 mb-4">
            <!-- <h2 class="text-lg font-semibold mb-6">{{ item.label }}</h2> -->

            <!-- FAQ -->
            <template v-if="item.type === 'faq'">
              <UAccordion variant="solid" size="xl" :items="item.content"
                :ui="{ container: 'border-b border-[#00000014]', item: { padding: 'pt-4 pb-4' } }" class="text-title">
                <template #default="{ item, open }">
                  <UButton color="gray" variant="ghost"
                    class="text-arialblack w-full flex justify-between items-center gap-3 text-base sm:text-lg font-normal hover:bg-transparent dark:hover:bg-transparent dark:text-arialblack hover:text-primary dark:hover:text-primary"
                    :ui="{ rounded: 'rounded-none', padding: { sm: 'px-0 py-3 sm:py-4' } }">
                    <span class="flex-1 min-w-0 text-left font-normal leading-snug">
                      {{ item.label }}
                    </span>
                    <BaseIcon name="i-heroicons-chevron-down-20-solid"
                      class="w-5 h-5 shrink-0 transition-transform duration-200" :class="[open ? 'rotate-180' : '']" />
                  </UButton>
                </template>

                <template #item="{ item }">
                  <div class="text-[#4B5563] sm:text-base">
                    <div class="content" v-oembed-to-iframe v-shadow-html="item.content"></div>
                  </div>
                </template>
              </UAccordion>
            </template>

            <!-- 普通 HTML（Description / Specs / 自定义详情） -->
            <template v-else-if="item.type === 'html'">
              <!-- <ShadowHtml :html="item.content" /> -->
              <div v-oembed-to-iframe v-shadow-html="item.content"
                class="prose max-w-none ck-content break-words whitespace-normal leading-relaxed"
                style="word-break: break-word; overflow-wrap: anywhere;"></div>
            </template>
            <!-- Reviews -->
            <template v-else-if="item.type === 'reviews'">
              <Comments :productId="productid" />
            </template>
          </section>

        </div>
      </div>



      <!-- 推荐产品部分（原样） -->
      <RecommendProducts v-show="isPageLoaded" :productId="productinfo.id" :catalogPathIdList="catalogPathIdList" />
    </div>

    <!-- Bottom bar（原样） -->
    <!-- 原来的 sticky 改成 fixed + 全宽 + 高 z-index -->
    <div ref="bottomBarRef" class="fixed md:hidden bottom-0 left-0 right-0 z-50
         p-4 bg-white rounded-none shadow-[0_-4px_16px_rgba(0,0,0,0.08)]
         transition-all duration-300 ease-in-out" :class="{
          'opacity-100 translate-y-0 pointer-events-auto': isBottomBarVisible,
          'opacity-0 translate-y-8 pointer-events-none': !isBottomBarVisible
        }" v-show="!isLoading">
      <div class="flex flex-col gap-3">
        <div>

          <div class="flex items-center rounded">
            <span class="text-sm text-[#0C1013]">QUANTITY：</span>
            <button
              class="text-gray-500 px-2 hover:text-black bg-[#F8F8F8] h-[26px] flex items-center justify-center rounded-tl-[6px] rounded-bl-[6px]"
              @click="decrement">
              <BaseIcon name="i-heroicons-minus-20-solid" />
            </button>

            <input @input="onQuantityInput" v-model="quantity"
              class="focus:outline-none focus:ring-0 focus:border-transparent w-12 h-[26px] text-center outline-none border-0 py-1 bg-[#F8F8F8] mx-0.5" />
            <button @click="increment"
              class="text-gray-500 px-2 hover:text-black bg-[#F8F8F8] h-[26px] flex items-center justify-center rounded-tr-[6px] rounded-br-[6px]">
              <BaseIcon name="i-heroicons-plus-20-solid" />
            </button>
          </div>
        </div>
        <div><span class="text-sm text-[#0C1013]">TOTAL PRICE：</span><span
            class="text-base max-md:text-[24px] font-medium text-gray-800">${{ totalPrice }}</span>

        </div>
        <div v-if="offPrice" class="text-[#FF4F63] text-[14px]">Save ${{ offPrice }} now. Apply code:<span
            class="text-[#EB001B] underline cursor-pointer ml-2" @click="copyCode(activityInfo.couponCode)">{{
              activityInfo.couponCode
            }}</span></div>
        <div class="flex flex-row gap-4">
          <UButton class="flex-1 flex items-center justify-center rounded-md max-w-[280px] dark:text-white
           bg-[#00B4F0] text-white hover:bg-[#0099D6] transition-colors" :loading="cartLoading"
            @click="handleAddToCart" color="primary" variant="solid" size="xl" icon="i-garden:shopping-cart-stroke-16">
            Add to Cart
          </UButton>

          <!-- Order Now -->
          <UButton class="flex-1 flex items-center justify-center rounded-md  max-w-[280px]
           border border-[#00B4F0] text-[#00B4F0] bg-white dark:text-white
           hover:bg-[#00B4F0] hover:text-white transition-colors disabled:bg-primary-100 disabled:text-primary"
            :loading="orderLoading" @click="handleOrder" color="primary" variant="solid" size="xl">
            Order Now
          </UButton>
        </div>
      </div>
    </div>

    <div alt="skuMainImage"
      class="fixed md:hidden top-[35%] text-[12px] px-2 text-[#5A5B5B] flex flex-col items-center py-1 transition-all duration-300 translate-y-[-30%] right-[10px] z-[99] cursor-pointer bg-white rounded shadow-md"
      :class="[showZoomSKuImageBtn ? 'opacity-100' : 'opacity-0 pointer-events-none']" @click="updateSkuImgModal(true)">
      Zoom Image
      <NuxtImg :src="`${curSkuImage}?x-oss-process=image/auto-orient,1/resize,w_500,limit_0`" :class="mt - 1"
        class="w-[120px] h-[120px] " />
    </div>

    <div src="/product/top.png" alt="top"
      class="fixed w-11 h-11 bottom-1/2 text-[12px] text-[#5A5B5B] flex flex-col items-center pt-1 translate-y-[50%] right-[30px] z-10 cursor-pointer shadow-md rounded-full bg-white"
      :class="{ '!hidden': !isSticky }" @click="scrollToTop">
      <UIcon name="i-material-symbols:fitbit-arrow-upward" style="color: #5A5B5B;" class="w-6 h-6 " />
      Top
    </div>

    <div class="absolute left-0 top-0 w-[100px] h-[100px] z-[-10]">
      <NuxtImg v-for="(item, index) in productinfo.skuList.filter(item => item.imageList.length > 0)" :key="index"
        :src="`${item.imageList[0]}?x-oss-process=image/resize,w_100,limit_0/format,webp`" class="w-[100px] h-[100px]"
        loading="lazy" />
    </div>
    <UModal v-model="addSuccessOpen"
      :ui="{ width: 'lg:w-[500px] lg:max-w-[500px] sm:max-w-sm', container: 'items-center', background: 'dark:bg-white' }">
      <div class="p-8 pb-6">
        <div class="mb-4 text-gray-400">
          The product has been successfully added to the shopping cart
        </div>

        <!-- 按钮区域 -->
        <div class="flex flex-row gap-4 justify-end">
          <div
            class="border border-gray-50 rounded px-4 py-1 cursor-pointer text-[14px] text-[#5A5B5B] hover:opacity-90"
            @click="closeAddSuccess">
            Continue Shopping
          </div>

          <div class="bg-primary rounded px-4 py-1 cursor-pointer text-[14px] text-white hover:opacity-90"
            @click="goCart">
            View Cart
          </div>
        </div>
      </div>
    </UModal>

    <!-- Proposed Desc Drawer -->
    <ClientOnly>
      <Drawer v-model:open="drawerVisible" :title="drawerTitle" placement="right" :width="drawerWidth"
        @close="closeProposedDrawer">
        <div class="prose max-w-none" v-shadow-html="drawerContent"></div>
      </Drawer>
    </ClientOnly>

    <ImgListModal :isShow="showSkuImgModal" :imgList="curSkuImage ? [curSkuImage] : []" :defaultIndex="0"
      @close="updateSkuImgModal(false)" />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed, watch, nextTick } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { message, Drawer } from 'ant-design-vue'
import { useFbq } from '~/composables/useFbq'
import { useCartStore } from '@/stores/cart'
import { ActivityScope } from '~/types/Activity'
import { copyCode } from '~/utils/tools'
import { formatTimestamp } from '~/utils/format'

const { addToCartEvent, initiateCheckout } = useFbq({ currency: 'USD' })
const { viewItem, addToCart: trackAddToCart, beginCheckout } = useTrack()
const { checkProductAvailablePurchase, getProductSpuV2ById, trialPriceCalculationBySpuV4, erpTryToCreateSkuV2, propSideLengthTool } = ProductAuth()
const { createCart } = cartAuth()
const { getspuCommentProductRollPage, getgroupComment } = CommentAuth()
const { getSortInProgressMarketingActivityFromLocation, countDisTotalAmountOrdered } = ActivityAuth()
const PageTag = 'Products=====产品页面==='
const route = useRoute()
const router = useRouter()
const cart = useCartStore()
const addSuccessOpen = ref(false)
const productid = computed(() => route.params.id?.[0]?.split('-')?.pop())

const preview = computed(() => route.query.preview);
const { headerHeight } = useHeaderHeight()

/** ===== 其余原有逻辑 ===== **/
const cartLoading = ref(false)
const orderLoading = ref(false)
const drawerVisible = ref(false)
const drawerContent = ref('')
const drawerTitle = ref('')
const measureTargetIndex = ref(null)
const measureSides = ref([]) // numeric array reflecting needinput inputList length
const productinfo = ref({})
const quantity = ref(1)
// Keep a copy of original gallery to restore when SKU has no images
const originalPhotoList = ref([])

// 检查产品是否有效
const { data: serverProductData, pending, error } = await useAsyncData(() => `getProductSpuV2ById-${productid.value}`, () => {
  // 服务端：抛出错误
  if (!productid.value || Number(productid.value) <= 0) {
    throwPageError()
    return null
  }
  return getProductSpuV2ById({
    id: productid.value,
    needPublishSkuData: true,
    needPropData: true,
  })
})

if (error.value) {
  console.error(PageTag, '服务端渲染报错---Error fetching product data:', error.value)
}

console.log(PageTag, '服务端渲染---Fetched product data:', serverProductData.value)
const breadcrumbLinks = ref([])
const getLinks = (productInfo) => {
  const links = [{ label: 'Home', to: convertToAbsolutePath('/'), }]
  const { catalogPathIdList, catalogPathNameList, productEnglishName, seoUrlKeyword } = productInfo
  if (catalogPathIdList?.length > 0) {
    catalogPathIdList.forEach((id, index) => {
      links.push({
        label: catalogPathNameList[index],
        to: convertToAbsolutePath(`/categories/${slugify(catalogPathNameList[index])}-${id}`),
      })
    })
  }
  links.push({
    label: productEnglishName,
    to: convertToAbsolutePath(`/products/${slugify(seoUrlKeyword || productEnglishName)}-${productInfo.id}`),
    disabled: true,
    hidden: true,
  })

  return links
}

const createJsonLdProduct = (productInfo) => {
  const breadcrumbParams = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbLinks.value.map((link, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": link.label,
      "item": link.to
    }))
  }
  const currentSeoUrl = convertToAbsolutePath(`/products/${slugify(productInfo.seoUrlKeyword || productInfo.productEnglishName)}-${productInfo.id}`)
  const params = {
    "@context": "https://schema.org",
    "@type": "Product",
    brand: {
      "@type": "Brand",
      name: 'Incustom'
    },
    sku: productInfo.id,
    name: productInfo.productEnglishName,
    description: extractTextFromRichText(productInfo.detailedCustomList?.[0]?.value || ''),
    image: productInfo.mainPic.url, //图片url
    offers: {
      "@type": "Offer",
      url: currentSeoUrl,//详情页url
      price: productInfo.basePrice?.toFixed(2),
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition"
    },
  }
  if (productInfo?.groupComments?.total > 0) {
    const ratingData = calculateRating(productInfo?.groupComments?.groupList || {})
    Object.assign(params, {
      aggregateRating: {
        "@type": "AggregateRating",
        reviewCount: productInfo.groupComments.total,
        ratingValue: ratingData.ratingValue,
        bestRating: 5,
        worstRating: 1,
      },
      review: productInfo.reviews.map((item) => ({
        "@type": "Review",
        author: {
          "@type": "Person",
          name: item.fullName
        },
        reviewRating: {
          "@type": "Rating",
          ratingValue: item.rank,
        },
        datePublished: formatTimestamp(item.createDate),
        reviewBody: item.content || '',
      }))
    })


  }
  // console.log(PageTag, 'currentSeoUrl product:', currentSeoUrl)
  // ✅ 如果 SEO 字段为空，回退到商品英文名
  useHead({
    title: productinfo.value.productEnglishName || 'Product Detail',
    link: [
      {
        rel: 'canonical',
        href: currentSeoUrl,
      },
    ],
    meta: [
      {
        name: 'description',
        content: productinfo.value.seoMetaDescription || ''
      }
    ],
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify(params)
      },
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify(breadcrumbParams)
      }
    ]
  })

  useServerSeoMeta({
    description: () => productinfo.value.productEnglishName || ''
  })
  console.log(PageTag, 'SEO 信息已更新---Creating JSON-LD for product with reviews:', breadcrumbParams, params)
}

const initData = (data) => {
  if (data?.id > 0) {
    console.log(PageTag, '==initData==Product Data fetched:', data)
    productinfo.value = data
    // Transform new API structure to old structure
    if (!productinfo.value.photoList && productinfo.value.fileList) {
      // Transform fileList to photoList
      productinfo.value.photoList = productinfo.value.fileList.map(file => ({
        url: file.url,
        type: file.type,
        altText: file.altText
      }))
    }
    // Cache original gallery after mapping + ensure fileList sync
    if (Array.isArray(productinfo.value.photoList)) {
      originalPhotoList.value = productinfo.value.photoList.map(it => ({ ...it }))
      productinfo.value.fileList = productinfo.value.photoList.map(it => ({ url: it.url, type: it.type, altText: it.altText }))
    }

    // Map spu to productStyle for backward compatibility
    if (productinfo.value.spu && !productinfo.value.productStyle) {
      productinfo.value.productStyle = productinfo.value.spu
    }

    // Transform new API structure (propList) to old structure (normalPropertyList)
    if (productinfo.value.propList && !productinfo.value.normalPropertyList) {
      productinfo.value.normalPropertyList = productinfo.value.propList.map(prop => {
        // Transform propValueList to detailList
        const detailList = (prop.propValueList || []).map(propValue => {
          const groups = Array.isArray(propValue.groupList) ? propValue.groupList : []
          const inputNames = groups.flatMap(g => (g.inputList || []).map(i => i.inputName))
          const groupsMeta = []
          const inputMeta = [] // 保留每个输入框的完整元数据（包括 inputStart/inputEnd）
          let start = 0
          groups.forEach(g => {
            const len = (g.inputList || []).length
            groupsMeta.push({ name: g.groupName, start, length: len })
              // 保存每个输入框的元数据
              ; (g.inputList || []).forEach(input => {
                inputMeta.push({
                  inputId: input.inputId,
                  inputName: input.inputName,
                  inputStart: input.inputStart,
                  inputEnd: input.inputEnd,
                  unit: input.unit || '',
                  inputType: input.inputType,
                  viewType: input.viewType !== undefined ? input.viewType : 10, // 默认为输入框
                  ruleList: input.ruleList || []  // 下拉选择框的选项
                })
              })
            start += len
          })

          return {
            propertyDetailId: propValue.id,
            detailName: propValue.enName,
            propertyId: prop.id,
            imageLink: propValue.imageUrlList?.[0] || '',
            imageList: Array.isArray(propValue.imageUrlList) ? propValue.imageUrlList : [],
            skuList: propValue.skuIdList || [], // Map skuIdList to skuList
            isactive: true,
            label: propValue.enName,
            // Flattened input names for compatibility; keep group metadata for UI
            inputList: inputNames.length ? inputNames : null,
            groupsMeta: groupsMeta.length ? groupsMeta : null,
            inputMeta: inputMeta.length ? inputMeta : null // 新增：保存输入框元数据
          }
        })

        const hasAnyImg = detailList.some(d => !!d.imageLink)
        return {
          propertyId: prop.id,
          propertyName: prop.enName || prop.zhName,
          propertyNameShop: prop.enName,
          propertyType: prop.type,
          // carry special restrictions for downstream UI (e.g., measurement tool)
          specialRestrictionList: Array.isArray(prop.specialRestrictionList) ? prop.specialRestrictionList : [],
          productPropertyDetailType: hasAnyImg ? 'image' : 'text',
          desc: prop.desc || '',
          proposedDesc: prop.proposedDesc || '',
          proposedView: prop.proposedView || false,
          proposedViewType: prop.proposedViewType || 10,
          detailList: detailList,
          selectedproperty: {},
          showType: true
        }
      })
    }

    // Ensure original gallery cache

    const links = getLinks(data)
    breadcrumbLinks.value = links
    createJsonLdProduct(data)
  }
}

initData(serverProductData.value?.result)
if (!productinfo.value?.id) {
  throwPageError()
}
// const showMainList = ref(productinfo.value.photoList ? productinfo.value.photoList.slice(0, 1) : [])
console.log('商品详情Fetched product data:', productinfo.value)
const { isPageLoaded, hasUserInteracted } = usePageInteraction();
const { isMobile, isPad } = useMobile();
const curImgIndex = ref(0);

/***********************************新逻辑 */
const curSku = ref(null) // 当前选中SKU对象
const curCustomSku = ref(null) // 当前选中后端生成的SKU对象


const showSkuImg = ref(false) // 是否展示SKU图片（如果当前SKU有独立图片，则展示；否则展示主图）
const showSkuImgModal = ref(false) // 是否展示 SKU 图片弹窗
const hasSelectedSku = ref(false) // 是否已切换过 SKU（即是否已选完所有必选属性）
const curSkuValueList = ref(null) // 当前选中SKU的属性值（维度）列表，格式为 [{ propertyId, propertyName, detailId, detailName, ... }, ...]
const propsListRef = ref(null);

const isCustomized = computed(() => {
  return productinfo.value.propList?.some(prop => prop.type == 10)
})

const curProductSkuId = computed(() => {
  if (isCustomized.value) {
    return curCustomSku.value?.id
  } else {
    return curSku.value?.id
  }
  return null
})

const skuPrice = ref(0) // 当前SKU价格，定制属性价格会动态计算
const customPrice = ref(0) // 是否已计算过定制价格（避免没有计算）
const customPriceError = ref(null) // 定制价格计算错误信息
const updateSkuPrice = async () => {
  customPrice.value = 0 // 输入变化时重置定制价格，避免误导用户
  customPriceError.value = null // 清除之前的错误信息
  let skuPriceT = Number(productinfo.value.basePrice.toFixed(2)) || 0
  if (curSku.value) {
    if (isCustomized.value) {
      if (propsListRef.value) {
        const inputErrorMap = propsListRef.value?.getInputErrorMap({ needCheckNullError: true })
        if (Object.keys(inputErrorMap).length === 0) {
          // 没有输入错误，计算定制价格
          try {
            const params = { productId: String(productinfo.value.id || ''), skuPropList: curSkuValueList.value }
            const customRes = await trialPriceCalculationBySpuV4(params)
            const price = customRes?.result?.basePrice ?? 0
            customPrice.value = price
            skuPriceT = Number(price.toFixed(2)) || 0
          } catch (error) {
            let msg = 'Failed to calculate custom price, please try again'
            try { msg = JSON.parse(error?.message || '{}')?.enDesc } catch { msg = error?.message }
            customPriceError.value = msg
            customPrice.value = 0
          }
        }
      }
    } else {
      skuPriceT = Number(curSku.value.basePrice.toFixed(2)) || 0
    }
  }
  skuPrice.value = skuPriceT
}


const curOriginPrice = computed(() => {
  if (curSku.value) {
    if (curSku.value.originPrice && curSku.value.originPrice > curSku.value.basePrice) {
      return Number(curSku.value.originPrice.toFixed(2)) || 0
    }
  }
  if (productinfo.value.originPrice > productinfo.value.basePrice) {
    return Number(productinfo.value.originPrice.toFixed(2)) || 0
  }
  return null
})

const curSkuImage = computed(() => {
  if (curSku.value?.imageList?.length > 0) {
    return curSku.value.imageList[0]
  }
  return ''
})

const totalPrice = computed(() => Number(quantity.value * skuPrice.value || 0)?.toFixed(2))


const handleSkuIdUpdate = (newSkuId) => {
  curSku.value = productinfo.value.skuList?.find(sku => sku.id === newSkuId)
  showSkuImg.value = curSku.value && curSku.value.imageList && curSku.value.imageList.length > 0
  // updateSkuPrice()
  console.log(PageTag, '接收到的 curSkuId:', curSku.value, productinfo.value);
};

const handleSkuHasSelected = (hasSelected) => {
  hasSelectedSku.value = hasSelected
}

const updateSkuImgModal = (v) => {
  showSkuImgModal.value = v
}

const handleSkuValueUpdate = (v) => {
  console.log(PageTag, '接收到的 SkuValueList 属性值更新:', v, isCustomized.value);
  curSkuValueList.value = v
  updateSkuPrice()
  // 这里可以根据需要处理属性值更新后的逻辑，例如更新价格、图片等
}

const handleInputChange = (v) => {
  customPrice.value = 0 // 输入变化时重置定制价格，避免误导用户
  customPriceError.value = null // 清除之前的错误信息
}
const isMainImgListVisible = ref(false);

const handleMainImgVisible = (visible) => {
  isMainImgListVisible.value = visible;
};

const btnSectionRef = ref(null);
const isBtnSectionScrollHidden = ref(false);
// const btnSectionObserver = ref(null);


const showZoomSKuImageBtn = computed(() => {
  return curSkuImage.value && !isMainImgListVisible.value && !isBtnSectionScrollHidden.value // 移动端或平板端显示放大镜提示
})

const validateInputs = () => {
  if (propsListRef.value) {
    return propsListRef.value.checkInputError({ needCheckNullError: true });
  }
};

const validateSku = async () => {
  if (preview.value == 'true') {
    message.error('This product is not available for purchase')
    return false
  }
  if (!curSku.value?.id) {
    message.warning('Please select properties.')
    return false
  }
  if (!quantity.value || quantity.value <= 0) {
    message.error('Please enter quantity!')
    return false
  }
  // 有定制属性时候 要检查输入情况
  if (isCustomized.value && validateInputs()) {
    return false
  }

  // if (isCustomized.value && customPriceError.value) {
  //   isValid = false
  // }
  if (isCustomized.value && !customPrice.value) {
    if (customPriceError.value) {
      return false
    } else {
      await updateSkuPrice() // 尝试更新价格，可能之前计算失败了
    }
  }
  if (isCustomized.value && !(customPrice.value && !customPriceError.value)) {
    return false
  }
  if (isCustomized.value) {
    try {
      const sku = await createSku()
      if (!sku || !sku.id) {
        return false
      }
    } catch (error) {
      return false
    }
  }
  return true;
}

const createSku = async () => {
  try {
    const t = [
      {
        "propId": "1990322325735837696",
        "propEnName": "Specify Your Size",
        "propZhName": "室内卷帘-定制尺寸",
        "_propType": 10,
        "propValueId": "1990325777081798660",
        "propValueEnName": "Size1",
        "skuIdList": [
          "1991741700644671488",
          "1991741700644671489",
          "1991741700644671490"
        ],
        "_selected": true,
        "inputList": [
          {
            "inputId": "1990325777081798656",
            "inputName": "Width Integer",
            "inputValue": "22",
            "_groupName": "Width"
          },
          {
            "inputId": "1990325777081798657",
            "inputName": "Width Fraction",
            "inputValue": "0",
            "_groupName": "Width"
          },
          {
            "inputId": "1990325777081798658",
            "inputName": "Length Integer",
            "inputValue": "22",
            "_groupName": "Length"
          },
          {
            "inputId": "1990325777081798659",
            "inputName": "Length Fraction",
            "inputValue": "0",
            "_groupName": "Length"
          }
        ]
      },

      {
        "propId": "1991466002323476480",
        "propEnName": "Color",
        "propZhName": "正事达C/L/S型弧形铝百叶拉丝",
        "propValueId": "1991466002378002432",
        "propValueEnName": "Brushed Blue",
        "skuIdList": [
          "1991741700644671488"
        ]
      },
    ]

    const params = {
      productId: productinfo.value.id,
      productSkuV2Id: curSku.value.id,
      skuPropList: curSkuValueList.value
    }
    const res = await erpTryToCreateSkuV2(params)
    if (res?.result?.id) {
      curCustomSku.value = res.result
      console.log(PageTag, 'createSku success, new SKU created with ID:', res.result.id)
    } else {
      console.error(PageTag, 'createSku response does not contain expected SKU ID:', res)
    }
    return res.result
  } catch (error) {
    console.error(PageTag, 'createSku error:', error)
    let msg = 'Failed to create SKU, please try again'
    try { msg = JSON.parse(error.message || '{}').enDesc || msg } catch (_) { msg = error?.message || msg }
    message.error(msg)
    throw error
  }
}



const handleAddToCart = async () => {
  const isValid = await validateSku()
  if (!isValid) {
    return
  }
  try {
    cartLoading.value = true
    // 创建购物车
    const data = { productQuantity: quantity.value, productSkuId: curProductSkuId.value, opType: 'create' }
    await createCart(data)
    cart.refreshCart()
    addSuccessOpen.value = true
    collectAddToCartEvent()
  } catch (error) {
    let msg = 'add to cart failed, please try again'
    try { msg = JSON.parse(error.message || '{}').enDesc || msg } catch (_) {
      if (error?.name === 'EMPTY_DIMENSION' || error?.name === 'NOT_CHOSEN') msg = error.message
    }
    message.error(msg)
  } finally {
    cartLoading.value = false
  }
}

const handleOrder = async () => {
  const isValid = await validateSku()
  // console.log(PageTag, 'validateSku---isValid:', isValid)
  if (!isValid) {
    return
  }

  try {
    const redirect_to = useCookie('redirect_to');
    orderLoading.value = true
    const res = await checkProductAvailablePurchase({ productSkuV2IdList: [curProductSkuId.value] })
    if (res?.code !== 0) {
      message.error(res?.errorBody?.enDesc || 'checkProductAvailablePurchase error')
      return;
    }
    collectOrderEvent();
    const linkUrl = '/checkout?from=detail&sku=' + curProductSkuId.value + '&number=' + quantity.value + (offPrice.value ? `&couponCode=${encodeURIComponent(activityInfo.value.couponCode || '')}` : '')
    redirect_to.value = linkUrl
    router.push(linkUrl)
  } catch (error) {
    console.error(error)
    let msg = 'order failed, please try again'
    try {
      msg = JSON.parse(error.message || '{}').enDesc || msg
    } catch (_) {
      if (error?.name === 'EMPTY_DIMENSION' || error?.name === 'NOT_CHOSEN') {
        msg = error.message   // 'No dimensions entered!' / 'Please select properties!'
      }
    }
    message.error(msg)
  } finally {
    orderLoading.value = false
  }

}

// 三方事件收集
const collectAddToCartEvent = () => {
  try {
    const selectSku = toRaw(curSku.value) || {}
    // FB Pixel
    addToCartEvent({
      value: totalPrice.value,
      currency: 'USD',
      content_ids: [],
      contents: [{ id: curProductSkuId.value, quantity: quantity.value, item_price: Number(selectSku.basePrice.toFixed(2)) }],
      content_type: 'product',
      num_items: quantity.value
    })

    // GA4
    const gaItem = toGa4Item()
    if (gaItem) trackAddToCart(gaItem)

    // ✅ ✅ TikTok Pixel
    if (window.ttq) {
      window.ttq.track('AddToCart', {
        content_id: String(selectSku.id),
        quantity: quantity.value,
        value: totalPrice.value,
        currency: 'USD',
        contents: [{
          id: String(curProductSkuId.value),
          quantity: quantity.value,
          item_price: Number(selectSku.basePrice.toFixed(2))
        }],
        description: productinfo.value.productEnglishName || ''
      })
      console.log('🟢 TikTok AddToCart sent:', selectSku)
    }
  } catch (e) {
    console.error('collectAddToCartEvent error:', e)
  }

}

const collectOrderEvent = () => {
  try {
    const selectSku = toRaw(curSku.value) || {}
    // 埋点
    initiateCheckout({
      value: totalPrice.value,
      currency: 'USD',
      content_ids: [curProductSkuId.value],
      contents: [{ id: curProductSkuId.value, quantity: quantity.value, item_price: selectSku.basePrice }],
      content_type: 'product',
      num_items: quantity.value
    })
    const gaItem = toGa4Item()
    if (gaItem) beginCheckout({ items: [gaItem], value: Number(totalPrice.value), currency: 'USD' })

    // ✅ ✅ TikTok Pixel
    if (window.ttq) {
      try {
        window.ttq.track('InitiateCheckout', {
          content_id: String(curProductSkuId.value), // ⚠️ 必填
          content_type: 'product',
          quantity: quantity.value,
          price: Number(selectSku.basePrice.toFixed(2)),
          value: Number(totalPrice.value),
          currency: 'USD',
          contents: [
            {
              content_id: String(curProductSkuId.value),
              quantity: quantity.value,
              price: Number(selectSku.basePrice.toFixed(2))
            }
          ],
          description: productinfo.value.productEnglishName || ''
        })
        console.log('🟢 TikTok InitiateCheckout sent:', selectSku)
      } catch (e) {
        console.warn('TikTok InitiateCheckout failed:', e)
      }
    }
  } catch (e) {
    console.error('collectOrderEvent error:', e)
  }

}

const toGa4Item = () => {
  const p = productinfo.value
  if (!p) return null
  return {
    item_id: String(productinfo.value.id),
    item_name: p.productEnglishName || '',
    price: Number(skuPrice.value),
    currency: 'USD',
    quantity: quantity.value ?? 1,
    item_variant: curSku.value ? curSku.value.id : undefined,
    // 可选
    // item_brand: p.productName,
    // item_category: getCatalogId(productinfo.value.catalogPathIdList) || undefined,
  }
}

//  查看详情：封装一个上报函数
const reportViewItem = () => {
  if (process.server) return
  const item = toGa4Item()
  if (item) viewItem(item)
}


/****************新逻辑结束 */

// onMounted(async () => {
//   const res = await getProductSpuV2ById({
//     id: productid.value,
//     needPublishSkuData: true,
//     needPropData: true,
//   })
//   console.log('客户端Mounted获取最新商品详情:', res)
// })

const closeAddSuccess = () => { addSuccessOpen.value = false }
const goCart = () => {
  addSuccessOpen.value = false
  router.push('/cart') // 按你的实际购物车路径改
}
const HEADER_HEIGHT = 100
const TAB_HEIGHT = 40
const tabsContainer = ref(null)
const isSticky = ref(false)
const activeSection = ref('')
const ticking = ref(false)

const drawerWidth = computed(() => {
  if (isMobile.value) return '320px'
  if (isPad.value) return '400px'
  return '520px'
})

const serviceList = [
  { img: '/product/service_1.webp', svg: '#icon-free-shipping', text: 'Free Shipping' },
  { img: '/product/service_2.webp', svg: '#icon-energy-efficiernt', text: 'Energy Efficient' },
  { img: '/product/service_3.webp', svg: '#icon-lifetime-warranty', text: 'Lifetime Warranty' },
]
const payList = ['/product/pay1.webp', '/product/pay2.webp', '/product/pay3.webp', '/product/pay4.webp', '/product/pay5.webp', '/product/pay6.webp', '/product/pay7.webp']

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

const handleImgChange = (index) => {
  showSkuImg.value = false
  curImgIndex.value = index
}

if (productinfo.value.mainPic) {
  if (!productinfo.value.mainPic.url) {
    productinfo.value.mainPic.url = '/images/empty.jpg'
  }
}
// Initialize original photos from first load (prefer existing photoList, else derive from fileList)
if (Array.isArray(productinfo.value?.photoList)) {
  originalPhotoList.value = productinfo.value.photoList.map(it => ({ ...it }))
} else if (Array.isArray(productinfo.value?.fileList)) {
  // Derive photoList from fileList for gallery consumption
  const derived = productinfo.value.fileList.map(f => ({ url: f.url, type: f.type || (isVideo(f.url) ? 'video' : 'image'), altText: f.altText }))
  productinfo.value.photoList = derived
  originalPhotoList.value = derived.map(it => ({ ...it }))
}

const tabindex = ref(1)

const averageRating = ref(0)
const totalReviews = ref(0)
const starPercentages = ref({ 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 })
const reviews = ref([])
const currentPage = ref(1)
const pageSize = ref(5)
const totalPages = ref(1)
const isLoading = computed(() => pending.value)
const isBottomBarVisible = ref(false)
const detailSectionRef = ref(null)
const isVideo = (url) => /\.(mp4|m4v|mov|webm)$/i.test(url)

const activityInfo = ref({})

/** ======== 按 sort 排序统一整理所有详情段落 + 评论 ======== **/
const sections = computed(() => {
  const allSections = []

  // 1️⃣ Description（详情描述）
  const descValue = productinfo.value.detailedDescription?.value
    || productinfo.value.erpProduct?.remarks
  if (productinfo.value.detailedDescription?.show && descValue) {
    allSections.push({
      key: 'description',
      label: 'Description',
      type: 'html',
      content: descValue,
      sort: productinfo.value.detailedDescription?.sort ?? 999
    })
  }

  // 2️⃣ Specifications（参数组）
  if (productinfo.value.detailedParam?.show && productinfo.value.detailedParam.groupList?.length) {
    let html = `<table style="width:100%;border-collapse:collapse;border:1px solid #E5E7EB;">`
    productinfo.value.detailedParam.groupList.forEach(group => {
      html += `
        <tr>
          <th colspan="2"
              style="text-align:left;background:#F3F4F6;color:#111827;font-weight:600;
                     padding:14px 16px;border-bottom:1px solid #E5E7EB;">
            ${group.name}
          </th>
        </tr>
      `
      const paramMap = {}
        ; (group.valueList || []).forEach(v => {
          if (!paramMap[v.name]) paramMap[v.name] = []
          if (v.value) paramMap[v.name].push(v.value)
        })

      Object.entries(paramMap).forEach(([paramName, values]) => {
        const val = values.join(', ')
        html += `
          <tr>
            <td style="width:32%;padding:16px;border-bottom:1px solid #E5E7EB;
                       background:#FAFAFA;font-weight:500;color:#111827;">
              ${paramName}
            </td>
            <td style="padding:16px;border-bottom:1px solid #E5E7EB;color:#111827;">
              ${val}
            </td>
          </tr>
        `
      })
    })
    html += `</table>`

    allSections.push({
      key: 'specifications',
      label: 'Specifications',
      type: 'html',
      content: html,
      sort: productinfo.value.detailedParam?.sort ?? 0
    })
  }

  // 3️⃣ FAQ（常见问题）
  if (productinfo.value.detailedFaq?.show && productinfo.value.detailedFaq.detailedFaqList?.length) {
    const faqList = productinfo.value.detailedFaq.detailedFaqList.map(f => ({
      label: f.title,
      content: f.value
    }))
    allSections.push({
      key: 'faq',
      label: 'FAQ',
      type: 'faq',
      content: faqList,
      sort: productinfo.value.detailedFaq?.sort ?? 0
    })
  }

  // 4️⃣ 自定义详情（Custom Sections）
  if (productinfo.value.detailedCustomList?.length) {
    productinfo.value.detailedCustomList
      .filter(i => i.show)
      .forEach(i => {
        allSections.push({
          key: i.title.toLowerCase().replace(/\s+/g, '-'),
          label: i.title,
          type: 'html',
          content: i.value,
          sort: i.sort ?? 0
        })
      })
  }

  // 5️⃣ Reviews（评论模块）
  if (reviews.value?.length > 0) {
    allSections.push({
      key: 'reviews',
      label: 'Reviews',
      type: 'reviews',
      sort: -1 // 固定放最后
    })
  }

  // ✅ 按 sort 升序排列
  const sorted = allSections.sort((a, b) => (b.sort ?? 0) - (a.sort ?? 0))
  return sorted
})
/** ======== Tabs 同步按排序生成 ======== **/
const tabs = computed(() => {
  return sections.value.map(item => ({
    key: item.key,
    label: item.label
  }))
})

const scrollToSection = (key) => {
  if (!process.client) return // ✅ SSR 保护
  const el = document.getElementById(`section-${key}`)
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY - HEADER_HEIGHT - TAB_HEIGHT - 10
    window.scrollTo({ top, behavior: 'smooth' })
  }
}


const increment = () => { quantity.value++ }
const decrement = () => { if (quantity.value > 1) quantity.value-- }

const catalogPathIdList = getCatalogId(productinfo.value.catalogPathIdList)

function getCatalogId(arr) {
  if (!Array.isArray(arr) || arr.length === 0) return ''
  if (arr.length >= 2) return arr[1]
  return arr[0]
}


const closeProposedDrawer = () => {
  drawerVisible.value = false
}

// Measurement tool helpers

const measureTargetProp = computed(() => {
  const idx = measureTargetIndex.value
  if (idx === null || idx === undefined) return null
  return productinfo.value.normalPropertyList?.[idx] || null
})

const currentNeedOption = computed(() => {
  const p = measureTargetProp.value
  if (!p || !p.needinputlist?.length) return null
  const actives = p.needinputlist.filter(i => i.isactive !== false && i.disabled !== true)
  const chooseIdx = Number(p.chooseindex || 2) - 2
  return actives[chooseIdx] || actives[0]
})

const measureInputLabels = computed(() => {
  const opt = currentNeedOption.value
  if (opt?.inputList?.length) return opt.inputList.map((n, i) => n || `Side ${i + 1}`)
  // Fallback: create labels based on existing sides length
  return measureSides.value.map((_, i) => `Side ${i + 1}`)
})

const offPrice = ref('')
const getOffAccountPrice = async (quantity, totalPrice, activityInfo) => {
  if (!activityInfo.couponCode || quantity <= 0 || totalPrice <= 0) {
    offPrice.value = ''
    return
  }
  const res = await countDisTotalAmountOrdered({
    marketingActivity: {
      discountType: activityInfo.discountType,
      discountRuleList: activityInfo.discountRuleList,
    },
    totalAmountOrdered: totalPrice,
    totalQtyOrdered: quantity
  })
  if (res.result) {
    offPrice.value = (totalPrice - Number(res.result)).toFixed(2)
  } else {
    offPrice.value = ''
  }
  console.log(PageTag, 'getOffAccountPrice result:', res)
}
watch([() => quantity, () => totalPrice, () => activityInfo], (newVal) => {
  console.log(PageTag, 'quantity or totalPrice changed:', quantity.value, totalPrice.value, activityInfo.value)
  getOffAccountPrice(quantity.value, totalPrice.value, activityInfo.value)
}, { immediate: true, deep: true })

const onQuantityInput = (e) => {
  let val = parseInt(e.target.value.replace(/[^\d]/g, '')) || 1
  if (val < 1) val = 1
  if (val > 999) val = 999
  quantity.value = val
}

const handleScroll = () => {
  if (!detailSectionRef.value) return
  const rect = detailSectionRef.value.getBoundingClientRect()
  if (btnSectionRef.value) {
    const btnSectionRect = btnSectionRef.value.getBoundingClientRect()
    if (btnSectionRect.top + btnSectionRect.height <= HEADER_HEIGHT + 30) {
      isBtnSectionScrollHidden.value = true
    } else {
      isBtnSectionScrollHidden.value = false
    }
  }
  // 当“产品详情块”的底部滚出视口（<= 0）后，底部栏一直显示
  isBottomBarVisible.value = rect.bottom <= 0

  if (!process.client) return // ✅ SSR 保护
  if (ticking.value) return
  ticking.value = true

  window.requestAnimationFrame(() => {
    const tabsEl = tabsContainer.value
    if (tabsEl) {
      const tabsTop = tabsEl.getBoundingClientRect().top
      isSticky.value = tabsTop <= HEADER_HEIGHT
    }

    // 激活逻辑
    let current = ''
    const windowTop = window.scrollY
    const activationOffset = headerHeight.value + 30

    tabs.value.forEach(tab => {
      const section = document.getElementById(`section-${tab.key}`)
      if (section) {
        const sectionTop = section.offsetTop - activationOffset
        if (windowTop >= sectionTop) current = tab.key
      }
    })




    activeSection.value = current || tabs.value[0]?.key
    ticking.value = false
  })
}

const getStarStatus = (starIndex) => {
  if (!averageRating.value && averageRating.value !== 0) return 'empty'
  const fullStars = Math.floor(averageRating.value)
  const decimalPart = averageRating.value - fullStars
  if (starIndex <= fullStars) return 'full'
  if (starIndex === fullStars + 1 && decimalPart >= 0.25 && decimalPart <= 0.75) return 'half'
  if (starIndex === fullStars + 1 && decimalPart > 0.75) return 'full'
  return 'empty'
}

const formatShanghaiToLocalDate = (shanghaiDate) => {
  const date = new Date(shanghaiDate)
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

const fetchGroupComments = async () => {
  const groupRes = await getgroupComment({ productId: productid.value })
  const result = groupRes.result
  productinfo.value.groupComments = result
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
      productId: productid.value,
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
    productinfo.value.reviews = rollRes.result.list
    totalPages.value = Math.ceil(
      (rollRes.result.total > 0 ? rollRes.result.total : reviews.value.length) / pageSize.value
    )
    if ((!productinfo.value.remarks || productinfo.value.remarks.trim() === '') &&
      productinfo.value.printPropertyList?.length === 0 &&
      reviews.value.length > 0) {
      tabindex.value = 3
    } else if (reviews.value.length === 0 && tabindex.value === 3) {
      tabindex.value = 1
    }
    // scrollToSection('reviews')
    // sortReviews()
  } catch (error) {
    message.error('Failed to load comments')
    console.error(error)
  } finally { message.destroy() }
}

function calculateRating(data) {
  // 初始化变量
  let totalSum = 0; // 总评分值
  let totalCount = 0; // 总评分数量
  let bestRating = null; // 最高评分
  let worstRating = null; // 最低评分

  // 遍历评分数据
  data.forEach(item => {
    if (item.count > 0) {
      totalSum += item.sum; // 累加评分总值
      totalCount += item.count; // 累加评分数量
      bestRating = bestRating === null ? item.group : Math.max(bestRating, item.group); // 更新最高评分
      worstRating = worstRating === null ? item.group : Math.min(worstRating, item.group); // 更新最低评分
    }
  });

  // 计算平均分值
  const ratingValue = totalCount > 0 ? (totalSum / totalCount).toFixed(2) : 0;

  return {
    ratingValue: parseFloat(ratingValue), // 平均分值
    bestRating, // 最高评分
    worstRating // 最低评分
  };
}

onMounted(() => {
  fetchActivityInfo()
  fetchGroupComments()
  fetchComments()
  reportViewItem()
  if (!process.client) return // ✅ SSR 保护
  window.addEventListener('scroll', handleScroll, { passive: true })
  // ✅ TikTok Pixel - ViewContent
  if (window.ttq && productinfo.value?.erpProduct) {
    const p = productinfo.value.erpProduct
    window.ttq.track('ViewContent', {
      content_id: String(productinfo.value.id || p.productId),
      content_type: 'product',
      price: Number(p.basePrice ?? 0),
      value: Number(p.basePrice ?? 0),
      currency: 'USD',
      description: p.productEnglishName || ''
    })
    console.log('🟢 TikTok ViewContent sent:', productinfo.value.id)
  }
  nextTick(() => {
    window.dispatchEvent(new Event('resize'))
  })
})

onUnmounted(() => {
  if (!process.client) return
  clearAllJsonLdScripts()
  window.removeEventListener('scroll', handleScroll)
})
const fetchActivityInfo = async () => {
  try {
    const res = await getSortInProgressMarketingActivityFromLocation({ location: ActivityScope.productDetailsPage, spuId: productid.value })
    if (!res.result) {
      return
    }
    const { discountStr } = getDiscountStr({ discountType: res.result.discountType, discountRuleList: res.result.discountRuleList })
    activityInfo.value = {
      discountType: res.result.discountType,
      discountRuleList: res.result.discountRuleList,
      mallView: res.result.mallView,
      couponCode: res.result.couponCode,
      discountStr: discountStr,
    }
    console.log(PageTag, '活动列表', res.result, activityInfo.value)
  } catch (error) {
    // message.error('Failed to load activities.')
  } finally {
    // toast.add({ title: 'Failed to load activities.' })
    // loading.value = false
  }
}
</script>
