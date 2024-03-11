import { Stock } from '@/lib/types/stock';
import getRecommended from '../getRecommended';

describe('getRecommended', () => {
  it(`should return buy`, () => {
    const stock: Stock = {
      symbol: 'AAPL',
      buyPrice: 200,
      sellPrice: 100,
      socialMedia: [
        {
          type: 'twitter',
          count: 540,
        }
      ],
      date: new Date(),
    };

    expect(getRecommended(stock)).toBe('buy');
  });

  it(`should return sell`, () => {
    const stock: Stock = {
      symbol: 'AAPL',
      date: new Date(),
      buyPrice: 200,
      sellPrice: 400,
      socialMedia: [
        {
          type: 'twitter',
          count: 10,
        }
      ],
    };

    expect(getRecommended(stock)).toBe('sell');
  });
  it(`should return hold`, () => {
    const stock: Stock = {
      symbol: 'AAPL',
      date: new Date(),
      buyPrice: 100,
      sellPrice: 100,
      socialMedia: [
        {
          type: 'twitter',
          count: 200,
        }
      ]
    };

    expect(getRecommended(stock)).toBe('hold');
  });
});