interface ExchangeRateProps {
  fromToken: string;
  toToken: string;
  fromAmount: string;
  toAmount: string;
  exchangeRate: number;
  error: string;
  isLoading?: boolean;
}

export const ExchangeRate: React.FC<ExchangeRateProps> = ({
  fromToken,
  toToken,
  fromAmount,
  toAmount,
  exchangeRate,
  error,
  isLoading = false
}) => {
  if (error || !fromToken || !toToken) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="exchange-rate">
        <div className="exchange-rate-info">
          <span className="exchange-rate-text" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div className="loading-spinner-small"></div>
            Calculating exchange rate...
          </span>
        </div>
      </div>
    );
  }

  if (exchangeRate === 0) {
    return null;
  }

  const displayRate = exchangeRate > 0.001 
    ? exchangeRate.toFixed(6) 
    : exchangeRate.toExponential(3);

  return (
    <div className="exchange-rate">
      <div className="exchange-rate-info">
        <span className="exchange-rate-text">
          1 {fromToken} = {displayRate} {toToken}
        </span>
        {fromAmount && toAmount && (
          <span className="conversion-text">
            {parseFloat(fromAmount).toFixed(4)} {fromToken} → {parseFloat(toAmount).toFixed(6)} {toToken}
          </span>
        )}
      </div>
    </div>
  );
};