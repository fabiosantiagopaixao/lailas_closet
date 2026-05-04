import type { IProduct } from "../interfaces/IProduct";
import { BaseService } from "./base/base.service";

export class ProductService extends BaseService<IProduct> {
  constructor() {
    super("products");
  }

  async getAllProducts() {
    const products = await this.getAll();

    return products
      .map((p) => ({
        ...p,
        stock: p.stock ? Number(p.stock) : 0, // 👉 normaliza
      }))
      .sort((a, b) => {
        // 👉 primeiro: quem tem estoque vem antes
        if (a.stock === 0 && b.stock > 0) return 1;
        if (a.stock > 0 && b.stock === 0) return -1;

        // 👉 depois: ordenar por nome
        return a.name.localeCompare(b.name);
      });
  }

  async getFeatured() {
    const products = await this.getAllProducts();
    return products.filter((p) => p.isFeatured);
  }

  async getByCategory(category: string) {
    const products = await this.getAllProducts();
    return products.filter((p) => p.categorys?.includes(category));
  }

  async getBySlug(slug: string) {
    const products = await this.getAll();

    return products.find((p) => this.slugify(p.slug) === slug);
  }

  private slugify(text: string) {
    return text
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "");
  }
}
