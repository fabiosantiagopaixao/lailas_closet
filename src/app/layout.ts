import logo from "../assets/logo.png";
import { cartStore } from "../store/cart.store";
import { navigate } from "./navigation";

export function renderLayout(app: HTMLElement) {
  app.innerHTML = `
    <header class="header-fixed">
      <div class="brand" id="go-home">
        <img src="${logo}" class="logo" />
        <h2 class="title">Laila’s Closet</h2>
      </div>
      <p class="subtitle">Ropas nuevas/usadas con estilo</p>

      <div class="cart-icon">
        🛒 <span id="cart-count">${cartStore.count()}</span>
      </div>
    </header>

    <main id="content"></main>

    <footer class="footer">
      © ${new Date().getFullYear()} Laila’s Closet
    </footer>
  `;

  // 👉 navegação isolada
  document.getElementById("go-home")?.addEventListener("click", () => {
    navigate("/lailas_closet/");
  });
}
