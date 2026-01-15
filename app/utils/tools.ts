import { message } from 'ant-design-vue';
function deepToRaw(obj: any): any {
    if (obj === null || typeof obj !== 'object') {
        return obj; // 如果是原始值，直接返回
    }

    const raw = toRaw(obj); // 移除当前对象的响应式
    if (Array.isArray(raw)) {
        // 如果是数组，递归处理每一项
        return raw.map((item) => deepToRaw(item));
    } else {
        // 如果是对象，递归处理每个属性
        return Object.keys(raw).reduce((acc, key) => {
            acc[key] = deepToRaw(raw[key]);
            return acc;
        }, {} as Record<string, any>);
    }
}

function getBreakpoint(): string {
    const width = window.innerWidth; // 获取当前屏幕宽度

    if (width < 640) {
        return 'xs'; // 小屏幕
    } else if (width >= 640 && width < 768) {
        return 'sm'; // 中小屏幕
    } else if (width >= 768 && width < 1024) {
        return 'md'; // 中屏幕
    } else if (width >= 1024 && width < 1280) {
        return 'lg'; // 大屏幕
    } else {
        return 'xl'; // 超大屏幕
    }
}

const Breakpoints = {
    sm: 640,     // 中小屏幕起始宽度
    md: 768,     // 中屏幕起始宽度
    lg: 1024,    // 大屏幕起始宽度
    xl: 1280,    // 超大屏幕起始宽度
};

const slugify = (str: string) => {
    if (!str || str === null || str === undefined) {
        return 'product'; // 提供一个默认值
    }
    const t = encodeURIComponent(
        String(str)
            .normalize("NFKD")
            .replace(/[^a-zA-Z0-9 ]/g, " ")
            .replace(/\s+/g, " ")
            .trim()
            .replace(/\s+/g, "-")
            .replace(/-+/g, "-")
            .toLowerCase()
    );
    return t;
};

const getDiscountStr = ({ discountType, discountRuleList }) => {
    let discountStr = '';
    if (discountRuleList && discountRuleList.length > 0) {
        const rule = discountRuleList[discountRuleList.length - 1];
        if (discountType == 50 || discountType == 150) {
            discountStr = `Get Up To $${rule.y} Off，Code`;
        } else if (discountType == 100) {
            discountStr = `Get Up To $${rule.y} Off，Code`;
        }
    }
    return { discountStr };
}


/** 复制券码 */
function copyCode(text) {
    const textToCopy = text
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard
            .writeText(textToCopy)
            .then(() => message.success('copy success'))
            .catch(() => message.error('copy failed'))
    } else {
        const textArea = document.createElement('textarea')
        textArea.value = textToCopy
        textArea.style.position = 'absolute'
        textArea.style.opacity = '0'
        textArea.style.left = '-999999px'
        textArea.style.top = '-999999px'
        document.body.appendChild(textArea)
        textArea.focus()
        textArea.select()
        try {
            document.execCommand('copy')
            message.success('copy success')
        } catch (err) {
            message.error('copy failed')
        }
        textArea.remove()
    }
}

/**
 * 动态预渲染图片
 * @param {string} url - 图片的 URL
 */
const preloadImage = (url) => {
    if (!url) {
        console.warn('预渲染失败：图片 URL 为空');
        return '';
    }

    // 创建 <link> 标签
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = url;

    // 将 <link> 标签插入到 <head> 中
    document.head.appendChild(link);
    console.warn('预渲染成功---', url);
}

const clearAllJsonLdScripts = () => {
    if (typeof document === 'undefined') {
        return;
    }
    const scripts = document.querySelectorAll('script[type="application/ld+json"]');
    scripts.forEach(script => script.remove());
    console.warn('已清除所有 JSON-LD 脚本');
}

/**
 * 动态创建 JSON-LD 脚本
 * @param {Object} jsonLdObject - JSON-LD 数据对象
 */
function createJsonLd(jsonLdObject): void {
    if (!jsonLdObject || typeof jsonLdObject !== 'object') {
        console.warn('Invalid JSON-LD object');
        return;
    }

    const script = document.createElement('script');
    script.setAttribute('type', 'application/ld+json');
    script.textContent = JSON.stringify(jsonLdObject, null, 2); // 格式化 JSON-LD 数据
    document.head.appendChild(script);
}

function extractTextFromRichText(html) {
    // 使用正则表达式去除 HTML 标签
    const text = html.replace(/<[^>]*>/g, ''); // 匹配并移除所有 HTML 标签
    return text.trim(); // 去除首尾空格
}

const getCurrentHref = () => {
    if (process.server) {
        // SSR 环境，通过 req 获取
        const req = useRequestHeaders()
        return `${req['x-forwarded-proto'] || 'http'}://${req.host}${req.url}`
    } else {
        // 客户端环境，通过 window 获取
        return window.location.href
    }
}

/**
 * 将相对路径转换为绝对路径
 * @param {string} relativePath - 相对路径
 * @returns {string} - 绝对路径
 */
const convertToAbsolutePath = (relativePath: string): string => {
    if (!relativePath) {
        console.warn('路径为空，无法转换');
        return '';
    }

    // 如果已经是绝对路径，直接返回
    if (relativePath.startsWith('http://') || relativePath.startsWith('https://')) {
        return relativePath;
    }

    if (process.server) {
        // SSR 环境，通过 req 获取
        const req = useRequestHeaders(); // 获取请求头
        const protocol = req['x-forwarded-proto'] || 'http'; // 获取协议，默认为 http
        const host = req.host || 'localhost'; // 获取主机名，默认为 localhost
        return `${protocol}://${host}${relativePath.startsWith('/') ? '' : '/'}${relativePath}`;
    } else {
        // 客户端环境，通过 window 获取
        const baseUrl = window.location.origin;
        return `${baseUrl}${relativePath.startsWith('/') ? '' : '/'}${relativePath}`;
    }
};


/** 抛出页面错误 */
const throwPageError = (message) => {
  throw createError({
    statusCode: 404,
    message: message || 'Product not found or not published.',
  })
}
export {
    deepToRaw, getBreakpoint, Breakpoints, slugify, getDiscountStr, copyCode, preloadImage, createJsonLd, extractTextFromRichText,
    getCurrentHref, clearAllJsonLdScripts, convertToAbsolutePath, throwPageError
};