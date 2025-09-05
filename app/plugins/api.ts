// plugins/api.ts
import { message } from 'ant-design-vue'

export default defineNuxtPlugin((nuxtApp) => {
    const config = useRuntimeConfig()

    // 一个“干净”的 fetch，只用于 401 时获取游客 token
    const bareFetch = $fetch.create({
        baseURL: config.public.apiBase,
        timeout: 8000,
        credentials: 'omit',
    })

    let apiFetch: typeof $fetch

    apiFetch = $fetch.create({
        baseURL: config.public.apiBase,
        timeout: 10000,

        async onRequest({ options }) {
            const token = useCookie<string | null>('token', {
                sameSite: 'lax',
                path: '/',
            }).value

            if (!options.headers) options.headers = new Headers()

            if (token) {
                ; (options.headers as Headers).set('token', token)
                options.credentials = 'include'

                if (process.server) {
                    const reqCookie = useRequestHeaders(['cookie']).cookie
                    if (reqCookie) (options.headers as Headers).set('cookie', reqCookie)
                }
            } else {
                options.credentials = 'omit'
                    ; (options.headers as Headers).delete('token')
                if ((options.headers as Headers).has('cookie')) {
                    ; (options.headers as Headers).delete('cookie')
                }
            }
        },

        async onResponse({ request, options, response }) {
            if (response.status >= 500) {
                return Promise.reject(new Error('服务器繁忙，请稍后再试'))
            }

            if (response.status === 401) {
                const urlStr = typeof request === 'string' ? request : String(request)
                const isGuestEndpoint = urlStr.includes('/user/user/getNonRegisteredUser')
                const alreadyRetried = (options as any)._guestRetried === true

                if (!isGuestEndpoint && !alreadyRetried) {
                    try {
                        // 1) 领取游客 token
                        const guest: any = await bareFetch('/user/user/getNonRegisteredUser', { method: 'POST' })
                        if (guest?.code === 0 && guest?.result?.token) {
                            // 2) 写永久 token
                            const tokenCookie = useCookie<string | null>('token', {
                                sameSite: 'lax',
                                path: '/',
                                expires: new Date('2099-12-31T23:59:59Z'),
                            })
                            tokenCookie.value = guest.result.token

                            // 3) 写 userType=2
                            const userTypeCookie = useCookie<string | null>('userType', {
                                sameSite: 'lax',
                                path: '/',
                                expires: new Date('2099-12-31T23:59:59Z'),
                            })
                            userTypeCookie.value = '2'

                            // 4) 重试原请求（仅一次）
                            const retryOptions = { ...(options as any), _guestRetried: true }
                            return await apiFetch(request as any, retryOptions as any)
                        }
                    } catch (e) {
                        if (process.dev) console.warn('[401] 获取游客 token 失败：', e)
                    }
                }

                // 如果重试失败或已重试过
                if (process.server) {
                    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
                } else {
                    // 可选提示
                    // message.warning('Unauthorized')
                }
                return
            }

            if (response.status === 200) {
                const data = response._data
                if (data && typeof data === 'object' && 'code' in data) {
                    if (data.code !== 0) {
                        return Promise.reject(
                            new Error(JSON.stringify(data.errorBody) || JSON.stringify({ enDesc: 'Request failed' }))
                        )
                    }
                    return data
                }
                return data
            }
        },

        onResponseError({ response }) {
            console.error('Request failed:', response.status, response.statusText)
        },
    })

    nuxtApp.provide('api', apiFetch)
})
