import { ref, computed, onMounted, onUnmounted, isRef, type Ref } from 'vue'

type UseOptimizedOpts = {
    /** 组件里可传入自定义的宽度（比如档位计算结果） */
    widthRef?: Ref<number>
    /** 最小/最大宽度，避免异常 */
    minWidth?: number
    maxWidth?: number
}

export function useOptimizedImages(
    source: string[] | Ref<string[] | undefined | null>,
    opts: UseOptimizedOpts = {}
) {
    const baseImages = isRef(source) ? source : ref(source || [])
    const width = ref(1200)

    const { widthRef, minWidth = 80, maxWidth = 4096 } = opts

    const updateWidth = () => {
        if (typeof window !== 'undefined') {
            width.value = window.innerWidth
        }
    }

    onMounted(() => {
        updateWidth()
        window.addEventListener('resize', updateWidth)
    })

    onUnmounted(() => {
        window.removeEventListener('resize', updateWidth)
    })

    /** 默认的系统挡位（没传 widthRef 时就用这个） */
    function getTargetWidth(screenWidth: number) {
        if (screenWidth >= 3840) return 3840   // 4K
        if (screenWidth >= 2560) return 2560   // 2K / WQHD
        if (screenWidth >= 1920) return 1920   // FHD
        if (screenWidth >= 1600) return 1600   // 16:10 笔电
        if (screenWidth >= 1366) return 1366   // 主流笔电
        if (screenWidth >= 1280) return 1280   // 小型笔记本
        if (screenWidth >= 1024) return 1024   // 平板横屏
        if (screenWidth >= 768) return 768    // 平板竖屏
        if (screenWidth >= 640) return 640    // 大屏手机
        return 640                              // 默认最小手机
    }

    const optimizedImages = computed(() => {
        // 优先使用组件传的 widthRef，否则走默认挡位
        let targetWidth = widthRef?.value ?? getTargetWidth(width.value)
        // 限制范围
        targetWidth = Math.min(Math.max(targetWidth, minWidth), maxWidth)

        return (baseImages.value || []).map((image) => {
            const safe = image || '/images/empty.jpg'
            return `${safe}?x-oss-process=image/resize,w_${targetWidth},limit_0`
        })
    })

    return { optimizedImages, width }
}
