import { ProductService } from "../services/product.service";
import { resolveImage } from "../utils/image";
import { renderLoading } from "../components/loading";

const service = new ProductService();

export async function renderProductDetail(
  container: HTMLElement,
  slug: string,
) {
  // 👉 mostra loading imediatamente
  renderLoading(container);

  const currentRender = Symbol();
  (container as any)._renderId = currentRender;

  const product = await service.getBySlug(slug);

  // 👉 evita bug se trocar de página rápido
  if ((container as any)._renderId !== currentRender) return;

  if (!product) {
    container.innerHTML = "<h2>Producto no encontrado</h2>";
    return;
  }

  container.innerHTML = `
    <div class="product-detail">
      <img src="${resolveImage(product.image)}" />
      <h2>${product.name}</h2>
      <p class="product-price">Bs ${product.price}</p>

      <button class="button">
        Agregar al carrito
      </button>
    </div>
  `;
}
