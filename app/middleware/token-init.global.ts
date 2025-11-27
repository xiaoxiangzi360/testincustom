import { onMounted } from 'vue';

export default defineNuxtRouteMiddleware(async () => {
    // 使用 onMounted 确保只在页面完全渲染后执行
    onMounted(async () => {
        const { ensureToken } = useAuth();
        await ensureToken(); // 执行异步操作
    });
});
