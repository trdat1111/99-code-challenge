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
  return (
    <div className="token-selector">
      <label className="token-selector-label">{label}</label>
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
    </div>
  );
};