import { ref, onMounted, onUnmounted } from 'vue'

export function useNavBar(navBarId: string = 'navBar') {
    const navBarHeight = ref(0) // 存储 navBar 的高度
    let resizeObserver: ResizeObserver | null = null

    const updateNavBarHeight = () => {
        const navBarElement = document.getElementById(navBarId)
        if (navBarElement) {
            navBarHeight.value = navBarElement.offsetHeight
        }
    }

    onMounted(() => {
        updateNavBarHeight() // 初始化获取高度

        // 使用 ResizeObserver 监听 navBar 高度变化
        const navBarElement = document.getElementById(navBarId)
        if (navBarElement) {
            resizeObserver = new ResizeObserver(() => {
                updateNavBarHeight()
            })
            resizeObserver.observe(navBarElement)
        }
    })

    onUnmounted(() => {
        // 停止监听
        if (resizeObserver) {
            resizeObserver.disconnect()
        }
    })

    return {
        navBarHeight,
    }
}