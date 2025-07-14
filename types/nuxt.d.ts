import type { FetchOptions } from 'ofetch'

declare module '#app' {
    interface NuxtApp {
        $api: (url: string, options?: FetchOptions) => Promise<any>
    }
}

declare module 'nuxt/schema' {
    interface NuxtConfig {
        app?: {
            $api: (url: string, options?: FetchOptions) => Promise<any>
        }
    }
}

export { }
