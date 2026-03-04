export default defineNuxtPlugin(() => {
  // 只在客户端运行
  if (process.client) {
    console.log('初始化 GTM 和 gtag.js 插件, 以及 Clarity');

    // 立即初始化 dataLayer
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      'gtm.start': new Date().getTime(),
      event: 'gtm.js'
    });

    function loadClarity() {
      if (document.querySelector('script[src*="clarity.ms/tag/"]')) return;
      (function (c, l, a, r, i, t, y) {
        c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments) };
        t = l.createElement(r);
        t.async = true;
        t.defer = true;
        t.src = "https://www.clarity.ms/tag/" + i;
        y = l.getElementsByTagName(r)[0];
        y.parentNode.insertBefore(t, y);
      })(window, document, "clarity", "script", "sx1h9qcyr4");
    }

    const loadGTM = () => {
      // 防止重复加载 GTM
      if (document.querySelector('script[src*="googletagmanager.com/gtm.js"]')) {
        console.log('GTM 已加载，跳过');
      } else {
        const gtmScript = document.createElement('script');
        gtmScript.async = true;
        gtmScript.src = 'https://www.googletagmanager.com/gtm.js?id=GTM-WLSVXPKK';
        gtmScript.onload = () => console.log('GTM 脚本加载完成');
        gtmScript.onerror = () => console.error('GTM 脚本加载失败');
        document.head.appendChild(gtmScript);
        console.log('GTM 脚本开始加载');
      }
    };

    const loadGtag = () => {
      // 防止重复加载 gtag.js
      if (document.querySelector('script[src*="googletagmanager.com/gtag/js"]')) {
        console.log('gtag.js 已加载，跳过');
      } else {
        const gtagScript = document.createElement('script');
        gtagScript.async = true;
        gtagScript.src = 'https://www.googletagmanager.com/gtag/js?id=AW-17805456624';
        gtagScript.onload = () => {
          console.log('gtag.js 脚本加载完成');
          window.dataLayer = window.dataLayer || [];
          // 将 gtag 方法绑定到 window 上
          window.gtag = function () {
            window.dataLayer.push(arguments);
          };
          window.gtag('js', new Date());
          window.gtag('config', 'AW-17805456624');
        };
        gtagScript.onerror = () => console.error('gtag.js 脚本加载失败');
        document.head.appendChild(gtagScript);
        console.log('gtag.js 脚本开始加载');
      }
    };

    // 并行加载 GTM 和 gtag.js
    const loadScripts = () => {
      console.log('开始并行加载 GTM 和 gtag.js, 以及 Clarity');
      loadClarity();
      loadGTM();
      loadGtag();
    };

    // 用户交互立即加载
    const loadOnInteraction = () => {
      console.log('用户交互，立即加载 GTM 和 gtag.js, 以及 Clarity');
      loadScripts();
      // 移除监听器
      ['mousedown', 'touchstart', 'keydown', 'scroll'].forEach((event) => {
        document.removeEventListener(event, loadOnInteraction);
      });
    };

    // 页面加载完成后再监听用户行为
    if (document.readyState === 'complete') {
      console.log('页面已加载，开始监听用户行为');
      ['mousedown', 'touchstart', 'keydown', 'scroll'].forEach((event) => {
        document.addEventListener(event, loadOnInteraction, { once: true });
      });
    } else {
      window.addEventListener('load', () => {
        console.log('[客户端] 页面加载完成，开始监听用户交互');
        ['mousedown', 'touchstart', 'keydown', 'scroll'].forEach((event) => {
          document.addEventListener(event, loadOnInteraction, { once: true });
        });
      });
    }
  }
});