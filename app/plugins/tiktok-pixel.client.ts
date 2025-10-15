// plugins/tiktok-pixel.client.ts

import { useRouter } from 'vue-router';

// 声明全局 window.ttq，避免 TS 报错
declare global {
    interface Window {
        ttq?: any;
    }
}

export default defineNuxtPlugin((nuxtApp) => {
    // ✅ 初始化 Pixel，仅在客户端执行
    if (window.ttq) return;

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

        // ✅ 替换成你的 Pixel ID
        ttq.load("D3KDH13C77U1STIOE1EG");
        ttq.page();
    })(window, document, "ttq");

    // ✅ 路由监听逻辑放在这里
    const router = useRouter();
    router.afterEach(() => {
        if (window.ttq) {
            window.ttq.page(); // 每次页面跳转重新上报 PageView
        }
    });
});
