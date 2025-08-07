<template>
  <div class="relative w-full">
    <Swiper :modules="[Autoplay]" :slides-per-view="1" :loop="true"
      :autoplay="{ delay: 3000, disableOnInteraction: false }" :speed="800"
      class="w-full h-[200px] sm:aspect-[15/4] sm:h-auto relative">
      <SwiperSlide v-for="(image, index) in backgroundImages" :key="index">
        <NuxtImg :src="image" format="webp" alt="Banner" class="w-full h-full object-cover block" sizes="100vw" preload
          fetchpriority="high" />
      </SwiperSlide>
    </Swiper>



    <!-- 固定文字浮层 -->
    <div class="absolute inset-0 z-20 flex justify-start items-center pointer-events-none max-row ">
      <div class="text-left pointer-events-auto">
        <div class="text-xl sm:text-5xl lg:text-6xl text-white mb-4 sm:mb-10 leading-normal"
          style="text-shadow: 0 2px 4px rgba(0,0,0,0.5);">
          <div>No Limits No Rules</div>
          <div>Just Your Design</div>
        </div>
        <p class="text-[14px] sm:text-4xl text-white mb-2 sm:mb-10" style="text-shadow: 0 2px 4px rgba(0,0,0,0.5);">
          Where Creativity Meets Customization
        </p>
        <div class="flex flex-wrap items-center text-[12px] sm:text-base text-primary">
          <span class="flex items-center mr-4 mb-1">
            <UIcon name="i-material-symbols-check-circle" class="w-5 h-5 mr-2 text-white" />
            <span class="text-white">100% Free to use</span>
          </span>
          <span class="flex items-center mr-4 mb-1">
            <UIcon name="i-material-symbols-check-circle" class="w-5 h-5 mr-2 text-white" />
            <span class="text-white">No minimum order</span>
          </span>
          <span class="flex items-center mb-1">
            <UIcon name="i-material-symbols-check-circle" class="w-5 h-5 mr-2 text-white" />
            <span class="text-white">Inventory-Free</span>
          </span>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'

const backgroundImages = [
  '/images/banner1.webp',
  '/images/banner2.webp',
  '/images/banner3.webp',
  '/images/banner4.webp'
]
</script>
