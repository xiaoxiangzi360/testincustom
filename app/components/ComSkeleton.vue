<!-- filepath: /Users/xulinlin/Desktop/xishan/incustom-web/app/components/ComSkeleton.vue -->
<template>
    <div
      :key="i"
      class="bg-gray-50 rounded skeleton-animation"
      :class="class"
    ></div>
</template>

<script setup>
import { defineProps } from 'vue'

// 定义组件的 props
defineProps({
  class:{ type: String, default: '' },
})
</script>

<style scoped>
/* 这里可以添加额外的样式 */
</style>