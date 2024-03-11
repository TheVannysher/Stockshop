import { Stock } from "../types/stock";

// Using a map for search performance
export const AvailableStock = [
  'AAPL',
  'AMZN',
  'GOOGL',
  'MSFT',
  'NFLX',
  'TSLA',
  'TSX',
  'VCN',
  'BTCUSD',
]

function generateRandomDate(from: Date, to: Date) {
  return new Date(
    from.getTime() +
    Math.random() * (to.getTime() - from.getTime()),
  );
}


export default function getStock(stock: string, date: Date, socialMedia: string = 'facebook'): Stock[] | undefined {
  if (!stock) return;
  const stocks = AvailableStock.filter((s) => s.toLowerCase().includes(stock.toLowerCase()));
  if (stocks.length > 0) {
    return stocks.map((s) => ({
      symbol: s.toUpperCase(),
      buyPrice: Math.random() * (Math.random() * 10),
      sellPrice: Math.random() * (Math.random() * 10),
      date: generateRandomDate((date), new Date()),
      socialMedia: [{ type: socialMedia, count: Math.random() * 1000 }],
    }))
  };
}