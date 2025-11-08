import { Token } from '../types';
import { TokenSelector } from './TokenSelector';

interface AmountInputProps {
  amount: string;
  onAmountChange: (amount: string) => void;
  token: string;
  tokens: Token[];
  onTokenChange: (currency: string) => void;
  disabled?: boolean;
  readonly?: boolean;
  label: string;
  placeholder: string;
}

export const AmountInput: React.FC<AmountInputProps> = ({
  amount,
  onAmountChange,
  token,
  tokens,
  onTokenChange,
  disabled = false,
  readonly = false,
  label,
  placeholder
}) => {
  return (
    <div className="amount-input-container">
      <div className="amount-input">
        <label className="amount-label">{label}</label>
        <div className="amount-input-wrapper">
          <input
            type="number"
            value={amount}
            onChange={(e) => onAmountChange(e.target.value)}
            placeholder={placeholder}
            disabled={disabled}
            readOnly={readonly}
            className="amount-field"
            step="any"
            min="0"
          />
          <div className="token-selector-wrapper">
            <TokenSelector
              selectedToken={token}
              tokens={tokens}
              onTokenChange={onTokenChange}
              disabled={disabled}
              label=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};