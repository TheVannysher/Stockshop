export type Stock = {
  symbol: string;
  buyPrice: number;
  sellPrice: number;
  quantity: number;
}

export type Holding = {
  stock: Stock;
  purchaseDate: Date;
}

export type Portfolio = {
  holdings: Holding[];
  totalValue?: number;
  totalGain?: number;
  unrealizedGain?: number;
}