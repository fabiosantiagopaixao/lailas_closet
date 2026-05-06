import { ProductService } from "../services/product.service";
import { resolveImage } from "../utils/image.util";
import { renderLoading } from "../components/loading";
import { navigate } from "../app/navigation";

const service = new ProductService();

export async function renderProductsPage(container: HTMLElement) {
  renderLoading(container);

  const products = await service.getAllProducts();

  container.innerHTML = `
    <div class="products-grid">
      ${products
        .map((p) => {
          console.log("Stock: " + p.stock);
          console.log("Produto: " + JSON.stringify(p, null, 2));
          const hasDiscount = p.discountPrice && p.discountPrice < p.price;
          const isOutOfStock =
            p.stock === 0 || p.stock === null || p.stock.toString() === "";

          return `
          <div class="product-card ${isOutOfStock ? "disabled" : ""}" data-name="${p.name}">
            
           ${
             isOutOfStock
               ? `<div class="badge">Unavailable</div>`
               : `<div class="stock-badge">DISPONIBLE: ${p.stock}</div>`
           }

            <img src="${resolveImage(p.image)}" class="product-image"/>

            <p class="product-name">${p.name}</p>
            <p class="product-description">${p.description}</p>

            <div class="price-container">
              ${
                hasDiscount
                  ? `
                    <span class="price-discount">Bs ${p.discountPrice}</span>
                    <span class="price-old">Bs ${p.price}</span>
                  `
                  : `
                    <span class="price-normal">Bs ${p.price}</span>
                  `
              }
            </div>
          </div>
        `;
        })
        .join("")}
    </div>
  `;

  // 👉 evento de clique
  document.querySelectorAll(".product-card").forEach((el) => {
    if (el.classList.contains("disabled")) return; // 🚫 bloqueia clique

    el.addEventListener("click", () => {
      const name = el.getAttribute("data-name")!;
      const slug = slugify(name);

      navigate(`/product/${slug}/`);
    });
  });
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");
}
