// Mock hooks and types for problem3 demonstration
import React from 'react';

export interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: string;
}

export interface BoxProps {
  className?: string;
  children?: React.ReactNode;
}

// Mock hook for wallet balances
export const useWalletBalances = (): WalletBalance[] => {
  return [
    { currency: 'ETH', amount: 1.5, blockchain: 'Ethereum' },
    { currency: 'BTC', amount: 0.5, blockchain: 'Bitcoin' },
    { currency: 'OSMO', amount: 100, blockchain: 'Osmosis' },
  ];
};

// Mock hook for prices
export const usePrices = (): Record<string, number> => {
  return {
    ETH: 3500,
    BTC: 65000,
    OSMO: 1.2,
  };
};

// Mock classes object
export const classes = {
  row: 'wallet-row',
};

// Mock WalletRow component
export const WalletRow: React.FC<{
  className: string;
  key: string;
  amount: number;
  usdValue: number;
  formattedAmount: string;
}> = ({ className, amount, usdValue, formattedAmount }) => (
  <div className={className}>
    Amount: {formattedAmount}, USD: ${usdValue.toFixed(2)}
  </div>
);