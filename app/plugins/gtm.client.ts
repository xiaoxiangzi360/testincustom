// plugins/gtm.client.ts
export default defineNuxtPlugin(() => {
  // 只在客户端运行
  if (process.client) {
    console.log('初始化 GTM 插件');

    // 立即初始化 dataLayer
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      'gtm.start': new Date().getTime(),
      event: 'gtm.js'
    });

    const loadGTM = () => {
      // 防止重复加载
      if (document.querySelector('script[src*="googletagmanager.com/gtm.js"]')) {
        console.log('GTM 已加载，跳过');
        return;
      }

      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://www.googletagmanager.com/gtm.js?id=GTM-WLSVXPKK';

      script.onload = () => console.log('GTM 脚本加载完成');
      script.onerror = () => console.error('GTM 脚本加载失败');

      document.head.appendChild(script);
      console.log('GTM 脚本开始加载');
    };

    // // 延迟加载策略
    // if (document.readyState === 'loading') {
    //   // 页面还在加载，等待 load 事件
    //   window.addEventListener('load', () => {
    //     console.log('页面加载完成，2秒后加载 GTM');
    //     setTimeout(loadGTM, 2000);
    //   });
    // } else {
    //   // 页面已加载
    //   console.log('页面已就绪，2秒后加载 GTM');
    //   setTimeout(loadGTM, 2000);
    // }

    // 用户交互立即加载
    const loadOnInteraction = () => {
      console.log('用户交互，立即加载 GTM');
      loadGTM();
      // 移除监听器
      ['mousedown', 'touchstart', 'keydown', 'scroll'].forEach((event) => {
        document.removeEventListener(event, loadOnInteraction);
      });
    };

    // 页面加载完成后再监听用户行为
    if (document.readyState === 'complete') {
      console.log('页面已加载，开始监听用户行为---GTM');
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