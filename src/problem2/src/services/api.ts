import { Token } from '../types';

// Mock API data with real token prices (for demonstration)
const MOCK_TOKENS: Token[] = [
  { currency: 'ETH', price: 3500.25 },
  { currency: 'BTC', price: 65000.50 },
  { currency: 'USDT', price: 1.0 },
  { currency: 'BNB', price: 635.75 },
  { currency: 'ADA', price: 1.25 },
  { currency: 'SOL', price: 145.80 },
  { currency: 'DOT', price: 8.45 },
  { currency: 'MATIC', price: 0.85 },
  { currency: 'LINK', price: 22.30 },
  { currency: 'UNI', price: 12.65 }
];

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchTokens = async (): Promise<Token[]> => {
  await delay(800); // Simulate API call delay
  return MOCK_TOKENS;
};

export const fetchExchangeRate = async (from: string, to: string): Promise<number> => {
  await delay(400); // Simulate API call delay
  
  if (from === to) return 1;
  
  const fromToken = MOCK_TOKENS.find(token => token.currency === from);
  const toToken = MOCK_TOKENS.find(token => token.currency === to);
  
  if (!fromToken || !toToken) {
    throw new Error(`Exchange rate not available for ${from}/${to}`);
  }
  
  // Calculate exchange rate based on USD prices
  const rate = fromToken.price / toToken.price;
  
  // Add small random fluctuation to simulate real market conditions
  const fluctuation = 0.98 + Math.random() * 0.04; // ±2% fluctuation
  return rate * fluctuation;
};

export const submitSwap = async (swapData: { from: string; to: string; amount: number }) => {
  await delay(1500); // Simulate processing time
  
  // Simulate random success/failure
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