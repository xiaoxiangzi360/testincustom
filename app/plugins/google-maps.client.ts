export default defineNuxtPlugin(async () => {
    const config = useRuntimeConfig()
    if (typeof window === 'undefined') return
    if ((window as any)._gmpLoaded) return
        ; (window as any)._gmpLoaded = true

    await new Promise<void>((resolve, reject) => {
        const s = document.createElement('script')
        s.src = `https://maps.googleapis.com/maps/api/js?key=${config.public.gmpApiKey}&libraries=places&v=weekly`
        s.async = true
        s.defer = true
        s.onload = () => resolve()
        s.onerror = (e) => reject(e)
        document.head.appendChild(s)
    })
})
