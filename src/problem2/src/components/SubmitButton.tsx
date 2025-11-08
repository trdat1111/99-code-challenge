interface SubmitButtonProps {
  onSubmit: (e: React.FormEvent) => void;
  isSubmitting: boolean;
  disabled?: boolean;
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({
  onSubmit,
  isSubmitting,
  disabled = false
}) => {
  return (
    <button
      type="submit"
      onClick={onSubmit}
      disabled={disabled || isSubmitting}
      className="submit-button"
    >
      {isSubmitting ? (
        <>
          <div className="loading-spinner-small"></div>
          Processing...
        </>
      ) : (
        'Swap Tokens'
      )}
    </button>
  );
};