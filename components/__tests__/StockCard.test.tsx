import * as React from 'react';
import renderer from 'react-test-renderer';

import StockCard from '../StockCard';
import { Stock } from '@/lib/types/stock';

it(`renders correctly`, () => {
  const stock: Stock = {
    symbol: 'AAPL',
    buyPrice: 100,
    sellPrice: 100,
    date: new Date(),
    socialMedia: [
      {
        type: 'twitter',
        count: 540,
      }
    ]
  }
  const tree = renderer.create(
    <StockCard
      symbol={stock.symbol}
      buyPrice={stock.buyPrice}
      date={stock.date}
      sellPrice={stock.sellPrice}
      recommandation={'buy'}
      socials={stock.socialMedia}
    />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});

it(`renders correctly`, () => {
  const stock: Stock = {
    symbol: 'WWWWWWWWWWWWWWWWWW',
    buyPrice: 10000,
    sellPrice: 1000000,
    date: new Date(),
    socialMedia: [
      {
        type: 'WWWWWWWWW',
        count: 54000000,
      }
    ]
  }
  const tree = renderer.create(
    <StockCard
      symbol={stock.symbol}
      buyPrice={stock.buyPrice}
      date={stock.date}
      sellPrice={stock.sellPrice}
      recommandation={'buy'}
      socials={stock.socialMedia}
    />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
