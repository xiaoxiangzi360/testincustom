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
    return encodeURIComponent(
        String(str)
            .normalize("NFKD")
            .replace(/[^\w\s-]/g, "")
            .trim()
            .replace(/\s+/g, "-")
            .replace(/-+/g, "-")
            .toLowerCase()
    );
};
export { deepToRaw, getBreakpoint, Breakpoints, slugify };