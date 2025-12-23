import { ref } from 'vue'

export function useThrottled(callback: () => void, delay: number = 100) {
    const throttleTimer = ref<number | null>(null)

    const throttledFunction = () => {
        if (throttleTimer.value) return

        throttleTimer.value = window.setTimeout(() => {
            callback()
            throttleTimer.value = null
        }, delay)
    }

    return {
        throttledFunction,
    }
}