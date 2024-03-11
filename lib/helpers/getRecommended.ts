import { Stock } from "../types/stock";

const TOLERANCE = 0.003;

export default function getRecommended(stock: Stock): 'buy' | 'sell' | 'hold' {
  if (stock.socialMedia) {
    const total = stock.socialMedia.reduce((acc, curr) => acc + curr.count, 0);
    const average = total / stock.socialMedia.length;
    if (average > 500 && stock.buyPrice * (1 - TOLERANCE) > stock.sellPrice) {
      return 'buy';
    } else if (average > 500 && stock.buyPrice * (1 - TOLERANCE) > stock.sellPrice) {
      return 'sell';
    } else if (average < 100 && stock.sellPrice * (1 - TOLERANCE) > stock.buyPrice) {
      return 'sell';
    } else {
      return 'hold';
    }
  } else {
    if (stock.buyPrice * (1 - TOLERANCE) > stock.sellPrice) return 'buy';
    if (stock.sellPrice * (1 - TOLERANCE) > stock.buyPrice) return 'sell';
    return 'hold';
  }
}