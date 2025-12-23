<template>
  <div class="bg-[#F8F8F8]">
    <NuxtLoadingIndicator />
    <ConfigProvider :theme="{
      token: {
        colorPrimary: '#25B9EC',   // ✅ 主色，改这里
        colorPrimaryHover: '#25B9EC',
        colorPrimaryActive: '#25B9EC',
        colorSuccess: '#11c0e5', // ✅ 成功色
        colorSuccessBg: '#11c0e5', // ✅ 背景色（可选）
        colorSuccessBorder: '#11c0e5', // ✅ 边框色（可选）
        controlOutline: '#11c0e5'
      },
      // 切暗色可这样：algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm
    }">
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </ConfigProvider>
    <UNotifications />
    <div v-if="loading" class="global-loading">
      <Spin size="large" :style="{ color: '#999' }" />
    </div>
    <div class="hidden">
      <UIcon name="i-heroicons-arrow-path-20-solid" class="hidden animate-spin" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { Spin, ConfigProvider } from 'ant-design-vue'

const loading = useState<boolean>('global-loading')

// 优化：预加载关键资源
useHead({
  link: [
    // 预连接 CDN
    { rel: 'preconnect', href: 'https://cdn.incustom.com', crossorigin: '' },
    { rel: 'dns-prefetch', href: 'https://cdn.incustom.com' },
    // 预连接 API
    { rel: 'preconnect', href: 'https://mallapi.incustom.com', crossorigin: '' },
    { rel: 'dns-prefetch', href: 'https://mallapi.incustom.com' },
  ]
})
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

/* .max-row {
  @apply max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 xl:px-32;
} */
.max-row {
  @apply w-[84%] mx-auto max-lg:w-[100%] max-lg:px-4;
  /* @apply max-w-[1440px] mx-auto px-3 max-lg:px-4; */
}

.ant-input:focus {
  border-color: #25B9EC !important;
  border: none;
}

/* 全局覆盖 */
.ant-input:focus {
  --tw-ring-color: #25B9EC !important;
}

/* 带 suffix/prefix 的情况 */
.ant-input-affix-wrapper:focus-within {
  --tw-ring-color: #25B9EC !important;
}
</style>
