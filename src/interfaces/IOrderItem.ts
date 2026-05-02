export interface IOrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;

  // importante para roupas
  size?: string;
  image: string;
}
