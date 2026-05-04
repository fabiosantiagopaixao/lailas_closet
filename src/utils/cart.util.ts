import { cartStore } from "../store/cart.store";

export function updateCartCount() {
  const el = document.getElementById("cart-count");

  if (!el) return;

  const count = cartStore.count();

  el.textContent = String(count);

  if (count > 0) {
    el.classList.add("active");
  } else {
    el.classList.remove("active");
  }
}
