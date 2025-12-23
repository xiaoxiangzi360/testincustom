// plugins/build-time.ts
export default defineNuxtPlugin(() => {
    const config = useRuntimeConfig()
    const formattedTime = config.public.buildTimeFormatted

    console.log('Build time plugin loaded:', formattedTime)

    if (formattedTime) {
        useHead({
            meta: [
                {
                    name: 'buildtime',
                    content: formattedTime
                }
            ]
        })
    }
})