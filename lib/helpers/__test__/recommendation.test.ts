import { Stock } from '@/lib/types/stock';
import getRecommended, { BASE_TOLERANCE } from '../getRecommended';

describe('getRecommended', () => {
  it(`should return buy when buyPrice > sellPrice and excede tolerance`, () => {
    const stock: Stock = {
      symbol: 'AAPL',
      buyPrice: 100 * (1 + BASE_TOLERANCE + 0.001),
      sellPrice: 100,
      date: new Date(),
    };

    expect(getRecommended(stock)).toBe('buy');
  });
  it(`should return sell when buyPrice < sellPrice and excede tolerance`, () => {
    const stock: Stock = {
      symbol: 'AAPL',
      buyPrice: 100,
      sellPrice: 100 * (1 + BASE_TOLERANCE + 0.001),
      date: new Date(),
    };

    expect(getRecommended(stock)).toBe('sell');
  });
  it(`should return hold when price difference stay within tolerance`, () => {
    const stock: Stock = {
      symbol: 'AAPL',
      buyPrice: 100 * (1 + BASE_TOLERANCE - 0.01),
      sellPrice: 100,
      date: new Date(),
    };

    expect(getRecommended(stock)).toBe('hold');
  });

  it(`should return buy when buyPrice > sellPrice with sentimentMultiplier excede tolerance`, () => {
    const stock: Stock = {
      symbol: 'AAPL',
      buyPrice: 100 * (1 + BASE_TOLERANCE + 0.001),
      sellPrice: 100,
      socialMedia: [
        {
          type: 'twitter',
          count: 123,
        },
        {
          type: 'facebook',
          count: 456,
        }
      ],
      date: new Date(),
    };

    expect(getRecommended(stock)).toBe('buy');
  });
  it(`should return sell when buyPrice < sellPrice with sentimentMultiplier excede tolerance`, () => {
    const stock: Stock = {
      symbol: 'AAPL',
      buyPrice: 100,
      sellPrice: 100 * (1 + BASE_TOLERANCE + 0.001),
      socialMedia: [
        {
          type: 'twitter',
          count: 123,
        },
        {
          type: 'facebook',
          count: 456,
        }
      ],
      date: new Date(),
    };

    expect(getRecommended(stock)).toBe('sell');
  });
  it(`should return hold when price difference with sentimentMultiplier stay within tolerance`, () => {
    const stock: Stock = {
      symbol: 'AAPL',
      buyPrice: 100 * (1 + BASE_TOLERANCE - 0.01),
      sellPrice: 100,
      socialMedia: [
        {
          type: 'twitter',
          count: 10,
        },
        {
          type: 'facebook',
          count: 20,
        }
      ],
      date: new Date(),
    };

    expect(getRecommended(stock)).toBe('hold');
  });
  it(`should return buy when buyPrice > sellPrice with sentimentMultiplier(high mention count) excede tolerance`, () => {
    const stock: Stock = {
      symbol: 'AAPL',
      buyPrice: 100 * (1 + BASE_TOLERANCE),
      sellPrice: 100,
      socialMedia: [
        {
          type: 'twitter',
          count: 900,
        },
        {
          type: 'facebook',
          count: 900,
        }
      ],
      date: new Date(),
    };

    expect(getRecommended(stock)).toBe('buy');
  });
  it(`should return sell when buyPrice < sellPrice with sentimentMultiplier(high mention count) excede tolerance`, () => {
    const stock: Stock = {
      symbol: 'AAPL',
      buyPrice: 100,
      sellPrice: 100 * (1 + BASE_TOLERANCE),
      socialMedia: [
        {
          type: 'twitter',
          count: 900,
        },
        {
          type: 'facebook',
          count: 900,
        }
      ],
      date: new Date(),
    };

    expect(getRecommended(stock)).toBe('sell');
  });
  it(`should return hold when price difference with sentimentMultiplier(high mention count) stay within tolerance`, () => {
    const stock: Stock = {
      symbol: 'AAPL',
      buyPrice: 100,
      sellPrice: 100 * (1 + BASE_TOLERANCE - 0.02),
      socialMedia: [
        {
          type: 'twitter',
          count: 900,
        },
        {
          type: 'facebook',
          count: 900,
        }
      ],
      date: new Date(),
    };

    expect(getRecommended(stock)).toBe('hold');
  });
});