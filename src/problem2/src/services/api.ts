import { Token } from '../types';

// Fetch token icons from Switcheo GitHub repository
const fetchTokenIcon = async (symbol: string): Promise<string> => {
  const iconUrl = `https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${symbol}.svg`;
  const response = await fetch(iconUrl);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch icon for ${symbol}: ${response.status}`);
  }
  
  return iconUrl;
};

// Fetch token prices from Switcheo API
const fetchTokenPrices = async (): Promise<{ [key: string]: number }> => {
  const response = await fetch('https://interview.switcheo.com/prices.json');
  
  if (!response.ok) {
    throw new Error(`Failed to fetch prices: ${response.status} ${response.statusText}`);
  }
  
  const data = await response.json();
  
  // Create a price map by symbol
  const priceMap: { [key: string]: number } = {};
  data.forEach((item: any) => {
    if (item.currency && typeof item.price === 'number') {
      priceMap[item.currency] = item.price;
    }
  });
  
  return priceMap;
};

export const fetchTokens = async (): Promise<Token[]> => {
  // Add a small delay to show loading state
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const prices = await fetchTokenPrices();
  
  // Get unique currency symbols from the price data
  const currencies = Object.keys(prices);
  
  const tokens = await Promise.all(
    currencies.map(async (currency) => {
      try {
        const icon = await fetchTokenIcon(currency);
        return {
          currency,
          price: prices[currency],
          icon
        };
      } catch (iconError) {
        // If icon fetch fails, still include the token without icon
        console.warn(`Could not fetch icon for ${currency}:`, iconError);
        return {
          currency,
          price: prices[currency]
        };
      }
    })
  );
  
  // Filter out tokens with invalid prices and sort by currency
  return tokens
    .filter(token => token.price > 0)
    .sort((a, b) => a.currency.localeCompare(b.currency));
};

export const fetchExchangeRate = async (from: string, to: string): Promise<number> => {
  if (from === to) return 1;
  
  // Add a small delay to show loading state  
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const prices = await fetchTokenPrices();
  
  const fromPrice = prices[from];
  const toPrice = prices[to];
  
  if (!fromPrice || !toPrice) {
    throw new Error(`Exchange rate not available for ${from}/${to}`);
  }
  
  if (fromPrice <= 0 || toPrice <= 0) {
    throw new Error(`Invalid price data for ${from}/${to}`);
  }
  
  // Calculate exchange rate based on USD prices
  return fromPrice / toPrice;
};

export const submitSwap = async (swapData: { from: string; to: string; amount: number }) => {
  // Add a realistic delay to show loading state (1.5-3 seconds)
  const delay = 1500 + Math.random() * 1500;
  await new Promise(resolve => setTimeout(resolve, delay));
  
  // Simulate random success/failure (keeping some randomness for demo purposes)
  if (Math.random() > 0.1) { // 90% success rate
    return {
      success: true,
      transactionId: `txn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      ...swapData
    };
  } else {
    throw new Error('Swap failed due to insufficient liquidity');
  }
};