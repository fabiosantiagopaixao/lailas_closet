import { cartStore } from "../store/cart.store";
import { resolveImage } from "../utils/image.util";
import { navigate } from "../app/navigation";
import { generateWhatsAppMessage } from "../utils/whatsapp.util";
import { env } from "../config/env";

export function renderCartPage(container: HTMLElement) {
  const cart = cartStore.get();

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="cart-empty">
        <h2>Carrito vacío</h2>
        <button class="button" id="go-back">Volver</button>
      </div>
    `;

    const btn = document.getElementById("go-back");

    if (btn) {
      btn.onclick = () => navigate("/lailas_closet/");
    }

    return;
  }

  const total = cart.reduce((sum, item) => sum + (item.price ?? 0), 0);

  container.innerHTML = `
    <div class="cart-page">
      <h2>Tu carrito</h2>

      <div class="cart-list">
        ${cart
          .map(
            (item) => `
          <div class="cart-item">
            <img src="${resolveImage(item.image)}"/>
            <div>
              <p>${item.name}</p>
              <p>Bs ${item.price}</p>
            </div>
          </div>
        `,
          )
          .join("")}
      </div>

      <h3>Total: Bs ${total}</h3>

       <div class="cart-actions">
  <button class="button button-continue" id="continue">
    Seguir comprando
  </button>

  <button class="button button-checkout" id="checkout">
    Finalizar compra
  </button>
</div>
    </div>
  `;

  document.getElementById("continue")!.onclick = () =>
    navigate("/lailas_closet/");

  document.getElementById("checkout")!.onclick = () => {
    const message = generateWhatsAppMessage(cart, total);

    const url = `https://wa.me/${env.WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");

    cartStore.clear(); // 👈 limpa o carrinho

    navigate("/lailas_closet/");
  };
}
