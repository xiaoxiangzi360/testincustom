/**
 * 封装 localStorage 工具类
 */
const localStorageTools = {
    /**
     * 从 localStorage 中获取数据
     * @param key 键名
     * @param defaultValue 默认值（如果 key 不存在时返回）
     * @returns 返回解析后的数据或默认值
     */
    get<T>(key: string, defaultValue: T): T {
        try {
            const value = localStorage.getItem(key)
            if (value !== null) {
                return JSON.parse(value) as T
            }
        } catch (error) {
            console.error(`localStorageTools.get: 解析 ${key} 时出错`, error)
        }
        return defaultValue
    },

    /**
     * 将数据存储到 localStorage
     * @param key 键名
     * @param value 要存储的值
     */
    set<T>(key: string, value: T): void {
        try {
            const jsonValue = JSON.stringify(value)
            localStorage.setItem(key, jsonValue)
        } catch (error) {
            console.error(`localStorageTools.set: 存储 ${key} 时出错`, error)
        }
    },

    /**
     * 从 localStorage 中移除指定键
     * @param key 键名
     */
    remove(key: string): void {
        try {
            localStorage.removeItem(key)
        } catch (error) {
            console.error(`localStorageTools.remove: 移除 ${key} 时出错`, error)
        }
    },

    /**
     * 清空 localStorage
     */
    clear(): void {
        try {
            localStorage.clear()
        } catch (error) {
            console.error('localStorageTools.clear: 清空 localStorage 时出错', error)
        }
    }
}

const LocalKeys = {
    // 定义你的 localStorage 键名
    G_Activity_Modal_Lasted_Time: 'G_Activity_Modal_Lasted_Time',
}

export { localStorageTools, LocalKeys }