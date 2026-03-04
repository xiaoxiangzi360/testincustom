import { ref } from 'vue'

export function useThrottled<T extends (...args: any[]) => void>(callback: T, delay: number = 100) {
    const throttleTimer = ref<any>(null)

    const throttledFunction = (...args: Parameters<T>) => {
        // if (typeof window === 'undefined') {
        //     // SSR 环境中直接调用 callback
        //     callback(...args)
        //     return
        // }

        if (throttleTimer.value) return
        throttleTimer.value = setTimeout(() => {
            callback(...args) // 将参数传递给 callback
            throttleTimer.value = null
        }, delay)
    }

    return {
        throttledFunction,
    }
}