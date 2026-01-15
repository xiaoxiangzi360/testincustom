// plugins/router-listener.client.ts
export default defineNuxtPlugin((nuxtApp) => {
  const router = useRouter()
  // const route = useRoute()
  // 监听路由的 meta 变化
  // watch(() => route.meta, (newMeta) => {
  //   console.log('[路由元信息变化]', newMeta)
  //   // 在这里可以处理 meta 的变化
  // }, { immediate: true, deep: true })

  // 监听所有路由变化
  router.beforeEach((to, from) => {
    // const scripts = document.querySelectorAll('script[type="application/ld+json"]');
    // scripts.forEach(script => script.remove());
    // console.log('[全局监听] 路由变化:清除所有的 JSON-LD 脚本', from.path, '→', to.path)
    const canonicalUrl = to.path?.split('?')?.[0]
    if (canonicalUrl) {
      // Canonical URL
      const siteUrl = window.location.origin // 获取当前站点的 URL
      const link = document.createElement('link')
      link.rel = 'canonical'
      link.href = `${siteUrl}${canonicalUrl}`

      // 移除旧的 canonical 标签
      const existingLink = document.querySelector('link[rel="canonical"]')
      if (existingLink) {
        existingLink.remove()
      }

      // 添加新的 canonical 标签
      document.head.appendChild(link)
    }
    // console.log('[全局监听] 路由变化:', from.path, '→', to.path, canonicalUrl, )
  })

  // 监听导航错误
  router.onError((error) => {
    console.error('[全局监听] 导航错误:', error)
  })
})