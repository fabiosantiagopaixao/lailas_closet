import type { IProduct } from "../interfaces/IProduct";
import { BaseService } from "./base/base.service";

export class ProductService extends BaseService<IProduct> {
  constructor() {
    super("products");
  }

  async getAllProducts() {
    const products = await this.getAll();
    return products;
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
