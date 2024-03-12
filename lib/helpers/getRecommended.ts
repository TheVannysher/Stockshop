import { Stock } from "../types/stock";

// 
export const BASE_TOLERANCE = 0.03;
export const MAX_SENTIMENT_MULTIPLIER = 2.5;
export const MIN_SENTIMENT_MULTIPLIER = 1;
export const SENTIMENT_TOLERANCE = 1000;

// This function would need to use more complex tools (like indicators) and calculation
// to do a real recommendation
// For the purpose of this exercise
// I just picked arbitrary numbers
// and compared the values together with a Tolerance to get a range of prices where
// recommendation is hold
// sellPrice = average selling price from selling positions in the order book
// buyPrice = average buying price from buying positions in the order book
// 
// this algorithm follows the trend
export default function getRecommended(stock: Stock): 'buy' | 'sell' | 'hold' {
  const { buyPrice, sellPrice, socialMedia } = stock;
  let sentimentMultiplier = 1;
  if (socialMedia) {
    const result = socialMedia.reduce((acc, social) => acc + social.count, 0) / SENTIMENT_TOLERANCE;
    sentimentMultiplier = result > 1 ? Math.min(result, MAX_SENTIMENT_MULTIPLIER) : MIN_SENTIMENT_MULTIPLIER;
  }
  const difference = buyPrice - sellPrice;
  // the more the peolple are talking about it the more we follow the trend
  const tolerance = BASE_TOLERANCE / sentimentMultiplier;
  // more buying than selling
  if (difference > 0) {
    const differenceProportion = difference / buyPrice;
    if (differenceProportion > tolerance) {
      return 'buy';
    }
  }
  // more selling than buying
  if (difference < 0) {
    const differenceProportion = Math.abs(difference / sellPrice);
    if (differenceProportion > tolerance) {
      return 'sell';
    }
  }

  return 'hold';
}