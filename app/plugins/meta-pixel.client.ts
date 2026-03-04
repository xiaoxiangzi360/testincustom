export default defineNuxtPlugin((nuxtApp) => {
    if (process.client) {
        const metaPixelKey = 'meta-pixel';

        // 加载 Facebook Pixel 脚本
        const loadMetaPixel = () => {
            if ((window as any).fbq) return; // 避免重复加载

            // 使用 TypeScript 友好的方式定义立即执行函数
            (function (f: any, b: Document, e: string, v: string, n: any, t: HTMLScriptElement, s: Node) {
                if (f.fbq) return;
                n = f.fbq = function () {
                    n.callMethod
                        ? n.callMethod.apply(n, arguments)
                        : n.queue.push(arguments);
                };
                if (!f._fbq) f._fbq = n;
                n.push = n;
                n.loaded = true;
                n.version = '2.0';
                n.queue = [];
                t = b.createElement(e) as HTMLScriptElement;
                t.async = true;
                t.src = v;
                s = b.getElementsByTagName(e)[0];
                s.parentNode?.insertBefore(t, s);
            })(
                window,
                document,
                'script',
                'https://connect.facebook.net/en_US/fbevents.js',
                null,
                null,
                null
            );

            (window as any).fbq('init', '1162640842704322');
            (window as any).fbq('track', 'PageView');
        };

        // 延迟加载或用户交互时加载
        const setupMetaPixel = () => {
            if (document.readyState === 'complete') {
                setTimeout(loadMetaPixel, 3000);
            } else {
                window.addEventListener('load', () => setTimeout(loadMetaPixel, 3000));
                ['mousedown', 'touchstart', 'scroll'].forEach((event) => {
                    window.addEventListener(event, loadMetaPixel, {
                        once: true,
                        passive: true,
                    });
                });
            }
        };

        // 插入脚本
        nuxtApp.hook('app:mounted', () => {
            if (!document.querySelector(`[key="${metaPixelKey}"]`)) {
                setupMetaPixel();
            }
        });

        // 监听页面切换，触发 PageView 事件
        nuxtApp.hook('page:finish', () => {
            const fbq = (window as any).fbq;
            fbq && fbq('track', 'PageView');
        });
    }
});