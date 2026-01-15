// plugins/clarity.js
// 优化：延迟加载 Clarity
export default () => {
    if (process.client) {
        function loadClarity() {
            if (window.clarity) return;
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
        // 延迟加载：页面加载完成后 4 秒，或用户交互时立即加载
        // if (document.readyState === 'complete') {
        //     setTimeout(loadClarity, 4000);
        // } else {
        window.addEventListener('load', function () { setTimeout(loadClarity, 4000); });
        ['mousedown', 'touchstart', 'scroll'].forEach(function (event) {
            window.addEventListener(event, loadClarity, { once: true, passive: true });
        });
        // }
    }
}
