export default defineNuxtPlugin(() => {
    if (process.client) {
        const script = document.createElement('script')
        script.id = 'pixel-chaty'
        script.src = 'https://cdn.chaty.app/pixel.js?id=aNCRAwnp' // 换成你的实际ID
        script.async = true
        document.body.appendChild(script)
    }
})
