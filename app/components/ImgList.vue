<template>
  <div class="relative w-full overflow-hidden rounded-lg" @mousedown="onDragStart" @mousemove="onDragMove"
    @mouseup="onDragEnd" @mouseleave="onDragEnd" @touchstart="onDragStart" @touchmove="onDragMove"
    @touchend="onDragEnd">
    <!-- 图片/视频容器 -->
    <div class="flex transition-transform duration-300 ease-in-out " :class="wrapClass"
      :style="`transform: translateX(-${currentIndex * 100}%)`">
      <div v-for="(item, index) in list" :key="index" class="w-full flex-shrink-0 flex justify-center items-center"
        :class="itemClass">
        <!-- 判断是否为视频 -->
        <template v-if="isVideo(item)">
          <video :src="item" class="w-full h-full  object-contain select-none" controls draggable="false"
            preload="metadata" playsinline />
        </template>
        <template v-else>
          <NuxtImg format="webp" :data-index="index" :src="loadedImages[index] ? item : '/home/place_img.png'"
            class="w-full h-full object-contain select-none lazy-image" draggable="false" />
        </template>
      </div>
    </div>

    <!-- 导航箭头 -->
    <div v-if="list.length > 1 && showPrev" name="i-raphael:arrowleft2"
      class="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-all duration-200 hover:scale-110 z-10"
      @click="prev">
      <BaseIcon name="i-raphael:arrowleft2" class="text-white w-6 h-6" />
    </div>

    <!-- <div class="w-5 h-5 bg-white rounded-full flex items-center justify-center shadow text-primary">
      <BaseIcon name="i-raphael:arrowleft2" class="text-primary w-4 h-4" />
    </div> -->
    <div v-if="list.length > 1 && showNext" name="i-raphael:arrowright2"
      class="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-all duration-200 hover:scale-110 z-10"
      @click="next">
      <BaseIcon name="i-raphael:arrowright2" class="text-white w-4 h-4" />
    </div>

    <!-- 图片索引指示器 -->
    <div v-if="list.length > 1"
      class="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm z-10">
      {{ currentIndex + 1 }} / {{ list.length }}
    </div>
  </div>
</template>

<script setup lang="ts">

const props = defineProps({
  defaultIndex: {
    type: Number,
    default: 0
  },
  list: {
    type: Array as PropType<string[]>,
    default: () => []
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

const currentIndex = ref(props.defaultIndex)
const loadedImages = ref<boolean[]>(props.list.map(() => false)) // 记录图片是否加载完成
// 手势滑动相关变量
let startX = 0
let deltaX = 0
let isDragging = false


// 计算属性：是否显示 prev 和 next 按钮
const showPrev = computed(() => currentIndex.value > 0)
const showNext = computed(() => currentIndex.value < props.list.length - 1)

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
  currentIndex.value = (currentIndex.value + 1) % props.list.length
}

const prev = () => {
  currentIndex.value = currentIndex.value === 0 ? props.list.length - 1 : currentIndex.value - 1
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

// 懒加载逻辑
const observeImages = () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const index = Number(entry.target.getAttribute('data-index'))
        loadedImages.value[index] = true
        observer.unobserve(entry.target)
      }
    })
  })

  document.querySelectorAll('.lazy-image').forEach((img, index) => {
    if (!loadedImages.value[index]) {
      observer.observe(img)
    }
  })
}

onMounted(() => {
  observeImages()
})
</script>