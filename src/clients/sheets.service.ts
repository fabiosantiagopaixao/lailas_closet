import axios from "axios";
import { env } from "../config/env";
import type { IProduct } from "../interfaces/IProduct";

const API_URL = env.API_URL as string;

export const getProducts = async (): Promise<IProduct[]> => {
  const response = await axios.get(API_URL);

  return response.data.map((item: any) => ({
    id: item.id,
    name: item.name,
    price: Number(item.price),
    image: item.image,
  }));
};
