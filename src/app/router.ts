import { renderProductsPage } from "../pages/products";
import { renderProductDetail } from "../pages/product";

function normalizePath(path: string) {
  if (!path.endsWith("/") && !path.includes(".")) {
    return path + "/";
  }
  return path;
}

export function router() {
  let path = window.location.pathname;

  const normalized = normalizePath(path);

  if (normalized !== path) {
    history.replaceState({}, "", normalized);
    path = normalized;
  }

  const content = document.getElementById("content")!;

  if (path.includes("/product/")) {
    const slug = path.split("/product/")[1].replace("/", "");
    renderProductDetail(content, slug);
  } else {
    renderProductsPage(content);
  }
}
