export default defineNuxtPlugin(() => {
    if (!process.client) return

    const hash = window.location.hash
    if (!hash) return

    const params = new URLSearchParams(hash.replace('#', ''))
    const utmData = Object.fromEntries(params.entries())

    if (Object.keys(utmData).length === 0) return

    // 只在第一次访问时记录
    if (!localStorage.getItem('utm_data')) {
        localStorage.setItem('utm_data', JSON.stringify(utmData))
    }
})
