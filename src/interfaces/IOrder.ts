import type { ICustomer } from "./ICustomer";
import type { IOrderItem } from "./IOrderItem";

export interface IOrder {
  id: string;

  // Produtos comprados
  items: IOrderItem[];

  // Totais
  subtotal: number;
  discount: number; // valor total descontado
  total: number;

  // Cupom
  couponCode?: string;

  // Cliente
  customer: ICustomer;

  // Status
  status: "PENDING" | "CONFIRMED" | "CANCELLED";

  // Datas
  createdAt: string;
}
