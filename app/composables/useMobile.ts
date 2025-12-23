import { ref, computed, onMounted, onUnmounted } from 'vue';

export function useMobile(breakpoint = 768) {
    const windowWidth = ref(0); // 初始化为 0，避免 SSR 报错

    // 是否是移动端
    const isMobile = computed(() => windowWidth.value < breakpoint);

    // 监听窗口大小变化
    const handleResize = () => {
        windowWidth.value = window.innerWidth;
    };

    // 生命周期：挂载时添加监听器
    onMounted(() => {
        // 确保在客户端环境中执行
        windowWidth.value = window.innerWidth; // 初始化宽度
        window.addEventListener('resize', handleResize);
    });

    // 生命周期：卸载时移除监听器
    onUnmounted(() => {
        window.removeEventListener('resize', handleResize);
    });

    return {
        isMobile, // 是否是移动端
        windowWidth, // 当前窗口宽度
    };
}