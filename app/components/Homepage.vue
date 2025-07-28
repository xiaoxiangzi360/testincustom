<template>
  <div class="relative w-full">
    <!-- ✅ SSR 阶段展示的占位图：用 aspect-ratio 撑开 -->
    <div v-if="!ready" class="w-full h-[420px] md:aspect-[15/4] md:h-auto bg-gray-100">
      <NuxtImg src="/images/banner1.webp" format="webp" alt="Loading banner" class="w-full h-full object-cover" />
    </div>

    <!-- ✅ Swiper 主体：保持高度一致 -->
    <div v-if="ready" class="swiper-container w-full h-[420px] md:aspect-[15/4] md:h-auto relative">
      <Swiper :modules="[Autoplay, Pagination]" :slides-per-view="1" :loop="true"
        :autoplay="{ delay: 3000, disableOnInteraction: false }" :speed="800" class="w-full h-full">
        <SwiperSlide v-for="(image, index) in backgroundImages" :key="index" class="w-full h-full">
          <div class="relative w-full h-full">
            <NuxtImg :src="image" format="webp" alt="Home background"
              class="absolute inset-0 w-full h-full object-cover" preload fetchpriority="high" sizes="100vw" />
            <div class="absolute inset-0 bg-black bg-opacity-30 z-10" />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>

    <!-- ✅ 固定文案层 -->
    <div class="absolute z-20 top-0 left-0 w-full h-full flex justify-center pointer-events-none">
      <div
        class="flex flex-col items-start justify-center h-full w-full max-row px-4 sm:px-6 lg:px-8 pointer-events-auto text-center sm:text-left">
        <div class="text-3xl sm:text-5xl lg:text-6xl text-white mb-10 leading-normal"
          style="text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5);">
          No Limits No Rules<br />Just Your Design
        </div>
        <p class="text-lg sm:text-4xl text-white mb-10" style="text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5);">
          Where Creativity Meets Customization
        </p>
        <div class="flex flex-col items-start md:flex-row md:items-center md:space-x-6 text-lg text-primary"
          style="text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5);">
          <span class="flex items-center">
            <UIcon name="i-material-symbols-check-circle" class="w-5 h-5 mr-2 text-white" />
            <span class="text-white">100% Free to use</span>
          </span>
          <span class="flex items-center mt-2 md:mt-0">
            <UIcon name="i-material-symbols-check-circle" class="w-5 h-5 mr-2 text-white" />
            <span class="text-white">No minimum order</span>
          </span>
          <span class="flex items-center mt-2 md:mt-0">
            <UIcon name="i-material-symbols-check-circle" class="w-5 h-5 mr-2 text-white" />
            <span class="text-white">Inventory-Free</span>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

const backgroundImages = [
  '/images/banner1.webp',
  '/images/banner2.webp',
  '/images/banner3.webp',
  '/images/banner4.webp',
]

const ready = ref(typeof window === 'undefined' ? true : false)

onMounted(() => {
  ready.value = true
})
</script>

<style scoped>
/* 强制让 Swiper 自身继承高度 */
.swiper,
.swiper-wrapper,
.swiper-slide {
  height: 100% !important;
}

.swiper-pagination {
  position: absolute;
  bottom: 10px;
  text-align: center;
  z-index: 20;
}

.swiper-pagination-bullet {
  width: 8px;
  height: 8px;
  background: rgba(255, 255, 255, 0.7);
  opacity: 0.7;
  margin: 0 4px;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.swiper-pagination-bullet-active {
  background: #ffffff;
  opacity: 1;
  transform: scale(1.2);
}

/* ✅ 移动端字体适配 */
@media (max-width: 768px) {

  .text-3xl,
  .text-5xl,
  .text-6xl {
    font-size: 1.5rem !important;
  }

  .text-lg,
  .text-4xl {
    font-size: 1rem !important;
  }
}
</style>
