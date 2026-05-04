import type { ICartItem } from "../interfaces/CartItem";

export function generateWhatsAppMessage(
  cart: ICartItem[],
  total: number,
): string {
  const items = cart
    .map((item, index) => {
      return `*${index + 1}.* ${item.name} - *Precio:* Bs ${item.price}`;
    })
    .join("\n");

  return `Hola *Laila´s Closet*! Me gustaría comprar estos productos:\n\n${items}\n\n*Total:* Bs ${total}`;
}
