type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
};

const STORAGE_KEY = "cart";

export const cartStore = {
  get(): CartItem[] {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  },

  add(item: CartItem) {
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
