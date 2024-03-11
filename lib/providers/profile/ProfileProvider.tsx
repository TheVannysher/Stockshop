import { ProfileContext } from '@/lib/contexts/profileContext'
import { Holding } from '@/lib/types/stock';
import React, { useCallback, useState } from 'react'

export default function ProfileProvider({ children }: { children: React.ReactNode }) {
  const [holdings, setHoldings] = useState<Holding[]>([]);
  const purchaseStock = useCallback((symbol: string, buyPrice: number, quantity: number) => {
    // call to api with values and use response to update holdings
    // on success, add to holdings
    setHoldings((prevHoldings) => ([...prevHoldings, {
      stock: {
        symbol,
        buyPrice,
        sellPrice: 0,
        quantity,
      },
      purchaseDate: new Date(),
    }]));
  }, []);
  const sellStock = useCallback((symbol: string, buyPrice: number, quantity: number) => {
    if (holdings.length === 0) return;
    // call to api with values and use response to update holdings
    // on success, add to holdings
    setHoldings((prevHoldings) => {
      const existingHoldingIndex = prevHoldings.findIndex((holding) => holding.stock.symbol === symbol);
      if (existingHoldingIndex < 0) return prevHoldings;
      return prevHoldings.splice(existingHoldingIndex, 1);
    });
  }, []);
  return (
    <ProfileContext.Provider
      value={{
        username: 'Username',
        portfolio: { holdings },
        purchaseStock,
        sellStock,
      }}>
      {children}
    </ProfileContext.Provider>
  )
}