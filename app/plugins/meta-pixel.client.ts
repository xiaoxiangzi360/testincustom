// plugins/meta-pixel.client.ts
export default defineNuxtPlugin((nuxtApp) => {
    if (process.client) {
        nuxtApp.hook('page:finish', () => {
            const fbq = (window as any).fbq
            fbq && fbq('track', 'PageView')
        })
    }
})
