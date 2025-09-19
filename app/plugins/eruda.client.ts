export default defineNuxtPlugin(async () => {
    if (typeof window === 'undefined') return
    const isMobile = /iPhone|Android|Mobile/i.test(navigator.userAgent)
    const hasDebug = new URLSearchParams(location.search).has('debug')
    if (!(isMobile && hasDebug)) return
    const s = document.createElement('script')
    s.src = 'https://cdn.jsdelivr.net/npm/eruda'
    s.onload = () => (window as any).eruda?.init()
    document.body.appendChild(s)
})
