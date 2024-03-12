import { Stock } from "../types/stock";

// TODO
// Generate stock for each day in time frame
// use generated stock to create a graph
// only show the searched stock. when nothing searched, show first symbol in the list

// List of Symbol we can search for.
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

const DAY_IN_MS = 1000 * 60 * 60 * 24;

// generate a random date between two dates
export function generateRandomDate(from: Date, to: Date) {
  return new Date(
    from.getTime() +
    Math.random() * (to.getTime() - from.getTime()),
  );
}

export function generateRandomStockValue(stock: string, date: Date, socialMedia: string[]) {
  return {
    symbol: stock,
    buyPrice: Math.random() * (Math.random() * 10),
    sellPrice: Math.random() * (Math.random() * 10),
    date: date,
    socialMedia: socialMedia.map((s) => ({ type: s, count: Math.random() * 1000 })),
  }
}


// Create mock data using Math.random. Be sure to keep your code maintained in such a way that
// you can later replace it with a backend API. You must have data for:
// - Stock price for a given stock and date.
// - Social media ["mentions"] count for a given stock and date.
//
// This function could easily be replaced with a call to an API.
//
// if it was replaced with an API, the data structure would probably change.
// We would need to change the type "Stock" to match the API response.
//
// We would also probably need another api to mesure the sentiment over the social media 
// for a given stock to better seperate the concerns.
// 
//
export default function getStock(stock: string, timeWindow: number, socialMedia: string[]): Stock[] {
  const days = timeWindow / DAY_IN_MS;
  const stockData = []
  const symbol = AvailableStock.find((s) => s.includes(stock)) || 'AAPL';
  for (let i = 0; i < days; i++) {
    const date = new Date(Date.now() - (i * DAY_IN_MS));
    stockData.push(generateRandomStockValue(symbol, date, socialMedia));
  }

  return stockData;
}
