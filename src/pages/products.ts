import { ProductService } from "../services/product.service";
import { resolveImage } from "../utils/image";
import { renderLoading } from "../components/loading";
import { navigate } from "../app/navigation";

const service = new ProductService();

export async function renderProductsPage(container: HTMLElement) {
  // 👉 mostra loading primeiro
  renderLoading(container);

  const products = await service.getAll();

  container.innerHTML = `
    <div class="products-grid">
      ${products
        .map(
          (p) => `
          <div class="product-card" data-name="${p.name}">
            <img src="${resolveImage(p.image)}" class="product-image"/>
            <p class="product-name">${p.name}</p>
            <p class="product-price">Bs ${p.price}</p>
          </div>
        `,
        )
        .join("")}
    </div>
  `;

  // 👉 evento de clique
  document.querySelectorAll(".product-card").forEach((el) => {
    el.addEventListener("click", () => {
      const name = el.getAttribute("data-name")!;
      const slug = slugify(name);

      navigate(`/lailas_closet/product/${slug}/`);
    });
  });
}

// 🔤 slug helper
function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");
}
