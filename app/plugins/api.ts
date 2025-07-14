import { message } from 'ant-design-vue'

export default defineNuxtPlugin((nuxtApp) => {
    const config = useRuntimeConfig()

    // console.log(config.public)
    const apiFetch = $fetch.create({
        baseURL: config.public.apiBase,
        // baseURL: '/api',
        timeout: 10000, // 超时时间 10s
        credentials: 'include',
        headers: useRequestHeaders(['cookie']), // 适配 SSR & 客户端
        onRequest({ options }) {
            // ✅ 统一管理 Headers
            const token = useCookie('token').value
            if (token) {
                if (!options.headers) {
                    options.headers = new Headers()
                }
                (options.headers as Headers).set('token', `${token}`)
            }
        },
        async onResponse({ response }) {

            // ✅ 统一处理状态码
            if (response.status === 401) {
                console.error('未授权，请重新登录')
                message.warning('Please log in')

                await navigateTo('/login') // ✅ `await` 使返回值符合 `Promise<void>`
                return Promise.reject(new Error(JSON.stringify({ enDesc: 'Request failed' })))

            }
            if (response.status >= 500) {
                console.error('服务器错误')
                return Promise.reject(new Error('服务器繁忙，请稍后再试'))
            }
            if (response.status == 200) {
                const returndata = response._data
                if (returndata.code != 0) {

                    return Promise.reject(new Error(JSON.stringify(returndata.errorBody) || JSON.stringify({ enDesc: 'Request failed' })))
                }
                return returndata
            }
        },
        onResponseError({ response }) {
            console.error('Request failed:', response.status, response.statusText)
        },
    })

    // 挂载到 Nuxt 全局
    nuxtApp.provide('api', apiFetch)
})
