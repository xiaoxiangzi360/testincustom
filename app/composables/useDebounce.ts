import { ref } from 'vue'

export function useDebounce(callback: () => void, delay: number = 300) {
    const debounceTimer = ref<number | null>(null)

    const debouncedFunction = () => {
        if (debounceTimer.value) {
            clearTimeout(debounceTimer.value) // 清除之前的定时器
        }

        debounceTimer.value = window.setTimeout(() => {
            callback()
            debounceTimer.value = null
        }, delay)
    }

    return {
        debouncedFunction,
    }
}