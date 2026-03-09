import { onMounted } from 'vue';

export default defineNuxtRouteMiddleware((to) => {
    const config = useRuntimeConfig()
    const baseUrl = config.public.apiBase.includes(
        '192.168.8.52'
    ) ? 'http://192.168.8.52:3000' : 'https://incustom.com'; // 替换为你的站点 URL
    const canonicalPath = to.path === '/' ? '/' : to.path.replace(/\/$/, '');
    const canonicalUrl = `${baseUrl}${canonicalPath}`;

     // 校验路由是否符合 /categories/:category 格式
    if (to.path.startsWith('/categories')) {
        const segments = to.path.split('/').filter(Boolean); // 分割路径
        if (segments.length !== 2 || segments[0] !== 'categories') {
            throw showError({
                statusCode: 410,
                message: 'This page is no longer available.',
            });
        }
    }
    
    // console.log('[路由中间件] 设置 Canonical URL:', process, config, canonicalUrl);
    useHead({
        link: [
            {
                rel: 'canonical',
                href: canonicalUrl,
            },
        ],
    });

    // 使用 onMounted 确保只在页面完全渲染后执行
    onMounted(async () => {
        const { ensureToken } = useAuth();
        await ensureToken(); // 执行异步操作
    });
});
