import { defineStore } from 'pinia'

const min = 1
const max = 999

export const useCartStore = defineStore('cart', {
    state: () => ({
        items: [] as any[],
        // ✅ 新增：失效/下架商品列表
        saleDownList: [] as any[],
    }),

    getters: {
        itemCount: (state) => state.items.reduce((sum, item) => sum + item.productQuantity, 0),
        itemList: (state) => state.items,
        // ✅ 新增：直接取失效列表
        invalidList: (state) => state.saleDownList,
    },

    actions: {
        addToCart(product: { id: number; name: string }) {
            const existing = this.items.find((item) => item.id === product.id)
            if (existing) {
                existing.quantity++
            } else {
                this.items.push({ ...product, quantity: 1 })
            }
        },

        increaseQuantity(index: number) {
            this.items[index].productQuantity++
            if (this.items[index].productQuantity > max) this.items[index].productQuantity = max
            this.updateQuantity(this.items[index].id, this.items[index].productQuantity)
        },

        decreaseQuantity(index: number) {
            this.items[index].productQuantity--
            if (this.items[index].productQuantity < min) this.items[index].productQuantity = min
            this.updateQuantity(this.items[index].id, this.items[index].productQuantity)
        },

        async updateQuantity(id: any, quantity: any) {
            try {
                const params = { id, productQuantity: quantity }
                const { updateCart } = cartAuth()
                await updateCart(params)
            } catch (error) {
                console.error('Failed to update quantity:', error)
            }
        },

        // ✅ 保留你的接口：设置当前购物车列表
        updateCart(items: any[]) {
            this.items = items
        },

        // ✅ 刷新时同时写 items 和 saleDownList
        async refreshCart() {
            try {
                const { getCart } = cartAuth()
                const res = await getCart()
                this.items = res?.result || []
                this.saleDownList = res?.saleDownList || []
            } catch (error) {
                console.error('Failed to refresh cart:', error)
            }
        },

        // ✅ 新增：删除一批（会同时从 items 和 saleDownList 本地移除）
        async removeItems(ids: (string | number)[]) {
            if (!ids?.length) return
            try {
                const { deleteCart } = cartAuth()
                await deleteCart({ idList: ids })
                this.items = this.items.filter(i => !ids.includes(i.id))
                this.saleDownList = this.saleDownList.filter(i => !ids.includes(i.id))
            } catch (e) {
                console.error('Failed to remove items:', e)
            }
        },

        // ✅ 新增：删除单个
        async removeOne(id: string | number) {
            await this.removeItems([id])
        },

        // ✅ 新增：清空失效
        async removeInvalidAll() {
            const ids = this.saleDownList.map(i => i.id)
            await this.removeItems(ids)
        },
    },
})
