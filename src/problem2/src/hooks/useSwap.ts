import { useState, useEffect, useCallback, useMemo } from 'react';
import { Token, TokenType } from '../types';
import { fetchTokens, fetchExchangeRate, submitSwap } from '../services/api';

export const useSwap = () => {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [fromToken, setFromToken] = useState<string>('');
  const [toToken, setToToken] = useState<string>('');
  const [fromAmount, setFromAmount] = useState<string>('');
  const [toAmount, setToAmount] = useState<string>('');
  const [exchangeRate, setExchangeRate] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const [tokensLoading, setTokensLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string>('');

  // Load tokens on component mount
  useEffect(() => {
    const loadTokens = async () => {
      try {
        setTokensLoading(true);
        const tokenData = await fetchTokens();
        setTokens(tokenData);
        // Set default tokens
        if (tokenData.length >= 2) {
          setFromToken(tokenData[0].currency);
          setToToken(tokenData[1].currency);
        }
      } catch (err) {
        setError('Failed to load tokens');
      } finally {
        setTokensLoading(false);
      }
    };

    loadTokens();
  }, []);

  // Calculate exchange rate when tokens change
  useEffect(() => {
    const calculateRate = async () => {
      if (!fromToken || !toToken || fromToken === toToken) {
        setExchangeRate(0);
        setToAmount('');
        return;
      }

      try {
        setIsLoading(true);
        setError('');
        const rate = await fetchExchangeRate(fromToken, toToken);
        setExchangeRate(rate);
        
        // Update to amount if from amount exists
        if (fromAmount && !isNaN(parseFloat(fromAmount))) {
          const calculated = (parseFloat(fromAmount) * rate).toFixed(6);
          setToAmount(calculated);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch exchange rate');
        setExchangeRate(0);
        setToAmount('');
      } finally {
        setIsLoading(false);
      }
    };

    calculateRate();
  }, [fromToken, toToken, fromAmount]);

  // Memoized available tokens
  const availableFromTokens = useMemo(() => tokens, [tokens]);
  const availableToTokens = useMemo(() => 
    tokens.filter(token => token.currency !== fromToken), 
    [tokens, fromToken]
  );

  const handleFromAmountChange = useCallback((amount: string) => {
    setFromAmount(amount);
    setError('');

    // Validate input
    if (amount && isNaN(parseFloat(amount))) {
      setError('Please enter a valid number');
      setToAmount('');
      return;
    }

    if (amount && parseFloat(amount) <= 0) {
      setError('Amount must be greater than 0');
      setToAmount('');
      return;
    }

    if (amount && exchangeRate > 0) {
      const calculated = (parseFloat(amount || '0') * exchangeRate).toFixed(6);
      setToAmount(calculated);
    } else {
      setToAmount('');
    }
  }, [exchangeRate]);

  const handleTokenSelection = useCallback((currency: string, type: TokenType) => {
    if (type === TokenType.FROM) {
      setFromToken(currency);
      // If selecting same token as TO, swap them
      if (currency === toToken && fromToken) {
        setToToken(fromToken);
      }
    } else {
      setToToken(currency);
      // If selecting same token as FROM, swap them
      if (currency === fromToken && toToken) {
        setFromToken(toToken);
      }
    }
    setError('');
  }, [fromToken, toToken]);

  const handleSwapTokens = useCallback(() => {
    if (!fromToken || !toToken) return;
    
    const tempToken = fromToken;
    setFromToken(toToken);
    setToToken(tempToken);
    
    // Swap amounts too
    setFromAmount(toAmount);
    setToAmount(fromAmount);
    setError('');
  }, [fromToken, toToken, fromAmount, toAmount]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!fromToken || !toToken || !fromAmount || parseFloat(fromAmount) <= 0) {
      setError('Please fill in all fields with valid values');
      return;
    }

    try {
      setIsSubmitting(true);
      setError('');
      
      const result = await submitSwap({
        from: fromToken,
        to: toToken,
        amount: parseFloat(fromAmount)
      });

      // Reset form on success
      setFromAmount('');
      setToAmount('');
      alert(`Swap successful! Transaction ID: ${result.transactionId}`);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Swap failed');
    } finally {
      setIsSubmitting(false);
    }
  }, [fromToken, toToken, fromAmount]);

  return {
    availableFromTokens,
    availableToTokens,
    fromToken,
    toToken,
    fromAmount,
    toAmount,
    exchangeRate,
    isLoading,
    error,
    isSubmitting,
    tokensLoading,
    handleFromAmountChange,
    handleSwapTokens,
    handleSubmit,
    handleTokenSelection,
  };
};