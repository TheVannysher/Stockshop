export type SocialMediaCount = {
  type: string,
  count: number,
}

export type Stock = {
  symbol: string;
  buyPrice: number;
  sellPrice: number;
  socialMedia?: SocialMediaCount[]
  date: Date;
}

export interface Order {
  type: 'sell' | 'buy',
  stock: Stock,
  quantity: number,
}
