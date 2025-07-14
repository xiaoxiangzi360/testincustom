<template>
  <div class="bg-[#F8F8F8]">
    <NuxtLoadingIndicator />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <UNotifications />
    <div v-if="loading" class="global-loading">
      <Spin size="large" :style="{ color: '#999' }" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { Spin } from 'ant-design-vue'

const loading = useState<boolean>('global-loading')
</script>
<style>
.global-loading {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(255, 255, 255, 0.85);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.ant-spin-dot-item {
  background-color: #999 !important
}

:where(.css-dev-only-do-not-override-1p3hq3p).ant-message-notice .ant-message-success .anticon {
  color: #25B9EC;
}

.max-row {
  @apply max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 xl:px-32;
}
</style>
