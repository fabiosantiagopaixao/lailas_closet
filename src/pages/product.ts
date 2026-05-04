import { renderLoading } from "../components/loading";
import { ProductService } from "../services/product.service";
import { resolveImage } from "../utils/image";

const service = new ProductService();

export async function renderProductDetail(
  container: HTMLElement,
  slug: string,
) {
  renderLoading(container);

  const currentRender = Symbol();
  (container as any)._renderId = currentRender;

  const product = await service.getBySlug(slug);

  if ((container as any)._renderId !== currentRender) return;

  if (!product) {
    container.innerHTML = "<h2>Producto no encontrado</h2>";
    return;
  }

  const hasDiscount =
    product.discountPrice && product.discountPrice < product.price;

  const images = product.images ? product.images.split("|") : [product.image];

  container.innerHTML = `
    <div class="product-detail">

      <!-- CAROUSEL -->
      <div class="carousel">
        <img id="main-image" class="image-product" src="${resolveImage(images[0])}" />

        ${
          images.length > 1
            ? `
          <div class="thumbnails">
            ${images
              .map(
                (img, i) => `
              <img 
                src="${resolveImage(img)}" 
                class="thumb ${i === 0 ? "active" : ""}"
                data-index="${i}"
              />
            `,
              )
              .join("")}
          </div>
        `
            : ""
        }
      </div>

      <!-- INFO -->
      <div class="product-info">
        <h2 class="product-title">${product.name}</h2>

        ${
          product.description
            ? `<p class="product-description">${product.description}</p>`
            : ""
        }

        <div class="price-container">
          ${
            hasDiscount
              ? `
              <span class="price-discount">Bs ${product.discountPrice}</span>
              <span class="price-old">Bs ${product.price}</span>
            `
              : `<span class="price-normal">Bs ${product.price}</span>`
          }
        </div>

        <!-- META -->
        <div class="product-meta">
          ${product.brand ? `<p><b>Marca:</b> ${product.brand}</p>` : ""}
          ${product.size ? `<p><b>Talla:</b> ${product.size}</p>` : ""}
          ${product.color ? `<p><b>Color:</b> ${product.color}</p>` : ""}
          ${product.condition ? `<p><b>Condición:</b> ${product.condition}</p>` : ""}
          ${product.shipmentsFor ? `<p><b>Envío a:</b> ${product.shipmentsFor}</p>` : ""}
          <p><b>Stock:</b> ${product.stock ?? 0}</p>
        </div>

        <button class="button">
          Agregar al carrito
        </button>
      </div>

    </div>
  `;

  // 👉 carousel interação
  document.querySelectorAll(".thumb").forEach((thumb) => {
    thumb.addEventListener("click", () => {
      const src = (thumb as HTMLImageElement).src;

      const main = document.getElementById("main-image") as HTMLImageElement;
      main.src = src;

      document
        .querySelectorAll(".thumb")
        .forEach((t) => t.classList.remove("active"));

      thumb.classList.add("active");
    });
  });
}
