<template>
  <div class="max-row">
    <div class="relative w-full overflow-hidden rounded-lg mt-4" 
     :style="{ aspectRatio: isMobile ? '343/300' : '16 / 7' }"
      @mousedown="onDragStart" @mousemove="onDragMove" @mouseup="onDragEnd" @mouseleave="onDragEnd"
      @touchstart="onDragStart" @touchmove="onDragMove" @touchend="onDragEnd">
      <!-- 图片/视频容器 -->
      <div class="flex transition-transform duration-300 ease-in-out" :class="wrapClass"
        :style="`transform: translateX(-${currentIndex * 100}%); transition: ${isTransitioning ? 'transform 0.6s ease-in-out' : 'none'}`">
        <NuxtLink v-for="(item, index) in list" :key="index"
          class="w-full flex-shrink-0 flex justify-center items-center" :href="item.link" :class="itemClass">
          <!-- 判断是否为视频 -->
          <template v-if="item.videoUrl">
            <video :src="item.videoUrl" class="w-full h-full  object-contain select-none" controls draggable="false"
              preload="metadata" playsinline />
          </template>
          <template v-else>
            <NuxtImg fetchPriority="high" format="webp" :data-index="index" :src=" `${isMobile ? item.mobileImage : item.pcImage}?x-oss-process=image/auto-orient,1/format,webp`"
              class="w-full h-full object-contain select-none rounded-lg" draggable="false" 
              :style="{ aspectRatio: isMobile ? '343/300' : '16 / 7' }"/>
          </template>
        </NuxtLink>
      </div>

      <!-- 导航箭头 -->
      <div v-if="list.length > 1" name="i-raphael:arrowleft2"
        class="absolute cursor-pointer left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/50 hover:bg-white/70 rounded-full flex items-center justify-center text-primary transition-all duration-200 z-10"
        @click="prev">
        <BaseIcon name="i-raphael:arrowleft2" class=" w-6 h-6" />
      </div>
      <div v-if="list.length > 1" name="i-raphael:arrowright2"
        class="absolute cursor-pointer right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/50 hover:bg-white/70 rounded-full flex items-center justify-center text-primary transition-all duration-200 z-10"
        @click="next">
        <BaseIcon name="i-raphael:arrowright2" class="w-4 h-4" />
      </div>

      <!-- 图片索引指示器 -->
      <div class="pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-4 z-30 flex items-center gap-2" v-show="list.length>1">
        <button v-for="n in list.length" :key="n"
          class="pointer-events-auto h-2 rounded-full transition-all duration-300 ease-out"
          :class="currentIndex == n-1 ? 'w-5 bg-white/90' : 'w-2 bg-white/60 hover:bg-white/80'"
          @click="goTo(n-1)" :aria-label="`Go to slide ${n}`" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

const props = defineProps({
  defaultIndex: {
    type: Number,
    default: 0
  },
  wrapClass: {
    type: String,
    default: ''
  },
  itemClass: {
    type: String,
    default: ''
  }
})
const list = ref([])
const currentIndex = ref(0)
const isTransitioning = ref(false) // 控制过渡动画

// 手势滑动相关变量
let startX = 0
let deltaX = 0
let isDragging = false

const { isMobile } = useMobile()
const prefixUrl = 'https://cdn.incustom.com/upload/web/home/banner260206'
const testData = [
  {
    pcImage: `${prefixUrl}/pc2/1_0211.webp`,
    mobileImage: `${prefixUrl}/mobile2/1_0211.webp`,
    link: '/activitypage/spring-sale-2021766913172045824',
  },
  {
    pcImage: `${prefixUrl}/pc2/2-1.webp`,
    mobileImage: `${prefixUrl}/mobile2/2-5.webp`,
    link: '/collections/Zebra-Blinds-1998944860874358807',
  },
  {
    pcImage: `${prefixUrl}/pc2/3-1.webp`,
    mobileImage: `${prefixUrl}/mobile2/3-1.webp`,
    link: '/collections/Fence-Screen-2000747693634469888',
  },
  {
    pcImage: `${prefixUrl}/pc2/4-1.webp`,
    mobileImage: `${prefixUrl}/mobile2/4-1.webp`,
    link: '/our-mission',
  },
  {
    pcImage: `${prefixUrl}/pc2/5-1.webp`,
    mobileImage: `${prefixUrl}/mobile2/5-1.webp`,
    link: '/collections/Printed-Outdoor-Roller-Shades-1998944860874358797',
  },
  {
    pcImage: `${prefixUrl}/pc2/6-1.webp`,
    mobileImage: `${prefixUrl}/mobile2/6-1.webp`,
    link: '/collections/Breathable-Shade-Sail-1998944860874358789',
  },
]

// 监听defaultIndex变化
watch(() => props.defaultIndex, (newIndex) => {
  currentIndex.value = newIndex
})

// 判断是否为视频
const isVideo = (item: string) => {
  const videoExtensions = ['mp4', 'webm', 'ogg'] // 可根据需要扩展
  const extension = item.split('.').pop()?.toLowerCase()
  return videoExtensions.includes(extension || '')
}

// 切换图片/视频
const next = () => {
  if (isTransitioning.value) return;
  isTransitioning.value = true;

  if (currentIndex.value === list.value.length - 1) {
    // 如果是最后一张，瞬间切换到第一张，去掉动画
    isTransitioning.value = false;
    currentIndex.value = 0;
  } else {
    currentIndex.value++;
    setTimeout(() => {
      isTransitioning.value = false;
    }, 300); // 动画时间
  }
  startAutoPlay();

};

const prev = () => {
  if (isTransitioning.value) return;
  isTransitioning.value = true;

  if (currentIndex.value === 0) {
    // 如果是第一张，瞬间切换到最后一张，去掉动画
    isTransitioning.value = false;
    currentIndex.value = list.value.length - 1;
  } else {
    currentIndex.value--;
    setTimeout(() => {
      isTransitioning.value = false;
    }, 300); // 动画时间
  }
  startAutoPlay();

};
const goTo = (index: number) => {
  if (isTransitioning.value) return
  currentIndex.value = index
  startAutoPlay();

}


// 手势滑动事件
const onDragStart = (event: MouseEvent | TouchEvent) => {
  isDragging = true
  startX = 'touches' in event ? event.touches[0].clientX : event.clientX
}

const onDragMove = (event: MouseEvent | TouchEvent) => {
  if (!isDragging) return
  const moveX = 'touches' in event ? event.touches[0].clientX : event.clientX
  deltaX = moveX - startX
}

const onDragEnd = () => {
  if (!isDragging) return
  isDragging = false

  // 滑动距离大于 50px 时触发切换
  if (Math.abs(deltaX) > 50) {
    if (deltaX > 0) {
      prev()
    } else {
      next()
    }
  }

  // 重置滑动距离
  deltaX = 0
}


onMounted(() => {
  list.value = testData;

  // 如果 list 长度大于 1，启动自动轮播
  if (list.value.length > 1) {
    startAutoPlay();
  }
});

// 自动轮播的定时器
let autoPlayTimer: ReturnType<typeof setInterval> | null = null;

// 启动自动轮播
const startAutoPlay = () => {
  stopAutoPlay(); // 确保不会有多个定时器
  autoPlayTimer = setInterval(() => {
    next();
  }, 3000); // 每 3 秒切换一次
};

// 停止自动轮播
const stopAutoPlay = () => {
  if (autoPlayTimer) {
    clearInterval(autoPlayTimer);
    autoPlayTimer = null;
  }
};

// 在组件卸载时清除定时器
onUnmounted(() => {
  stopAutoPlay();
});
</script>
