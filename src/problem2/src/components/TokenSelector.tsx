import { Token } from '../types';

interface TokenSelectorProps {
  selectedToken: string;
  tokens: Token[];
  onTokenChange: (currency: string) => void;
  disabled?: boolean;
  label: string;
}

export const TokenSelector: React.FC<TokenSelectorProps> = ({
  selectedToken,
  tokens,
  onTokenChange,
  disabled = false,
  label
}) => {
  const selectedTokenData = tokens.find(token => token.currency === selectedToken);

  return (
    <div className="token-selector">
      <label className="token-selector-label">{label}</label>
      <div className="token-select-wrapper" style={{ position: 'relative' }}>
        <select
          value={selectedToken}
          onChange={(e) => onTokenChange(e.target.value)}
          disabled={disabled}
          className="token-select"
        >
          <option value="">Select token</option>
          {tokens.map((token) => (
            <option key={token.currency} value={token.currency}>
              {token.currency} - ${token.price.toFixed(2)}
            </option>
          ))}
        </select>
        {selectedTokenData?.icon && (
          <img 
            src={selectedTokenData.icon} 
            alt={selectedTokenData.currency}
            className="token-icon"
            style={{ 
              width: '24px', 
              height: '24px', 
              position: 'absolute', 
              right: '30px', 
              top: '50%', 
              transform: 'translateY(-50%)',
              pointerEvents: 'none'
            }}
          />
        )}
      </div>
    </div>
  );
};