<template>
  <div class="bg-white w-full pt-3 md:pt-[32px]">
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
    <div v-else class="max-row">
      <UBreadcrumb divider=">" :links="breadcrumbLinks"
        class="mb-3 md:mb-[30px] text-blackcolor custom-breadcrumb text-2xl" :ui="{
          base: 'hover:underline font-normal',
          li: 'text-sm font-normal text-gray-400',
          active: 'text-customblack dark:text-primary-400 no-underline hover:no-underline font-normal',
          divider: { base: 'px-2 text-gray-400 no-underline' }
        }" />

      <!-- 产品详情部分 -->
      <div class="text-gray-800" ref="detailSectionRef">
        <div class="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-8">

          <!-- Left section with image thumbnails (已改：主图手势滑动 + 缩略图联动) -->
          <div class="md:col-span-5">
            <div class="sticky top-[100px] z-[49]">
              <ClientOnly>
                <!-- 主图 Swiper（支持视频自动播放） -->
                <div class="relative"
                  v-if="currentSkuImage || (productinfo.photoList && productinfo.photoList.length > 0)">
                  <Swiper :modules="[Navigation, Controller]" ref="swiperRefMain" :space-between="10"
                    :slides-per-view="1" class="w-full aspect-square overflow-hidden mb-4 relative rounded shadow-lg"
                    :navigation="{ nextEl: '.main-button-next', prevEl: '.main-button-prev' }" @swiper="onMainSwiper"
                    @slideChange="onMainSlideChange">

                    <!-- SKU 图片作为第一张主图 -->
                    <SwiperSlide v-if="currentSkuImage" :key="'sku-' + currentSkuImage.url"
                      class="swiper-slide w-full h-full flex items-center justify-center bg-[#F8F8F8] relative">
                      <template v-if="isVideo(currentSkuImage.url)">
                        <video ref="videoEls" class="w-full h-full object-contain" :src="currentSkuImage.url" controls
                          playsinline preload="metadata"></video>
                      </template>
                      <template v-else>
                        <NuxtImg format="webp" :src="currentSkuImage.url || '/images/empty.jpg'"
                          :alt="currentSkuImage.altText || productinfo.productEnglishName || 'Product image'"
                          class="main-image w-full h-full object-cover transition-all duration-300"
                          :class="{ 'cursor-pointer': !isMobile }" @load="onMainImageLoaded" @mousemove="onMouseMove"
                          @mouseleave="onMouseLeave" @mouseenter="onMouseEnter" />
                      </template>
                      <div v-if="showZoomBox && !isMobile" class="zoom-box" :style="zoomBoxStyle"></div>
                    </SwiperSlide>

                    <!-- 原始产品图片 -->
                    <SwiperSlide v-for="(item, idx) in productinfo.photoList" :key="item.url || idx"
                      class="swiper-slide w-full h-full flex items-center justify-center bg-[#F8F8F8] relative">
                      <template v-if="isVideo(item.url)">
                        <video ref="videoEls" class="w-full h-full object-contain" :src="item.url" controls playsinline
                          preload="metadata"></video>
                      </template>
                      <template v-else>
                        <NuxtImg format="webp" :src="item.url || '/images/empty.jpg'"
                          :alt="item.altText || productinfo.productEnglishName || 'Product image'"
                          class="main-image w-full h-full object-cover transition-all duration-300"
                          :class="{ 'cursor-pointer': !isMobile }" @load="onMainImageLoaded" @mousemove="onMouseMove"
                          @mouseleave="onMouseLeave" @mouseenter="onMouseEnter" />
                      </template>

                      <!-- 放大方块 -->
                      <div v-if="showZoomBox && !isMobile" class="zoom-box" :style="zoomBoxStyle"></div>

                      <!-- 右侧悬浮框 -->

                    </SwiperSlide>



                    <!-- 主图左右按钮 -->
                    <div class="main-button-prev absolute left-[5px] top-1/2 -translate-y-1/2 z-10 cursor-pointer"
                      :class="{ 'opacity-30 pointer-events-none': isSwiperAtStart }">
                      <div
                        class="w-[34px] h-[34px] bg-white rounded-full flex items-center justify-center shadow text-primary">
                        <BaseIcon name="i-raphael:arrowleft2" class="text-primary w-6 h-6" />

                      </div>
                    </div>
                    <div class="main-button-next absolute right-[5px] top-1/2 -translate-y-1/2 z-10 cursor-pointer"
                      :class="{ 'opacity-30 pointer-events-none': isSwiperAtEnd }">
                      <div
                        class="w-[34px] h-[34px] bg-white rounded-full flex items-center justify-center shadow text-primary">
                        <BaseIcon name="i-raphael:arrowright2" class="text-primary w-6 h-6" />


                      </div>
                    </div>
                  </Swiper>
                  <div class="zoom-preview-box rounded" v-if="showZoomBox && !isMobile" :style="zoomPreviewBoxStyle">
                    <div class="zoomed-image" :style="zoomedImageStyle"></div>
                  </div>
                </div>

                <!-- 无图片时的占位显示 -->
                <div v-else
                  class="w-full aspect-square overflow-hidden mb-4 relative rounded shadow-lg bg-[#F8F8F8] flex items-center justify-center">
                  <NuxtImg format="webp" src="/images/empty.jpg"
                    :alt="productinfo.productEnglishName || 'Product image'" class="w-full h-full object-cover" />
                </div>


                <!-- 缩略图 Swiper（视频带播放图标） -->
                <Swiper v-if="productinfo.photoList && productinfo.photoList.length > 0"
                  :modules="[Navigation, Controller]" ref="swiperRefThumb" :space-between="10" class="w-full"
                  :breakpoints="{ 0: { slidesPerView: 6, slidesPerGroup: 1 } }"
                  :navigation="showThumbNavigation ? { nextEl: '.custom-button-next', prevEl: '.custom-button-prev' } : false"
                  @swiper="onThumbSwiper" @slideChange="onThumbSlideChange">


                  <!-- 产品原始图片缩略图 -->
                  <SwiperSlide v-for="(item, idx) in productinfo.photoList" :key="'thumb-' + (item.url || idx)"
                    @click="onThumbClick(idx)" :class="{ 'active-thumb': isThumbActive(idx) }">
                    <div
                      class="relative w-full aspect-square rounded overflow-hidden cursor-pointer hover:opacity-80 bg-[#F8F8F8]">
                      <template v-if="isVideo(item.url)">
                        <video muted loop playsinline :src="item.url" class="w-full h-full object-cover"></video>
                        <div
                          class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 text-white">
                          <BaseIcon name="i-mdi:play-circle" class="w-6 h-6 text-white" />
                        </div>
                      </template>
                      <template v-else>
                        <NuxtImg width="80" height="80" loading="eager"
                          :src="(item.url || '/images/empty.jpg') + '?x-oss-process=image/auto-orient,1/resize,w_100,limit_0'"
                          :alt="item.altText || productinfo.productEnglishName || 'Product thumbnail'"
                          class="w-full h-full object-cover" />
                      </template>
                    </div>
                  </SwiperSlide>

                  <!-- 缩略图左右按钮 - 只有当缩略图占满一行时才显示 -->
                  <div v-if="showThumbNavigation"
                    class="custom-button-prev absolute left-[5px] top-1/2 -translate-y-1/2 z-10 cursor-pointer"
                    :class="{ 'opacity-30 pointer-events-none': isSwiperAtStart }">
                    <div class="w-5 h-5 bg-white rounded-full flex items-center justify-center shadow text-primary">
                      <BaseIcon name="i-raphael:arrowleft2" class="text-primary w-4 h-4" />

                    </div>
                  </div>
                  <div v-if="showThumbNavigation"
                    class="custom-button-next absolute right-[5px] top-1/2 -translate-y-1/2 z-10 cursor-pointer"
                    :class="{ 'opacity-30 pointer-events-none': isSwiperAtEnd }">
                    <div class="w-5 h-5 bg-white rounded-full flex items-center justify-center shadow text-primary">
                      <BaseIcon name="i-raphael:arrowright2" class="text-primary w-4 h-4" />

                    </div>
                  </div>
                </Swiper>

              </ClientOnly>
            </div>
          </div>

          <!-- Right section（原样） -->
          <div class="md:col-span-7">
            <div class="flex items-center justify-between">
              <h1 class="text-base font-normal md:text-lg lg:text-2xl mb-0 md:line-clamp-3 cursor-default"
                :title="productinfo.productEnglishName">
                {{ productinfo.productEnglishName }}
              </h1>
            </div>
            <!-- 新增：评分类展示 -->
            <div v-if="reviews.length > 0" class="flex items-center gap-2 text-sm sm:text-base mb-2 sm:mb-0 mt-4">
              <div class="flex items-center gap-1">
                <span v-for="star in 5" :key="star" class="text-[#FFD359]">
                  <BaseIcon v-if="getStarStatus(star) === 'full'" name="i-mdi:star" class="text-[#FFD359]" />
                  <BaseIcon v-else-if="getStarStatus(star) === 'half'" name="i-mdi:star-half-full"
                    class="text-[#FFD359]" />
                  <BaseIcon v-else name="i-mdi:star-outline" class="text-gray-300" />
                </span>
              </div>
              <span class="text-gray-900 font-semibold">{{ averageRating.toFixed(1) }}</span>
              <span class="text-primary cursor-pointer underline" @click="scrollToSection('reviews')">
                {{ totalReviews.toLocaleString() }} reviews
              </span>
            </div>
            <div
              class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0  pb-4 pt-4 border-b border-b-[#D1D1D1]">
              <div class="flex items-center gap-3">
                <div class="text-base sm:text-xl font-medium text-primary">${{ skuprice }}</div>
                <!-- SKU已确定：显示SKU的originPrice作为划线价 -->
                <div v-if="currentSku && currentSku.originPrice > currentSku.basePrice"
                  class="text-sm sm:text-base text-gray-500 line-through">
                  ${{ currentSku.originPrice.toFixed(2) }}
                </div>
                <!-- SKU未确定：显示产品的originPrice作为划线价 -->
                <div v-else-if="!currentSku && productinfo.originPrice > productinfo.basePrice"
                  class="text-sm sm:text-base text-gray-500 line-through">
                  ${{ productinfo.originPrice.toFixed(2) }}
                </div>
              </div>
            </div>

            <!-- Section 1: THE TYPE（原样） -->
            <div v-if="productinfo.normalPropertyList">
              <div class="border-b border-b-[#D1D1D1] py-4" :data-prop-block="index"
                v-for="(property, index) in productinfo.normalPropertyList" :key="index">
                <div class="flex justify-between items-center cursor-pointer" @click="changeshow(index)">
                  <h2 class="font-normal text-base flex items-center mb-0">
                    <UBadge size="lg" :color="isUndefinedOrEmptyObject(property.selectedproperty) ? 'white' : 'black'"
                      variant="solid" class="mr-3 w-[24px] h-[24px] flex items-center justify-center"
                      :ui="{ color: { black: { solid: 'dark:bg-gray-900 dark:text-white' } }, size: { lg: 'text-base' } }">
                      {{ index +
                        1 }}</UBadge>
                    <span class="truncate-1-lines font-medium text-sm md:text-base">{{ property.propertyNameShop
                      }}</span>
                    <!-- Proposed tip: Tooltip type (proposedViewType=10) -->
                    <Tooltip color="#000" :overlayInnerStyle="{ color: '#fff' }" placement="top"
                      v-if="property.proposedView && property.proposedViewType === 10 && property.proposedDesc"
                      :title="property.proposedDesc"
                      :overlayStyle="{ maxWidth: '330px', whiteSpace: 'pre-line', wordBreak: 'break-word' }">
                      <img src="/question.png" class="w-4 h-4 ml-2" />
                    </Tooltip>
                    <!-- Proposed tip: Drawer type (proposedViewType=20) -->
                    <button v-if="property.proposedView && property.proposedViewType === 20 && property.proposedDesc"
                      @click.stop="openProposedDrawer(property)"
                      class="ml-2 text-xs text-primary hover:text-primary-600 underline font-medium">
                      View Tips
                    </button>

                  </h2>
                  <div class="flex items-center">
                    <span class="mr-4 truncate-1-lines text-sm text-[#5A5B5B]" v-if="property.selectedproperty">
                      {{ property.isneedinput && Number(property.chooseindex) >= 2 ? getFormattedInputDisplay(property)
                        :
                        property.selectedproperty.detailName }}
                    </span>
                    <BaseIcon :name="property.showType ? 'i-lucide-chevron-up' : 'i-lucide-chevron-down'"
                      class="w-5 h-5 text-gray-500 font-medium transition-all duration-300" />
                  </div>
                </div>

                <!-- Measurement tip (specialRestrictionList: type=20,use=true) -->
                <div v-if="hasMeasurementTool(property)" class="mt-2 text-xs sm:text-sm text-gray-700 leading-6">
                  <div class="flex items-start gap-2">
                    <div>
                      The factory only accepts the dimensions of the sail, if you provide the distance between the
                      fixing points.
                      <button class="ml-1 text-primary underline font-medium"
                        @click.stop="openMeasurementDrawer(property, index)">
                        Click Here
                      </button>
                    </div>
                  </div>
                </div>

                <div :class="[
                  'transition-all duration-300 ease-in-out grid gap-1 grid-container',
                  property.showType ? 'max-h-[500px] mt-4 overflow-y-auto ' : 'overflow-hidden max-h-0',
                  !property.isneedinput && property.productPropertyDetailType != 'text' && property.detailList.every(item => item.imageLink) ? 'grid-cols-8 md:grid-cols-10 lg:grid-cols-12' : ''
                ]">
                  <div
                    v-if="!property.isneedinput && property.productPropertyDetailType != 'text' && property.detailList.every(item => item.imageLink)"
                    v-for="(type, propertyindex) in property.detailList" :key="type.propertyDetailId"
                    @click="!type.disabled && selectproperty(index, type)" :class="[
                      'p-0 rounded-xl flex flex-col items-center transition-all',
                      type.disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'
                    ]">
                    <Tooltip :title="type.detailName" placement="bottom">
                      <div :class="[
                        'w-full aspect-square overflow-hidden relative',
                        (!type.disabled ? 'hover:border hover:border-primary cursor-pointer' : 'opacity-60 cursor-not-allowed'),
                        property.selectedproperty && type.propertyDetailId === property.selectedproperty.propertyDetailId
                          ? 'rounded border border-primary'
                          : ''
                      ]" v-if="type.imageLink">
                        <NuxtImg
                          :src="(type.imageLink || '/images/empty.jpg') + '?x-oss-process=image/auto-orient,1/resize,w_100,limit_0'"
                          class="w-full h-full object-contain rounded" format="webp" :quality="80" />
                        <div
                          v-if="property.selectedproperty && type.propertyDetailId === property.selectedproperty.propertyDetailId"
                          class="absolute bottom-0 right-0 w-5 h-5">
                          <div class="absolute w-5 h-5 text-white"
                            style="clip-path: polygon(100% 100%, 0 100%, 100% 0); background-color: #00B2E3;">
                            <BaseIcon name="i-mdi:check" class="text-white w-4 h-4 absolute"
                              style="bottom: 0px; right: 0px;" width="12" height="12" />
                          </div>
                        </div>
                      </div>
                    </Tooltip>
                  </div>

                  <div class="w-full flex flex-wrap max-h-[160px] overflow-y-auto"
                    v-if="!property.isneedinput && (property.productPropertyDetailType == 'text' || !property.detailList.every(item => item.imageLink))">
                    <div v-for="(type, propertyindex) in property.detailList" :key="type.propertyDetailId"
                      @click="!type.disabled && selectproperty(index, type)" :class="[
                        'p-2 px-0 mr-4 rounded-xl flex flex-col items-center transition-all max-w-[33.3333%] min-w-[16.6%]',
                        type.disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer',
                        propertyindex === 0 ? 'ml-0' : ''  // Add ml-0 to the first element
                      ]">
                      <!-- 文本类型 -->
                      <div :class="[
                        'p-2 w-full text-sm relative border border-customblack w-full rounded-md',
                        !type.disabled ? 'hover:border hover:border-primary hover:text-primary' : '',
                        property.selectedproperty && type.propertyDetailId === property.selectedproperty.propertyDetailId
                          ? 'text-primary bg-primary-50 border border-primary w-full'
                          : ''
                      ]">
                        <div class="truncate-1-lines text-center">{{ type.detailName }}</div>
                        <div
                          v-if="property.selectedproperty && type.propertyDetailId === property.selectedproperty.propertyDetailId"
                          class="absolute bottom-0 right-0 w-5 h-5 text-white">
                          <div class="absolute w-5 h-5"
                            style="clip-path: polygon(100% 100%, 0 100%, 100% 0); background-color: #00B2E3;">
                            <BaseIcon name="i-mdi:check" class="text-white w-4 h-4"
                              style="position: absolute; bottom: 0px; right: 0px;" width="12" height="12" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>


                  <div class="flex flex-col md:flex-row md:items-start gap-6 relative w-full"
                    v-if="property.isneedinput">
                    <div class="flex-1">
                      <div class="text-base text-gray-800">
                        <div class="cursor-pointer block" :class="{ 'mt-3': needindex > 0 }"
                          v-for="(needinput, needindex) in property.needinputlist.filter(item => !item.disabled)">
                          <div class="flex items-center"
                            v-show="property.needinputlist.filter(item => !item.disabled).length > 1">
                            <label class="flex items-center space-x-2 cursor-pointer">
                              <input type="radio" v-model="property.chooseindex" :value="needindex + 2"
                                @change="changeinputvalue(property, needindex + 2, index)" />
                              <span class="font-semibold text-sm">{{ needinput.detailName }}</span>
                            </label>
                          </div>
                          <!-- Inputs: horizontal with wrap; group headers take full width -->
                          <div class="flex flex-wrap gap-x-3 gap-y-1">
                            <template v-for="(inputitem, pindex) in needinput.inputList" :key="pindex">
                              <!-- Group header: show only group name without range -->
                              <div v-if="needinput.groupsMeta && needinput.groupsMeta.some(g => g.start === pindex)"
                                class="w-full text-sm  text-gray-800">
                                <!-- {{ getGroupName(needinput, pindex) }} -->
                              </div>
                              <div class="flex items-center">
                                <ClientOnly>
                                  <!-- 根据viewType显示不同的输入组件 -->
                                  <template v-if="getInputConfig(needinput, pindex).viewType === 10">
                                    <!-- 输入框 -->
                                    <div>
                                      <div class="text-sm  text-gray-800">{{ getInputConfig(needinput, pindex).inputName
                                        || inputitem }} (<span v-if="getInputConfig(needinput, pindex).unit"> {{
                                          getInputConfig(needinput,
                                            pindex).unit
                                        }}</span>)</div>
                                      <InputNumber v-model:value="needinput.inputvalue[pindex]"
                                        @blur="changeinputvalue(property, needindex + 2, index)"
                                        class="custom-input rounded text-sm w-[250px] focus:outline-none focus:ring-0"
                                        :min="getInputConfig(needinput, pindex).min"
                                        :max="getInputConfig(needinput, pindex).max" :step="1"
                                        :placeholder="formatInputRange(needinput, pindex)" />
                                    </div>

                                  </template>
                                  <template v-else-if="getInputConfig(needinput, pindex).viewType === 50">
                                    <!-- 下拉选择框 -->
                                    <div>
                                      <div class="text-sm  text-gray-800">{{ getInputConfig(needinput, pindex).inputName
                                        || inputitem }} (<span v-if="getInputConfig(needinput, pindex).unit"> {{
                                          getInputConfig(needinput,
                                            pindex).unit
                                        }}</span>)</div>
                                      <Select v-model:value="needinput.inputvalue[pindex]" allowClear
                                        :options="getInputConfig(needinput, pindex).ruleList.map(rule => ({ label: rule.start, value: rule.start }))"
                                        size="middle" style="width: 250px;" :dropdownStyle="{ lineHeight: '28px' }"
                                        class="custom-select" placeholder="Please select"
                                        @change="() => changeinputvalue(property, needindex + 2, index)" />
                                    </div>

                                  </template>
                                  <!-- 显示单位与输入范围 -->
                                  <!-- <span
                                    v-if="getInputConfig(needinput, pindex).unit || formatInputRange(needinput, pindex)"
                                    class="text-xs text-gray-500 ml-1">
                                    {{ formatInputRange(needinput, pindex) }}
                                    <span v-if="getInputConfig(needinput, pindex).unit"> {{ getInputConfig(needinput,
                                      pindex).unit
                                      }}</span>
                                  </span> -->
                                </ClientOnly>
                              </div>
                            </template>
                          </div>
                          <div
                            v-if="errorsize && lastTrialPropIndex === index && Number(property.chooseindex) === (needindex + 2)"
                            class="text-red-500 text-sm mt-2">{{ errorsize }}</div>
                        </div>
                        <div v-if="property.noneedinputlist.length > 0"
                          class="flex items-center space-x-2 cursor-pointer mt-4">
                          <label class="flex items-center space-x-2 cursor-pointer">
                            <input type="radio" v-model="property.chooseindex" value="1"
                              @change="onChange(property.selectedproperty?.propertyDetailId, property, index)" />
                            <span class="font-bold text-sm">Standard size:</span>
                          </label>
                          <ClientOnly>

                            <Select :value="property.selectedproperty?.propertyDetailId" style="width: 200px"
                              class="myselect" :options="property.noneedinputlist"
                              :field-names="{ label: 'detailName', value: 'propertyDetailId' }"
                              placeholder="Please select attributes" show-search :filter-option="customFilter"
                              @change="val => onChange(val, property, index)" option-label-prop="label">
                              <template #option="{ detailName, imageLink, disabled }">
                                <div class="flex items-center gap-2" :class="{ 'opacity-50': disabled }">
                                  <img v-if="imageLink" :src="imageLink || '/images/empty.jpg'" class="w-6 h-6 mr-2" />
                                  <span>{{ detailName }}</span>
                                </div>
                              </template>
                            </Select>
                          </ClientOnly>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <p v-if="propErrors[index]" class="mt-2 text-red-500 text-sm">
                  {{ propErrors[index] }}
                </p>

              </div>
            </div>

            <!-- POD 区块（原样） -->
            <div class="mb-4 border-b border-b-[#D1D1D1] pb-4"
              v-show="productinfo.printPropertyList && productinfo.printPropertyList.length > 0">
              <div class="flex justify-between items-center cursor-pointer" @click="showDimensions = !showDimensions">
                <h2 class="font-bold text-lg flex items-center mb-0">
                  <UBadge color="black" variant="solid" class="mr-3">{{ productinfo.normalPropertyList.length + 1 }}
                  </UBadge>
                  PRINT ON DEMAND
                </h2>
                <BaseIcon :name="showDimensions ? 'i-lucide-chevron-up' : 'i-lucide-chevron-down'"
                  class="w-5 h-5 text-gray-500 transition-all duration-300" />
              </div>
              <div
                :class="['overflow-hidden transition-all duration-300 ease-in-out grid gap-4', showDimensions ? 'max-h-[500px] mt-4 overflow-y-auto' : 'max-h-0']">
                <div class="flex flex-col md:flex-row md:items-start gap-12 relative justify-between">
                  <div class="flex-1 space-y-4">
                    <p class="font-semibold text-sm">
                      <span v-for="(item, index) in productinfo.printPropertyList" :key="index">
                        {{ item.value }}{{ index < productinfo.printPropertyList.length - 1 ? ',' : '' }} </span>
                    </p>
                    <div class="text-primary border-b-2 w-fit border-primary py-1 font-semibold cursor-pointer">
                      Design Now
                    </div>
                  </div>
                  <div class="w-full md:w-40 shrink-0 self-center">
                    <img v-show="designimage" :src="designimage || '/images/empty.jpg'" alt="Dimension guide"
                      class="rounded-xl border" />
                  </div>
                </div>
              </div>
            </div>

            <!-- 数量/价格/按钮（原样） -->
            <div>
              <div class="w-full mx-auto bg-white rounded-md">
                <div class="flex flex-row sm:items-center justify-between gap-4 mt-3">
                  <span class="text-sm sm:text-lg font-medium">Quantity</span>
                  <div class="flex items-center rounded px-2">
                    <div class="flex items-center rounded">
                      <button
                        class="text-gray-500 px-2 hover:text-black bg-[#F8F8F8] h-[26px] flex items-center justify-center rounded-tl-[6px] rounded-bl-[6px]"
                        @click="decrement">
                        <BaseIcon name="i-heroicons-minus-20-solid" />
                      </button>

                      <input @input="onQuantityInput" v-model="quantity"
                        class="focus:outline-none focus:ring-0 focus:border-transparent w-12 h-[26px] text-center outline-none border-0 py-1 bg-[#F8F8F8] mx-0.5" />
                      <button
                        class="text-gray-500 px-2 hover:text-black bg-[#F8F8F8] h-[26px] flex items-center justify-center rounded-tr-[6px] rounded-br-[6px]"
                        @click="increment">
                        <BaseIcon name="i-heroicons-plus-20-solid" />
                      </button>
                    </div>
                    <span class="ml-2 text-sm sm:text-lg">Panels</span>
                  </div>
                </div>

                <div class="flex flex-row sm:items-center justify-between gap-4 mt-4">
                  <span class="text-sm sm:text-lg font-medium">Total price</span>
                  <div class="flex items-center flex-wrap gap-2">
                    <span class="text-sm sm:text-lg font-bold text-primary">${{ totalPrice.toFixed(2) }}</span>
                  </div>
                </div>
                <div class="flex flex-col sm:flex-row gap-4 mt-4">
                  <!-- Add to Cart -->
                  <UButton class="w-full sm:flex-1 flex items-center justify-center rounded-md 
           border border-[#00B4F0] text-[#00B4F0] bg-white 
           hover:bg-[#00B4F0] hover:text-white transition-colors disabled:bg-primary-100 disabled:text-primary"
                    :loading="cartloding" @click="addtocart" color="primary" variant="solid" size="xl">
                    Add to Cart
                  </UButton>

                  <!-- Order Now -->
                  <UButton class="w-full sm:flex-1 flex items-center justify-center rounded-md 
           bg-[#00B4F0] text-white hover:bg-[#0099D6] transition-colors" :loading="orderloding" @click="createorder"
                    color="primary" variant="solid" size="xl">
                    Order Now
                  </UButton>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- ✅ Tabs（滚动到自身位置才固定） -->
      <!-- ✅ 使用 Splide 取代 flex 滚动 -->
      <div ref="tabsContainer" class="bg-white z-40 transition-all duration-300 ease-in-out mt-4"
        :class="{ 'backdrop-blur-sm sticky top-[80px] lg:top-[100px]': isSticky }">

        <ClientOnly>
          <Splide :options="splideOptions" class="!overflow-visible">
            <SplideSlide v-for="(tab, i) in tabs" :key="tab.key" class="!w-auto">
              <div
                class="cursor-pointer text-sm sm:text-base transition-colors duration-200 py-3 px-4 text-d3black whitespace-nowrap"
                :class="{
                  'border-b-[3px] border-primary text-primary font-semibold font-bold':
                    activeSection === tab.key,
                  'text-gray-500 hover:text-primary hover:font-semibold': activeSection !== tab.key
                }" @click="scrollToSection(tab.key)">
                {{ tab.label }}
              </div>
            </SplideSlide>
          </Splide>


        </ClientOnly>
      </div>



      <!-- ✅ 实际内容段落（统一排序渲染） -->
      <ClientOnly>
        <div class="bg-[#F8F8F8]" v-if="sections && sections.length">
          <div class="mx-auto mt-4 bg-white pt-6">

            <section v-for="item in sections" :key="item.key" :id="'section-' + item.key"
              class="border-b border-gray-100 mb-4">
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
                        class="w-5 h-5 shrink-0 transition-transform duration-200"
                        :class="[open ? 'rotate-180' : '']" />
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
                <div v-oembed-to-iframe v-shadow-html="item.content"
                  class="prose max-w-none ck-content break-words whitespace-normal leading-relaxed"
                  style="word-break: break-word; overflow-wrap: anywhere;"></div>

              </template>

              <!-- Reviews -->
              <template v-else-if="item.type === 'reviews'">
                <div class="flex flex-col lg:flex-row gap-8">
                  <!-- 左侧：评分汇总（与示例图一致，固定宽度） -->
                  <aside class="w-full lg:w-[320px] xl:w-[360px] shrink-0">
                    <div class="bg-white rounded-lg">
                      <!-- 顶部标题与副标题（严格按图） -->
                      <div class="mb-[10px] text-black font-bold text-lg ">
                        <div class="mb-4">Reviews</div>
                        <div>Customer reviews</div>
                      </div>

                      <!-- 星星 + 平均分 + 分隔符 + Ratings（严格按文案） -->
                      <div class="flex items-center gap-3 mb-4">
                        <div class="flex items-center gap-1 text-[#FFD359] text-xl">
                          <span v-for="star in 5" :key="star">
                            <BaseIcon v-if="getStarStatus(star) === 'full'" name="i-mdi:star" class="text-[#FFD359]" />
                            <BaseIcon v-else-if="getStarStatus(star) === 'half'" name="i-mdi:star-half-full"
                              class="text-[#FFD359]" />
                            <BaseIcon v-else name="i-mdi:star-outline" class="text-gray-300" />
                          </span>
                        </div>
                        <span class="text-black text-primary">{{ averageRating.toFixed(1) }}</span>
                        <span class="h-4 w-px bg-primary inline-block text-primary"></span>
                        <button type="button" class="text-primary">
                          {{ totalReviews.toLocaleString() }} Ratings
                        </button>
                      </div>

                      <!-- 星级分布条 -->
                      <div class="space-y-3">
                        <div v-for="stars in 5" :key="stars" class="flex items-center gap-3">
                          <span class="w-12 text-xs text-gray-700">{{ 6 - stars }} star</span>
                          <div class="flex-1 bg-gray-100 h-3 rounded overflow-hidden">
                            <div :style="{ width: `${starPercentages[6 - stars]}%` }"
                              class="h-full bg-[#FFD359] transition-all duration-300"></div>
                          </div>
                          <span class="w-10 text-xs text-right text-gray-700">{{ starPercentages[6 - stars] }}%</span>
                        </div>
                      </div>
                    </div>
                  </aside>

                  <!-- 右侧：评论列表 -->
                  <section class="w-full lg:flex-1">
                    <div v-if="reviews.length === 0" class="text-center text-gray-500 py-4">No reviews yet.</div>

                    <div v-for="review in reviews" :key="review.date" class="bg-white p-4 border-b border-[#D1D1D1]">
                      <div class="flex items-center">
                        <div class="w-10 h-10 rounded-full flex items-center justify-center mr-3">
                          <NuxtImg src="/reviewer.png" class="w-11 h-11" />
                        </div>
                        <div>
                          <p class="text-sm font-semibold text-black">{{ review.name }}</p>
                          <p class="text-sm text-gray-300">{{ review.date }}</p>
                        </div>
                        <div class="ml-auto flex">
                          <span v-for="star in 5" :key="star" class="text-xl text-[#FFD359]">
                            <BaseIcon v-if="star <= review.rating" name="i-mdi:star" class="text-[#FFD359]" />
                            <BaseIcon v-else name="i-mdi:star-outline" class="text-gray-300" />
                          </span>
                        </div>
                      </div>

                      <p class="text-sm text-gray-400 my-2 mb-4">{{ review.text }}</p>

                      <div class="flex gap-2 flex-wrap"
                        v-if="review.pictureUrlList?.length || review.videoUrlList?.length">
                        <Image.PreviewGroup :preview="{
                          visible: review.previewVisible,
                          onVisibleChange: (visible) => {
                            review.previewVisible = visible;
                            if (!visible) {
                              review.previewIndex = 0;
                              selectedReview.value = null;
                              selectedMediaIndex.value = 0;
                              mediaList.value = [];
                            }
                          },
                          current: review.previewIndex,
                          onChange: (index) => {
                            review.previewIndex = index;
                            selectedMediaIndex.value = getMediaIndex(review, index, 'image');
                            selectedReview.value = review;
                            mediaList.value = [
                              ...(review.pictureUrlList || []).map((url) => ({ url, type: 'image' })),
                              ...(review.videoUrlList || []).map((url) => ({ url, type: 'video' })),
                            ];
                          },
                        }">
                          <div class="flex gap-2 flex-wrap">
                            <Image v-for="(image, index) in review.pictureUrlList?.slice(0, 5)" :key="'image-' + index"
                              :src="image" :alt="'Review image ' + (index + 1)" class="w-16 h-16 rounded object-cover"
                              @error="onImageError(index, review)" @click="selectReview(review, index, 'image')" />
                          </div>
                        </Image.PreviewGroup>

                        <div v-for="(video, index) in review.videoUrlList?.slice(0, 5)" :key="'video-' + index"
                          class="w-16 h-16 rounded overflow-hidden shadow-md cursor-pointer relative video-thumbnail"
                          @click="openImageModal(video, 'video', review, index)">
                          <video class="w-full h-full object-cover" :src="video" muted
                            @error="onVideoError(index, review)"></video>
                          <div class="absolute inset-0 flex items-center justify-center bg-primary bg-opacity-10">
                            <BaseIcon name="i-mdi:play-circle" width="32" height="32" class="text-white w-8 h-8" />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="flex justify-between mt-3 md:mt-6 items-center">
                      <Button :disabled="currentPage === 1" @click="prevPage" class="custom-btn">Previous</Button>
                      <Button :disabled="currentPage === totalPages" @click="nextPage" class="custom-btn">Next</Button>
                    </div>
                  </section>
                </div>
              </template>
            </section>

          </div>
        </div>
      </ClientOnly>



      <!-- 推荐产品部分（原样） -->
      <div class="mt-6 pb-4" v-if="products.length > 0">
        <h1 class="text-lg font-semibold mb-3 md:mb-4 dark:text-black">Similar item you might like</h1>
        <div class="grid grid-cols-2 md:grid-cols-5 gap-4">
          <NuxtLink :to="`/product/${product.id}/${slugify(product.productEnglishName)}`"
            v-for="(product, index) in products" :key="index"
            class="product-card rounded-lg transition-transform duration-300  hover:scale-[1.02] md:hover:-translate-y-0.5 cursor-pointer">
            <div class="relative overflow-hidden">
              <img :src="product.mainPic?.url
                ? `${product.mainPic.url}?x-oss-process=image/auto-orient,1/resize,w_500,limit_0`
                : '/images/empty.jpg'" :alt="product.mainPic?.altText || product.productEnglishName || 'Product image'"
                class="w-full h-full object-cover object-top rounded">
            </div>
            <div class="mt-2">
              <h3 class="text-sm font-normal mb-2 line-clamp-2 dark:text-black">{{ product.productEnglishName
                }}
              </h3>
              <p class="text-sm font-medium text-primary">
                <span class="text-sm sm:text-base font-medium text-primary">
                  ${{ product.basePrice }}
                </span>
                <!-- Crossed-out price -->
                <span v-if="product.originPrice" class="text-sm text-gray-400 line-through ml-3">
                  ${{ product.originPrice }}
                </span>
              </p>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Video Modal（原样） -->
    <div v-if="isImageModalOpen && selectedMediaType === 'video'"
      class="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center" @click.self="closeImageModal">
      <div class="relative bg-transparent p-0 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto">
        <video :src="selectedImage" controls autoplay class="w-full max-h-[80vh] object-contain relative modal-video">
          Your browser does not support the video tag.
        </video>
        <button v-if="mediaList.length > 1" class="absolute left-4 top-1/2 -translate-y-1/2 z-10 cursor-pointer"
          :class="{ 'opacity-30 pointer-events-none': selectedMediaIndex === 0 }" @click="prevMedia">
          <div class="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow text-primary">
            <BaseIcon name="i-raphael:arrowleft2" class="text-primary w-6 h-6" />
          </div>
        </button>
        <button v-if="mediaList.length > 1" class="absolute right-4 top-1/2 -translate-y-1/2 z-10 cursor-pointer"
          :class="{ 'opacity-30 pointer-events-none': selectedMediaIndex === mediaList.length - 1 }" @click="nextMedia">
          <div class="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow text-primary">
            <BaseIcon name="i-raphael:arrowright2" class="text-primary w-6 h-6" />
          </div>
        </button>
        <button
          class="absolute top-4 right-4 text-gray-500 w-8 h-8 flex items-center justify-center bg-transparent text-white"
          @click="closeImageModal">
          <BaseIcon name="i-mdi:close" width="32" height="32" class="w-8 h-8 text-white" />
        </button>
      </div>
    </div>

    <!-- Bottom bar（原样） -->
    <!-- 原来的 sticky 改成 fixed + 全宽 + 高 z-index -->
    <div ref="bottomBarRef" class="fixed bottom-0 left-0 right-0 z-50
         flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4
         py-4 px-8 bg-white rounded-none shadow-[0_-4px_16px_rgba(0,0,0,0.08)]
         transition-all duration-300 ease-in-out" :class="{
          'opacity-100 translate-y-0 pointer-events-auto': isBottomBarVisible,
          'opacity-0 translate-y-8 pointer-events-none': !isBottomBarVisible
        }" v-show="isshow && !isLoading">
      <div>
        <h2 class="font-semibold text-base sm:text-lg text-gray-900 line-clamp-3">{{ productinfo.productEnglishName }}
        </h2>
        <div class="text-sm text-gray-500">Ordinary type sail / Rectangle</div>
      </div>
      <div class="flex flex-wrap items-center gap-3 sm:gap-4">
        <div class="flex items-center rounded">
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
        <span class="text-sm text-gray-600">Panels</span>
        <span class="text-base sm:text-lg font-medium text-gray-800">${{ totalPrice.toFixed(2) }}</span>
        <UButton color="primary" size="md" @click="addtocart" class="rounded-lg">Add to Cart</UButton>
      </div>
    </div>

    <UModal v-model="addSuccessOpen"
      :ui="{ width: 'lg:w-[500px] lg:max-w-[500px] sm:max-w-sm', container: 'items-center' }">
      <div class="p-8 pb-6">
        <div class="mb-4 text-gray-400">
          The product has been successfully added to the shopping cart
        </div>

        <!-- 按钮区域 -->
        <div class="flex flex-col sm:flex-row gap-4 sm:justify-end">
          <Button @click="closeAddSuccess">
            Continue Shopping
          </Button>

          <Button type="primary" @click="goCart">
            View Cart
          </Button>
        </div>
      </div>
    </UModal>

    <!-- Proposed Desc Drawer -->
    <ClientOnly>
      <Drawer v-model:open="drawerVisible" :title="drawerTitle" placement="right" :width="500"
        @close="closeProposedDrawer">
        <div class="prose max-w-none" v-shadow-html="drawerContent"></div>
      </Drawer>
    </ClientOnly>

    <!-- Measurement Tool Drawer -->
    <ClientOnly>
      <Drawer v-model:open="measureDrawerVisible" title="Shade Sail Size Calculator" placement="right" :width="680">
        <div class="p-5 space-y-5 text-gray-800">
          <!-- Selected summary -->
          <div v-if="measureTargetProp" class="text-sm">
            <div class="font-medium">Selected: {{ measureTargetProp.propertyNameShop }}</div>
            <div v-if="currentNeedOption">
              <span class="text-gray-500">Option:</span>
              <span class="ml-1">{{ currentNeedOption.detailName }}</span>
            </div>
          </div>

          <!-- Step 1 -->
          <div>
            <div class="font-semibold mb-2">Step1: Choose Your Layout</div>
            <div class="text-sm text-gray-600 mb-2">Select the shape formed by your fixed points – rectangle, square,
              irregular quadrilateral, or triangle.</div>
            <div class="h-[180px] rounded overflow-hidden">
              <img
                v-if="(currentNeedOption && currentNeedOption.imageList && currentNeedOption.imageList.length) || currentNeedOption?.imageLink"
                :src="(currentNeedOption?.imageList && currentNeedOption.imageList[0]) || currentNeedOption?.imageLink"
                class="max-w-full max-h-full object-contain object-left" alt="layout" />
            </div>
          </div>

          <!-- Step 2 -->
          <div>
            <div class="font-semibold mb-2">Step2: Enter distances (in feet).</div>
            <div class="text-sm text-gray-600 mb-2">
              Enter distance {{ measureInputLabels.length > 0 ? measureInputLabels.join(' and ') : '' }}
            </div>
            <div class="space-y-3 max-w-[520px]">
              <div v-for="(label, i) in measureInputLabels" :key="'dist-' + i" class="flex items-center gap-2">
                <div class="text-sm text-gray-700 w-30">Enter distance {{ label }}</div>
                <ClientOnly>
                  <InputNumber v-model:value="measureDistances[i]" :min="0" :max="9999" :step="0.1"
                    style="width: 200px" />
                </ClientOnly>
                <span class="text-sm">inch</span>
              </div>
            </div>
            <div class="mt-3">
              <Button type="primary" @click="calcSides">Calculation side</Button>
            </div>
          </div>

          <!-- Step 3 results -->
          <div>
            <div class="font-semibold mb-2">Step3: Check the shade sail sizes we recommend for you</div>
            <div class="text-sm text-gray-600 mb-3">You can save the shade sail size combination and return to the input
              box
              to enter it with one click.</div>
            <div class="space-y-3 max-w-[520px]">
              <div v-for="(label, i) in measureInputLabels" :key="i"
                class="grid grid-cols-[auto_1fr] items-center gap-3">
                <div class="text-sm text-gray-700">{{ label }}</div>
                <ClientOnly>
                  <InputNumber v-model:value="measureSides[i]" :min="0" :max="9999" :step="0.1" style="width: 200px" />
                </ClientOnly>
              </div>
            </div>
          </div>

          <!-- Notes -->
          <div class="bg-blue-50 text-blue-900 text-xs p-3 rounded border border-blue-100">
            <div>Note:</div>
            <ol class="list-decimal ml-4 space-y-1">
              <li>The minimum angle of a triangular shade sail must be greater than 35°.</li>
              <li>A trapezoidal shade sail is a convex quadrilateral.</li>
              <li>The longest side of a triangular shade sail is 24 feet, and the longest side of a quadrilateral shade
                sail
                is 25 feet.</li>
            </ol>
          </div>

          <div class="pt-2">
            <Button type="primary" @click="applyMeasuredToProperty">Continue to buy</Button>
          </div>
        </div>
      </Drawer>
    </ClientOnly>

  </div>
</template>

<script setup>
import { Image } from 'ant-design-vue'
import 'swiper/css'
import 'swiper/css/navigation'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Controller } from 'swiper/modules'
import { ref, onMounted, onUnmounted, computed, watch, nextTick } from 'vue'
import { message, Tooltip, Select, InputNumber, Button, Drawer } from 'ant-design-vue'
import { useCartStore } from '@/stores/cart'
import { useRouter, useRoute } from 'vue-router'
import { useFbq } from '~/composables/useFbq'
import { Splide, SplideSlide } from '@splidejs/vue-splide'
import '@splidejs/vue-splide/css'
const { addToCartEvent, initiateCheckout } = useFbq({ currency: 'USD' })
const { viewItem, addToCart: trackAddToCart, beginCheckout } = useTrack()
const { getProductSpuV2ById, randomRecommendationProductByCatalogId, trialPriceCalculationBySpuV4, erpTryToCreateSkuV2, propSideLengthTool } = ProductAuth()
const { createCart } = cartAuth()
const { getspuCommentProductRollPage, getgroupComment } = CommentAuth()
const { getUserInfo } = useAuth()
const route = useRoute()
const router = useRouter()
const cart = useCartStore()
const propErrors = ref([]) // 每个属性一条错误文案
const addSuccessOpen = ref(false)

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
function resetPropErrors() {
  const len = (productinfo.value && productinfo.value.normalPropertyList)
    ? productinfo.value.normalPropertyList.length
    : 0
  propErrors.value = Array.from({ length: len }, () => '')
}
const splideOptions = {
  pagination: false,
  arrows: false,
  drag: 'free',
  autoWidth: true,
  rewind: false,
  gap: '40px', // 桌面端默认
  mediaQuery: 'max', // <= breakpoint 时应用 breakpoints
  breakpoints: {
    1024: { gap: '10px' }, // 平板和手机
  },
}
/** ===== 新增：Swiper 主图/缩略图引用 & 控制器 ===== **/
const swiperRefMain = ref()
const swiperRefThumb = ref()
const swiperMain = ref(null)
const swiperThumb = ref(null)
const mainImageIndex = ref(0)
const isSwiperAtStart = ref(true)
const isSwiperAtEnd = ref(false)

// Keep a copy of original gallery to restore when SKU has no images
const originalPhotoList = ref([])
const skuPhotosActive = ref(false)
const currentSkuImage = ref(null) // SKU 图片单独控制主图第一张

// 防止缩略图和主图之间的循环触发
const isUpdatingFromThumb = ref(false)
const isUpdatingFromMain = ref(false)

// 计算是否需要显示缩略图导航按钮（当缩略图超过一行显示数量时才显示）
const showThumbNavigation = computed(() => {
  const photoCount = productinfo.value?.photoList?.length || 0
  return photoCount > 6 // 缩略图一行显示6个，超过6个才需要导航按钮
})

// 检测是否为移动端（禁用放大镜功能）
const isMobile = computed(() => {
  if (!process.client) return false
  return window.innerWidth < 768 // md断点
})

const onMainSwiper = (s) => { swiperMain.value = s }
const onThumbSwiper = (s) => { swiperThumb.value = s }

// 缩略图轮播时同步主图
const onThumbSlideChange = (swiper) => {
  if (!swiperMain.value || isUpdatingFromMain.value) return

  // 设置标志，防止主图切换时再次触发缩略图同步
  isUpdatingFromThumb.value = true

  // 获取当前缩略图的活跃索引
  const thumbActiveIndex = swiper.activeIndex

  // 计算对应的主图索引
  // 由于缩略图和主图现在都包含相同的图片（包括SKU图片），可以直接映射
  const mainIndex = thumbActiveIndex

  // 切换主图到对应位置
  swiperMain.value.slideTo(mainIndex)

  // 重置标志
  setTimeout(() => {
    isUpdatingFromThumb.value = false
  }, 100)
}

// 缩略图点击处理
const onThumbClick = (thumbIndex) => {
  if (!swiperMain.value) return
  // 需要考虑 SKU 图片的偏移：如果有 SKU 图片，主图的第0张是 SKU，第1张开始是原始产品图片
  const mainIndex = currentSkuImage.value ? thumbIndex + 1 : thumbIndex
  swiperMain.value.slideTo(mainIndex)
}

// 判断缩略图是否为激活状态
const isThumbActive = (thumbIndex) => {
  const currentMainIndex = mainImageIndex.value
  // 计算实际的主图索引：如果有 SKU 图片，需要加1的偏移
  const actualMainIndex = currentSkuImage.value ? thumbIndex + 1 : thumbIndex
  return currentMainIndex === actualMainIndex
}

// 不再建立双向控制，因为主图有 SKU 图时索引会不匹配
// watch([swiperMain, swiperThumb], ([main, thumb]) => {
//   if (main && thumb) {
//     main.controller.control = thumb
//     thumb.controller.control = main
//   }
// })
const zoomPreviewBoxStyle = ref({})
const zoomBoxStyle = ref({});
const zoomedImage = ref('');
const zoomedImageStyle = ref({});
const showZoomBox = ref(false);
const zoomScale = 2;

// 当鼠标进入主图时，显示放大方块（移动端不启用）
const onMouseEnter = () => {
  if (isMobile.value) return
  console.log('Mouse enter - showing zoom box')
  showZoomBox.value = true;
};

// 当鼠标移动时，更新放大框的位置和显示内容（移动端不启用）
const onMouseMove = (event) => {
  if (isMobile.value) return
  console.log('Mouse move - updating zoom position')
  const swiperSlide = event.target.closest('.swiper-slide');
  const { left, top, width, height } = swiperSlide.getBoundingClientRect();
  const x = event.clientX - left;
  const y = event.clientY - top;

  // 设置预览框大小与主图一致
  zoomPreviewBoxStyle.value = {
    width: `${width}px`,
    height: `${height}px`,
  };

  // 计算选框大小（预览大小 / 缩放比例）
  const selectSize = width / zoomScale;
  const halfSize = selectSize / 2;

  // 计算选框中心位置，并限制在边界内
  let centerX = x;
  centerX = Math.max(halfSize, Math.min(centerX, width - halfSize));
  let centerY = y;
  centerY = Math.max(halfSize, Math.min(centerY, height - halfSize));

  // 计算选框左上角位置
  const selectLeft = centerX - halfSize;
  const selectTop = centerY - halfSize;

  // 更新放大方块的位置
  zoomBoxStyle.value = {
    top: `${selectTop}px`,
    left: `${selectLeft}px`,
    width: `${selectSize}px`,
    height: `${selectSize}px`,
    display: 'block',
  };

  // 获取当前主图的 src
  const mainImageElement = swiperSlide.querySelector('img');
  zoomedImage.value = mainImageElement.src;

  // 更新放大图片的样式
  zoomedImageStyle.value = {
    backgroundPositionX: `-${selectLeft * zoomScale}px`,
    backgroundPositionY: `-${selectTop * zoomScale}px`,
    backgroundImage: `url(${zoomedImage.value})`,
    backgroundSize: `${width * zoomScale}px ${height * zoomScale}px`,
  };
};

// 当鼠标离开时，隐藏放大方块（移动端不启用）
const onMouseLeave = () => {
  if (isMobile.value) return
  console.log('Mouse leave - hiding zoom box')
  showZoomBox.value = false;
};
// 主图切换时更新 index / 按钮状态 / mainImage（供其它逻辑用）
const onMainSlideChange = () => {
  const s = swiperMain.value
  if (!s) return
  mainImageIndex.value = s.activeIndex
  isSwiperAtStart.value = s.isBeginning
  isSwiperAtEnd.value = s.isEnd

  // 如果有 SKU 图，第一张是 SKU 图，后续是原图
  const slides = productinfo.value.photoList || []
  const skuOffset = currentSkuImage.value ? 1 : 0
  const actualIndex = s.activeIndex - skuOffset

  if (s.activeIndex === 0 && currentSkuImage.value) {
    mainImage.value = currentSkuImage.value.url
  } else if (actualIndex >= 0 && actualIndex < slides.length) {
    mainImage.value = slides[actualIndex]?.url || productinfo.value.mainPic
  } else {
    mainImage.value = slides[slides.length - 1]?.url || productinfo.value.mainPic
  }

  // 同步缩略图位置
  syncThumbPosition()

  // 更新预览框大小以匹配当前主图
  nextTick(() => {
    const currentSlide = s.slides[s.activeIndex]
    const mainImageElement = currentSlide?.querySelector('.main-image')
    if (mainImageElement && mainImageElement.complete) {
      const rect = mainImageElement.getBoundingClientRect()
      zoomPreviewBoxStyle.value = {
        width: `${rect.width}px`,
        height: `${rect.height}px`,
      }
    }
  })
}

// 同步缩略图位置到对应主图
const syncThumbPosition = () => {
  const thumbSwiper = swiperThumb.value
  if (!thumbSwiper || isUpdatingFromThumb.value) return

  // 设置标志，防止缩略图切换时再次触发主图同步
  isUpdatingFromMain.value = true

  const currentMainIndex = mainImageIndex.value

  // 计算对应的缩略图索引
  // 缩略图不包含 SKU 图片，所以需要计算偏移
  let thumbIndex = currentMainIndex
  if (currentSkuImage.value) {
    // 如果当前主图是 SKU 图片（index 0），不需要同步缩略图位置
    if (currentMainIndex === 0) {
      setTimeout(() => { isUpdatingFromMain.value = false }, 100)
      return
    }
    // 有 SKU 图片时，缩略图索引 = 主图索引 - 1
    thumbIndex = currentMainIndex - 1
  }

  // 确保缩略图索引在有效范围内
  const totalThumbs = (productinfo.value.photoList || []).length
  if (thumbIndex >= 0 && thumbIndex < totalThumbs) {
    // 让缩略图滚动到对应位置，使用 slideTo 方法
    thumbSwiper.slideTo(thumbIndex)
  }

  // 重置标志
  setTimeout(() => {
    isUpdatingFromMain.value = false
  }, 100)
}

/** ===== 其余原有逻辑 ===== **/
const lastpage = router.options.history.state.back
const cartloding = ref(false)
const orderloding = ref(false)
const orginproductinfo = ref({})
const drawerVisible = ref(false)
const drawerContent = ref('')
const drawerTitle = ref('')
const measureDrawerVisible = ref(false)
const measureTargetIndex = ref(null)
const measureDistances = ref([]) // anchor distances entered in Step 2, aligned with input labels
const measureSides = ref([]) // numeric array reflecting needinput inputList length
const productid = computed(() => route.params.id[0] ?? '29201')
const { data: serverProductData, pending, error } = await useAsyncData('product-detail', () => {
  return getProductSpuV2ById({
    id: productid.value,
    needPublishSkuData: true
  })
})

const showDimensions = ref(true)
const designimage = ref('')
const mainImage = ref('')
const productinfo = ref(serverProductData.value?.result ?? {})

// 检查产品是否有效
const isProductValid = productinfo.value.id && productinfo.value.productState === 'published'

// 服务端：抛出错误
if (process.server && !isProductValid) {
  throw createError({
    statusCode: 404,
    message: 'Product not found or not published.',
  })
}

// 客户端：显示错误页面
if (process.client && !isProductValid) {
  throw showError({
    statusCode: 404,
    statusMessage: 'Product not found or not published.'
  })
}

if (productinfo.value?.seoPageTitle || productinfo.value?.seoMetaDescription) {
  useHead({
    title: productinfo.value.seoPageTitle || productinfo.value.productEnglishName || 'Product Detail',
    meta: [
      {
        name: 'description',
        content: productinfo.value.seoMetaDescription || ''
      }
    ]
  })

  useServerSeoMeta({
    title: () => productinfo.value.seoPageTitle || productinfo.value.productEnglishName || 'Product Detail',
    description: () => productinfo.value.seoMetaDescription || ''
  })
} else if (productinfo.value?.productEnglishName) {
  // ✅ 如果 SEO 字段为空，回退到商品英文名
  useHead({
    title: productinfo.value.productEnglishName || 'Product Detail'
  })

  useServerSeoMeta({
    description: () => productinfo.value.productEnglishName || ''
  })
}

if (productinfo.value.mainPic) {
  if (!productinfo.value.mainPic.url) {
    productinfo.value.mainPic.url = '/images/empty.jpg'
  }
  mainImage.value = productinfo.value.mainPic
  console.log('Main image set from mainPic:', mainImage.value)

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
const skuprice = ref(productinfo.value?.basePrice ?? 0.1)
const products = ref([])
const quantity = ref(1)

// 计算当前选中的SKU
const currentSku = computed(() => {
  if (!productinfo.value?.skuList || !productinfo.value?.normalPropertyList) return null

  // 获取所有已选择的属性值
  const selectedProps = []
  for (const prop of productinfo.value.normalPropertyList) {
    if (prop.selectedproperty) {
      selectedProps.push({
        propId: prop.propertyId,
        propValueId: prop.selectedproperty.propertyDetailId
      })
    }
  }

  // 如果没有选择完整的属性组合，返回null
  if (selectedProps.length !== productinfo.value.normalPropertyList.length) return null

  // 在SKU列表中查找匹配的SKU
  return productinfo.value.skuList.find(sku => {
    if (!sku.propList || sku.propList.length !== selectedProps.length) return false

    return selectedProps.every(selectedProp =>
      sku.propList.some(skuProp =>
        skuProp.propId === selectedProp.propId &&
        skuProp.propValueId === selectedProp.propValueId
      )
    )
  })
})

const totalPrice = computed(() => quantity.value * skuprice.value)
const tabindex = ref(1)
const errorsize = ref('')
const lastTrialPropIndex = ref(null) // 仅当该属性进行尺寸试算报错时，展示 errorsize

// Watch for currentSku changes to update price
watch(currentSku, (newSku, oldSku) => {
  if (newSku && newSku.basePrice) {
    // 确定了SKU，使用SKU的basePrice
    skuprice.value = newSku.basePrice
  } else if (!newSku && oldSku) {
    // 从有SKU变为无SKU，回退到产品的basePrice
    skuprice.value = productinfo.value?.basePrice ?? 0.1
  }
}, { immediate: true })
const averageRating = ref(0)
const totalReviews = ref(0)
const starPercentages = ref({ 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 })
const reviews = ref([])
const currentPage = ref(1)
const pageSize = ref(5)
const totalPages = ref(1)
const sortOption = ref('latest')
const isImageModalOpen = ref(false)
const selectedImage = ref('')
const selectedMediaType = ref('video')
const mediaList = ref([])
const selectedMediaIndex = ref(0)
const selectedReview = ref(null)
const isLoading = computed(() => pending.value)
const isBottomBarHidden = ref(true)
const isBottomBarVisible = ref(false)
const detailSectionRef = ref(null)
const bottomBarRef = ref(null)
const isshow = ref(true)
const isVideo = (url) => /\.(mp4|m4v|mov|webm)$/i.test(url)
const videoEls = ref([])
const onMainImageLoaded = () => {
  nextTick(() => {
    swiperRefThumb.value?.swiper?.update()
  })
}

// Helper: update photoList and refresh swipers/zoom
function updatePhotoList(newList) {
  productinfo.value.photoList = newList
  // Keep fileList in sync for callers expecting fileList
  productinfo.value.fileList = (newList || []).map(it => ({ url: it.url, type: it.type, altText: it.altText }))
  nextTick(() => {
    // Reset to first slide
    try {
      swiperMain.value?.slideTo?.(0)
      swiperThumb.value?.update?.()
      mainImageIndex.value = 0
      const firstUrl = productinfo.value.photoList?.[0]?.url || productinfo.value.mainPic
      if (firstUrl) mainImage.value = firstUrl
      handleVideoPlayback()
    } catch (e) {
      // 可选：错误处理
      console.error(e)
    }
  })
}

// Try to apply SKU images (if any). Revert to original if none.
async function applySkuImagesIfAvailable(sku) {
  try {
    console.log('Applying SKU images for SKU:', sku)
    if (!sku) return

    // Find the SKU object from the current product detail's skuList
    const list = Array.isArray(productinfo.value?.skuList) ? productinfo.value.skuList : []
    const skuinfo = list.find(
      (it) => String(it.id) === String(sku) || String(it.mallProductSkuId) === String(sku)
    )

    if (!skuinfo) {
      currentSkuImage.value = null
      skuPhotosActive.value = false
      nextTick(() => {
        swiperMain.value?.slideTo(0)
        swiperMain.value?.update()
      })
      return
    }

    // Use imageList only; take the first image
    let firstUrl = null
    if (Array.isArray(skuinfo.imageList) && skuinfo.imageList.length) {
      const first = skuinfo.imageList[0]
      firstUrl = typeof first === 'string' ? first : (first && first.url)
    }

    if (firstUrl) {
      // 尝试从 mainPic 或 fileList 中获取 altText 作为备用
      const mainPicAltText = productinfo.value.mainPic?.altText || ''
      const fileListAltText = productinfo.value.fileList?.find(f => f.url === firstUrl)?.altText || ''

      currentSkuImage.value = {
        url: firstUrl,
        type: isVideo(firstUrl) ? 'video' : 'image',
        altText: fileListAltText || mainPicAltText || ''
      }
      skuPhotosActive.value = true
      nextTick(() => {
        swiperMain.value?.slideTo(0)
        swiperMain.value?.update()
      })
    } else {
      currentSkuImage.value = null
      skuPhotosActive.value = false
      nextTick(() => {
        swiperMain.value?.slideTo(0)
        swiperMain.value?.update()
      })
    }
  } catch (err) {
    currentSkuImage.value = null
    skuPhotosActive.value = false
    console.warn('applySkuImagesIfAvailable failed:', err)
  }
}
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


const changetab = (index) => { tabindex.value = index }
const increment = () => { quantity.value++ }
const decrement = () => { if (quantity.value > 1) quantity.value-- }
const handleVideoPlayback = () => {
  const s = swiperMain.value
  if (!s) return
  nextTick(() => {
    const allVideos = document.querySelectorAll('.swiper video')
    allVideos.forEach(v => v.pause())
    const currentSlide = s.slides[s.activeIndex]
    if (!currentSlide) return
    const video = currentSlide.querySelector('video')
    if (video) video.play().catch(() => { })
  })
}
function getCatalogId(arr) {
  if (!Array.isArray(arr) || arr.length === 0) return ''
  if (arr.length >= 2) return arr[1]
  return arr[0]
}
const toGa4Item = (opts = {}) => {
  const p = productinfo.value
  if (!p) return null
  const qty = opts.withQuantity ? (opts.q ?? quantity.value ?? 1) : 1
  return {
    item_id: String(productinfo.value.id),
    item_name: p.productEnglishName || '',
    price: Number(skuprice.value ?? p.basePrice ?? 0),
    currency: 'USD',
    quantity: qty,
    // 可选
    item_brand: p.productName,
    item_category: getCatalogId(productinfo.value.catalogPathIdList) || undefined,
  }
}

//  查看详情：封装一个上报函数
const reportViewItem = () => {
  if (process.server) return
  const item = toGa4Item()
  if (item) viewItem(item)
}

// Open drawer for proposedDesc
const openProposedDrawer = (property) => {
  drawerTitle.value = property.propertyNameShop
  drawerContent.value = property.proposedDesc || ''
  drawerVisible.value = true
}

const closeProposedDrawer = () => {
  drawerVisible.value = false
}

// Measurement tool helpers
const hasMeasurementTool = (property) => {
  const list = property && Array.isArray(property.specialRestrictionList)
    ? property.specialRestrictionList
    : []
  return list.some(r => Number(r?.type) === 20 && r?.use === true)
}
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

const openMeasurementDrawer = (property, index) => {
  try {
    measureTargetIndex.value = index
    const opt = (property.needinputlist || []).find((_, i) => (Number(property.chooseindex || 2) - 2) === i)
      || (property.needinputlist || []).find(i => i.isactive !== false && i.disabled !== true)

    // Initialize sides from existing values if present
    let sides = []
    if (Array.isArray(opt?.inputvalue) && opt.inputvalue.length) {
      sides = opt.inputvalue.map(v => (v === '' || v === null || v === undefined) ? null : Number(v))
    } else if (property.selectedproperty?.inputvalue) {
      const arr = String(property.selectedproperty.inputvalue).split('*')
      sides = arr.map(v => (v === '' || v === null || v === undefined) ? null : Number(v))
    } else if (Array.isArray(opt?.inputList)) {
      sides = opt.inputList.map(() => null)
    }
    measureSides.value = sides
    // initialize distances array with same length as labels (empty by default)
    const L = (sides && sides.length) || (opt?.inputList?.length || 0)
    measureDistances.value = Array.from({ length: L }, () => null)
    measureDrawerVisible.value = true
  } catch {
    measureDrawerVisible.value = true
  }
}

const calcSides = () => {
  // Fake calculation: copy entered distances to sides; fallback to simple defaults if empty
  const labels = measureInputLabels.value
  const len = labels.length || (measureSides.value?.length || 0) || 2
  const distances = measureDistances.value || []
  const result = Array.from({ length: len }, (_, i) => {
    const d = Number(distances[i])
    if (!isNaN(d) && d > 0) return d
    // fallback placeholders
    if (i === 0) return 10
    if (i === 1) return 12
    return 11
  })
  measureSides.value = result

  // 动态收集参数并调用测量工具接口
  const productId = productinfo.value?.productId
  const propIdx = measureTargetIndex?.value ?? 0
  const prop = productinfo.value?.normalPropertyList?.[propIdx]
  const propId = prop?.propId
  const propValueId = prop?.selectedproperty?.propValueId
  const inputList = Array.isArray(measureSides.value)
    ? measureSides.value.map((v, idx) => ({ inputId: String(idx + 1), inputValue: v }))
    : []
  if (!productId || !propId || !propValueId) {
    console.warn('测量工具参数不完整，无法调用')
    return
  }
  propSideLengthTool({
    productId,
    prop: {
      propId,
      propValueId,
      inputList
    }
  }).then(res => {
    console.log('测量工具结果:', res)
    // 可根据需要处理结果，如赋值、弹窗等
  }).catch(err => {
    console.error('测量工具接口调用失败', err)
  })
}

const applyMeasuredToProperty = () => {
  const idx = measureTargetIndex.value
  if (idx === null || idx === undefined) return
  const prop = productinfo.value.normalPropertyList?.[idx]
  if (!prop) return

  // Ensure needinput mode
  const actives = (prop.needinputlist || []).filter(i => i.isactive !== false && i.disabled !== true)
  const picked = actives[Number(prop.chooseindex || 2) - 2] || actives[0]
  if (!picked) return

  const values = (measureSides.value || []).map(v => (v === null || v === undefined) ? '' : String(v))
  picked.inputvalue = values.slice()
  prop.chooseindex = (actives.indexOf(picked) + 2).toString()
  // Sync selectedproperty in the same shape used by changeinputvalue()
  prop.selectedproperty = {
    detailName: picked.detailName,
    inputvalue: values.join('*'),
    inputList: picked.inputList,
    propertyId: prop.propertyId
  }
  // Trigger selection flow to recalc price/images
  selectproperty(idx, prop.selectedproperty)
  measureDrawerVisible.value = false
}

const handleGetrelated = async () => {
  try {
    let catalogPathIdList = productinfo.value.catalogPathIdList
    let recommendcateid = getCatalogId(catalogPathIdList)
    let parmes = { catalogId: recommendcateid, size: 5, excludeProductId: productinfo.value.id }
    let res = await randomRecommendationProductByCatalogId(parmes)
    products.value = res.result
  } catch (error) { console.error(error) }
}

/* =========================
   新增：双向联动通用函数
   ========================= */

/** 取某属性的所有候选项（统一为数组，兼容 needinput/noneedinput/detailList） */
function getAllOptionsOfProp(prop) {
  if (!prop) return []
  if (prop.isneedinput) {
    return [
      ...(prop.noneedinputlist || []),
      ...(prop.needinputlist || [])
    ]
  }
  return prop.detailList || []
}

/** 取某属性当前生效的 skuList（若未选则返回该属性“可用候选项”的并集） */
function getCurrentSkusOfProp(prop) {
  if (!prop) return []
  // 自定义输入模式
  if (prop.isneedinput && prop.chooseindex === 2) {
    const picked = (prop.needinputlist || []).find(i =>
      prop.selectedproperty?.detailName ? i.detailName === prop.selectedproperty.detailName : false
    )
    if (picked?.skuList?.length) return picked.skuList
    const actives = (prop.needinputlist || []).filter(i => i.isactive !== false && i.disabled !== true)
    const union = new Set()
    actives.forEach(i => (i.skuList || []).forEach(s => union.add(s)))
    return Array.from(union)
  }

  // 普通模式
  if (prop.selectedproperty?.skuList?.length) return prop.selectedproperty.skuList

  // 未选择：返回可用候选项并集
  const union = new Set()
  getAllOptionsOfProp(prop)
    .filter(o => o.isactive !== false && o.disabled !== true)
    .forEach(o => (o.skuList || []).forEach(s => union.add(s)))
  return Array.from(union)
}

/** 计算除第 i 个属性外，其它属性联合允许的 SKU 交集 */
function getAcceptableSkusExcept(indexToSkip) {
  const props = productinfo.value.normalPropertyList || []
  const others = props.filter((_, idx) => idx !== indexToSkip)

  // ✅ 单属性或“除自己外没有其它属性” → 返回 null 表示“无约束”
  if (others.length === 0) return null

  let acc = null
  others.forEach((p) => {
    const skus = getCurrentSkusOfProp(p)
    if (!acc) acc = skus.slice(0)
    else acc = acc.filter(s => skus.includes(s))
  })
  return acc || []
}


/** 依据其它属性约束，重算每个属性每个候选项是否可选（disabled） */
function recomputeAvailability() {
  const props = productinfo.value.normalPropertyList || []
  props.forEach((prop, i) => {
    const others = getAcceptableSkusExcept(i)
    const unconstrained = (others === null)               // ✅ 无其它属性 → 无约束
    const othersOk = new Set(Array.isArray(others) ? others : [])

    const options = getAllOptionsOfProp(prop)
    options.forEach(opt => {
      const skus = opt.skuList || []
      const isSelected =
        prop.selectedproperty?.propertyDetailId === opt.propertyDetailId

      // ✅ 无约束：只要自己有 sku 就可选
      const hasValidSku = unconstrained ? (skus.length > 0) : skus.some(s => othersOk.has(s))

      // 不是当前选中项时，按有效性与 isactive 决定是否禁用
      opt.disabled = !isSelected && (opt.isactive === false || !hasValidSku)
    })

    if (prop.isneedinput && prop.needinputlist?.length) {
      prop.needinputlist.forEach(ni => {
        const skus = ni.skuList || []
        const isSelected = prop.selectedproperty?.detailName === ni.detailName && prop.chooseindex === 2
        const hasValidSku = unconstrained ? (skus.length > 0) : skus.some(s => othersOk.has(s))
        ni.disabled = !isSelected && (ni.isactive === false || !hasValidSku)
      })
    }
  })
}


/** 如果某属性已选项被禁用，清空之，避免停留在无效状态 */
function fixInvalidSelections() {
  const props = productinfo.value.normalPropertyList || []
  props.forEach(prop => {
    if (!prop?.selectedproperty) return
    if (prop.isneedinput && prop.chooseindex === 2) {
      const picked = (prop.needinputlist || []).find(i => i.detailName === prop.selectedproperty.detailName)
      if (picked?.disabled) {
        prop.selectedproperty = {}
      }
    } else {
      const options = getAllOptionsOfProp(prop)
      const real = options.find(o => o.propertyDetailId === prop.selectedproperty.propertyDetailId)
      if (real && real.disabled) {
        prop.selectedproperty = {}
      }
    }
  })
}

/** 一次性做：重算可用性 + 清理无效选择（上/下级都同步） */
function recomputeAvailabilityAndFix() {
  recomputeAvailability()
  fixInvalidSelections()
}

let joinsku = []
const getbasePrice = async (trialPropIndex = null) => {
  try {
    console.log('Calculating base price with current selections...')
    console.log('Calculating base trialPropIndex', trialPropIndex)
    // Build skuPropList from current selections
    const skuPropList = []
    const originProps = Array.isArray(productinfo.value?.propList) ? productinfo.value.propList : []

      ; (productinfo.value.normalPropertyList || []).forEach((p) => {
        const sel = p.selectedproperty || {}
        if (!sel || Object.keys(sel).length === 0) return

        // Find original prop meta
        const originProp = originProps.find(op => String(op.id) === String(p.propertyId))
        if (!originProp) return

        // Resolve selected propValue (id + enName)
        let propValueId = sel.propertyDetailId
        let propValueEnName = sel.detailName
        if (!propValueId) {
          const pv = (originProp.propValueList || []).find(v => v.enName === sel.detailName)
          if (pv) {
            propValueId = pv.id
            propValueEnName = pv.enName
          }
        }
        if (!propValueId) return

        const item = {
          propId: originProp.id,
          propEnName: originProp.enName || '',
          propZhName: originProp.zhName || '',
          propValueId: propValueId,
          propValueEnName: propValueEnName || ''
        }

        // Attach inputList for custom input properties (chooseindex >= 2 表示选中了自定义输入)
        if (p.isneedinput && Number(p.chooseindex) >= 2) {
          // Find corresponding origin propValue to get input ids/names
          const originPV = (originProp.propValueList || []).find(v => String(v.id) === String(propValueId) || v.enName === propValueEnName)
          const groups = Array.isArray(originPV?.groupList) ? originPV.groupList : []

          // 合并所有 group 的 inputList
          const flatInputs = []
          groups.forEach(g => {
            if (g.inputList && Array.isArray(g.inputList)) {
              g.inputList.forEach(input => {
                flatInputs.push({
                  inputId: input.inputId,
                  inputName: input.inputName
                })
              })
            }
          })

          // Collect values from selection
          let values = []
          if (Array.isArray(sel.inputvalue)) values = sel.inputvalue.slice()
          else if (typeof sel.inputvalue === 'string') values = sel.inputvalue.split('*')
          else {
            // fallback to needinput item
            const actives = (p.needinputlist || []).filter(i => i.isactive !== false && i.disabled !== true)
            const picked = actives[Number(p.chooseindex) - 2]
            if (picked && Array.isArray(picked.inputvalue)) values = picked.inputvalue.slice()
          }

          // 构建完整的 inputList，包含所有 group 的输入
          item.inputList = flatInputs.map((fi, idx) => ({
            inputId: fi.inputId,
            inputName: fi.inputName,
            inputValue: values[idx] != null ? String(values[idx]) : ''
          }))
        }

        skuPropList.push(item)
      })

    const params = { productId: String(productinfo.value.id || ''), skuPropList }
    const res = await trialPriceCalculationBySpuV4(params)
    // Parse price from result: try basePrice, sellingPrice, price, or fallback to product base
    const price = res?.result?.basePrice ?? 0
    skuprice.value = Number(price) || 0
    errorsize.value = ''
    // 试算成功，清除错误索引
    lastTrialPropIndex.value = null
  } catch (error) {
    // Try to parse structured error; fallback to message string
    let msg = ''
    try { msg = JSON.parse(error?.message || '{}')?.enDesc } catch { msg = error?.message }
    errorsize.value = msg || 'Invalid input'

    // 试算失败时，只有传入了有效的 trialPropIndex 才记录（自定义输入才显示错误）
    if (trialPropIndex !== null && trialPropIndex !== undefined) {
      lastTrialPropIndex.value = trialPropIndex
    } else {
      // 非自定义输入的错误，不显示在属性下（可以用其他方式提示用户）
      lastTrialPropIndex.value = null
    }
  }
}
/** ====== 替换后的 selectproperty：在设置选中后调用双向联动 ====== */
/** 设置属性选择并触发双向联动 */
const selectproperty = (index, type) => {
  propErrors.value[index] = '' // 选了就清除该项错误

  if (type.disabled) return;

  // 设置当前选择
  productinfo.value.normalPropertyList[index]['selectedproperty'] = type;

  // 更新 joinsku 用于价格计算
  joinsku = [];
  productinfo.value.normalPropertyList.forEach((element, index1) => {
    if (index1 <= index && element.selectedproperty?.skuList?.length) {
      if (index1 === 0) {
        joinsku = element.selectedproperty.skuList || [];
      } else {
        joinsku = joinsku.filter(item => element.selectedproperty.skuList.includes(item));
      }
    }
  });

  // 统一调用双向联动计算可用性
  recomputeAvailabilityAndFix();

  // 价格计算逻辑
  let inputvalue = []
  let hasEmpty = false
  let needinputproperty
  let ischoose = true

  let needinputIndex = null
  productinfo.value.normalPropertyList.forEach((element, idx2) => {
    if (isUndefinedOrEmptyObject(element.selectedproperty)) {
      ischoose = false
    }

    if (element.isneedinput && Number(element.chooseindex) >= 2) {
      // 仅找“当前选中的那一项”
      const actives = (element.needinputlist || []).filter(i => i.isactive !== false)
      // 优先用 chooseindex（= 2 起），回退用 selectedproperty.detailName 对齐
      const picked =
        actives[element.chooseindex - 2] ||
        actives.find(i => i.detailName === element.selectedproperty?.detailName)

      inputvalue = (picked?.inputvalue || []).slice()
      hasEmpty = inputvalue.some(v => v === '' || v === null || v === undefined)

      needinputproperty = element
      needinputIndex = idx2
    }
  })
  // ✅ 仅在“输入全部完成后”才进行价格试算
  if (needinputproperty) {
    console.log('needinputproperty', needinputproperty);

    if (ischoose && !hasEmpty) {
      // Custom input mode: we may still have a uniquely resolved SKU from non-custom props.
      // Try resolving SKU using ONLY non-custom properties; if unique, keep/apply its first image.
      const nonCustomSkuLists = productinfo.value.normalPropertyList
        .filter(p => !(p.isneedinput && p.chooseindex === 2))
        .map(p => p.selectedproperty?.skuList)
        .filter(list => Array.isArray(list) && list.length > 0)

      let resolvedSku = null
      if (nonCustomSkuLists.length > 0) {
        const intersection = nonCustomSkuLists.reduce((acc, list) => acc.filter(sku => list.includes(sku)))
        if (intersection.length === 1) {
          resolvedSku = intersection[0]
        }
      }

      if (resolvedSku) {
        // Preserve SKU image (or apply if not yet applied)
        applySkuImagesIfAvailable(resolvedSku)
      } else if (!skuPhotosActive.value) {
        // If we don't already show a SKU image, fall back to original gallery
        if (originalPhotoList.value?.length) updatePhotoList(originalPhotoList.value.map(it => ({ ...it })))
      }

      // Only trigger price calculation when custom inputs are fully filled
      // 传递 needinputIndex 给 getbasePrice，让它在失败时记录
      getbasePrice(needinputIndex)
    } else {
      // Custom inputs not complete → 不触发价格试算
      // 同时避免误走“非自定义”分支
      return
    }
  } else if (ischoose) {
    // 原有 SKU 路径（非自定义输入）
    const skuLists = productinfo.value.normalPropertyList
      .map(p => p.selectedproperty?.skuList)
      .filter(list => Array.isArray(list) && list.length > 0)
    if (skuLists.length === 0) return
    const innersku = skuLists.reduce((acc, list) => acc.filter(sku => list.includes(sku)))
    const firstsku = innersku[0]
    if (firstsku) {
      // Optionally fetch price; main need: apply SKU images
      // getskuprice(firstsku) // disabled upstream
      applySkuImagesIfAvailable(firstsku)
      // Also run price trial for non-custom selections when all chosen
      // 非自定义路径，传递 null 表示不记录错误索引
      // getbasePrice(null)
    } else {
      // No resolved sku, revert
      skuPhotosActive.value = false
      if (originalPhotoList.value?.length) updatePhotoList(originalPhotoList.value.map(it => ({ ...it })))
    }
  } else {
    // Not all properties chosen; revert any SKU image override
    skuPhotosActive.value = false
    if (originalPhotoList.value?.length) updatePhotoList(originalPhotoList.value.map(it => ({ ...it })))
  }

  // Update SKU price based on current selection
  updateSkuPrice();
};

// Function to update SKU price based on current selection
const updateSkuPrice = () => {
  const currentSkuData = currentSku.value;
  console.log('更新SKU价格:', {
    currentSku: currentSkuData,
    skuBasePrice: currentSkuData?.basePrice,
    productBasePrice: productinfo.value?.basePrice,
    oldPrice: skuprice.value
  });
  if (currentSkuData && currentSkuData.basePrice) {
    // 确定了SKU，使用SKU的basePrice
    skuprice.value = currentSkuData.basePrice;
    console.log('使用SKU价格:', skuprice.value);
  } else {
    // 未确定SKU，使用产品的basePrice
    skuprice.value = productinfo.value?.basePrice ?? 0.1;
    console.log('使用产品基础价格:', skuprice.value);
  }
};

const getskuprice = async (sku) => {
  // Price fetching via mapping API is deprecated; keep as no-op unless backend exposes price in product.skuList
  return
}

const opencartloding = () => { cartloding.value = true }
const openorderloding = () => { orderloding.value = true }
const closecartloding = () => { cartloding.value = false }
const closeorderloding = () => { orderloding.value = false }

const resolveSkuForAction = async () => {
  // 统一从 normalPropertyList 收集用户选择
  let ischoose = true
  let hasEmpty = false

  const needinputpropertyarr = []
  const selectproperlist = []
  const propList = []

  productinfo.value.normalPropertyList.forEach((element) => {
    // 是否全部已选
    if (isUndefinedOrEmptyObject(element.selectedproperty)) ischoose = false

    // 自定义输入模式：把 inputvalue 数组保存在 element.inputvalue，便于后续统一读取
    // chooseindex >= 2 表示选中了任意一个自定义输入选项
    if (element.isneedinput && Number(element.chooseindex) >= 2) {
      const actives = (element.needinputlist || []).filter((it) => it.isactive)
      let picked = actives[element.chooseindex - 2]
      if (!picked && element.selectedproperty?.detailName) {
        picked = actives.find((it) => it.detailName === element.selectedproperty.detailName)
      }
      const arr = (picked?.inputvalue && Array.isArray(picked.inputvalue))
        ? picked.inputvalue
        : (Array.isArray(element.inputvalue) ? element.inputvalue : [])
      element.inputvalue = arr.slice()
      hasEmpty = hasEmpty || arr.some(v => v === '' || v === null || v === undefined)
      needinputpropertyarr.push(element)
    }

    // detailList（保持 inputvalue 数组带上，后端有些场景需要）
    const detailitem = [{
      isSelect: true,
      isMissing: true,
      detailName: element.selectedproperty?.detailName,
      inputvalue: element.inputvalue ? element.inputvalue.slice() : [],
      propertyId: element.selectedproperty?.propertyId
    }]

    selectproperlist.push({
      detailList: detailitem,
      specCode: element.specCode,
      propertyId: element.propertyId,
      propertyType: element.propertyType,
      propertyName: element.propertyName,
    })

    // 参与试算的 propList（仅用于价格试算/可视化，不影响建 SKU）
    // chooseindex >= 2 表示选中了任意一个自定义输入选项
    const isCustomInput = element.isneedinput && Number(element.chooseindex) >= 2
    const propItem = { propertyNameShop: element.propertyNameShop, detailName: element.selectedproperty?.detailName }
    if (isCustomInput && element.selectedproperty?.inputvalue) {
      const inputArr = Array.isArray(element.selectedproperty.inputvalue)
        ? element.selectedproperty.inputvalue
        : String(element.selectedproperty.inputvalue).split('*')
      propItem.inputList = inputArr.map((val, idx) => {
        const inputKey = element.selectedproperty?.inputList?.[idx] || `side${idx + 1}`
        return { input: inputKey, customPropValue: val }
      })
    }
    propList.push(propItem)
  })

  if (hasEmpty) {
    const err = new Error('No dimensions entered!')
    err.name = 'EMPTY_DIMENSION'
    throw err
  }
  if (!ischoose) {
    const err = new Error('Please select properties!')
    err.name = 'NOT_CHOSEN'
    throw err
  }

  // 情况 A：存在自定义输入 —— 需创建临时 SKU
  if (needinputpropertyarr.length > 0) {
    // 构建 skuPropList（与试算接口格式一致）
    const skuPropList = []
    const originProps = Array.isArray(productinfo.value?.propList) ? productinfo.value.propList : []

    productinfo.value.normalPropertyList.forEach((p) => {
      const sel = p.selectedproperty || {}
      if (!sel || Object.keys(sel).length === 0) return

      // Find original prop meta
      const originProp = originProps.find(op => String(op.id) === String(p.propertyId))
      if (!originProp) return

      // Resolve selected propValue (id + enName)
      let propValueId = sel.propertyDetailId
      let propValueEnName = sel.detailName
      if (!propValueId) {
        const pv = (originProp.propValueList || []).find(v => v.enName === sel.detailName)
        if (pv) {
          propValueId = pv.id
          propValueEnName = pv.enName
        }
      }
      if (!propValueId) return

      const item = {
        propId: originProp.id,
        propEnName: originProp.enName || '',
        propZhName: originProp.zhName || '',
        propValueId: propValueId,
        propValueEnName: propValueEnName || ''
      }

      // Attach inputList for custom input properties
      if (p.isneedinput && Number(p.chooseindex) >= 2) {
        const originPV = (originProp.propValueList || []).find(v => String(v.id) === String(propValueId) || v.enName === propValueEnName)
        const groups = Array.isArray(originPV?.groupList) ? originPV.groupList : []

        // 合并所有 group 的 inputList
        const flatInputs = []
        groups.forEach(g => {
          if (g.inputList && Array.isArray(g.inputList)) {
            g.inputList.forEach(input => {
              flatInputs.push({
                inputId: input.inputId,
                inputName: input.inputName
              })
            })
          }
        })

        // Collect values from selection
        let values = []
        if (Array.isArray(sel.inputvalue)) values = sel.inputvalue.slice()
        else if (typeof sel.inputvalue === 'string') values = sel.inputvalue.split('*')
        else {
          const actives = (p.needinputlist || []).filter(i => i.isactive !== false && i.disabled !== true)
          const picked = actives[Number(p.chooseindex) - 2]
          if (picked && Array.isArray(picked.inputvalue)) values = picked.inputvalue.slice()
        }

        // 构建完整的 inputList
        item.inputList = flatInputs.map((fi, idx) => ({
          inputId: fi.inputId,
          inputName: fi.inputName,
          inputValue: values[idx] != null ? String(values[idx]) : ''
        }))
      }

      skuPropList.push(item)
    })

    // 获取 productSkuV2Id：从所有已选择属性的 SKU 交集中获取
    let productSkuV2Id = ''
    const allSelectedSkuLists = []

    productinfo.value.normalPropertyList.forEach(p => {
      let skuList = null

      if (p.isneedinput && Number(p.chooseindex) >= 2) {
        // 对于定制输入属性，从当前选择的定制选项中获取 skuList
        const actives = (p.needinputlist || []).filter(i => i.isactive !== false && i.disabled !== true)
        const picked = actives[Number(p.chooseindex) - 2]
        if (picked && Array.isArray(picked.skuList) && picked.skuList.length > 0) {
          skuList = picked.skuList
        }
      } else {
        // 对于标准属性，从 selectedproperty 中获取 skuList
        if (p.selectedproperty?.skuList && Array.isArray(p.selectedproperty.skuList) && p.selectedproperty.skuList.length > 0) {
          skuList = p.selectedproperty.skuList
        }
      }

      if (skuList) {
        allSelectedSkuLists.push(skuList)
      }
    })

    if (allSelectedSkuLists.length > 0) {
      const skuIntersection = allSelectedSkuLists.reduce((acc, list) => acc.filter(sku => list.includes(sku)))
      if (skuIntersection.length > 0) {
        productSkuV2Id = String(skuIntersection[0])
      }
    }

    // 按照 SKU 的 propList 顺序排序 skuPropList
    if (productSkuV2Id) {
      const skuInfo = (productinfo.value.skuList || []).find(
        s => String(s.id) === productSkuV2Id || String(s.mallProductSkuId) === productSkuV2Id
      )

      if (skuInfo && Array.isArray(skuInfo.propList)) {
        // 创建一个映射：propId -> 在 SKU propList 中的顺序
        const propOrderMap = {}
        skuInfo.propList.forEach((prop, idx) => {
          propOrderMap[String(prop.propId)] = idx
        })

        // 按照 SKU propList 的顺序排序
        skuPropList.sort((a, b) => {
          const orderA = propOrderMap[String(a.propId)] ?? 9999
          const orderB = propOrderMap[String(b.propId)] ?? 9999
          return orderA - orderB
        })
      }
    }

    // 调用新的 erpTryToCreateSkuV2 接口
    const createData = {
      productId: String(productinfo.value.id || ''),
      productSkuV2Id: productSkuV2Id,
      skuPropList
    }

    const res = await erpTryToCreateSkuV2(createData)
    console.log('erpTryToCreateSkuV2 result:', res)
    const sku = res.result?.id
    if (!sku) throw new Error('Create SKU failed')
    return { sku, selectproperlist, needinputpropertyarr, propList }
  }

  // 情况 B：普通属性 —— 求已选候选项的 SKU 交集
  const skuLists = productinfo.value.normalPropertyList
    .map(p => p.selectedproperty?.skuList)
    .filter(list => Array.isArray(list) && list.length > 0)

  if (skuLists.length === 0) {
    const err = new Error('Please select all properties')
    err.name = 'NOT_CHOSEN'
    throw err
  }

  const innersku = skuLists.reduce((acc, list) => acc.filter(sku => list.includes(sku)))
  if (!innersku.length) {
    const err = new Error('Please select all properties')
    err.name = 'NOT_CHOSEN'
    throw err
  }
  return { sku: innersku[0], selectproperlist, needinputpropertyarr, propList }
}


const addtocart = async () => {
  try {
    if (!quantity.value || quantity.value <= 0) {
      message.error('Please enter quantity!')
      return
    }
    if (!validateSelectionsInline()) {
      // 展开第一个有错误的属性块 + 平滑滚动过去
      var firstErrIndex = propErrors.value.findIndex(function (e) { return e })
      if (firstErrIndex !== -1) {
        productinfo.value.normalPropertyList.forEach(function (p, i) { p.showType = i === firstErrIndex })
        nextTick(function () {
          var blocks = document.querySelectorAll('[data-prop-block]')
          var el = blocks && blocks[firstErrIndex]
          if (el && el.scrollIntoView) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
        })
      }
      return
    }

    opencartloding()

    // ✅ 统一从这里拿到 sku（内部会根据是否自定义输入自动 创建/求交集）
    const { sku: selectsku } = await resolveSkuForAction()

    // 创建购物车
    const data = { productQuantity: quantity.value, productSkuId: selectsku }
    await createCart(data)

    // FB Pixel
    addToCartEvent({
      value: totalPrice.value,
      currency: 'USD',
      content_ids: [selectsku],
      contents: [{ id: selectsku, quantity: quantity.value, item_price: skuprice.value }],
      content_type: 'product',
      num_items: quantity.value
    })

    // GA4
    const gaItem = toGa4Item({ withQuantity: true })
    if (gaItem) trackAddToCart(gaItem)

    // ✅ ✅ TikTok Pixel
    if (window.ttq) {
      window.ttq.track('AddToCart', {
        content_id: String(selectsku),
        quantity: quantity.value,
        value: totalPrice.value,
        currency: 'USD',
        contents: [{
          id: String(selectsku),
          quantity: quantity.value,
          item_price: skuprice.value
        }],
        description: productinfo.value.productEnglishName || ''
      })
      console.log('🟢 TikTok AddToCart sent:', selectsku)
    }

    cart.refreshCart()
    addSuccessOpen.value = true
  } catch (error) {
    let msg = 'failed, please try again'
    try { msg = JSON.parse(error.message || '{}').enDesc || msg } catch (_) {
      if (error?.name === 'EMPTY_DIMENSION' || error?.name === 'NOT_CHOSEN') msg = error.message
    }
    message.error(msg)
  } finally {
    closecartloding()
  }
}



const onQuantityInput = (e) => {
  let val = parseInt(e.target.value.replace(/[^\d]/g, '')) || 1
  if (val < 1) val = 1
  if (val > 999) val = 999
  quantity.value = val
}

function isUndefinedOrEmptyObject(val) {
  return (val === undefined || (typeof val === 'object' && val !== null && Object.keys(val).length === 0 && val.constructor === Object))
}

const createorder = async () => {
  try {
    if (!quantity.value || quantity.value <= 0) {
      message.error('Please enter quantity!')
      return
    }
    if (!validateSelectionsInline()) {
      // 展开第一个有错误的属性块 + 平滑滚动过去
      var firstErrIndex = propErrors.value.findIndex(function (e) { return e })
      if (firstErrIndex !== -1) {
        productinfo.value.normalPropertyList.forEach(function (p, i) { p.showType = i === firstErrIndex })
        nextTick(function () {
          var blocks = document.querySelectorAll('[data-prop-block]')
          var el = blocks && blocks[firstErrIndex]
          if (el && el.scrollIntoView) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
        })
      }
      return
    }

    const redirect_to = useCookie('redirect_to')

    openorderloding()

    await getUserInfo()


    // ✅ 这里可能抛出 EMPTY_DIMENSION / NOT_CHOSEN
    const { sku: selectsku } = await resolveSkuForAction()

    // 埋点
    initiateCheckout({
      value: totalPrice.value,
      currency: 'USD',
      content_ids: [selectsku],
      contents: [{ id: selectsku, quantity: quantity.value, item_price: skuprice.value }],
      content_type: 'product',
      num_items: quantity.value
    })
    const gaItem = toGa4Item({ withQuantity: true })
    if (gaItem) beginCheckout({ items: [gaItem], value: Number(totalPrice.value), currency: 'USD' })

    // ✅ ✅ TikTok Pixel
    if (window.ttq) {
      try {
        window.ttq.track('InitiateCheckout', {
          content_id: String(selectsku), // ⚠️ 必填
          content_type: 'product',
          quantity: quantity.value,
          price: Number(skuprice.value),
          value: Number(totalPrice.value),
          currency: 'USD',
          contents: [
            {
              content_id: String(selectsku),
              quantity: quantity.value,
              price: Number(skuprice.value)
            }
          ],
          description: productinfo.value.productEnglishName || ''
        })
        console.log('🟢 TikTok InitiateCheckout sent:', selectsku)
      } catch (e) {
        console.warn('TikTok InitiateCheckout failed:', e)
      }
    }
    const linkurl = '/checkout?from=detail&sku=' + selectsku + '&number=' + quantity.value
    redirect_to.value = linkurl
    router.push(linkurl)
  } catch (error) {
    console.log(error)

    let msg = 'failed, please try again'
    try {
      msg = JSON.parse(error.message || '{}').enDesc || msg
    } catch (_) {
      if (error?.name === 'EMPTY_DIMENSION' || error?.name === 'NOT_CHOSEN') {
        msg = error.message   // 'No dimensions entered!' / 'Please select properties!'
      }
    }
    message.error(msg)
    return
  } finally {
    closeorderloding()
  }
}


let lastLabel = null
let lastTo = null
const breadcrumbLinks = ref([{ label: 'Home', to: '/', title: 'Home' }])
if (lastpage) {
  const decodedPath = decodeURIComponent(lastpage)
  const categoryMatch = decodedPath.match(/^\/(.+?)-(\d+)(\/)?$/)
  if (categoryMatch) { lastLabel = categoryMatch[1]; lastTo = lastpage }
  const collectionMatch = decodedPath.match(/^\/collections\/[^/?#]+/)
  if (collectionMatch) { lastLabel = collectionMatch[0].split('/')[2]; lastTo = lastpage }
  if (lastLabel && lastTo) { breadcrumbLinks.value.push({ label: lastLabel, to: lastTo, title: lastLabel }) }
}
const handleGetProudct = async () => {
  try {
    isLoading.value = true // 保持你原有写法
    let parmes = { id: productid.value, needPropData: true, needPublishSkuData: true }
    let res = await getProductSpuV2ById(parmes)
    // updateBreadcrumbProduct(res.result.productEnglishName);
    orginproductinfo.value = res.result
    productinfo.value = res.result
    skuprice.value = res.result.basePrice

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
          showType: false
        }
      })
    }

    productinfo.value.normalPropertyList.forEach(element => {
      let noneedinputlist = ref([])
      let needinputlist = ref([])
      element.detailList.forEach(item => {
        item.isactive = true
        item.label = item.detailName
        if (item.inputList) {
          let inputvalue = []
          item.inputList.forEach(() => { inputvalue.push(null) })
          item.inputvalue = inputvalue
          element.isneedinput = true
          needinputlist.value.push(item)
        } else {
          noneedinputlist.value.push(item)
        }
        element.needinputlist = needinputlist.value
        element.noneedinputlist = noneedinputlist.value
        element.chooseindex = 1
        if (noneedinputlist.value.length == 0) { element.chooseindex = 2 }
      })
    })
    productinfo.value.normalPropertyList[0].showType = true
    mainImage.value = productinfo.value.mainPic
    // Ensure original gallery cache
    if (Array.isArray(productinfo.value.photoList)) {
      originalPhotoList.value = productinfo.value.photoList.map(it => ({ ...it }))
      productinfo.value.fileList = productinfo.value.photoList.map(it => ({ url: it.url, type: it.type, altText: it.altText }))
    }

    // 新增：首次拉取后做一次全量双向可用性计算
    recomputeAvailabilityAndFix()

    await fetchComments()

  } catch (error) {
    console.error(error)
  } finally {
    // 确保相关产品也加载
    handleGetrelated()
    isLoading.value = false
    resetPropErrors()

  }
}

const organizeproduct = () => {
  try {
    // Transform new API structure to old structure
    if (!productinfo.value.photoList && productinfo.value.fileList) {
      // Transform fileList to photoList
      productinfo.value.photoList = productinfo.value.fileList.map(file => ({
        url: file.url,
        type: file.type,
        altText: file.altText
      }))
    }
    // Cache original photos if present + ensure fileList sync
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
        // Transform propValueList to detailList with grouping meta
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
            imageLink: Array.isArray(propValue.imageUrlList) ? (propValue.imageUrlList[0] || '') : '',
            imageList: Array.isArray(propValue.imageUrlList) ? propValue.imageUrlList : [],
            skuList: Array.isArray(propValue.skuIdList) ? propValue.skuIdList : [],
            isactive: true,
            label: propValue.enName,
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
          showType: false
        }
      })
    }    // updateBreadcrumbProduct(productinfo.value.productEnglishName);
    productinfo.value.normalPropertyList.forEach(element => {
      let noneedinputlist = ref([])
      let needinputlist = ref([])
      element.detailList.forEach(item => {
        item.isactive = true
        item.label = item.detailName
        if (item.inputList) {
          let inputvalue = []
          item.inputList.forEach(() => { inputvalue.push(null) })
          item.inputvalue = inputvalue
          element.isneedinput = true
          needinputlist.value.push(item)
        } else {
          noneedinputlist.value.push(item)
        }
        element.needinputlist = needinputlist.value
        element.noneedinputlist = noneedinputlist.value
        element.chooseindex = 1
        if (noneedinputlist.value.length == 0) { element.chooseindex = 2 }
      })
    })
    productinfo.value.normalPropertyList[0].showType = true

    // ✅ 清空所有已有的选择，确保从干净状态开始自动选择
    productinfo.value.normalPropertyList.forEach(prop => {
      prop.selectedproperty = {}
    })

    // ✅ 在自动选择前先计算禁用状态，确保不会选中无效选项
    recomputeAvailabilityAndFix()

    // ✅ 自动选择属性：从第一个往下依次选，遇到不能选的就停止
    for (let i = 0; i < productinfo.value.normalPropertyList.length; i++) {
      const prop = productinfo.value.normalPropertyList[i]

      // ① 跳过需要自定义输入的属性（存在 needinputlist 即代表需输入）
      // if (prop.needinputlist && prop.needinputlist.length > 0) break

      // ✅ 新增逻辑：
      // 如果 needinputlist 存在，并且里面有至少一个未禁用项，则设置 chooseindex = 2 并停止后续自动选择
      if (prop.needinputlist && prop.needinputlist.length > 0) {
        const availableNeedInput = prop.needinputlist.some(item => !item.disabled)
        if (availableNeedInput) {
          prop.chooseindex = 2
          break
        }
        // ⚠️ 否则继续执行下面 noneedinputlist 的逻辑
      }

      // ② 找出该属性下可选项（优先使用 noneedinputlist）
      const options =
        (prop.noneedinputlist && prop.noneedinputlist.length)
          ? prop.noneedinputlist
          : prop.detailList || []

      // ③ 找第一个未禁用且有有效SKU的选项
      const firstActive = options.find(o => {
        const hasValidSkus = o.skuList && Array.isArray(o.skuList) && o.skuList.length > 0
        const notDisabled = !o.disabled
        console.log('Checking option:', o.detailName, 'hasValidSkus:', hasValidSkus, 'notDisabled:', notDisabled, 'skuList:', o.skuList)
        return notDisabled && hasValidSkus
      })
      console.log('Auto-select prop index', i, 'firstActive:', firstActive)

      // ④ 如果能选，就执行选中；否则直接退出循环（停止后续属性选中）
      if (firstActive) {
        selectproperty(i, firstActive)
      } else {
        console.log('No valid option found for prop index', i, 'stopping auto-select')
        break
      }
    }



  } catch (error) {
    console.error(error)
  } finally {
    // 新增：本地组织数据后也跑一遍双向计算
    recomputeAvailabilityAndFix()
    // 确保默认选择后价格正确更新
    updateSkuPrice()
    isLoading.value = false
    resetPropErrors()

  }
}
function validateSelectionsInline() {
  var ok = true
  for (var i = 0; i < propErrors.value.length; i++) propErrors.value[i] = ''

  var props = (productinfo.value && productinfo.value.normalPropertyList) ? productinfo.value.normalPropertyList : []
  props.forEach(function (prop, idx) {
    // 未选择
    if (isUndefinedOrEmptyObject(prop.selectedproperty)) {
      propErrors.value[idx] = 'Please select ' + (prop.propertyNameShop || 'this option') + '.'
      ok = false
      return
    }

    // 自定义输入但未填全
    if (prop.isneedinput && prop.chooseindex === 2) {
      var actives = (prop.needinputlist || []).filter(function (i) { return i.isactive !== false && !i.disabled })
      var picked = actives[prop.chooseindex - 2]
      if (!picked && prop.selectedproperty && prop.selectedproperty.detailName) {
        picked = actives.find(function (i) { return i.detailName === prop.selectedproperty.detailName })
      }
      var arr = (picked && Array.isArray(picked.inputvalue)) ? picked.inputvalue : []
      if (!arr.length || arr.some(function (v) { return v === '' || v === null || v === undefined })) {
        propErrors.value[idx] = 'Please fill in all dimensions for ' + (prop.propertyNameShop || 'custom size') + '.'
        ok = false
      }
    }
  })

  return ok
}

organizeproduct()

const handleSelectChange = (propertyIndex, selected) => {
  if (selected && selected.propertyDetailId && !selected.disabled) { selectproperty(propertyIndex, selected) }
}

const onChange = (val, property, index) => {
  property.chooseindex = '1'
  let selectvalue = property.detailList.find(item => item.propertyDetailId === val)
  if (selectvalue && !selectvalue.disabled) {
    selectproperty(index, selectvalue)
  }
}

const changeinputvalue = (element, index, propertyindex) => {
  // 清除错误状态（切换时立即清除，避免闪烁）
  errorsize.value = ''
  lastTrialPropIndex.value = null

  element.chooseindex = index
  let strresult = ''
  let detailName = ''
  let inputList = []
  if (element.isneedinput) {
    let needinputlist = element.needinputlist.filter(item => item.isactive)
    needinputlist.forEach((item, zindex) => {
      if (zindex + 2 == element.chooseindex) {
        detailName = item.detailName
        let inputvalue = item.inputvalue
        inputList = item.inputList
        strresult = inputvalue.join("*")
      }
    })
    if (!element.selectedproperty) { element.selectedproperty = {} }
    element.selectedproperty.inputvalue = strresult
    element.selectedproperty.detailName = detailName
    element.selectedproperty.inputList = inputList
    selectproperty(propertyindex, element.selectedproperty)
  }
}



const hasRange = (item) => {
  return (item.inputStart !== null && item.inputEnd !== null && item.inputStart !== undefined && item.inputEnd !== undefined && (item.inputStart !== 0 || item.inputEnd !== 0))
}

// 获取分组名称（不带范围和单位）
function getGroupName(needinput, startIndex) {
  if (!needinput?.groupsMeta) return ''
  const group = needinput.groupsMeta.find(g => g.start === startIndex)
  return group?.name || ''
}

// 获取输入框的范围限制（从 inputMeta 中）
function getInputRange(needinput, inputIndex) {
  if (!needinput?.inputMeta || !Array.isArray(needinput.inputMeta)) {
    return { min: 0, max: 100 }
  }
  const meta = needinput.inputMeta[inputIndex]
  if (!meta) return { min: 0, max: 100 }
  return {
    min: meta.inputStart,
    max: meta.inputEnd
  }
}

// 获取输入框的配置信息（包括viewType和ruleList）
const getInputConfig = (needinput, pindex) => {
  if (!needinput?.inputMeta || !needinput.inputMeta[pindex]) {
    return {
      viewType: 10, // 默认输入框
      min: '',
      max: '',
      unit: '',
      ruleList: [],
      inputName: ''
    }
  }

  const meta = needinput.inputMeta[pindex]
  return {
    viewType: meta.viewType !== undefined ? meta.viewType : 10,
    min: meta.inputStart,
    max: meta.inputEnd,
    unit: meta.unit || '',
    ruleList: meta.ruleList || [],
    inputName: meta.inputName || ''
  }
}

// 格式化自定义输入的显示：按分组展示，例如 "女 46 55 * 男 67 75"
function getFormattedInputDisplay(property) {
  // 转换 chooseindex 为数字进行比较
  const chooseIndexNum = Number(property.chooseindex)
  if (!property.isneedinput || chooseIndexNum < 2) {
    return property.selectedproperty?.inputvalue || ''
  }

  // 找到当前选中的 needinput 项
  const needinputlist = property.needinputlist || []
  const chooseIndex = chooseIndexNum - 2
  const activelist = needinputlist.filter(item => item.isactive !== false)
  const picked = activelist[chooseIndex] || needinputlist.find(item =>
    item.detailName === property.selectedproperty?.detailName
  )

  if (!picked || !picked.groupsMeta) {
    return property.selectedproperty?.inputvalue || ''
  }

  // 获取输入值数组：优先从 picked.inputvalue，否则从 selectedproperty.inputvalue 按 * 分割
  let inputValues = []
  if (Array.isArray(picked.inputvalue)) {
    inputValues = picked.inputvalue
  } else if (property.selectedproperty?.inputvalue) {
    inputValues = String(property.selectedproperty.inputvalue).split('*')
  }

  if (!inputValues.length) {
    return property.selectedproperty?.inputvalue || ''
  }

  // 按分组拼接：
  // - 当有多个分组时，每组显示 "GroupName v1 v2"，组之间用 ' * ' 分隔，例如 "女 46 55 * 男 67 75"
  // - 当只有一个分组时，省略组名，直接用 '*' 连接该组内的值，若组内只有 1 个输入则显示 "v*v"（例如 12*12）
  const groups = picked.groupsMeta || []

  if (groups.length === 1) {
    const g = groups[0]
    const values = []
    for (let i = g.start; i < g.start + g.length; i++) {
      const val = inputValues[i]
      if (val !== '' && val !== null && val !== undefined) values.push(val)
    }
    if (!values.length) return property.selectedproperty?.inputvalue || ''
    if (values.length === 1) return `${values[0]}`
    return values.join('*')
  }

  // 多组时，保留组名并用空格分隔组内值，组间用 ' * ' 分隔
  const parts = []
  groups.forEach(group => {
    const groupValues = []
    for (let i = group.start; i < group.start + group.length; i++) {
      const val = inputValues[i]
      if (val !== '' && val !== null && val !== undefined) groupValues.push(val)
    }
    if (groupValues.length > 0) {
      // const prefix = group.name ? `${group.name} ` : ''
      parts.push(`${groupValues.join('')}`)
    }
  })
  console.log('Formatted input display parts:', parts)
  console.log('Final formatted input display:', property.selectedproperty.inputvalue)
  return parts.length > 0 ? parts.join(' * ') : ''
}

// 返回 input 框的范围显示（inputStart - inputEnd）
function formatInputRange(needinput, pindex) {
  const cfg = getInputConfig(needinput, pindex)
  if (!cfg) return ''
  const min = cfg.min !== undefined ? cfg.min : null
  const max = cfg.max !== undefined ? cfg.max : null
  if (min === null && max === null) return 'Please enter a value'
  if (min !== null && max !== null) return `enter between ${min} and ${max}`
  if (min !== null) return `enter a value of at least ${min}`
  return `enter a value of at most ${max}`
}

const customFilter = (input, option) => {
  return option.detailName?.toLowerCase().includes(input.toLowerCase())
}
const changeshow = (index) => {
  productinfo.value.normalPropertyList.forEach((item, i) => {
    item.showType = i === index ? !item.showType : false
  })
}

const handleScroll = () => {
  if (!detailSectionRef.value) return
  const rect = detailSectionRef.value.getBoundingClientRect()
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
    const activationOffset = HEADER_HEIGHT + TAB_HEIGHT + 30

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

const fetchComments = async () => {
  try {
    const groupRes = await getgroupComment({ productId: productid.value })
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
    totalPages.value = Math.ceil(
      (rollRes.result.total > 0 ? rollRes.result.total : reviews.value.length) / pageSize.value
    )
    if ((!productinfo.value.remarks || productinfo.value.remarks.trim() === '') &&
      productinfo.value.printPropertyList.length === 0 &&
      reviews.value.length > 0) {
      tabindex.value = 3
    } else if (reviews.value.length === 0 && tabindex.value === 3) {
      tabindex.value = 1
    }
    sortReviews()
  } catch (error) {
    message.error('Failed to load comments')
    console.error(error)
  } finally { message.destroy() }
}

const prevPage = () => {
  if (currentPage.value > 1) { currentPage.value--; fetchComments() }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) { currentPage.value++; fetchComments() }
}

const sortReviews = () => {
  reviews.value.sort((a, b) => {
    if (sortOption.value === 'rating') return b.rating - a.rating
    return new Date(b.date) - new Date(a.date)
  })
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
  if (type === 'image') {
    review.previewVisible = true
    review.previewIndex = index
    selectedMediaIndex.value = index
  } else {
    selectedMediaIndex.value = getMediaIndex(review, index, type)
  }
}

const openImageModal = (media, type, review, index) => {
  selectReview(review, index, type)
  selectedImage.value = media
  selectedMediaType.value = type
  isImageModalOpen.value = true
}

const prevMedia = () => {
  if (selectedMediaIndex.value > 0 && selectedReview.value) {
    selectedMediaIndex.value--
    const media = mediaList.value[selectedMediaIndex.value]
    if (media.type === 'image') {
      selectedReview.value.previewVisible = true
      selectedReview.value.previewIndex = selectedMediaIndex.value
      isImageModalOpen.value = false
    } else {
      selectedImage.value = media.url
      selectedMediaType.value = media.type
      isImageModalOpen.value = true
    }
  }
}

const nextMedia = () => {
  if (selectedMediaIndex.value < mediaList.value.length - 1 && selectedReview.value) {
    selectedMediaIndex.value++
    const media = mediaList.value[selectedMediaIndex.value]
    if (media.type === 'image') {
      selectedReview.value.previewVisible = true
      selectedReview.value.previewIndex = selectedMediaIndex.value
      isImageModalOpen.value = false
    } else {
      selectedImage.value = media.url
      selectedMediaType.value = media.type
      isImageModalOpen.value = true
    }
  }
}

const closeImageModal = () => {
  isImageModalOpen.value = false
  selectedImage.value = ''
  selectedMediaType.value = 'video'
  mediaList.value = []
  selectedMediaIndex.value = 0
  if (selectedReview.value) {
    selectedReview.value.previewVisible = false
    selectedReview.value.previewIndex = 0
    selectedReview.value = null
  }
}

const onImageError = (index, review) => {
  console.warn(`Image failed to load at index ${index} for review by ${review.name}`)
  if (review.pictureUrlList) { review.pictureUrlList[index] = '/placeholder-image.jpg' }
}

const onVideoError = (index, review) => {
  console.warn(`Video failed to load at index ${index} for review by ${review.name}`)
  if (review.videoUrlList) { review.videoUrlList[index] = '/placeholder-video.mp4' }
}

watch(() => route.query, () => { handleGetProudct() }, { deep: true })
watch(mainImageIndex, (newVal) => {
  const list = productinfo.value.photoList
  if (list && list[newVal]) { mainImage.value = list[newVal].url }
  handleVideoPlayback()
})
watch(sortOption, () => { sortReviews() })
watch(swiperMain, (val) => {
  if (val) handleVideoPlayback()
})
onMounted(() => {
  handleGetrelated()
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
  window.removeEventListener('scroll', handleScroll)
})
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

<style scoped>
.swiper .swiper-wrapper {
  display: flex !important;
}

.zoom-box {
  position: absolute;
  border: 2px solid #00B2E3;
  background: rgba(255, 255, 255, 0.3);
  pointer-events: none;
  z-index: 1000;
  /* 设置高于属性选择部分 */
}

.grid-container {
  position: relative;
  /* 确保 z-index 生效 */
  z-index: 5;
  /* 设置为较低层级 */
}

/* 右侧悬浮框，相对swiper-slide定位，脱离swiper-slide限制 */
.zoom-preview-box {
  position: absolute;
  top: 50%;
  left: calc(100% + 10px);
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 1);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  /* 可选：添加阴影提升视觉效果 */
  border-radius: 8px;
  /* 与模板一致 */
}

.zoomed-image {
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 8px;
  /* 确保背景图圆角一致 */
}

.truncate-2-lines {
  display: -webkit-box;
  line-clamp: 2;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.truncate-1-lines {
  display: -webkit-box;
  line-clamp: 1;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* 你已有的 aspect-ratio 兼容写法 */
.aspect-square {
  aspect-ratio: 1 / 1;

  @supports not (aspect-ratio: 1/1) {
    position: relative;
    padding-bottom: 100%;

    &>* {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }
}

input[type="radio"] {
  appearance: none;
  -webkit-appearance: none;
  width: 16px;
  height: 16px;
  border: 2px solid #d1d5db;
  border-radius: 50%;
  margin-right: 8px;
  position: relative;
  cursor: pointer;
}

input[type="radio"]:checked {
  background-color: #00B2E3;
  border-color: #00B2E3;
}

input[type="radio"]:checked::after {
  content: "";
  position: absolute;
  width: 8px;
  height: 8px;
  background: white;
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

input[type="radio"]:focus-visible {
  outline: 2px solid #00B2E3;
  background-color: #00B2E3;
  outline-offset: 2px;
}

input[type="radio"]:focus {
  outline: none;
  box-shadow: none;
  background-color: #00B2E3;
}

input[type="radio"]:checked:focus,
input[type="radio"]:checked:hover {
  background-color: #00B2E3;
}

[type='text']:focus {
  outline: none;
  box-shadow: none;
  border-color: rgb(56, 56, 56);
}

.custom-breadcrumb li:last-child span {
  color: #0C1013;
  font-weight: normal;
}

.isolated-content {
  all: initial;
}

.isolated-content * {
  all: unset;
}

.isolated-content p {
  margin: 1em 0;
  color: #333;
}

@keyframes pulse {
  0% {
    background-color: #f0f0f0;
  }

  50% {
    background-color: #e0e0e0;
  }

  100% {
    background-color: #f0f0f0;
  }
}

.animate-pulse {
  animation: pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

:deep(.ant-select-focused .ant-select-selector) {
  border-color: #00c16a !important;
  box-shadow: 0 0 0 2px rgba(0, 193, 106, 0.2);
}


:deep(.ant-input-number-input) {
  outline: none !important;
  box-shadow: none !important;
}

.icon-debug {
  border: 1px solid red;
  display: inline-block !important;
}

:deep(.ant-image) {
  display: block;
}

:deep(.ant-image-img) {
  width: 64px;
  height: 64px;
  object-fit: cover;
  border-radius: 4px;
  cursor: pointer;
}

:deep(.ant-btn-default.custom-btn:not(:disabled):hover) {
  color: #00B2E3 !important;
  border-color: #00B2E3 !important;
}

:deep(.ant-btn-default) {
  border-color: #F5F5F5 !important;
}

.triangle-checkmark {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 10px;
  height: 10px;
  background-color: #00B2E3;
  clip-path: polygon(100% 100%, 0 100%, 100% 0);
  display: flex;
  align-items: center;
  justify-content: center;
}

:deep(select:focus),
:deep(textarea:focus) {
  outline: none !important;
  border-color: transparent !important;
  box-shadow: none !important;
}

:deep(input[type='search']:focus) {
  outline: none !important;
  border-color: transparent !important;
  box-shadow: none !important;
  appearance: none !important;
  -webkit-appearance: none !important;
}

:deep(.ant-input-affix-wrapper-focused) {
  border-color: transparent !important;
  box-shadow: none !important;
}

:deep(.ant-select-focused:not(.ant-select-disabled):not(.ant-select-customize-input) .ant-select-selector) {
  border-color: #00B2E3 !important;
  box-shadow: 0 0 0 0px #00B2E3 !important;
}

.ant-select-dropdown .ant-select-item-option-selected:not(.ant-select-item-option-disabled) {
  background-color: #00B2E3 !important;
  color: #fff !important;
  font-weight: 600 !important;
}

:deep(.ant-select-dropdown .ant-select-item-option-selected:not(.ant-select-item-option-disabled)) {
  background-color: #00B2E3 !important;
  color: #fff !important;
  font-weight: 600 !important;
}

:deep(.ant-select:not(.ant-select-disabled):hover .ant-select-selector) {
  border-color: #00B2E3 !important;
}

:deep(.ant-input:hover) {
  border-color: #00B2E3 !important;
}

:deep(.ant-input-affix-wrapper:hover) {
  border-color: #00B2E3 !important;
}

:deep(.ant-input-number:hover) {
  border-color: #00B2E3 !important;
}

:deep(.ant-input-number:focus) {
  border-color: #00B2E3 !important;
}

:deep(.ant-input:focus),
:deep(.ant-input-focused) {
  border-color: #00B2E3 !important;
}

:deep(.ant-input-number-focused),
:deep(.ant-input-number:focus) {
  border-color: #00B2E3 !important;
}

:deep(.ant-image-mask-info) {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  font-size: 0 !important;
}

:deep(.ant-image-mask-info .anticon) {
  font-size: 16px !important;
  margin-inline-end: 0 !important;
}

.content {
  white-space: pre-line;
}

.clamp-2 {
  display: -webkit-box;
  line-clamp: 2;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

:deep(.ant-input-number-focused) {
  box-shadow: none !important;
}

/* 自定义输入框 placeholder 字体大小 */
:deep(.custom-input .ant-input-number-input::placeholder) {
  font-size: 12px !important;
}

:deep(.custom-select .ant-select-selection-placeholder) {
  font-size: 12px !important;
}

/* 缩略图激活状态样式 */
.active-thumb {
  position: relative;
}

.active-thumb::after {
  content: '';
  position: absolute;
  inset: 0;
  border: 2px solid #00B2E3;
  border-radius: 5px;
  pointer-events: none;
}

.active-thumb .w-full {
  border-radius: 5px;
}
</style>