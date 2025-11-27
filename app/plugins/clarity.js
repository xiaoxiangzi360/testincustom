// plugins/clarity.js
export default () => {
    if (process.client) {
        (function (c, l, a, r, i, t, y) {
            c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments) };
            t = l.createElement(r);
            t.async = true;  // 保证脚本异步加载
            t.defer = true;  // 确保脚本执行顺序正确，推迟到文档解析完再执行
            t.src = "https://www.clarity.ms/tag/" + i;
            y = l.getElementsByTagName(r)[0];
            y.parentNode.insertBefore(t, y); // 将脚本插入文档
        })(window, document, "clarity", "script", "sx1h9qcyr4");
    }
}
