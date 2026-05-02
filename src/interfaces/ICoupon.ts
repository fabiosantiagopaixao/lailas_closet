export interface ICoupon {
  code: string;
  discountPercentage: number;
  isActive: boolean;
  expiresAt?: string;
}
