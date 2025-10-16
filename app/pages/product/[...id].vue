<template>
  <div class="bg-white w-full pt-3 md:pt-10">
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
      <UBreadcrumb divider=">" :links="breadcrumbLinks" class="mb-3 md:mb-6 text-blackcolor custom-breadcrumb text-2xl"
        :ui="{
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
            <div class="sticky top-[100px] overflow-hidden">
              <ClientOnly>
                <!-- 主图 Swiper（支持视频自动播放） -->
                <Swiper :modules="[Navigation, Controller]" ref="swiperRefMain" :space-between="10" :slides-per-view="1"
                  class="w-full aspect-square overflow-hidden mb-4 relative rounded shadow-lg"
                  :navigation="{ nextEl: '.main-button-next', prevEl: '.main-button-prev' }" @swiper="onMainSwiper"
                  @slideChange="onMainSlideChange">
                  <SwiperSlide v-for="(item, idx) in productinfo.erpProduct.photoList" :key="item.url || idx"
                    class="w-full h-full flex items-center justify-center bg-[#F8F8F8]">
                    <!-- 根据文件类型切换显示 -->
                    <template v-if="isVideo(item.url)">
                      <video ref="videoEls" class="w-full h-full object-contain" :src="item.url" controls playsinline
                        preload="metadata"></video>
                    </template>
                    <template v-else>
                      <NuxtImg format="webp" :src="item.url" alt="Shade sail"
                        class="w-full h-full object-cover transition-all duration-300 cursor-pointer"
                        @load="onMainImageLoaded" />
                    </template>
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

                <!-- 缩略图 Swiper（视频带播放图标） -->
                <Swiper :modules="[Navigation, Controller]" ref="swiperRefThumb" :space-between="10" class="w-full"
                  :breakpoints="{ 0: { slidesPerView: 6, slidesPerGroup: 1 } }"
                  :navigation="{ nextEl: '.custom-button-next', prevEl: '.custom-button-prev' }"
                  @swiper="onThumbSwiper">
                  <SwiperSlide v-for="(item, idx) in productinfo.erpProduct.photoList"
                    :key="'thumb-' + (item.url || idx)" @click="swiperMain?.slideTo(idx)">
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
                          :src="item.url + '?x-oss-process=image/auto-orient,1/resize,w_100,limit_0'" alt="thumbnail"
                          class="w-full h-full object-cover" />
                      </template>
                    </div>
                  </SwiperSlide>

                  <!-- 缩略图左右按钮 -->
                  <div class="custom-button-prev absolute left-[5px] top-1/2 -translate-y-1/2 z-10 cursor-pointer"
                    :class="{ 'opacity-30 pointer-events-none': isSwiperAtStart }">
                    <div class="w-5 h-5 bg-white rounded-full flex items-center justify-center shadow text-primary">
                      <BaseIcon name="i-raphael:arrowleft2" class="text-primary w-4 h-4" />
                    </div>
                  </div>
                  <div class="custom-button-next absolute right-[5px] top-1/2 -translate-y-1/2 z-10 cursor-pointer"
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
              <h1 class="text-base font-normal md:text-lg lg:text-2xl mb-0">
                {{ productinfo.erpProduct.productEnglishName }}
              </h1>
            </div>
            <div
              class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0  pb-4 mt-4 border-b border-b-[#D1D1D1]">
              <div class="text-base sm:text-xl font-medium text-primary">${{ skuprice }}</div>
            </div>

            <!-- Section 1: THE TYPE（原样） -->
            <div v-if="productinfo.normalPropertyList">
              <div class="border-b border-b-[#D1D1D1] py-3" :data-prop-block="index"
                v-for="(property, index) in productinfo.normalPropertyList" :key="index">
                <div class="flex justify-between items-center cursor-pointer" @click="changeshow(index)">
                  <h2 class="font-normal text-base flex items-center mb-0">
                    <UBadge size="sm" color="black" variant="solid"
                      class="mr-3 w-[18px] h-[18px] flex items-center justify-center"
                      :ui="{ color: { black: { solid: 'dark:bg-gray-900 dark:text-white' } } }">{{ index + 1 }}</UBadge>
                    <span class="truncate-1-lines font-medium text-sm md:text-base">{{ property.propertyNameShop
                    }}</span>
                    <Tooltip color="#000" :overlayInnerStyle="{ color: '#fff' }" placement="top" v-if="property.desc"
                      :title="property.desc"
                      :overlayStyle="{ maxWidth: '330px', whiteSpace: 'pre-line', wordBreak: 'break-word' }">
                      <img src="/question.png" class="w-4 h-4 ml-2" />
                    </Tooltip>

                  </h2>
                  <div class="flex items-center">
                    <span class="mr-4 truncate-1-lines text-sm text-gray-500" v-if="property.selectedproperty">
                      {{ property.isneedinput && property.chooseindex == 2 ? property.selectedproperty.inputvalue :
                        property.selectedproperty.detailName }}
                    </span>
                    <BaseIcon :name="property.showType ? 'i-lucide-chevron-up' : 'i-lucide-chevron-down'"
                      class="w-5 h-5 text-gray-500 font-medium transition-all duration-300" />
                  </div>
                </div>

                <div :class="[
                  'transition-all duration-300 ease-in-out grid gap-1',
                  property.showType ? 'max-h-[500px] mt-4 overflow-y-auto' : 'overflow-hidden max-h-0',
                  !property.isneedinput && property.productPropertyDetailType != 'text' ? 'grid-cols-8 md:grid-cols-10 lg:grid-cols-12' : ''
                ]">
                  <div v-if="!property.isneedinput && property.productPropertyDetailType != 'text'"
                    v-for="(type, propertyindex) in property.detailList" :key="type.propertyDetailId"
                    @click="selectproperty(index, type)" :class="[
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
                        <NuxtImg :src="type.imageLink + '?x-oss-process=image/auto-orient,1/resize,w_100,limit_0'"
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
                    v-if="!property.isneedinput && property.productPropertyDetailType == 'text'">
                    <div v-for="(type, propertyindex) in property.detailList" :key="type.propertyDetailId"
                      @click="!type.disabled && selectproperty(index, type)" :class="[
                        'p-2 rounded-xl flex flex-col items-center transition-all max-w-[33.3333%] min-w-[16.6%]',
                        type.disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'
                      ]">
                      <!-- 图片类型 -->
                      <div :class="[
                        'w-full aspect-square overflow-hidden relative',
                        !type.disabled ? 'hover:border hover:border-primary' : '',
                        property.selectedproperty && type.propertyDetailId === property.selectedproperty.propertyDetailId
                          ? 'bg-primary-50 border border-primary'
                          : ''
                      ]" v-if="type.imageLink">
                        <img :src="type.imageLink" class="w-full h-full object-cover" />
                        <div
                          v-if="property.selectedproperty && type.propertyDetailId === property.selectedproperty.propertyDetailId"
                          class="absolute bottom-0 right-0 w-6 h-6">
                          <div class="absolute w-6 h-6"
                            style="clip-path: polygon(100% 100%, 0 100%, 100% 0); background-color: #00B2E3;">
                            <BaseIcon name="i-mdi:check" class="text-white w-3 h-3"
                              style="position: absolute; bottom: 2px; right: 2px;" width="12" height="12" />
                          </div>
                        </div>
                      </div>

                      <!-- 文本类型 -->
                      <div :class="[
                        'p-2 w-full text-sm relative',
                        !type.disabled ? 'hover:border hover:border-primary hover:text-primary' : '',
                        !type.imageLink ? 'border border-customblack w-full rounded-md' : '',
                        !type.imageLink && property.selectedproperty && type.propertyDetailId === property.selectedproperty.propertyDetailId
                          ? 'text-primary bg-primary-50 border border-primary w-full'
                          : ''
                      ]" v-if="!type.imageLink">
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
                    <div class="flex-1 space-y-4">
                      <div class="text-base text-gray-800">
                        <div class="cursor-pointer block"
                          v-for="(needinput, needindex) in property.needinputlist.filter(item => !item.disabled)">
                          <div class="flex items-center">
                            <label class="flex items-center space-x-2 cursor-pointer">
                              <input type="radio" v-model="property.chooseindex" :value="needindex + 2"
                                @change="changeinputvalue(property, needindex + 2, index)" />
                              <span class="font-semibold text-sm">{{ needinput.detailName }}</span>
                            </label>
                          </div>
                          <div class="mt-4" v-for="(inputitem, pindex) in needinput.inputList" :key="pindex">
                            <div class="flex items-center space-x-4 mt-2">
                              <label class="text-sm min-w-[52px]">{{ inputitem }}</label>
                              <template v-if="needinput.customDetailList && needinput.customDetailList[pindex]">
                                <template v-if="needinput.customDetailList[pindex].viewType === 10">
                                  <ClientOnly>
                                    <InputNumber v-model:value="needinput.inputvalue[pindex]"
                                      @blur="changeinputvalue(property, needindex + 2, index)"
                                      class="custom-input rounded text-sm w-28 px-2 focus:outline-none focus:ring-0"
                                      style="height: 28px" :min="needinput.customDetailList[pindex].inputStart || 0"
                                      :max="needinput.customDetailList[pindex].inputEnd || 999" step="1" />

                                    <span v-if="hasRange(needinput.customDetailList[pindex])"
                                      class="text-xs text-gray-500 ml-1">
                                      ({{ needinput.customDetailList[pindex].inputStart }} - {{
                                        needinput.customDetailList[pindex].inputEnd }}) {{
                                        needinput.customDetailList[pindex].unit || '' }}
                                    </span>
                                  </ClientOnly>

                                </template>
                                <template v-else-if="needinput.customDetailList[pindex].viewType === 50">
                                  <ClientOnly>
                                    <Select v-model:value="needinput.inputvalue[pindex]"
                                      :options="needinput.customDetailList[pindex].ruleList.map(rule => ({ label: rule.start, value: rule.start }))"
                                      size="middle" style="width: 112px; height: 28px; line-height: 28px"
                                      :dropdownStyle="{ lineHeight: '28px' }" class="custom-select" placeholder="Select"
                                      @change="() => changeinputvalue(property, needindex + 2, index)" />
                                    <span v-if="needinput.customDetailList[pindex].unit"
                                      class="text-xs text-gray-500 ml-1">
                                      {{ needinput.customDetailList[pindex].unit }}
                                    </span>
                                  </ClientOnly>


                                </template>
                              </template>
                              <template v-else>
                                <input type="number" v-model="needinput.inputvalue[pindex]"
                                  @change="changeinputvalue(property, needindex + 2, index)"
                                  class="rounded p-1 text-sm w-28 border-gray-300 focus:border-[#00B2E3] focus:ring-1 focus:ring-[#00B2E3]"
                                  :min="0" :max="100" step="1" />
                              </template>
                            </div>
                          </div>
                          <div class="text-red-500 text-sm mt-2">{{ errorsize }}</div>
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
                                  <img v-if="imageLink" :src="imageLink" class="w-6 h-6 mr-2" />
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
                    <img v-show="designimage" :src="designimage" alt="Dimension guide" class="rounded-xl border" />
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
                        class="text-gray-500 px-2 hover:text-black bg-[#F8F8F8] h-[26px] flex items-center justify-center"
                        @click="decrement">
                        <BaseIcon name="i-heroicons-minus-20-solid" />
                      </button>

                      <input @input="onQuantityInput" v-model="quantity"
                        class="focus:outline-none focus:ring-0 focus:border-transparent w-12 h-[26px] text-center outline-none border-0 py-1 bg-[#F8F8F8] mx-0.5" />
                      <button
                        class="text-gray-500 px-2 hover:text-black bg-[#F8F8F8] h-[26px] flex items-center justify-center"
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
              <h2 class="text-lg font-semibold mb-6">{{ item.label }}</h2>

              <!-- FAQ -->
              <template v-if="item.type === 'faq'">
                <UAccordion variant="solid" size="xl" :items="item.content"
                  :ui="{ container: 'border-b border-[#00000014]', item: { padding: 'pt-4 pb-4' } }" class="text-title">
                  <template #default="{ item, open }">
                    <UButton color="gray" variant="ghost"
                      class="text-arialblack w-full flex justify-between items-center gap-3 text-base sm:text-lg font-normal hover:bg-transparent dark:hover:bg-transparent dark:text-arialblack hover:text-primary dark:hover:text-primary"
                      :ui="{ rounded: 'rounded-none', padding: { sm: 'px-0 py-3 sm:py-4' } }">
                      <span class="flex-1 min-w-0 text-left font-normal leading-snug line-clamp-2 clamp-2">
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
                <div>
                  <div class="flex flex-col lg:flex-row gap-6 mb-8 border-b pb-6 border-gray-300">
                    <div class="w-full lg:w-1/2">
                      <div class="space-y-3">
                        <div v-for="stars in 5" :key="stars" class="flex items-center gap-4">
                          <span class="w-12 text-sm text-[#FFD359]">{{ 6 - stars }} star</span>
                          <div class="flex-1 bg-primary-100 h-5 rounded overflow-hidden">
                            <div :style="{ width: `${starPercentages[6 - stars]}%` }"
                              class="h-full bg-[#FFD359] transition-all duration-300"></div>
                          </div>
                          <span class="w-12 text-sm text-right text-[#FFD359]">
                            {{ starPercentages[6 - stars] }}%
                          </span>
                        </div>
                      </div>
                    </div>
                    <div
                      class="w-full lg:w-1/2 flex items-center justify-end bg-gray-100 p-4 bg-primary-100 rounded-lg">
                      <div class="text-center w-full">
                        <p class="text-3xl font-bold text-gray-900">
                          <span>{{ averageRating.toFixed(1) }}</span>
                        </p>
                        <div class="my-2 flex justify-center">
                          <span v-for="star in 5" :key="star" class="text-2xl text-[#FFD359]">
                            <BaseIcon v-if="getStarStatus(star) === 'full'" name="i-mdi:star" class="text-[#FFD359]" />
                            <BaseIcon v-else-if="getStarStatus(star) === 'half'" name="i-mdi:star-half-full"
                              class="text-[#FFD359]" />
                            <BaseIcon v-else name="i-mdi:star-outline" class="text-gray-300" />
                          </span>
                        </div>
                        <p class="text-lg text-gray-300">{{ totalReviews }} global ratings</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div v-if="reviews.length === 0" class="text-center text-gray-500 py-4">No reviews yet.</div>

                    <div v-for="review in reviews" :key="review.date"
                      class="bg-white p-4 border-b border-[#D1D1D1] mt-4">
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
                  </div>
                  <div class="flex justify-between mt-3 md:mt-6 items-center">
                    <Button :disabled="currentPage === 1" @click="prevPage" class="custom-btn">Previous</Button>
                    <Button :disabled="currentPage === totalPages" @click="nextPage" class="custom-btn">Next</Button>
                  </div>

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
          <NuxtLink :to="`/product/${product.id}/${slugify(product.erpProduct.productEnglishName)}`"
            v-for="(product, index) in products" :key="index"
            class="product-card rounded-lg transition-transform duration-300  hover:scale-[1.02] md:hover:-translate-y-0.5 cursor-pointer">
            <div class="relative overflow-hidden">
              <img :src="product.erpProduct.mainPic ?? '/images/empty.jpg'" :alt="product.erpProduct.productEnglishName"
                class="w-full h-full object-cover object-top rounded">
            </div>
            <div class="mt-2">
              <h3 class="text-sm font-normal mb-2 line-clamp-2 dark:text-black">{{ product.erpProduct.productEnglishName
                }}
              </h3>
              <p class="text-sm font-bold text-primary">${{ product.erpProduct.customPrice.toFixed(2) }}</p>
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
        <h2 class="font-semibold text-base sm:text-lg text-gray-900">{{ productinfo.erpProduct.productEnglishName }}
        </h2>
        <div class="text-sm text-gray-500">Ordinary type sail / Rectangle</div>
      </div>
      <div class="flex flex-wrap items-center gap-3 sm:gap-4">
        <div class="flex items-center rounded">
          <button class="text-gray-500 px-2 hover:text-black bg-[#F8F8F8] h-[26px] flex items-center justify-center"
            @click="decrement">
            <BaseIcon name="i-heroicons-minus-20-solid" />
          </button>

          <input @input="onQuantityInput" v-model="quantity"
            class="focus:outline-none focus:ring-0 focus:border-transparent w-12 h-[26px] text-center outline-none border-0 py-1 bg-[#F8F8F8] mx-0.5" />
          <button @click="increment"
            class="text-gray-500 px-2 hover:text-black bg-[#F8F8F8] h-[26px] flex items-center justify-center">
            <BaseIcon name="i-heroicons-plus-20-solid" />
          </button>
        </div>
        <span class="text-sm text-gray-600">Panels</span>
        <span class="text-base sm:text-lg font-medium text-gray-800">${{ totalPrice.toFixed(2) }}</span>
        <UButton color="primary" size="md" @click="addtocart" class="rounded-lg">Add to Cart</UButton>
      </div>
    </div>

    <UModal v-model="addSuccessOpen" :ui="{ width: 'lg:w-[500px] lg:max-w-[500px] sm:max-w-sm' }">
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



    <!-- <Faq /> -->
    <div :style="{ height: isBottomBarVisible ? '76px' : '0px' }"></div>
  </div>
</template>

<script setup>
import { Image } from 'ant-design-vue'
import 'swiper/css'
import 'swiper/css/navigation'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Controller } from 'swiper/modules'
import { ref, onMounted, onUnmounted, computed, watch, nextTick } from 'vue'
import { message, Tooltip, Select, InputNumber, Button } from 'ant-design-vue'
import { useCartStore } from '@/stores/cart'
import { useRouter, useRoute } from 'vue-router'
import { useFbq } from '~/composables/useFbq'
import { Splide, SplideSlide } from '@splidejs/vue-splide'
import '@splidejs/vue-splide/css'
const { addToCartEvent, initiateCheckout } = useFbq({ currency: 'USD' })
const { viewItem, addToCart: trackAddToCart, beginCheckout } = useTrack()
const { getProductById, getProductDetailsById, randomRecommendationProductByCatalogId, trialPriceCalculationBySpuV3, erpTryToCreateSku, getmapProductByProductSkuList } = ProductAuth()
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

const onMainSwiper = (s) => { swiperMain.value = s }
const onThumbSwiper = (s) => { swiperThumb.value = s }

// 建立双向控制（主图 <-> 缩略图）
watch([swiperMain, swiperThumb], ([main, thumb]) => {
  if (main && thumb) {
    main.controller.control = thumb
    thumb.controller.control = main
  }
})

// 主图切换时更新 index / 按钮状态 / mainImage（供其它逻辑用）
const onMainSlideChange = () => {
  const s = swiperMain.value
  if (!s) return
  mainImageIndex.value = s.activeIndex
  isSwiperAtStart.value = s.isBeginning
  isSwiperAtEnd.value = s.isEnd

  const slides = productinfo.value.erpProduct.photoList || []
  if (s.activeIndex < slides.length) {
    mainImage.value = slides[s.activeIndex]?.url || productinfo.value.erpProduct.mainPic
  } else {
    mainImage.value = slides[slides.length - 1]?.url || productinfo.value.erpProduct.mainPic
  }
}

const prevMainImage = () => swiperMain.value?.slidePrev()
const nextMainImage = () => swiperMain.value?.slideNext()

/** ===== 其余原有逻辑 ===== **/
const lastpage = router.options.history.state.back
const cartloding = ref(false)
const orderloding = ref(false)
const orginproductinfo = ref({})
const productid = computed(() => route.params.id[0] ?? '29201')
const { data: serverProductData, pending, error } = await useAsyncData('product-detail', () => {
  // return getProductById({ id: productid.value, needPropData: true, excludeUserCustomProp: true })
  // let needfileds = 'id,catalogIdPathList,erpProduct.productStyle,erpProduct.productVideoUrl,erpProduct.remarks,erpProduct.productPicUrl,erpProduct.productName,erpProduct.productVideoUrl,erpProduct.productId,erpProduct.productEnglishName,erpProduct.photoList,erpProduct.mainPic,erpProduct.customPrice,erpProduct.customPrice,printPropertyList,normalPropertyList.propertyId,normalPropertyList.desc, normalPropertyList.productPropertyDetailType,normalPropertyList.propertyNameShop,normalPropertyList.propertyName,normalPropertyList.propertyType,normalPropertyList.detailList.isCustomAdd,normalPropertyList.detailList.customDetailList,normalPropertyList.detailList.desc,normalPropertyList.detailList.detailName,normalPropertyList.detailList.imageLink,normalPropertyList.detailList.inputList,normalPropertyList.detailList.isMissing,normalPropertyList.detailList.isSelect,normalPropertyList.detailList.propertyDetailId,normalPropertyList.detailList.propertyId,normalPropertyList.detailList.customDetailList,normalPropertyList.detailList.skuList'

  let needfileds = 'id,catalogIdPathList,printPropertyList,erpProduct.productStyle,erpProduct.productVideoUrl,erpProduct.remarks,erpProduct.productPicUrl,erpProduct.productName,erpProduct.productVideoUrl,erpProduct.productId,erpProduct.productEnglishName,erpProduct.photoList,erpProduct.mainPic,erpProduct.customPrice,erpProduct.customPrice,normalPropertyList.propertyId,normalPropertyList.desc,normalPropertyList.productPropertyDetailType,normalPropertyList.propertyNameShop,normalPropertyList.propertyName,normalPropertyList.propertyType,normalPropertyList.detailList'
  return getProductDetailsById({
    productId: productid.value,
    spuFields: needfileds
  })
})
const showDimensions = ref(true)
const designimage = ref('')
const mainImage = ref('')
const productinfo = ref(serverProductData.value?.result ?? {})
if (productinfo.value?.seoPageTitle || productinfo.value?.seoMetaDescription) {
  useHead({
    title: productinfo.value.seoPageTitle || productinfo.value.erpProduct?.productEnglishName || 'Product Detail',
    meta: [
      {
        name: 'description',
        content: productinfo.value.seoMetaDescription || ''
      }
    ]
  })

  useServerSeoMeta({
    title: () => productinfo.value.seoPageTitle || productinfo.value.erpProduct?.productEnglishName || 'Product Detail',
    description: () => productinfo.value.seoMetaDescription || ''
  })
} else {
  // ✅ 如果 SEO 字段为空，回退到商品英文名
  useHead({
    title: productinfo.value.erpProduct?.productEnglishName || 'Product Detail'
  })

  useServerSeoMeta({
    description: () => productinfo.value.erpProduct?.remarks || ''
  })
}

if (productinfo.value.erpProduct?.mainPic) {
  mainImage.value = productinfo.value.erpProduct.mainPic
}
const skuprice = ref(productinfo.value?.erpProduct.customPrice ?? {})
const products = ref([])
const quantity = ref(1)
const totalPrice = computed(() => quantity.value * skuprice.value)
const tabindex = ref(1)
const errorsize = ref('')
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
  const p = productinfo.value?.erpProduct
  if (!p) return null
  const qty = opts.withQuantity ? (opts.q ?? quantity.value ?? 1) : 1
  return {
    item_id: String(productinfo.value.id),
    item_name: p.productEnglishName || '',
    price: Number(skuprice.value ?? p.customPrice ?? 0),
    currency: 'USD',
    quantity: qty,
    // 可选
    item_brand: p.productName,
    item_category: getCatalogId(productinfo.value.catalogIdPathList) || undefined,
  }
}

//  查看详情：封装一个上报函数
const reportViewItem = () => {
  if (process.server) return
  const item = toGa4Item()
  if (item) viewItem(item)
}
const handleGetrelated = async () => {
  try {
    let catalogIdPathList = productinfo.value.catalogIdPathList
    let recommendcateid = getCatalogId(catalogIdPathList)
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

  productinfo.value.normalPropertyList.forEach((element) => {
    if (isUndefinedOrEmptyObject(element.selectedproperty)) {
      ischoose = false
    }

    if (element.isneedinput && element.chooseindex === 2) {
      // 仅找“当前选中的那一项”
      const actives = (element.needinputlist || []).filter(i => i.isactive !== false)
      // 优先用 chooseindex（= 2 起），回退用 selectedproperty.detailName 对齐
      const picked =
        actives[element.chooseindex - 2] ||
        actives.find(i => i.detailName === element.selectedproperty?.detailName)

      inputvalue = (picked?.inputvalue || []).slice()
      hasEmpty = inputvalue.some(v => v === '')

      needinputproperty = element
    }
  })

  // ✅ 条件满足才调用
  if (needinputproperty && ischoose && !hasEmpty) {
    getcustomprice()    // 参数可省略
  } else if (ischoose) {
    // 原有 SKU 路径…
    const skuLists = productinfo.value.normalPropertyList
      .map(p => p.selectedproperty?.skuList)
      .filter(list => Array.isArray(list) && list.length > 0)
    if (skuLists.length === 0) return
    const innersku = skuLists.reduce((acc, list) => acc.filter(sku => list.includes(sku)))
    const firstsku = innersku[0]
    if (firstsku) getskuprice(firstsku)
  }
};

const getskuprice = async (sku) => {
  try {
    let params = { skuList: [sku] }
    let res = await getmapProductByProductSkuList(params)
    let lists = res.result
    let skuinfo = lists[sku]
    skuprice.value = skuinfo.skuSpec.customPrice
  } catch (error) { console.error(error) }
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
    if (element.isneedinput && element.chooseindex == 2) {
      const actives = (element.needinputlist || []).filter((it) => it.isactive)
      let picked = actives[element.chooseindex - 2]
      if (!picked && element.selectedproperty?.detailName) {
        picked = actives.find((it) => it.detailName === element.selectedproperty.detailName)
      }
      const arr = (picked?.inputvalue && Array.isArray(picked.inputvalue))
        ? picked.inputvalue
        : (Array.isArray(element.inputvalue) ? element.inputvalue : [])
      element.inputvalue = arr.slice()
      hasEmpty = hasEmpty || arr.some(v => v === '')
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
    const isCustomInput = element.isneedinput && element.chooseindex === 2
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
    // 把自定义输入的 detailName 用 * 拼接，同时保留 detailList[0].inputvalue（数组）
    needinputpropertyarr.forEach((needProp) => {
      const target = selectproperlist.find(x => x.propertyId === needProp.propertyId)
      if (target && target.detailList?.[0]) {
        target.detailList[0].detailName = (needProp.inputvalue || []).join('*')
      }
    })

    const variationList = productinfo.value.erpProduct.variationList
    const createData = {
      productId: productid.value,
      productStyle: productinfo.value.erpProduct.productStyle,
      propertyList: selectproperlist,
      propList,
      variationList: variationList || []
    }

    // edge1..n —— 从第一个 needinput 属性读
    const edges = needinputpropertyarr[0]?.inputvalue || []
    edges.forEach((v, i) => { createData[`edge${i + 1}`] = v || 0 })

    // 请求创建
    const res = await erpTryToCreateSku(createData)
    const sku = res.result?.skuSpec?.sku
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
    const data = { productQuantity: quantity.value, productSku: selectsku }
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
        description: productinfo.value.erpProduct?.productEnglishName || ''
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
          description: productinfo.value.erpProduct?.productEnglishName || ''
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
    let parmes = { id: productid.value, needPropData: true, excludeUserCustomProp: true }
    let res = await getProductById(parmes)
    // updateBreadcrumbProduct(res.result.erpProduct.productEnglishName);
    orginproductinfo.value = res.result
    productinfo.value = res.result
    skuprice.value = res.result.erpProduct.customPrice
    productinfo.value.normalPropertyList.forEach(element => {
      let noneedinputlist = ref([])
      let needinputlist = ref([])
      element.detailList.forEach(item => {
        item.isactive = true
        item.label = item.detailName
        if (item.inputList) {
          let inputvalue = []
          item.inputList.forEach(() => { inputvalue.push('') })
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
    mainImage.value = productinfo.value.erpProduct.mainPic

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
    // updateBreadcrumbProduct(productinfo.value.erpProduct.productEnglishName);
    productinfo.value.normalPropertyList.forEach(element => {
      let noneedinputlist = ref([])
      let needinputlist = ref([])
      element.detailList.forEach(item => {
        item.isactive = true
        item.label = item.detailName
        if (item.customDetailList) {
          let sortedCustomDetailList = item.inputList.map(inputName =>
            item.customDetailList.find(item => item.input === inputName)
          )
          item.customDetailList = sortedCustomDetailList
        }
        if (item.inputList) {
          let inputvalue = []
          item.inputList.forEach(() => { inputvalue.push('') })
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

    // ✅ 自动选择属性：从第一个往下依次选，遇到不能选的就停止
    for (let i = 0; i < productinfo.value.normalPropertyList.length; i++) {
      const prop = productinfo.value.normalPropertyList[i]

      // ① 跳过含有 customDetailList（需要输入/下拉）的属性
      const hasCustomDetail = prop.detailList?.some(d => d.customDetailList && d.customDetailList.length)
      if (hasCustomDetail) break

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

      // ③ 找第一个未禁用的选项
      const firstActive = options.find(o => !o.disabled)

      // ④ 如果能选，就执行选中；否则直接退出循环（停止后续属性选中）
      if (firstActive) {
        selectproperty(i, firstActive)
      } else {
        break
      }
    }



  } catch (error) {
    console.error(error)
  } finally {
    // 新增：本地组织数据后也跑一遍双向计算
    recomputeAvailabilityAndFix()
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
  if (selected && selected.propertyDetailId) { selectproperty(propertyIndex, selected) }
}

const onChange = (val, property, index) => {
  property.chooseindex = '1'
  let selectvalue = property.detailList.find(item => item.propertyDetailId === val)
  selectproperty(index, selectvalue)
}

const changeinputvalue = (element, index, propertyindex) => {
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

const getcustomprice = async (inputvalue) => {
  const propList = []
  const sideMap = {}
  const shapeProperty = productinfo.value.normalPropertyList.find(p => p.propertyNameShop === 'Shape')
  const shape = shapeProperty?.selectedproperty?.detailName || ''
  productinfo.value.normalPropertyList.forEach((property) => {
    if (!property.selectedproperty) return
    const isCustomInput = property.isneedinput && property.chooseindex === 2
    let detailName = property.selectedproperty.detailName
    const propItem = { propertyNameShop: property.propertyNameShop, detailName }
    if (isCustomInput && property.selectedproperty.inputvalue) {
      const inputArr = Array.isArray(property.selectedproperty.inputvalue)
        ? property.selectedproperty.inputvalue
        : String(property.selectedproperty.inputvalue).split('*')
      propItem.inputList = inputArr.map((val, idx) => {
        const inputKey = property.selectedproperty?.inputList?.[idx] || `side${idx + 1}`
        sideMap[`side${idx + 1}`] = val
        return { input: inputKey, customPropValue: val }
      })
    }
    propList.push(propItem)
  })
  const params = { spu: productinfo.value.erpProduct.productStyle, propList }
  try {
    const res = await trialPriceCalculationBySpuV3(params)
    skuprice.value = res.result.sellingPrice
    errorsize.value = ''
  } catch (error) {
    const errormsg = JSON.parse(error.message || '{}')
    errorsize.value = errormsg.enDesc || 'Invalid input'
  }
}

const hasRange = (item) => {
  return (item.inputStart !== null && item.inputEnd !== null && item.inputStart !== undefined && item.inputEnd !== undefined && (item.inputStart !== 0 || item.inputEnd !== 0))
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
    const groupRes = await getgroupComment({ productSpu: productinfo.value.erpProduct.productStyle })
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
      productSpu: productinfo.value.erpProduct.productStyle,
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
    if ((!productinfo.value.erpProduct.remarks || productinfo.value.erpProduct.remarks.trim() === '') &&
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
  const list = productinfo.value.erpProduct.photoList
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
      price: Number(p.customPrice ?? 0),
      value: Number(p.customPrice ?? 0),
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

.truncate-2-lines {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.truncate-1-lines {
  display: -webkit-box;
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

input[type="text"]:focus {
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

:deep(.custom-select.ant-select-single .ant-select-selector) {
  height: 28px !important;
  min-height: 28px !important;
}

:deep(.custom-select.ant-select-single .ant-select-selection-item),
:deep(.custom-select.ant-select-single .ant-select-selection-placeholder) {
  line-height: 28px !important;
  display: flex;
  align-items: center;
  padding: 0 8px;
}

:deep(.ant-input-number-input) {
  outline: none !important;
  box-shadow: none !important;
  height: 28px !important;
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

input:where(:not([type])):focus {}

:deep(input[type='search']:focus) {
  outline: none !important;
  border-color: transparent !important;
  box-shadow: none !important;
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

.custom-input :deep(.ant-input-number-input) {
  height: 28px !important;
  line-height: 28px !important;
  padding: 0 8px !important;
  font-size: 14px;
}

.custom-select :deep(.ant-select-selector) {
  height: 28px !important;
  line-height: 28px !important;
  padding: 0 8px !important;
  display: flex;
  align-items: center;
  font-size: 14px;
}

.custom-select :deep(.ant-select-item-option) {
  height: 28px !important;
  line-height: 28px !important;
  font-size: 14px;
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
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

:deep(.custom-input.ant-input-number-focused) {
  box-shadow: none !important;
}
</style>
