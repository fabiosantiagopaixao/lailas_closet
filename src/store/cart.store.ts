import type { ICartItem } from "../interfaces/CartItem";

const STORAGE_KEY = "cart";

export const cartStore = {
  get(): ICartItem[] {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  },

  add(item: ICartItem) {
    const cart = this.get();
    cart.push(item);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  },

  count() {
    return this.get().length;
  },

  clear() {
    localStorage.removeItem(STORAGE_KEY);
  },
};
