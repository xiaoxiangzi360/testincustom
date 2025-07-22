<template>
  <div class="relative w-full h-[420px] sm:h-[480px]">
    <!-- Swiper 轮播 -->
    <Swiper :slides-per-view="1" :loop="true" :autoplay="{ delay: 3000, disableOnInteraction: false }" :effect="'fade'"
      :fade-effect="{ crossFade: true }" class="w-full h-full" @slideChange="onSlideChange">
      <SwiperSlide v-for="(image, index) in backgroundImages" :key="index">
        <div class="relative w-full h-full">
          <!-- 使用 NuxtImg 加载背景图，并开启预加载 -->
          <NuxtImg :src="image" format="webp" alt="Home background" class="absolute inset-0 w-full h-full object-cover"
            preload fetchpriority="high" :width="1440" :height="swiperHeight" />

          <!-- 遮罩层 -->
          <div class="absolute inset-0 bg-black bg-opacity-30 z-10"></div>

          <!-- 内容层 -->
          <div
            class="relative z-20 flex flex-col items-start justify-center w-full h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 max-row">
            <!-- 标题 -->
            <div class="text-3xl sm:text-5xl lg:text-6xl text-white mb-10 leading-normal"
              style="text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5);">
              No Limits No Rules<br />Just Your Design
            </div>

            <!-- 描述 -->
            <p class="text-lg sm:text-4xl text-white mb-10" style="text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5);">
              Where Creativity Meets Customization
            </p>

            <!-- 特性列表 -->
            <div class="flex flex-col items-start md:flex-row md:items-center md:space-x-6 text-lg text-primary"
              style="text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5);">
              <span class="flex items-center">
                <UIcon name="i-material-symbols-check-circle" class="w-5 h-5 mr-2 text-white" />
                <span class="text-white">100% Free to use</span>
              </span>
              <span class="flex items-center">
                <UIcon name="i-material-symbols-check-circle" class="w-5 h-5 mr-2" />
                <span class="text-white">No minimum order</span>
              </span>
              <span class="flex items-center">
                <UIcon name="i-material-symbols-check-circle" class="w-5 h-5 mr-2" />
                <span class="text-white">Inventory-Free</span>
              </span>
            </div>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  </div>
</template>


<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';
import { ref, onMounted } from 'vue';

// 导入 Swiper 样式
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

// 定义背景图片数组
const backgroundImages = [
  '/images/homebg.webp',
  '/images/homebg.webp',
  // '/images/homebg.webp',
];
const features = [
  { icon: '/images/service1.png', title: 'Delivery within 48-72 hours' },
  { icon: '/images/service2.png', title: 'From manufacturer to consumer' },
  { icon: '/images/service3.png', title: 'Assistance with project design' },
  { icon: '/images/service4.png', title: '24/7 After-sale service' }
];

const containerWidth = 1440;

// 动态高度
const swiperHeight = ref(0);
const imageAspectRatios = ref([]); // 存储所有图片的宽高比

// 加载图片并获取宽高比
const loadImageDimensions = (url) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = url;
    img.onload = () => {
      const aspectRatio = img.height / img.width; // 宽高比 = 高度 / 宽度
      resolve(aspectRatio);
    };
    img.onerror = () => {
      resolve(0); // 如果图片加载失败，返回 0
    };
  });
};

// 在组件挂载时加载所有图片的宽高比
onMounted(async () => {
  imageAspectRatios.value = await Promise.all(
    backgroundImages.map((url) => loadImageDimensions(url))
  );
  // 计算初始高度：高度 = 宽高比 * 容器宽度
  swiperHeight.value = imageAspectRatios.value[0]
    ? Math.round(imageAspectRatios.value[0] * containerWidth)
    : 600; // 默认高度 600px
});

// 切换滑块时更新高度
const onSlideChange = (swiper) => {
  const activeIndex = swiper.realIndex;
  const aspectRatio = imageAspectRatios.value[activeIndex] || 0;
  swiperHeight.value = aspectRatio ? Math.round(aspectRatio * containerWidth) : 600;
};


</script>

<style scoped>
/* 自定义 Swiper 样式 */
.swiper {
  width: 100%;
}

.swiper-slide {
  width: 100%;
}

/* 自定义分页样式 */
:deep(.swiper-pagination-bullet) {
  background: #fff;
  opacity: 0.5;
}

:deep(.swiper-pagination-bullet-active) {
  opacity: 1;
}

/* 自定义导航按钮样式 */
:deep(.swiper-button-next),
:deep(.swiper-button-prev) {
  color: #fff;
  opacity: 0.8;
}

:deep(.swiper-button-next:hover),
:deep(.swiper-button-prev:hover) {
  opacity: 1;
}
</style>