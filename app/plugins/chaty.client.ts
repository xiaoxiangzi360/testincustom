// 优化：延迟加载 Chaty
export default defineNuxtPlugin(() => {
    if (process.client) {
        function loadChaty() {
            if (document.getElementById('pixel-chaty')) return;
            const script = document.createElement('script')
            script.id = 'pixel-chaty'
            script.src = 'https://cdn.chaty.app/pixel.js?id=aNCRAwnp'
            script.async = true
            document.body.appendChild(script)
        }
        // 延迟加载：页面加载完成后 5 秒，或用户交互时立即加载
        if (document.readyState === 'complete') {
            setTimeout(loadChaty, 5000);
        } else {
            window.addEventListener('load', function() { setTimeout(loadChaty, 5000); });
            ['mousedown', 'touchstart', 'scroll'].forEach(function(event) {
                window.addEventListener(event, loadChaty, { once: true, passive: true });
            });
        }
    }
})
