export function formatTimestamp(ts: number): string {
    if (ts.toString().length === 10) ts *= 1000;
    const date = new Date(ts);
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    const h = String(date.getHours()).padStart(2, '0');
    const min = String(date.getMinutes()).padStart(2, '0');
    const s = String(date.getSeconds()).padStart(2, '0');
    return `${y}-${m}-${d} ${h}:${min}:${s}`;
}

export function formatPaypalUtcToLocal(
    utcStr: string,
    options: {
        timeZone?: string,   // 默认使用浏览器当前时区
        locale?: string      // 默认使用浏览器当前语言
    } = {}
): string {
    const { timeZone, locale } = options;

    const date = new Date(utcStr);

    const localStr = date.toLocaleString(locale || undefined, {
        timeZone: timeZone || undefined,
        hour12: false
    });

    // 标准化为 YYYY-MM-DD HH:mm:ss
    return localStr.replace(/\//g, '-');
}

/**
 * @desc 将上海时间戳（UTC+8）转换为本地时间，并输出格式：Nov 01 2023
 * @param ts 时间戳（秒或毫秒）
 */
export function formatShanghaiToLocalDate(ts: number): string {
    if (ts.toString().length === 10) ts *= 1000;
    // 将上海时间转为 UTC
    const utcTime = ts - 8 * 60 * 60 * 1000;
    const localDate = new Date(utcTime);

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = monthNames[localDate.getMonth()];
    const day = String(localDate.getDate()).padStart(2, '0');
    const year = localDate.getFullYear();

    return `${month} ${day} ${year}`;
}
