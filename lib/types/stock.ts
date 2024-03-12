export type SocialMediaCount = {
  type: string,
  count: number,
}

export type Stock = {
  symbol: string;
  // average buying price from buying positions in the order book
  buyPrice: number;
  // average selling price from selling positions in the order book
  sellPrice: number;
  socialMedia?: SocialMediaCount[]
  date: Date;
}

export interface Order {
  type: 'sell' | 'buy',
  stock: Stock,
  quantity: number,
}
