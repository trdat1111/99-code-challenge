interface SwapButtonProps {
  onSwap: () => void;
  isLoading: boolean;
  disabled?: boolean;
}

export const SwapButton: React.FC<SwapButtonProps> = ({
  onSwap,
  isLoading,
  disabled = false
}) => {
  return (
    <div className="swap-button-container">
      <button
        type="button"
        onClick={onSwap}
        disabled={disabled || isLoading}
        className="swap-button"
      >
        {isLoading ? (
          <div className="loading-spinner-small"></div>
        ) : (
          <svg 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2"
            className="swap-icon"
          >
            <path d="M7 16V4m0 0L3 8m4-4l4 4M17 8v12m0 0l4-4m-4 4l-4-4"/>
          </svg>
        )}
      </button>
    </div>
  );
};