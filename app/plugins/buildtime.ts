// plugins/build-time.ts
export default defineNuxtPlugin(() => {
    const config = useRuntimeConfig()
    const buildTime = config.public.buildTime
    const formattedTime = formatTimestamp(buildTime)
    console.log('Build time plugin loaded:', config.public, buildTime, formattedTime)

    useHead({
        meta: [
            {
                name: 'buildtime',
                content: config.public.buildTime
            },
            {
                name: 'buildtimeFormatted',
                content: formattedTime
            }
        ]
    })

})
function formatTimestamp(timestamp: string): string {
    if (!timestamp) {
        return ''
    }
    const date = new Date(Number(timestamp)) // 将时间戳字符串转换为 Date 对象
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0') // 月份从 0 开始，需要 +1
    const day = String(date.getDate()).padStart(2, '0')
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    const seconds = String(date.getSeconds()).padStart(2, '0')

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}` // 格式化为 YYYY-MM-DD HH:mm:ss
}