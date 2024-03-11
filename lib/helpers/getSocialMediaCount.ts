import { Stock } from "../types/stock";

export default function getSocialMediaCount(
  stock: Stock,
  socialMedia: 'instagram' | 'facebook' | 'twitter',
): number {
  return Math.random() * 1000;
}