// plugins/api.ts
import { message } from 'ant-design-vue'

export default defineNuxtPlugin((nuxtApp) => {
    const config = useRuntimeConfig()

    const apiFetch = $fetch.create({
        baseURL: config.public.apiBase,
        timeout: 10000,
        // ❌ 不要固定 include；在 onRequest 里按需设置
        // credentials: 'include',

        async onRequest({ options }) {
            const token = useCookie<string | null>('token').value

            if (!options.headers) options.headers = new Headers()

            if (token) {
                // ✅ 有前端 token：才附带头与 Cookie
                ; (options.headers as Headers).set('token', token)
                options.credentials = 'include'

                // SSR 下仅在有 token 时转发入站 Cookie（比如其它会话用到）
                if (process.server) {
                    const reqCookie = useRequestHeaders(['cookie']).cookie
                    if (reqCookie) (options.headers as Headers).set('cookie', reqCookie)
                }
            } else {
                // ✅ 没有前端 token：彻底不带 Cookie，避免把 HttpOnly token 也带上
                options.credentials = 'omit'
                    ; (options.headers as Headers).delete('token')
                // 防止 SSR 透传入站 Cookie
                if ((options.headers as Headers).has('cookie')) {
                    ; (options.headers as Headers).delete('cookie')
                }
            }
        },

        async onResponse({ response }) {
            // 统一状态处理
            if (response.status === 401) {
                // 记录返回页
                const redirectCookie = useCookie<string | null>('redirect_to', {
                    path: '/', sameSite: 'lax'
                })
                let fullPath = '/'
                if (process.client) {
                    fullPath = window.location.pathname + window.location.search + window.location.hash
                } else {
                    try {
                        const event = useRequestEvent()
                        fullPath = event?.node?.req?.url || '/'
                    } catch { }
                }
                const isProductRoute = window.location.pathname.startsWith('/product')
                if (!isProductRoute) {

                    redirectCookie.value = fullPath
                }

                if (process.client) {
                    message.warning('Please log in')
                    await navigateTo('/login')
                } else {
                    // 服务端渲染时抛 401，让页面/中间件处理重定向
                    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
                }
                return
            }

            if (response.status >= 500) {
                return Promise.reject(new Error('服务器繁忙，请稍后再试'))
            }

            if (response.status === 200) {
                // 你后端是 { code, result, errorBody } 结构
                const data = response._data
                if (data && typeof data === 'object' && 'code' in data) {
                    if (data.code !== 0) {
                        return Promise.reject(
                            new Error(JSON.stringify(data.errorBody) || JSON.stringify({ enDesc: 'Request failed' }))
                        )
                    }
                    return data
                }
                // 非标准 JSON（比如文件流）直接返回
                return data
            }
        },

        onResponseError({ response }) {
            console.error('Request failed:', response.status, response.statusText)
        },
    })

    nuxtApp.provide('api', apiFetch)
})
