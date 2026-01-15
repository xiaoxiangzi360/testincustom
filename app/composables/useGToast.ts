// composables/useGToast.ts
import { inject, getCurrentInstance } from 'vue'
import type { ComponentPublicInstance } from 'vue'

type ToastType = 'info' | 'success' | 'warning' | 'error'

interface ToastOptions {
    type?: ToastType
    duration?: number
}

interface ToastInstance {
    show(message: string, options?: ToastOptions): void
    success(message: string, options?: Omit<ToastOptions, 'type'>): void
    error(message: string, options?: Omit<ToastOptions, 'type'>): void
    warning(message: string, options?: Omit<ToastOptions, 'type'>): void
    hide(): void
}

// 创建独立的全局 Toast 实例（备选方案）
let standaloneToastInstance: ComponentPublicInstance | null = null

/**
 * 初始化独立 Toast 实例（当没有全局挂载时使用）
 */
function initStandaloneToast() {
    if (standaloneToastInstance) return

    // 动态导入并创建 Toast
    import('@/components/Toast.vue').then(module => {
        const { createApp, h } = require('vue')

        const container = document.createElement('div')
        document.body.appendChild(container)

        const app = createApp({
            render() {
                return h(module.default, {
                    ref: 'toast'
                })
            },
            mounted() {
                standaloneToastInstance = (this as any).$refs.toast
            }
        })

        app.mount(container)
    })
}

/**
 * 使用 Toast 的 Hook
 */
export function useGToast(): ToastInstance {
    // 尝试从 provide 获取全局 Toast
    const globalToastRef = inject<{ value: ComponentPublicInstance }>('globalToast', null)

    // 获取当前组件实例
    const instance = getCurrentInstance()

    let toastInstance: ComponentPublicInstance | null = null

    // 优先级：全局注入 > 独立实例
    if (globalToastRef?.value) {
        toastInstance = globalToastRef.value
    } else {
        // 如果没有全局注入，创建独立实例
        initStandaloneToast()
        toastInstance = standaloneToastInstance
    }

    const show = (message: string, options: ToastOptions = {}) => {
        if (toastInstance?.show) {
            toastInstance.show(message, options)
        } else {
            // 如果实例还未准备好，延迟执行
            setTimeout(() => {
                toastInstance?.show?.(message, options)
            }, 50)
        }
    }

    const success = (message: string, options: Omit<ToastOptions, 'type'> = {}) =>
        show(message, { ...options, type: 'success' })

    const error = (message: string, options: Omit<ToastOptions, 'type'> = {}) =>
        show(message, { ...options, type: 'error' })

    const warning = (message: string, options: Omit<ToastOptions, 'type'> = {}) =>
        show(message, { ...options, type: 'warning' })

    const hide = () => {
        toastInstance?.hide?.()
    }

    return {
        show,
        hide,
        success,
        error,
        warning
    }
}

// 导出全局方法
export const toast = useGToast()