// composables/useGoogleMapsLoader.ts
let _promise: Promise<typeof google> | null = null

export function useGoogleMapsLoader(opts?: {
    apiKey?: string
    libraries?: string[]
    language?: string
    region?: string
    v?: string
}) {
    if (typeof window === 'undefined') {
        throw new Error('Google Maps can only be loaded on client')
    }

    // 已经有 google
    if ((window as any).google?.maps) return Promise.resolve(google)

    if (_promise) return _promise

    const config = useRuntimeConfig()
    const {
        apiKey = config.public.gmpApiKey,
        libraries = ['places'], // 👈 默认只加载 places
        language,
        region,
        v = 'weekly'
    } = opts || {}

    const params = new URLSearchParams()
    params.set('key', apiKey)
    if (libraries.length) params.set('libraries', libraries.join(','))
    if (language) params.set('language', language)
    if (region) params.set('region', region)
    params.set('v', v)

    _promise = new Promise((resolve, reject) => {
        const s = document.createElement('script')
        s.src = `https://maps.googleapis.com/maps/api/js?${params.toString()}`
        s.async = true
        s.defer = true
        s.onload = () => resolve(google)
        s.onerror = (e) => {
            _promise = null
            reject(e)
        }
        document.head.appendChild(s)
    })

    return _promise
}
