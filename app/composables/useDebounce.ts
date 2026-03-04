import { ref } from 'vue'

export function useDebounce<T extends (...args: any[]) => void>(callback: T, delay: number = 300) {
    const debounceTimer = ref<any>(null)

    const debouncedFunction = (...args: Parameters<T>) => {
        if (debounceTimer.value) {
            clearTimeout(debounceTimer.value) // 清除之前的定时器
        }
        debounceTimer.value = setTimeout(() => {
            callback(...args) // 将参数传递给 callback
            debounceTimer.value = null
        }, delay)
    }

    return {
        debouncedFunction,
    }
}