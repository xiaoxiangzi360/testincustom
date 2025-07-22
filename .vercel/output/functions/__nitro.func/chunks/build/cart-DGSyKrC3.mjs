import { q as defineStore, b as useNuxtApp } from './server.mjs';

const cartAuth = () => {
  const { $api } = useNuxtApp();
  const getCart = async () => {
    try {
      const response = await $api("/user/userShoppingCart/listUserShoppingCart", {
        method: "GET"
      });
      return response;
    } catch (error) {
      throw error;
    }
  };
  const createCart = async (data) => {
    try {
      const response = await $api("/user/userShoppingCart/createUserShoppingCart", {
        method: "POST",
        body: data
      });
      return response;
    } catch (error) {
      throw error;
    }
  };
  const updateCart = async (data) => {
    try {
      const response = await $api("/user/userShoppingCart/updateUserShoppingCartById", {
        method: "POST",
        body: data
      });
      return response;
    } catch (error) {
      throw error;
    }
  };
  const deleteCart = async (data) => {
    try {
      const response = await $api("/user/userShoppingCart/deleteUserShoppingCartByIdList", {
        method: "POST",
        body: data
      });
      return response;
    } catch (error) {
      throw error;
    }
  };
  return { getCart, createCart, deleteCart, updateCart };
};
const min = 1;
const max = 999;
const useCartStore = defineStore("cart", {
  state: () => ({
    items: []
  }),
  getters: {
    itemCount: (state) => state.items.reduce((sum, item) => sum + item.productQuantity, 0),
    itemList: (state) => state.items
  },
  actions: {
    addToCart(product) {
      const existing = this.items.find((item) => item.id === product.id);
      if (existing) {
        existing.quantity++;
      } else {
        this.items.push({ ...product, quantity: 1 });
      }
    },
    increaseQuantity(index) {
      this.items[index].productQuantity++;
      if (this.items[index].productQuantity > max) this.items[index].productQuantity = max;
      this.updateQuantity(this.items[index].id, this.items[index].productQuantity);
    },
    decreaseQuantity(index) {
      this.items[index].productQuantity--;
      if (this.items[index].productQuantity < min) this.items[index].productQuantity = min;
      this.updateQuantity(this.items[index].id, this.items[index].productQuantity);
    },
    async updateQuantity(id, quantity) {
      try {
        let params = {
          id,
          productQuantity: quantity
        };
        const { updateCart } = cartAuth();
        const res = await updateCart(params);
      } catch (error) {
        console.error("Failed to refresh cart:", error);
      }
    },
    updateCart(items) {
      this.items = items;
    },
    async refreshCart() {
      try {
        const { getCart } = cartAuth();
        const res = await getCart();
        this.items = res.result;
      } catch (error) {
        console.error("Failed to refresh cart:", error);
      }
    }
  }
});

export { cartAuth as c, useCartStore as u };
