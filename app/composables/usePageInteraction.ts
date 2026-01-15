import { ref, onMounted, onUnmounted } from 'vue';

/**
 * 监听页面加载完成并检测用户操作
 * @returns {object} - 包含 `isPageLoaded` 和 `hasUserInteracted` 的状态
 */
export function usePageInteraction() {
    if (process.server) {
        return {
            isPageLoaded: ref(false),
            hasUserInteracted: ref(false),
        };
    }
    const isPageLoaded = ref(false); // 页面是否加载完成
    const hasUserInteracted = ref(false); // 用户是否有操作

    const handleUserInteraction = () => {
        hasUserInteracted.value = true;
        // 移除事件监听，避免重复触发
        window.removeEventListener('scroll', handleUserInteraction);
        window.removeEventListener('click', handleUserInteraction);
        window.removeEventListener('keydown', handleUserInteraction);
    };

    onMounted(() => {
        // 监听页面加载完成
        if (document.readyState === 'complete') {
            isPageLoaded.value = true;
        } else {
            window.addEventListener('load', () => {
                isPageLoaded.value = true;
            });
        }

        // 监听用户操作
        window.addEventListener('scroll', handleUserInteraction);
        window.addEventListener('click', handleUserInteraction);
        window.addEventListener('keydown', handleUserInteraction);
    });

    onUnmounted(() => {
        // 清理事件监听
        window.removeEventListener('scroll', handleUserInteraction);
        window.removeEventListener('click', handleUserInteraction);
        window.removeEventListener('keydown', handleUserInteraction);
    });

    return {
        isPageLoaded,
        hasUserInteracted,
    };
}