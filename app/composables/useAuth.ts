import { useCartStore } from '@/stores/cart'

export const useAuth = () => {
    const { $api } = useNuxtApp()

    const token = useCookie<string | null>('token', {
        maxAge: 60 * 60 * 24 * 7,
        sameSite: 'lax',
        path: '/',
    })

    const userinfo = useCookie<string | null>('userinfo', {
        maxAge: 60 * 60 * 24 * 7,
        sameSite: 'lax',
        path: '/',
    })

    // ✅ 更健壮：支持 "/path?x=1#y" 或完整 URL
    const forceHomePaths = ['/cart', '/userinfo', '/myorders', '/orderinfo']

    const isForceHomePath = (input: string) => {
        if (!input) return false

        // 取纯 pathname
        let pathname = ''
        try {
            const base = process.client ? window.location.origin : ''
            pathname = new URL(input, base).pathname
        } catch {
            pathname = (input.split('?')[0] || '').split('#')[0] || '/'
        }

        // 去掉可能的结尾斜杠（/orderinfo/ -> /orderinfo）
        if (pathname.length > 1 && pathname.endsWith('/')) pathname = pathname.slice(0, -1)

        return forceHomePaths.includes(pathname)
    }


    // ✅ 登录
    const login = async (email: string, password: string) => {
        try {
            const response = await $api('/user/user/loginByEmail', {
                method: 'POST',
                body: { email, password },
            })
            if (response.code === 0) {
                token.value = response.result.token
                userinfo.value = JSON.stringify(response.result.user)
            }
            return response
        } catch (error) {
            console.error('登录失败:', error)
            throw error
        }
    }

    // ✅ 注册（并登录）
    const register = async (
        fullName: string,
        email: string,
        password: string,
        numberAreaCode: string,
        number: Number
    ) => {
        try {
            const response = await $api('/user/user/createWithLogin', {
                method: 'POST',
                body: { fullName, email, password, numberAreaCode, number },
            })
            if (response.code === 0) {
                token.value = response.result.token
                userinfo.value = JSON.stringify(response.result.user)
            }
            return response
        } catch (error) {
            console.error('登录失败:', error)
            throw error
        }
    }

    // 仅创建账户
    const register1 = async (
        fullName: string,
        email: string,
        password: string,
        numberAreaCode: string,
        number: Number
    ) => {
        try {
            const response = await $api('/user/user/create', {
                method: 'POST',
                body: { fullName, email, password, numberAreaCode, number },
            })
            if (response.token) {
                token.value = response.token
            }
            return response
        } catch (error) {
            console.error('登录失败:', error)
            throw error
        }
    }

    const sendrepassword = async (email: string, token: string) => {
        try {
            const response = await $api('/user/user/sendRetrievePasswordEmail', {
                method: 'POST',
                body: { email, token },
            })
            return response
        } catch (error) {
            console.error('发送失败:', error)
            throw error
        }
    }

    const updatepassword = async (email: string, code: string, newPassword: string) => {
        try {
            const response = await $api('/user/user/retrievePassword', {
                method: 'POST',
                body: { email, code, newPassword },
            })
            return response
        } catch (error) {
            console.error('修改失败:', error)
            throw error
        }
    }

    const createContactUs = async (params: any) => {
        try {
            const response = await $api('/user/contactUs/createContactUs', {
                method: 'POST',
                body: params,
            })
            return response
        } catch (error) {
            throw error
        }
    }

    const getUserInfo = async (params: any) => {
        try {
            const response = await $api('/user/user/getUserInfo', {
                method: 'POST',
                body: params,
            })
            return response
        } catch (error) {
            throw error
        }
    }

    const googleLogin = async (params: Record<string, string>) => {
        try {
            const query = new URLSearchParams(params).toString()
            const response = await $api(`/user/oauth/google/googleLogin?${query}`, { method: 'GET' })
            if (response.code === 0) {
                token.value = response.result.token
                userinfo.value = JSON.stringify(response.result.user)
                return response
            } else {
                navigateTo('/login')
            }
        } catch (error) {
            throw error
        }
    }

    const facebookLogin = async (params: Record<string, string>) => {
        try {
            const query = new URLSearchParams(params).toString()
            const response = await $api(`/user/oauth/facebook/facebookLogin?${query}`, { method: 'GET' })
            if (response.code === 0) {
                token.value = response.result.token
                userinfo.value = JSON.stringify(response.result.user)
                return response
            } else {
                navigateTo('/login')
            }
        } catch (error) {
            throw error
        }
    }

    // ✅ 退出登录：存好 redirect_to（强制页 => '/'，其他 => 当前完整地址），再跳登录
    const logout = () => {
        const cart = useCartStore()

        // 清 cookie（统一 path:'/'）
        token.value = null
        userinfo.value = null
        const redirectCookie = useCookie<string | null>('redirect_to', { path: '/', sameSite: 'lax' })

        // 取当前完整地址
        let fullPath = '/'
        if (process.client) {
            fullPath = window.location.pathname + window.location.search + window.location.hash
        } else {
            try {
                const event = useRequestEvent()
                fullPath = event?.node?.req?.url || '/'
            } catch { /* ignore */ }
        }

        // 存 cookie：强制页存 '/'，其余存当前页
        console.log(fullPath);
        redirectCookie.value = isForceHomePath(fullPath) ? '/' : fullPath

        // 为了保险再同步清理浏览器端同名 cookie
        if (process.client) {
            document.cookie = 'token=; Max-Age=0; path=/'
            document.cookie = 'userinfo=; Max-Age=0; path=/'
        }

        // 刷新购物车状态
        try { cart.refreshCart() } catch { /* ignore */ }

        // 去登录页
        navigateTo('/login')
    }

    return {
        login,
        logout,
        register,
        sendrepassword,
        updatepassword,
        token,
        createContactUs,
        googleLogin,
        facebookLogin,
        getUserInfo
    }
}
