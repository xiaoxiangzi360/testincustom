<!-- filepath: /Users/xulinlin/Desktop/xishan/incustom-web/app/components/HoverImg.vue -->
<template>
  <div :class="class" @mouseover="isHovered = true" @mouseleave="isHovered = false">
    <NuxtImg :src="isHovered ? hoverImg : defaultImg" :alt="altText" class="w-full h-full object-cover"/>
  </div>
</template>

<script setup>

// 定义 props
defineProps({
  class: {
    type: String,
    default: "",
  },
  defaultImg: {
    type: String,
    required: true,
  },
  hoverImg: {
    type: String,
    required: true,
  },
  altText: {
    type: String,
    default: "image",
  },
});

// 定义响应式变量
const isHovered = ref(false);

</script>