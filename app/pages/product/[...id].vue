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
                <!-- 主图 Swiper -->
                <Swiper :modules="[Navigation, Controller]" ref="swiperRefMain" :space-between="10" :slides-per-view="1"
                  class="w-full aspect-square overflow-hidden mb-4 relative rounded shadow-lg"
                  :navigation="{ nextEl: '.main-button-next', prevEl: '.main-button-prev' }" @swiper="onMainSwiper"
                  @slideChange="onMainSlideChange">
                  <SwiperSlide v-for="(item, idx) in productinfo.erpProduct.photoList" :key="item.url || idx"
                    class="w-full h-full">
                    <NuxtImg format="webp" :src="item.url" alt="Shade sail"
                      class="w-full h-full object-cover transition-all duration-300 cursor-pointer"
                      @load="onMainImageLoaded" />
                  </SwiperSlide>

                  <!-- 可选：最后一页放视频 -->
                  <SwiperSlide v-if="productinfo.erpProduct.productVideoUrl">
                    <video class="w-full h-full object-contain" controls
                      :src="productinfo.erpProduct.productVideoUrl" />
                  </SwiperSlide>

                  <!-- 主图左右按钮 -->
                  <div class="main-button-prev absolute left-[5px] top-1/2 -translate-y-1/2 z-10 cursor-pointer"
                    :class="{ 'opacity-30 pointer-events-none': isSwiperAtStart }" @click="prevMainImage">
                    <div class="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow text-primary">
                      <UIcon name="i-raphael:arrowleft2" class="text-primary w-6 h-6" />
                    </div>
                  </div>
                  <div class="main-button-next absolute right-[5px] top-1/2 -translate-y-1/2 z-10 cursor-pointer"
                    :class="{ 'opacity-30 pointer-events-none': isSwiperAtEnd }" @click="nextMainImage">
                    <div class="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow text-primary">
                      <UIcon name="i-raphael:arrowright2" class="text-primary w-6 h-6" />
                    </div>
                  </div>
                </Swiper>

                <!-- 缩略图 Swiper -->
                <Swiper :modules="[Navigation, Controller]" ref="swiperRefThumb" :space-between="10" class="w-full"
                  :breakpoints="{ 0: { slidesPerView: 6, slidesPerGroup: 1 } }"
                  :navigation="{ nextEl: '.custom-button-next', prevEl: '.custom-button-prev' }"
                  @swiper="onThumbSwiper">
                  <SwiperSlide v-for="(item, idx) in productinfo.erpProduct.photoList"
                    :key="'thumb-' + (item.url || idx)" @click="swiperMain?.slideTo(idx)">
                    <NuxtImg width="80" height="80" loading="eager" :src="item.url" alt="thumbnail"
                      class="w-full object-cover rounded cursor-pointer hover:opacity-80" />
                  </SwiperSlide>

                  <!-- 视频缩略（可选） -->
                  <SwiperSlide v-if="productinfo.erpProduct.productVideoUrl"
                    @click="swiperMain?.slideTo(productinfo.erpProduct.photoList.length)">
                    <div class="flex items-center justify-center h-full w-full">
                      <div
                        class="w-full h-20 rounded overflow-hidden relative cursor-pointer bg-black/5 flex items-center justify-center">
                        <UIcon name="i-mdi:play-circle" class="w-6 h-6 text-primary" />
                      </div>
                    </div>
                  </SwiperSlide>

                  <div class="custom-button-prev absolute left-[5px] top-1/2 -translate-y-1/2 z-10 cursor-pointer"
                    :class="{ 'opacity-30 pointer-events-none': isSwiperAtStart }">
                    <div class="w-5 h-5 bg-white rounded-full flex items-center justify-center shadow text-primary">
                      <UIcon name="i-raphael:arrowleft2" class="text-primary w-4 h-4" />
                    </div>
                  </div>
                  <div class="custom-button-next absolute right-[5px] top-1/2 -translate-y-1/2 z-10 cursor-pointer"
                    :class="{ 'opacity-30 pointer-events-none': isSwiperAtEnd }">
                    <div class="w-5 h-5 bg-white rounded-full flex items-center justify-center shadow text-primary">
                      <UIcon name="i-raphael:arrowright2" class="text-primary w-4 h-4" />
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
              <div class="border-b border-b-[#D1D1D1] py-3" v-for="(property, index) in productinfo.normalPropertyList"
                :key="index">
                <div class="flex justify-between items-center cursor-pointer" @click="changeshow(index)">
                  <h2 class="font-normal text-base flex items-center mb-0">
                    <UBadge size="sm" color="black" variant="solid"
                      class="mr-3 w-[18px] h-[18px] flex items-center justify-center"
                      :ui="{ color: { black: { solid: 'dark:bg-gray-900 dark:text-white' } } }">{{ index + 1 }}</UBadge>
                    <span class="truncate-1-lines font-medium text-sm md:text-base">{{ property.propertyNameShop
                    }}</span>
                    <Tooltip color="white" :overlayInnerStyle="{ color: '#333' }" placement="topLeft"
                      v-if="property.desc" :title="property.desc"
                      :overlayStyle="{ maxWidth: '330px', whiteSpace: 'pre-line', wordBreak: 'break-word' }">
                      <img src="/question.png" class="w-4 h-4 ml-2">
                    </Tooltip>
                  </h2>
                  <div class="flex items-center">
                    <span class="mr-4 truncate-1-lines text-sm text-gray-500" v-if="property.selectedproperty">
                      {{ property.isneedinput && property.chooseindex == 2 ? property.selectedproperty.inputvalue :
                        property.selectedproperty.detailName }}
                    </span>
                    <UIcon :name="property.showType ? 'i-lucide-chevron-up' : 'i-lucide-chevron-down'"
                      class="w-5 h-5 text-gray-500 font-medium transition-all duration-300" />
                  </div>
                </div>

                <div :class="[
                  'transition-all duration-300 ease-in-out grid gap-1',
                  property.showType ? 'max-h-[500px] mt-4' : 'overflow-hidden max-h-0',
                  !property.isneedinput && property.productPropertyDetailType != 'text' ? 'grid-cols-8 md:grid-cols-10 lg:grid-cols-12' : ''
                ]">
                  <div v-if="!property.isneedinput && property.productPropertyDetailType != 'text'"
                    v-for="(type, propertyindex) in property.detailList" :key="type.propertyDetailId"
                    @click="selectproperty(index, type)" :class="[
                      'p-0 rounded-xl flex flex-col items-center transition-all',
                      type.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                    ]">
                    <Tooltip :title="type.detailName" placement="bottom">
                      <div :class="[
                        'w-full aspect-square overflow-hidden relative hover:border hover:border-primary',
                        property.selectedproperty && type.propertyDetailId === property.selectedproperty.propertyDetailId ? 'rounded border border-primary' : ''
                      ]" v-if="type.imageLink">
                        <img :src="type.imageLink" class="w-full h-full object-contain rounded" />
                        <div
                          v-if="property.selectedproperty && type.propertyDetailId === property.selectedproperty.propertyDetailId"
                          class="absolute bottom-0 right-0 w-5 h-5">
                          <div class="absolute w-5 h-5 text-white"
                            style="clip-path: polygon(100% 100%, 0 100%, 100% 0); background-color: #00B2E3;">
                            <UIcon name="i-mdi:check" class="text-white w-4 h-4 absolute"
                              style="bottom: 0px; right: 0px;" width="12" height="12" />
                          </div>
                        </div>
                      </div>
                    </Tooltip>
                  </div>

                  <div class="w-full flex flex-wrap max-h-[160px] overflow-y-auto"
                    v-if="!property.isneedinput && property.productPropertyDetailType == 'text'">
                    <div v-for="(type, propertyindex) in property.detailList" :key="type.propertyDetailId"
                      @click="selectproperty(index, type)" :class="[
                        'p-2 rounded-xl flex flex-col items-center transition-all max-w-[33.3333%] min-w-[16.6%]',
                        type.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                      ]">
                      <div :class="[
                        'w-full aspect-square overflow-hidden relative hover:border hover:border-primary',
                        property.selectedproperty && type.propertyDetailId === property.selectedproperty.propertyDetailId ? 'bg-primary-50 border border-primary' : ''
                      ]" v-if="type.imageLink">
                        <img :src="type.imageLink" class="w-full h-full object-cover" />
                        <div
                          v-if="property.selectedproperty && type.propertyDetailId === property.selectedproperty.propertyDetailId"
                          class="absolute bottom-0 right-0 w-6 h-6">
                          <div class="absolute w-6 h-6"
                            style="clip-path: polygon(100% 100%, 0 100%, 100% 0); background-color: #00B2E3;">
                            <UIcon name="i-mdi:check" class="text-white w-3 h-3"
                              style="position: absolute; bottom: 2px; right: 2px;" width="12" height="12" />
                          </div>
                        </div>
                      </div>
                      <div :class="[
                        'p-2 w-full text-sm relative hover:border hover:border-primary hover:text-primary',
                        !type.imageLink ? 'border border-customblack w-full rounded-md' : '',
                        !type.imageLink && property.selectedproperty && type.propertyDetailId === property.selectedproperty.propertyDetailId ? 'text-primary bg-primary-50 border border-primary w-full' : '',
                      ]" v-if="!type.imageLink">
                        <div class="truncate-1-lines text-center">{{ type.detailName }}</div>
                        <div
                          v-if="property.selectedproperty && type.propertyDetailId === property.selectedproperty.propertyDetailId"
                          class="absolute bottom-0 right-0 w-5 h-5 text-white">
                          <div class="absolute w-5 h-5"
                            style="clip-path: polygon(100% 100%, 0 100%, 100% 0); background-color: #00B2E3;">
                            <UIcon name="i-mdi:check" class="text-white w-4 h-4"
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
                                </template>
                                <template v-else-if="needinput.customDetailList[pindex].viewType === 50">
                                  <Select v-model:value="needinput.inputvalue[pindex]"
                                    :options="needinput.customDetailList[pindex].ruleList.map(rule => ({ label: rule.start, value: rule.start }))"
                                    size="middle" style="width: 112px; height: 28px; line-height: 28px"
                                    :dropdownStyle="{ lineHeight: '28px' }" class="custom-select" placeholder="Select"
                                    @change="() => changeinputvalue(property, needindex + 2, index)" />
                                  <span v-if="needinput.customDetailList[pindex].unit"
                                    class="text-xs text-gray-500 ml-1">
                                    {{ needinput.customDetailList[pindex].unit }}
                                  </span>
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
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
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
                <UIcon :name="showDimensions ? 'i-lucide-chevron-up' : 'i-lucide-chevron-down'"
                  class="w-5 h-5 text-gray-500 transition-all duration-300" />
              </div>
              <div
                :class="['overflow-hidden transition-all duration-300 ease-in-out grid gap-4', showDimensions ? 'max-h-[500px] mt-4' : 'max-h-0']">
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
                      <button @click="decrement"
                        class="text-gray-500 px-2 hover:text-black bg-[#F8F8F8] h-[26px] flex items-center justify-center">−</button>
                      <input @input="onQuantityInput" v-model="quantity"
                        class="w-12 h-[26px] text-center outline-none border-0 py-1 bg-[#F8F8F8] mx-1" />
                      <button @click="increment"
                        class="text-gray-500 px-2 hover:text-black bg-[#F8F8F8] h-[26px] flex items-center justify-center">+</button>
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
                  <UButton class="w-full sm:flex-1 flex items-center justify-center rounded-md text-white font-normal"
                    color="primary" variant="solid" size="xl" :loading="orderloding" @click="createorder">
                    Order Now
                  </UButton>
                  <UButton
                    class="w-full sm:flex-1 flex items-center justify-center bg-primary-100 rounded-md text-primary font-normal hover:text-white"
                    :loading="cartloding" @click="addtocart" color="primary" variant="solid" size="xl">
                    Add to Cart
                  </UButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Tabs / 详情 / 评价（原样） -->
      <div class="bg-[#F8F8F8]">
        <div class="mx-auto mt-2">
          <div class="text-base font-normal bg-white">
            <div class="flex justify-start">
              <div class="w-auto" v-if="productinfo.erpProduct.remarks">
                <div class="inline-block p-4 rounded-xl rounded-b-none cursor-pointer text-center text-sm sm:text-base"
                  :class="{ 'border-b-2 border-black font-semibold': tabindex === 1 }" @click="changetab(1)">
                  Basic Information
                </div>
              </div>
              <div class="w-auto" v-if="productinfo.printPropertyList.length > 0">
                <div class="inline-block p-4 rounded-xl rounded-b-none cursor-pointer text-center text-sm sm:text-base"
                  :class="{ 'border-b-2 border-black font-semibold': tabindex === 2 }" @click="changetab(2)">
                  Print Information
                </div>
              </div>
              <div class="w-auto" v-if="reviews.length > 0">
                <div class="inline-block p-4 rounded-xl rounded-b-none cursor-pointer text-center text-base"
                  :class="{ 'border-b-2 border-black font-semibold': tabindex === 3 }" @click="changetab(3)">
                  Reviews
                </div>
              </div>
            </div>
          </div>

          <div class="mx-auto p-5 px-0 rounded p-2 grid grid-cols-1 gap-6 bg-white"
            v-if="productinfo.erpProduct.remarks || productinfo.printPropertyList.length > 0 || reviews.length > 0">
            <ClientOnly>
              <div v-show="tabindex === 1 && productinfo.erpProduct.remarks" class="overflow-hidden lg:col-span-3"
                v-shadow-html="productinfo.erpProduct.remarks"></div>
            </ClientOnly>
            <div v-show="tabindex === 2 && productinfo.printPropertyList.length > 0"
              class="lg:col-span-3 mx-auto max-row p-6 grid grid-cols-1 sm:grid-cols-4 lg:grid-cols-4 gap-y-6 gap-x-8 text-gray-800 bg-[#F8F8F8] py-16 rounded p-2">
              <div class="flex justify-between" v-for="Propertyitem in productinfo.printPropertyList"
                :key="Propertyitem.value">
                <span class="text-sm sm:text-base">{{ Propertyitem.value }}</span>
              </div>
            </div>

            <div v-show="tabindex === 3" class="w-full">
              <h3 class="text-base font-semibold mb-6 text-gray-900">Customer Reviews</h3>
              <div class="flex flex-col lg:flex-row gap-6 mb-8 border-b pb-6 border-gray-300">
                <div class="w-full lg:w-1/2">
                  <div class="space-y-3">
                    <div v-for="stars in 5" :key="stars" class="flex items-center gap-4">
                      <span class="w-12 text-sm text-[#FFD359]">{{ 6 - stars }} star</span>
                      <div class="flex-1 bg-primary-100 h-5 rounded overflow-hidden">
                        <div :style="{ width: `${starPercentages[6 - stars]}%` }"
                          class="h-full bg-[#FFD359] transition-all duration-300"></div>
                      </div>
                      <span class="w-12 text-sm text-right text-[#FFD359]">{{ starPercentages[6 - stars] }}%</span>
                    </div>
                  </div>
                </div>
                <div class="w-full lg:w-1/2 flex items-center justify-end bg-gray-100 p-4 bg-primary-100 rounded-lg">
                  <div class="text-center w-full">
                    <p class="text-3xl font-bold text-gray-900"><span>{{ averageRating.toFixed(1) }}</span></p>
                    <div class="my-2 flex justify-center">
                      <span v-for="star in 5" :key="star" class="text-2xl text-[#FFD359]">
                        <UIcon v-if="getStarStatus(star) === 'full'" name="i-mdi:star" class="text-[#FFD359]" />
                        <UIcon v-else-if="getStarStatus(star) === 'half'" name="i-mdi:star-half-full"
                          class="text-[#FFD359]" />
                        <UIcon v-else name="i-mdi:star-outline" class="text-gray-300" />
                      </span>
                    </div>
                    <p class="text-lg text-gray-300">{{ totalReviews }} global ratings</p>
                  </div>
                </div>
              </div>

              <div>
                <div v-if="reviews.length === 0" class="text-center text-gray-500 py-4">No reviews yet.</div>

                <div v-for="review in reviews" :key="review.date" class="bg-white p-4 border-b border-[#D1D1D1] mt-4">
                  <div class="flex items-center">
                    <div class="w-10 h-10 rounded-full flex items-center justify-center mr-3">
                      <img src="/reviewer.png" class="w-11 h-11" />
                    </div>
                    <div>
                      <p class="text-sm font-semibold text-black">{{ review.name }}</p>
                      <p class="text-sm text-gray-300">{{ review.date }}</p>
                    </div>
                    <div class="ml-auto flex">
                      <span v-for="star in 5" :key="star" class="text-xl text-[#FFD359]">
                        <UIcon v-if="star <= review.rating" name="i-mdi:star" class="text-[#FFD359]" />
                        <UIcon v-else name="i-mdi:star-outline" class="text-gray-300" />
                      </span>
                    </div>
                  </div>

                  <p class="text-sm text-gray-400 my-2 mb-4">{{ review.text }}</p>

                  <div class="flex gap-2 flex-wrap" v-if="review.pictureUrlList?.length || review.videoUrlList?.length">
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
                        <UIcon name="i-mdi:play-circle" width="32" height="32" class="text-white w-8 h-8" />
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
          </div>
        </div>
      </div>

      <!-- 推荐产品部分（原样） -->
      <div class="mt-[30px] md:mt-12 pb-4" v-if="products.length > 0">
        <h1 class="text-lg font-semibold mb-3 md:mb-8">Recommended products</h1>
        <div class="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-12">
          <NuxtLink :to="`/product/${product.id}/${slugify(product.erpProduct.productEnglishName)}`"
            v-for="(product, index) in products" :key="index"
            class="product-card rounded-lg transition-transform duration-300 ease-in-out hover:scale-105 cursor-pointer">
            <div class="relative overflow-hidden">
              <img :src="product.erpProduct.mainPic ?? '/images/empty.jpg'" :alt="product.erpProduct.productEnglishName"
                class="w-full h-full object-cover object-top">
            </div>
            <div class="mt-2">
              <h3 class="text-sm font-normal mb-2 line-clamp-2">{{ product.erpProduct.productEnglishName }}</h3>
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
            <UIcon name="i-raphael:arrowleft2" class="text-primary w-6 h-6" />
          </div>
        </button>
        <button v-if="mediaList.length > 1" class="absolute right-4 top-1/2 -translate-y-1/2 z-10 cursor-pointer"
          :class="{ 'opacity-30 pointer-events-none': selectedMediaIndex === mediaList.length - 1 }" @click="nextMedia">
          <div class="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow text-primary">
            <UIcon name="i-raphael:arrowright2" class="text-primary w-6 h-6" />
          </div>
        </button>
        <button
          class="absolute top-4 right-4 text-gray-500 w-8 h-8 flex items-center justify-center bg-transparent text-white"
          @click="closeImageModal">
          <UIcon name="i-mdi:close" width="32" height="32" class="w-8 h-8 text-white" />
        </button>
      </div>
    </div>

    <!-- Bottom bar（原样） -->
    <div ref="bottomBarRef"
      class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 py-4 px-8 bg-white rounded-md shadow-lg sticky bottom-0 transition-all duration-300 ease-in-out"
      :class="{ 'opacity-100 translate-y-0 pointer-events-auto': !isBottomBarHidden, 'opacity-0 translate-y-8 pointer-events-none': isBottomBarHidden }"
      v-show="isshow && !isLoading">
      <div>
        <h2 class="font-semibold text-base sm:text-lg text-gray-900">{{ productinfo.erpProduct.productEnglishName }}
        </h2>
        <p class="text-sm text-gray-500">Ordinary type sail / Rectangle</p>
      </div>
      <div class="flex flex-wrap items-center gap-3 sm:gap-4">
        <div class="flex items-center border border-gray-300 rounded px-2 py-1">
          <button class="text-gray-500 hover:text-gray-700" @click="decrement">-</button>
          <span class="mx-2 w-12 text-center">{{ quantity }}</span>
          <button class="text-gray-500 hover:text-gray-700" @click="increment">+</button>
        </div>
        <span class="text-sm text-gray-600">Panels</span>
        <span class="text-base sm:text-lg font-medium text-gray-800">${{ totalPrice.toFixed(2) }}</span>
        <UButton color="primary" size="md" @click="addtocart" class="rounded-lg">Add to Cart</UButton>
      </div>
    </div>
  </div>
  <Faq />
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

const { getProductById, getProductDetailsById, randomRecommendationProductByCatalogId, trialPriceCalculationBySpuV3, erpTryToCreateSku, getmapProductByProductSkuList } = ProductAuth()
const { createCart } = cartAuth()
const { getspuCommentProductRollPage, getgroupComment } = CommentAuth()
const route = useRoute()
const router = useRouter()
const cart = useCartStore()

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
const detailSectionRef = ref(null)
const bottomBarRef = ref(null)
const isshow = ref(true)

const onMainImageLoaded = () => {
  nextTick(() => {
    swiperRefThumb.value?.swiper?.update()
  })
}

const changetab = (index) => { tabindex.value = index }
const increment = () => { quantity.value++ }
const decrement = () => { if (quantity.value > 1) quantity.value-- }

function getCatalogId(arr) {
  if (!Array.isArray(arr) || arr.length === 0) return ''
  if (arr.length >= 2) return arr[1]
  return arr[0]
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

let joinsku = []
const selectproperty = (index, type) => {
  if (type.disabled) return
  productinfo.value.normalPropertyList.forEach((element, index1) => {
    if (index1 < index && isUndefinedOrEmptyObject(element.selectedproperty)) {
      joinsku = joinsku.filter(item => element.selectedproperty.skuList.includes(item))
    }
    if (index === 0) { joinsku = type.skuList }
  })
  if (!joinsku) joinsku = []
  if (productinfo.value.normalPropertyList[index + 1] && type.skuList) {
    let curskulist = joinsku.length > 0 ? joinsku.filter(item => type.skuList.includes(item)) : type.skuList || []
    let nextProperty = productinfo.value.normalPropertyList[index + 1]
    let nextselectedproperty = nextProperty['selectedproperty']
    let nextselectedid = '-1'
    if (nextselectedproperty) { nextselectedid = nextselectedproperty.propertyDetailId }
    if (nextProperty.isneedinput) {
      let nextdetailList = nextProperty.noneedinputlist
      nextdetailList.forEach(element => {
        let skulist = element.skuList
        let hasIntersection = skulist && skulist.some(item => curskulist.includes(item))
        element.isactive = hasIntersection
        element.disabled = !hasIntersection
        if (nextselectedid == element.propertyDetailId && element.disabled) {
          productinfo.value.normalPropertyList[index + 1]['selectedproperty'] = {}
        }
      })
      let nextdetailList1 = nextProperty.needinputlist
      nextdetailList1.forEach(element1 => {
        let skulist = element1.skuList
        let hasIntersection = skulist && skulist.some(item => curskulist.includes(item))
        element1.isactive = hasIntersection
        element1.disabled = !hasIntersection
        if (nextselectedid == element1.propertyDetailId && element1.disabled) {
          productinfo.value.normalPropertyList[index + 1]['selectedproperty'] = {}
        }
      })
    } else {
      let nextdetailList = nextProperty.detailList
      nextdetailList.forEach(element => {
        let skulist = element.skuList
        let hasIntersection = skulist && skulist.some(item => curskulist.includes(item))
        element.isactive = hasIntersection
        element.disabled = !hasIntersection
        if (nextselectedid == element.propertyDetailId && element.disabled) {
          productinfo.value.normalPropertyList[index + 1]['selectedproperty'] = {}
        }
      })
    }
  }
  productinfo.value.normalPropertyList[index]['selectedproperty'] = type

  let inputvalue = []
  let hasEmpty = false
  let needinputproperty
  let ischoose = true

  productinfo.value.normalPropertyList.forEach(element => {
    if (isUndefinedOrEmptyObject(element.selectedproperty)) { ischoose = false }
    if (element.isneedinput && element.chooseindex == 2) {
      let needinputlist = element.needinputlist.filter(item => item.isactive)
      needinputlist.forEach(item => {
        inputvalue = item.inputvalue
        hasEmpty = inputvalue.some(item => item === "")
      })
      needinputproperty = element
    }
  })
  if (needinputproperty && ischoose && !hasEmpty) {
    getcustomprice(inputvalue)
  } else if (ischoose) {
    const skuLists = productinfo.value.normalPropertyList
      .map(property => property.selectedproperty?.skuList)
      .filter(list => Array.isArray(list) && list.length > 0)
    if (skuLists.length === 0) return
    let innersku = skuLists.reduce((acc, list) => acc.filter(sku => list.includes(sku)))
    let firstsku = innersku[0]
    if (firstsku) { getskuprice(firstsku) }
  }
}

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

const addtocart = async () => {
  try {
    if (!quantity.value || quantity.value <= 0) { message.error('Please enter quantity!'); return }
    let ischoose = true
    let hasEmpty = false
    let inputvalue = []
    let needinputproperty
    let selectproperlist = []
    productinfo.value.normalPropertyList.forEach(element => {
      if (isUndefinedOrEmptyObject(element.selectedproperty)) { ischoose = false }
      if (element.isneedinput && element.chooseindex == 2) {
        let needinputlist = element.needinputlist.filter(item => item.isactive)
        needinputlist.forEach(item => {
          inputvalue = item.inputvalue
          hasEmpty = inputvalue.some(item => item === "")
        })
        needinputproperty = element
      }
      let detailitem = [{
        isSelect: true, isMissing: true,
        detailName: element.selectedproperty?.detailName,
        propertyId: element.selectedproperty?.propertyId
      }]
      selectproperlist.push({
        detailList: detailitem, specCode: element.specCode, propertyId: element.propertyId,
        propertyType: element.propertyType, propertyName: element.propertyName,
      })
    })
    if (hasEmpty) { message.error('No dimensions entered!'); return }
    if (!ischoose) { message.error('Please select properties!'); return }

    let selectsku
    if (inputvalue.length > 0) {
      let target = selectproperlist.find(item => item.propertyId === needinputproperty.propertyId)
      if (target) {
        target.detailList = [{
          isSelect: true, isMissing: true,
          detailName: inputvalue.join("*"),
          propertyId: needinputproperty.propertyId
        }]
      }
      let variationList = productinfo.value.erpProduct.variationList
      const targetProperty = productinfo.value.normalPropertyList.find(item => item.propertyNameShop === 'Shape')
      let detailName = targetProperty?.selectedproperty?.detailName || ''
      let createData = {
        productId: productid.value,
        productStyle: productinfo.value.erpProduct.productStyle,
        propertyList: selectproperlist,
        shape: detailName,
        variationList: variationList ? variationList : []
      }
      for (let i = 0; i < inputvalue.length; i++) {
        createData[`edge${i + 1}`] = inputvalue[i] || 0
      }
      try {
        opencartloding()
        let res = await erpTryToCreateSku(createData)
        selectsku = res.result.skuSpec.sku
      } catch (e) {
        closecartloding()
        const errormsg = JSON.parse(e.message || '{}')
        message.error(errormsg.enDesc || 'Create SKU failed')
        return
      }
    } else {
      const skuLists = productinfo.value.normalPropertyList
        .map(property => property.selectedproperty?.skuList)
        .filter(list => Array.isArray(list) && list.length > 0)
      if (skuLists.length === 0) return
      let innersku = skuLists.reduce((acc, list) => acc.filter(sku => list.includes(sku)))
      if (innersku.length == 0) { message.error('Please select all properties'); return }
      selectsku = innersku[0]
      opencartloding()
    }
    let data = { productQuantity: quantity.value, productSku: selectsku }
    await createCart(data)
    message.success('Add successful!')
    closecartloding()
    cart.refreshCart()
  } catch (error) {
    let errormsg = JSON.parse(error.message || '{}')
    closecartloding()
    message.error(errormsg.enDesc || 'failed, please try again')
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
    if (!quantity.value || quantity.value <= 0) { message.error('Please enter quantity!'); return }
    let ischoose = true
    let hasEmpty = false
    let inputvalue = []
    let needinputproperty
    let selectproperlist = []
    productinfo.value.normalPropertyList.forEach(element => {
      if (isUndefinedOrEmptyObject(element.selectedproperty)) { ischoose = false }
      if (element.isneedinput && element.chooseindex == 2) {
        let needinputlist = element.needinputlist.filter(item => item.isactive)
        needinputlist.forEach(item => {
          inputvalue = item.inputvalue
          hasEmpty = inputvalue.some(item => item === "")
        })
        needinputproperty = element
      }
      let detailitem = [{
        isSelect: true, isMissing: true,
        detailName: element.selectedproperty?.detailName,
        propertyId: element.selectedproperty?.propertyId
      }]
      selectproperlist.push({
        detailList: detailitem, specCode: element.specCode, propertyId: element.propertyId,
        propertyType: element.propertyType, propertyName: element.propertyName,
      })
    })
    if (hasEmpty) { message.error('No dimensions entered!'); return }
    if (!ischoose) { message.error('Please select properties!'); return }

    let selectsku
    if (inputvalue.length > 0) {
      let target = selectproperlist.find(item => item.propertyId === needinputproperty.propertyId)
      if (target) {
        target.detailList = [{
          isSelect: true, isMissing: true,
          detailName: inputvalue.join("*"),
          propertyId: needinputproperty.propertyId
        }]
      }
      let variationList = productinfo.value.erpProduct.variationList
      const targetProperty = productinfo.value.normalPropertyList.find(item => item.propertyNameShop === 'Shape')
      let detailName = targetProperty?.selectedproperty?.detailName || ''
      let createData = {
        productId: productid.value,
        productStyle: productinfo.value.erpProduct.productStyle,
        propertyList: selectproperlist,
        shape: detailName,
        variationList: variationList ? variationList : []
      }
      for (let i = 0; i < inputvalue.length; i++) {
        createData[`edge${i + 1}`] = inputvalue[i] || 0
      }
      try {
        openorderloding()
        let res = await erpTryToCreateSku(createData)
        selectsku = res.result.skuSpec.sku
      } catch (e) {
        closeorderloding()
        const errormsg = JSON.parse(e.message || '{}')
        message.error(errormsg.enDesc || 'Create SKU failed')
        return
      }
    } else {
      const skuLists = productinfo.value.normalPropertyList
        .map(property => property.selectedproperty?.skuList)
        .filter(list => Array.isArray(list) && list.length > 0)
      if (skuLists.length === 0) return
      let innersku = skuLists.reduce((acc, list) => acc.filter(sku => list.includes(sku)))
      if (innersku.length == 0) { message.error('Please select all properties'); return }
      selectsku = innersku[0]
      openorderloding()
    }
    closeorderloding()
    router.push('/checkout?from=detail&sku=' + selectsku + '&number=' + quantity.value)
  } catch (error) {
    let errormsg = JSON.parse(error.message || '{}')
    closeorderloding()
    message.error(errormsg.enDesc || 'Failed')
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
    await fetchComments()
  } catch (error) {
    message.error('Failed to load product data')
    console.error(error)
  } finally {
    isLoading.value = false
    handleGetrelated()
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
        if (item.inputList) {
          let inputvalue = []
          if (item.customDetailList) {
            let sortedCustomDetailList = item.inputList.map(inputName =>
              item.customDetailList.find(item => item.input === inputName)
            )
            item.customDetailList = sortedCustomDetailList
          }
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
  } catch (error) {
    console.error(error)
    message.error('Failed to load product data')
  } finally {
    isLoading.value = false
  }
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
  const params = { spu: productinfo.value.erpProduct.productStyle, shape, ...sideMap, propList }
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
  if (bottomBarRef.value && detailSectionRef.value) {
    const rect1 = detailSectionRef.value.getBoundingClientRect()
    const rect2 = bottomBarRef.value.getBoundingClientRect()
    if (rect2.top < 800 || rect1.top > 0) { isBottomBarHidden.value = true }
    else { isBottomBarHidden.value = false }
  }
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
})
watch(sortOption, () => { sortReviews() })

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  handleGetrelated()
  fetchComments()
})
onUnmounted(() => { window.removeEventListener('scroll', handleScroll) })
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
</style>
