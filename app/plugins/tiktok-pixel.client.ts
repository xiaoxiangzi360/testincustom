// plugins/tiktok-pixel.client.ts

import { useRouter } from 'vue-router';

// 声明全局 window.ttq，避免 TS 报错
declare global {
    interface Window {
        ttq?: any;
    }
}

// 优化：延迟加载 TikTok Pixel
export default defineNuxtPlugin((nuxtApp) => {
    if (process.client && !window.ttq) {
        // 初始化 TikTok Pixel 对象（但不立即加载脚本）
        (function (w: any, d: any, t: string) {
            w.TiktokAnalyticsObject = t;
            const ttq: any = (w[t] = w[t] || []);
            ttq.methods = [
                "page", "track", "identify", "instances", "debug", "on", "off",
                "once", "ready", "alias", "group", "enableCookie", "disableCookie",
                "holdConsent", "revokeConsent", "grantConsent"
            ];
            ttq.setAndDefer = function (t: any, e: string) {
                t[e] = function () {
                    t.push([e].concat(Array.prototype.slice.call(arguments, 0)));
                };
            };
            for (let i = 0; i < ttq.methods.length; i++) ttq.setAndDefer(ttq, ttq.methods[i]);
            ttq.load = function (e: string, n: any) {
                const r = "https://analytics.tiktok.com/i18n/pixel/events.js";
                ttq._i = ttq._i || {};
                ttq._i[e] = [];
                const s = d.createElement("script");
                s.type = "text/javascript";
                s.async = true;
                s.src = r + "?sdkid=" + e + "&lib=" + t;
                const f = d.getElementsByTagName("script")[0];
                f.parentNode!.insertBefore(s, f);
            };
        })(window, document, "ttq");

        // 延迟加载 TikTok Pixel 脚本
        function loadTikTokPixel() {
            if (window.ttq && !(window.ttq as any)._i) {
                (window.ttq as any).load("D3KDH13C77U1STIOE1EG");
                (window.ttq as any).page();
            }
        }

        // 页面加载完成后延迟 3 秒加载，或用户交互时立即加载
        if (document.readyState === 'complete') {
            setTimeout(loadTikTokPixel, 3000);
        } else {
            window.addEventListener('load', function() { setTimeout(loadTikTokPixel, 3000); });
            ['mousedown', 'touchstart', 'scroll'].forEach(function(event) {
                window.addEventListener(event, loadTikTokPixel, { once: true, passive: true });
            });
        }

        // ✅ 路由监听逻辑
        const router = useRouter();
        router.afterEach(() => {
            if (window.ttq) {
                window.ttq.page();
            }
        });
    }
});
