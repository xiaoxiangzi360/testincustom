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
                const response = await getCart()

                // 处理新的数据结构
                if (response?.result && Array.isArray(response.result)) {
                    // 可售商品列表
                    this.items = response.result.map((item: any) => ({
                        ...item,
                        // 确保有必要的字段
                        productName: item.product?.productEnglishName || item.product?.productName || '',
                        productImage: item.product?.mainPic?.url || '',
                        productPrice: item.product?.skuData?.basePrice || item.product?.basePrice || 0,
                        productSku: item.productSkuId || '',
                        // 保留原始数据
                        product: item.product,
                        skuData: item.product?.skuData,
                        materialInfo: item.materialInfo,
                        selected: true,
                    }))
                } else {
                    this.items = []
                }

                // 下架/失效商品列表
                this.saleDownList = response?.saleDownList || []
            } catch (error) {
                console.error('Failed to refresh cart:', error)
                this.items = []
                this.saleDownList = []
            }
        },

        // ✅ 新增：删除一批（会同时从 items 和 saleDownList 本地移除）
        async removeItems(list: Array<{ id: string | number; productQuantity: number }>) {
            if (!list?.length) return
            try {
                const { batchDeductionUserShoppingCart } = cartAuth()
                await batchDeductionUserShoppingCart({ deleteList: list })

                // 本地同步移除（按 id）
                const idSet = new Set(list.map(i => i.id))
                this.items = this.items.filter(i => !idSet.has(i.id))
                this.saleDownList = this.saleDownList.filter(i => !idSet.has(i.id))
            } catch (e) {
                console.error('Failed to remove items:', e)
            }
        },

        // ✅ 单个删除：由调用方传入 { id, productQuantity }
        async removeOne(payload: { id: string | number; productQuantity: number }) {
            if (!payload) return
            await this.removeItems([payload])
        },
        // ✅ 新增：清空失效
        async removeInvalidAll() {
            if (!this.saleDownList?.length) return
            const list = this.saleDownList.map(i => ({
                id: i.id,
                productQuantity: typeof i.productQuantity === 'number' ? i.productQuantity : 0
            }))
            await this.removeItems(list)
        },
    },
})
