import axios from "axios";
import { env } from "../../config/env";

export class BaseService<T> {
  private sheet: string;

  constructor(sheet: string) {
    this.sheet = sheet;
  }

  async getAll(): Promise<T[]> {
    const res = await axios.get(env.API_URL, {
      params: {
        sheet: this.sheet,
      },
    });

    return res.data;
  }
}
