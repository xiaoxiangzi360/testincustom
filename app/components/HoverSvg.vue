<!-- filepath: /Users/xulinlin/Desktop/xishan/incustom-web/app/components/HoverImg.vue -->
<template>
  <div class="cursor-pointer"  @mouseover="isHovered = true" @mouseleave="isHovered = false">
    <ComSvg :href="isHovered && hoverImg ? hoverImg : defaultImg" :alt="altText" :class="class"/>
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