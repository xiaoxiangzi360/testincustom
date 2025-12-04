// composables/useAuth.ts
import { useCartStore } from '@/stores/cart'

export const useAuth = () => {
    const { $api } = useNuxtApp()

    // 统一的“永久”过期时间（近似永久）
    const PERMA_EXPIRES = new Date('2099-12-31T23:59:59Z')
    const commonCookieOpts = {
        sameSite: 'lax' as const,
        path: '/',
        expires: PERMA_EXPIRES,
        // secure: process.dev ? false : true, // 生产强烈建议开启
    }

    const token = useCookie<string | null>('token', commonCookieOpts)
    const userinfo = useCookie<string | null>('userinfo', commonCookieOpts)
    const userType = useCookie<string | null>('userType', commonCookieOpts) // '1'=注册用户, '2'=游客

    // 🔒 防抖：避免并发多次拉 guest token
    const isEnsuring = useState<boolean>('__ensuring_token__', () => false)

    // ✅ 核心：确保有 token（无则向后端领取一个）并标记 userType=2
    const ensureToken = async () => {
        if (token.value || isEnsuring.value) return
        isEnsuring.value = true
        try {
            const res = await $api('/user/user/getNonRegisteredUser', { method: 'POST' })
            if (res?.code === 0 && res?.result?.token) {
                token.value = res.result.token
                // 游客身份标记
                userType.value = '2'
                // 游客通常没有用户资料，这里不写 userinfo
            }
        } catch (e) {
            if (process.dev) console.warn('[ensureToken] failed:', e)
        } finally {
            isEnsuring.value = false
        }
    }

    // ✅ 更健壮：支持 "/path?x=1#y" 或完整 URL
    const forceHomePaths = ['/userinfo', '/myorders', '/orderinfo']

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

    // ✅ 登录（设置 token/userinfo & userType=1）
    const login = async (email: string, password: string) => {
        try {
            const response = await $api('/user/user/loginByEmail', {
                method: 'POST',
                body: { email, password },
            })
            if (response.code === 0) {
                token.value = response.result.token
                userinfo.value = JSON.stringify(response.result.user || null)
                userType.value = response.result.user.userType
            }
            return response
        } catch (error) {
            console.error('登录失败:', error)
            throw error
        }
    }

    // ✅ 注册（并登录）→ userType=1
    const register = async (params: any
    ) => {
        try {
            const response = await $api('/user/user/createWithLogin', {
                method: 'POST',
                body: params,
            })
            if (response.code === 0) {
                token.value = response.result.token
                userinfo.value = JSON.stringify(response.result.user || null)
                userType.value = response.result.user.userType

            }
            return response
        } catch (error) {
            console.error('登录失败:', error)
            throw error
        }
    }
    const createBSideWithLogin = async (params: any
    ) => {
        try {
            const response = await $api('/user/user/createBSideWithLogin', {
                method: 'POST',
                body: params,
            })
            if (response.code === 0) {
                token.value = response.result.token
                userinfo.value = JSON.stringify(response.result.user || null)
                userType.value = response.result.user.userType

            }
            return response
        } catch (error) {
            console.error('登录失败:', error)
            throw error
        }
    }
    const googleRegister = async (params: any
    ) => {
        try {
            const response = await $api('/user/oauth/google/googleRegister', {
                method: 'POST',
                body: params,
            })
            if (response.code === 0) {
                token.value = response.result.token
                userinfo.value = JSON.stringify(response.result.user || null)
                userType.value = response.result.user.userType

            }
            return response
        } catch (error) {
            console.error('登录失败:', error)
            throw error
        }
    }
    const facebookRegister = async (params: any
    ) => {
        try {
            const response = await $api('/user/oauth/facebook/facebookRegister', {
                method: 'POST',
                body: params,
            })
            if (response.code === 0) {
                token.value = response.result.token
                userinfo.value = JSON.stringify(response.result.user || null)
                userType.value = response.result.user.userType

            }
            return response
        } catch (error) {
            console.error('登录失败:', error)
            throw error
        }
    }
    // 仅创建账户（不登录），若返回 token 也写入；不一定代表已注册登录态，视后端而定
    const register1 = async (
        fullName: string,
        email: string,
        password: string,
        numberAreaCode: string,
        number: number
    ) => {
        try {
            const response = await $api('/user/user/create', {
                method: 'POST',
                body: { fullName, email, password, numberAreaCode, number },
            })
            if ((response as any).token) {
                token.value = (response as any).token
                // 这里不敢强行设 userType=1，除非后端语义明确
            }
            return response
        } catch (error) {
            console.error('登录失败:', error)
            throw error
        }
    }

    const sendrepassword = async (email: string, tokenStr: string) => {
        try {
            const response = await $api('/user/user/sendRetrievePasswordEmail', {
                method: 'POST',
                body: { email, token: tokenStr },
            })
            return response
        } catch (error) {
            console.error('发送失败:', error)
            throw error
        }
    }

    const sendUserRegisterEmail = async (email: string, tokenStr: string) => {
        try {
            const response = await $api('/user/user/sendUserRegisterEmail', {
                method: 'POST',
                body: { email, token: tokenStr },
            })
            return response
        } catch (error) {
            console.error('发送失败:', error)
            throw error
        }
    }
    const checkCreateUserCodeByEmail = async (email: string, code: string) => {
        try {
            const response = await $api('/user/user/checkCreateUserCodeByEmail', {
                method: 'POST',
                body: { email, code },
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
            const response = await $api(`/user/oauth/google/googleLogin`, { method: 'POST', body: params })
            if (response.code === 0) {
                if (response.result) {
                    token.value = response.result.token
                    userinfo.value = JSON.stringify(response.result.user || null)
                    userType.value = response.result.user.userType
                }

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
            const response = await $api(`/user/oauth/facebook/facebookLogin`, { method: 'POST', body: params })
            if (response.code === 0) {
                if (!response.result) {
                    navigateTo({
                        path: '/registerbusiness',
                        query: { step: 2, code: params.code, type: 'facebook', }
                    }, { replace: true })
                } else {
                    token.value = response.result.token
                    userinfo.value = JSON.stringify(response.result.user || null)
                    userType.value = response.result.user.userType
                }

                return response
            } else {
                navigateTo('/login')
            }
        } catch (error) {
            throw error
        }
    }


    // ✅ 退出登录：清理所有 cookie（含 userType）并立即获取游客 token
    const logout = async () => {
        const cart = useCartStore()

        // 1) 记录当前路径（用于后续是否跳转判断）
        let fullPath = '/'
        if (process.client) {
            fullPath = window.location.pathname + window.location.search + window.location.hash
        } else {
            try {
                const event = useRequestEvent()
                fullPath = event?.node?.req?.url || '/'
            } catch { /* ignore */ }
        }

        // 2) 清空登录态
        token.value = null
        userinfo.value = null
        userType.value = null

        const redirectCookie = useCookie<string | null>('redirect_to', { path: '/', sameSite: 'lax' })
        // 仅在「强制回登录」场景下使用 redirect_to；其它场景停留当前页无需用它
        redirectCookie.value = isForceHomePath(fullPath) ? '/' : fullPath

        // 保险：浏览器端同步清理同名 cookie
        if (process.client) {
            document.cookie = 'token=; Max-Age=0; path=/'
            document.cookie = 'userinfo=; Max-Age=0; path=/'
            document.cookie = 'userType=; Max-Age=0; path=/'
            // document.cookie = 'locationinfo=; Max-Age=0; path=/'
        }

        try { cart.refreshCart() } catch { /* ignore */ }

        // 3) 立刻领取游客 token（你已经实现了防抖）
        try {
            await ensureToken()
        } catch {
            // 开发环境可打印：console.warn('[logout] ensureToken failed', e)
        }

        // 4) 仅在特定页面跳转到登录，其它页面保持原地
        if (isForceHomePath(fullPath)) {
            await navigateTo('/login')
        }
    }


    const getNonRegisteredUser = async () => {
        try {
            const response = await $api('/user/user/getNonRegisteredUser', {
                method: 'POST',
            })
            return response
        } catch (error) {
            throw error
        }
    }
    const updateUserInfo = async (params: any) => {
        try {
            const response = await $api('/user/user/updateUserInfo', {
                method: 'POST',
                body: params,
            })
            return response
        } catch (error) {
            throw error
        }
    }
    return {
        // methods
        login,
        logout,
        register,
        sendrepassword,
        updatepassword,
        createContactUs,
        googleLogin,
        facebookLogin,
        getUserInfo,
        getNonRegisteredUser,
        ensureToken,
        // states
        token,
        userinfo,
        userType,
        updateUserInfo,
        sendUserRegisterEmail,
        createBSideWithLogin,
        googleRegister,
        facebookRegister,
        checkCreateUserCodeByEmail
    }
}
