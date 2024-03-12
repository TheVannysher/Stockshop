import { Stock } from "../types/stock";

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

// generate a random date between two dates
function generateRandomDate(from: Date, to: Date) {
  return new Date(
    from.getTime() +
    Math.random() * (to.getTime() - from.getTime()),
  );
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
export default function getStock(stock: string, date: Date, socialMedia: string = 'facebook'): Stock[] | undefined {
  let symbolToSearch = AvailableStock;
  if (stock) {
    symbolToSearch = AvailableStock.filter((s) => s.toLowerCase().includes(stock.toLowerCase()));
  }
  if (symbolToSearch.length > 0) {
    return symbolToSearch.map((s) => ({
      symbol: s.toUpperCase(),
      // giving random price for this stock
      buyPrice: Math.random() * (Math.random() * 10),
      sellPrice: Math.random() * (Math.random() * 10),
      // giving random date between the timeFrame selected
      date: generateRandomDate(new Date(), (date)),
      socialMedia: [{ type: socialMedia, count: Math.random() * 1000 }],
    }))
  };
}