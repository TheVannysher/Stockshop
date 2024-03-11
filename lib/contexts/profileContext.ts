import React from "react";
import { Portfolio } from "../types/stock";

export interface ProfileContextType {
  username: string;
  portfolio: Portfolio;
  purchaseStock: (symbol: string, buyPrice: number, quantity: number) => void;
  sellStock: (symbol: string, sellPrice: number, quantity: number) => void;
}

const defaultProfileContext: ProfileContextType = {
  portfolio: {
    holdings: [],
  },
  username: '',
  purchaseStock: () => { },
  sellStock: () => { },
}

export const ProfileContext = React.createContext(defaultProfileContext);