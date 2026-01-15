// utils/toast.ts
type ToastType = 'info' | 'success' | 'error' | 'warning'

interface ToastOptions {
    type?: ToastType
    duration?: number
    position?: 'top' | 'bottom'
}

interface ToastItem {
    id: number
    element: HTMLElement
    top: number
}

const icons: Record<ToastType, string> = {
    info: '💡',
    success: '✅',
    error: '❌',
    warning: '⚠️'
}

const colors: Record<ToastType, string> = {
    info: '#1890ff',
    success: '#52c41a',
    error: '#ff4d4f',
    warning: '#faad14'
}

class ToastManager {
    private toasts: ToastItem[] = []
    private toastId = 0
    private readonly baseTop = 20 // 第一个 toast 的初始位置
    private readonly margin = 8   // toast 之间的间距

    constructor(private position: 'top' | 'bottom' = 'top') {}

    show(msg: string, options: ToastOptions = {}): number {
        const { type = 'info', duration = 3000 } = options
        
        const toastId = ++this.toastId
        const toast = document.createElement('div')
        
        // 初始样式 - 先放在屏幕外
        toast.style.cssText = `
            position: fixed;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            align-items: center;
            padding: 8px 12px;
            border-radius: 4px;
            background: #f5f5f5;
            color: ${colors[type]};
            font-size: 14px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.15);
            z-index: 9999;
            min-width: 300px;
            max-width: 80%;
            opacity: 0;
            transition: all 0.3s ease;
            ${this.position === 'top' ? 'top: -100px;' : 'bottom: -100px;'}
        `

        const icon = document.createElement('span')
        icon.textContent = icons[type]
        icon.style.marginRight = '8px'
        icon.style.fontSize = '16px'

        const text = document.createElement('span')
        text.textContent = msg

        toast.append(icon, text)
        document.body.appendChild(toast)

        // 计算这个 toast 应该放的位置
        const topPosition = this.calculatePosition()
        const toastItem: ToastItem = {
            id: toastId,
            element: toast,
            top: topPosition
        }

        this.toasts.push(toastItem)
        
        // 动画显示
        requestAnimationFrame(() => {
            if (this.position === 'top') {
                toast.style.top = `${topPosition}px`
            } else {
                toast.style.bottom = `${topPosition}px`
            }
            toast.style.opacity = '1'
        })

        // 自动移除
        if (duration > 0) {
            setTimeout(() => {
                this.remove(toastId)
            }, duration)
        }

        return toastId
    }

    private calculatePosition(): number {
        if (this.toasts.length === 0) {
            return this.baseTop
        }

        // 如果是顶部显示，从上往下排列
        if (this.position === 'top') {
            const lastToast = this.toasts[this.toasts.length - 1]
            const lastToastHeight = lastToast.element.offsetHeight
            return lastToast.top + lastToastHeight + this.margin
        } else {
            // 如果是底部显示，从下往上排列
            const lastToast = this.toasts[this.toasts.length - 1]
            const lastToastHeight = lastToast.element.offsetHeight
            return lastToast.top + lastToastHeight + this.margin
        }
    }

    remove(id: number): void {
        const index = this.toasts.findIndex(item => item.id === id)
        if (index === -1) return

        const toast = this.toasts[index]
        
        // 动画隐藏
        toast.element.style.opacity = '0'
        if (this.position === 'top') {
            toast.element.style.top = '-100px'
        } else {
            toast.element.style.bottom = '-100px'
        }

        // 移除元素并更新其他 toast 位置
        setTimeout(() => {
            if (toast.element.parentNode) {
                toast.element.parentNode.removeChild(toast.element)
            }
            
            // 从数组中移除
            this.toasts.splice(index, 1)
            
            // 更新剩余 toast 的位置
            this.updatePositions()
        }, 300)
    }

    private updatePositions(): void {
        // 如果是顶部显示
        if (this.position === 'top') {
            let currentTop = this.baseTop
            this.toasts.forEach(toastItem => {
                toastItem.top = currentTop
                toastItem.element.style.top = `${currentTop}px`
                currentTop += toastItem.element.offsetHeight + this.margin
            })
        } else {
            // 如果是底部显示（从下往上排列）
            // 先计算所有 toast 的总高度
            const totalHeight = this.toasts.reduce((sum, toast) => {
                return sum + toast.element.offsetHeight + this.margin
            }, 0) - this.margin
            
            let currentBottom = this.baseTop
            this.toasts.forEach(toastItem => {
                toastItem.top = currentBottom
                toastItem.element.style.bottom = `${currentBottom}px`
                currentBottom += toastItem.element.offsetHeight + this.margin
            })
        }
    }

    clearAll(): void {
        // 反向遍历，避免删除时索引变化
        [...this.toasts].reverse().forEach(toastItem => {
            this.remove(toastItem.id)
        })
    }
}

// 创建默认的 toast 管理器
const defaultManager = new ToastManager('top')

// 导出函数
export const toast = {
    show: (msg: string, options: ToastOptions = {}) => defaultManager.show(msg, options),
    info: (msg: string, duration?: number) => defaultManager.show(msg, { type: 'info', duration }),
    success: (msg: string, duration?: number) => defaultManager.show(msg, { type: 'success', duration }),
    error: (msg: string, duration?: number) => defaultManager.show(msg, { type: 'error', duration }),
    warning: (msg: string, duration?: number) => defaultManager.show(msg, { type: 'warning', duration }),
    remove: (id: number) => defaultManager.remove(id),
    clearAll: () => defaultManager.clearAll(),
    
    // 可以创建新的管理器
    createManager: (position: 'top' | 'bottom' = 'top') => new ToastManager(position)
}

export default toast