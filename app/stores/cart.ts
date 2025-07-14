import { defineStore } from 'pinia'
const min = 1
const max = 999
export const useCartStore = defineStore('cart', {
    state: () => ({
        items: [],
    }),

    getters: {
        itemCount: (state) => state.items.reduce((sum, item) => sum + item.productQuantity, 0),
        itemList: (state) => state.items
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
        increaseQuantity(index: any) {

            this.items[index].productQuantity++;

            if (this.items[index].productQuantity > max) this.items[index].productQuantity = max
            this.updateQuantity(this.items[index].id, this.items[index].productQuantity);

        },
        decreaseQuantity(index: any) {
            this.items[index].productQuantity--

            if (this.items[index].productQuantity < min) this.items[index].productQuantity = min
            this.updateQuantity(this.items[index].id, this.items[index].productQuantity);
        },
        async updateQuantity(id: any, quantity: any) {
            try {
                let params = {
                    id: id,
                    productQuantity: quantity
                }
                const { updateCart } = cartAuth()
                const res = await updateCart(params)

            } catch (error) {
                console.error('Failed to refresh cart:', error)
                // Handle error appropriately
            }
        },
        updateCart(items: any) {
            this.items = items
        },
        async refreshCart() {
            try {
                const { getCart } = cartAuth()
                const res = await getCart()
                this.items = res.result
            } catch (error) {
                console.error('Failed to refresh cart:', error)
                // Handle error appropriately
            }
        },
    },
})
