import React, { useMemo } from 'react';
import { 
  BoxProps, 
  useWalletBalances, 
  usePrices, 
  classes, 
  WalletRow 
} from './hooks';

// Original problematic code with all the issues mentioned in the review

interface WalletBalance {
  currency: string;
  amount: number;
  // Missing blockchain property - this will cause TypeScript errors
}

interface FormattedWalletBalance {
  currency: string;
  amount: number;
  formatted: string;
}

interface Props extends BoxProps {
  // Empty interface extending BoxProps
}

const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props; // 'children' is destructured but never used
  const balances = useWalletBalances();
  const prices = usePrices();

  // getPriority function defined inside component - recreated on every render
  const getPriority = (blockchain: any): number => { // Using 'any' instead of 'string'
    switch (blockchain) {
      case 'Osmosis':
        return 100
      case 'Ethereum':
        return 50
      case 'Arbitrum':
        return 30
      case 'Zilliqa':
        return 20
      case 'Neo':
        return 20
      default:
        return -99
    }
  }

  const sortedBalances = useMemo(() => { // Poor naming - does both filtering and sorting
    return balances.filter((balance: WalletBalance) => {
          const balancePriority = getPriority(balance.blockchain); // Will cause error: blockchain doesn't exist on WalletBalance
          if (lhsPriority > -99) { // Error: lhsPriority is not defined
             if (balance.amount <= 0) { // Inverted logic - should be > 0
               return true; // Returns true for negative/zero amounts
             }
          }
          return false // Missing semicolon
        }).sort((lhs: WalletBalance, rhs: WalletBalance) => {
            const leftPriority = getPriority(lhs.blockchain);
          const rightPriority = getPriority(rhs.blockchain);
          if (leftPriority > rightPriority) {
            return -1;
          } else if (rightPriority > leftPriority) {
            return 1;
          }
          // Missing return 0 for equal priorities
    });
  }, [balances, prices]); // 'prices' dependency is unnecessary

  // Unused variable - creates formatted balances but never uses them
  const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
    return {
      ...balance,
      formatted: balance.amount.toFixed()
    }
  })

  // Maps over sortedBalances instead of formattedBalances, causing type issues
  const rows = sortedBalances.map((balance: FormattedWalletBalance, index: number) => {
    const usdValue = prices[balance.currency] * balance.amount;
    return (
      <WalletRow 
        className={classes.row}
        key={index} // Anti-pattern: using index as key
        amount={balance.amount}
        usdValue={usdValue}
        formattedAmount={balance.formatted} // Error: 'formatted' doesn't exist on WalletBalance
      />
    )
  })

  return (
    <div {...rest}>
      {rows}
    </div>
  )
}

export default WalletPage;