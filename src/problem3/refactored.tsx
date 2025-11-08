import React, { useMemo } from 'react';
import { 
  WalletBalance, 
  BoxProps, 
  useWalletBalances, 
  usePrices, 
  classes, 
  WalletRow 
} from './hooks';

// Fixed and optimized version addressing all issues from the code review

interface Props extends BoxProps {
  // Props interface properly defined
}

// Moved getPriority outside component to prevent recreation on every render
// Changed parameter type from 'any' to 'string' for better type safety
const getPriority = (blockchain: string): number => {
  switch (blockchain) {
    case 'Osmosis':
      return 100;
    case 'Ethereum':
      return 50;
    case 'Arbitrum':
      return 30;
    case 'Zilliqa':
      return 20;
    case 'Neo':
      return 20;
    default:
      return -99;
  }
};

const WalletPage: React.FC<Props> = (props: Props) => {
  // Removed unused 'children' destructuring
  const { ...rest } = props;
  
  const balances = useWalletBalances();
  const prices = usePrices();

  // Better naming: sortedAndFilteredBalances instead of just sortedBalances
  // Removed 'prices' from dependencies as it's not used in the computation
  const sortedAndFilteredBalances = useMemo(() => {
    // Fixed filtering logic: now correctly filters balances with priority > -99 AND amount > 0
    const filteredBalances = balances.filter((balance: WalletBalance) => {
      const priority = getPriority(balance.blockchain);
      return priority > -99 && balance.amount > 0;
    });

    // Fixed sort function: added explicit return 0 for equal priorities
    return filteredBalances.sort((lhs: WalletBalance, rhs: WalletBalance) => {
      const leftPriority = getPriority(lhs.blockchain);
      const rightPriority = getPriority(rhs.blockchain);

      if (leftPriority > rightPriority) {
        return -1;
      } else if (rightPriority > leftPriority) {
        return 1;
      }
      return 0; // Explicit return for equal priorities
    });
  }, [balances]); // Removed 'prices' dependency - not needed for filtering/sorting

  // Removed unnecessary FormattedWalletBalance interface and formattedBalances variable
  // Calculate formatted amount inline to avoid redundant intermediate arrays
  const rows = sortedAndFilteredBalances.map((balance: WalletBalance) => {
    const usdValue = prices[balance.currency] * balance.amount;

    return (
      <WalletRow
        className={classes.row}
        key={balance.currency} // Use currency as key instead of index - more stable identifier
        amount={balance.amount}
        usdValue={usdValue}
        formattedAmount={balance.amount.toFixed()} // Calculate formatted amount inline
      />
    );
  });

  return <div {...rest}>{rows}</div>;
};

export default WalletPage;

/*
PERFORMANCE OPTIMIZATIONS IMPLEMENTED:

1. **useMemo Optimization**: 
   - Removed 'prices' from dependencies since it doesn't affect filtering/sorting
   - Prevents unnecessary recalculations when prices update but balance order remains the same

2. **useCallback for Event Handlers** (if needed):
   - For complex interactions, we could add useCallback for event handlers
   - Example: const handleBalanceClick = useCallback((currency: string) => {...}, []);

3. **Memoized Components** (if WalletRow was expensive):
   - Could wrap WalletRow with React.memo to prevent unnecessary re-renders
   - Example: const MemoizedWalletRow = React.memo(WalletRow);

4. **Key Optimization**:
   - Using balance.currency as key instead of array index
   - Provides stable identity for React's reconciliation algorithm
   - Prevents unnecessary re-renders when list order changes

5. **Memory Optimization**:
   - Eliminated intermediate formattedBalances array
   - Reduced memory allocation by calculating formatted values inline
   - Removed unused FormattedWalletBalance interface

ADDITIONAL CONSIDERATIONS FOR LARGER APPLICATIONS:

1. **Virtualization**: For large lists (>1000 items), consider react-window or react-virtualized
2. **Data Normalization**: Store balances in normalized format with lookup tables
3. **Selector Pattern**: Use reselect library for memoized derived data
4. **State Management**: Consider moving balance filtering logic to a custom hook
5. **Error Boundaries**: Add error boundaries around WalletRow components
6. **Loading States**: Add skeleton screens for better UX during data fetching
*/