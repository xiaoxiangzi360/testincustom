<template>
  <div class="relative group">
    <!-- 视频第一帧画面 -->
    <NuxtImg
      :src="thumbnail"
      :class="['object-cover', customClass]"
      class="w-full h-full rounded"
      alt="Video thumbnail"
    />
    <!-- 播放按钮 -->
    <div class="absolute inset-0 flex items-center justify-center bg-primary bg-opacity-10">
      <BaseIcon name="i-mdi:play-circle" width="32" height="32" class="text-white w-8 h-8" />
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  src: {
    type: String,
    required: true,
  },
  class: {
    type: String,
    default: '',
  },
});

const customClass = props.class;
const thumbnail = ref('/images/placeholder.jpg'); // 默认占位图

// 获取视频第一帧画面
const generateThumbnail = async (videoSrc) => {
  try {
    const video = document.createElement('video');
    video.src = videoSrc;
    video.crossOrigin = 'anonymous'; // 允许跨域
    debugger
    await video.play();
    video.pause();

    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    thumbnail.value = canvas.toDataURL('image/jpeg'); // 转换为 Base64 图片
  } catch (error) {
    console.error('Failed to generate video thumbnail:', error);
  }
};

// 监听 src 变化，重新生成缩略图
watch(
  () => props.src,
  (newSrc) => {
    if (newSrc) generateThumbnail(newSrc);
  },
  { immediate: true }
);
</script>