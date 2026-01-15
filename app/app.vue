<template>
  <div class="bg-[#F8F8F8]">
    <!-- <NuxtLoadingIndicator /> -->
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
      <template v-if="!isTestSpeed">
        <NuxtLayout>
          <NuxtPage />
        </NuxtLayout>
      </template>
      <template v-else>
        <NuxtPage />
      </template>
    </ConfigProvider>
    <UNotifications />
    <GActivityModal/>
    <Cookiemodal />
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
const params = useRoute()
const isTestSpeed = computed(() => params.path.includes('/testBlock'))

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
