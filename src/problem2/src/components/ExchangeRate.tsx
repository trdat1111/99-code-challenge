interface ExchangeRateProps {
  fromToken: string;
  toToken: string;
  fromAmount: string;
  toAmount: string;
  exchangeRate: number;
  error: string;
}

export const ExchangeRate: React.FC<ExchangeRateProps> = ({
  fromToken,
  toToken,
  fromAmount,
  toAmount,
  exchangeRate,
  error
}) => {
  if (error || !fromToken || !toToken || exchangeRate === 0) {
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