export interface IProduct {
  id: string;

  // Básico
  name: string;
  slug: string;
  isSold?: boolean;
  description?: string;

  // Preço
  price: number;
  discountPrice?: number;
  currency?: "BOB";

  // Imagem (mantém simples + opcional multi)
  image: string;
  images?: string;

  // Categoria
  categorys: string;
  enviaPara?: string;

  // Roupas (importante no teu caso)
  size?: string; // S, M, L
  brand?: string; // Zara, H&M
  color?: string;
  condition?: "NEW" | "LIKE_NEW" | "USED";
  shipmentsFor?: string;

  // Estoque
  stock?: number;
  isAvailable?: boolean;

  // Destaque
  isFeatured?: boolean;

  // Datas
  createdAt?: string;
  updatedAt?: string;
}
