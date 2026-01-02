import type { ChangeEvent, FocusEvent } from "react";

interface UseSelectActionsProps {
  readonly onChange?: (
    newValue: string | number,
    event?: ChangeEvent<HTMLSelectElement>,
  ) => void;
  readonly onBlur?: (event: FocusEvent<HTMLSelectElement>) => void;
  readonly onFocus?: (event: FocusEvent<HTMLSelectElement>) => void;
}

/**
 * Hook with actions on the Select component.
 */
export function useSelectActions({
  onChange,
  onBlur,
  onFocus,
}: UseSelectActionsProps) {
  function handleChange(event: ChangeEvent<HTMLSelectElement>) {
    const newValue = event.currentTarget.value;
    onChange?.(newValue, event);
  }

  function handleBlur(event: FocusEvent<HTMLSelectElement>) {
    onBlur?.(event);
  }

  function handleFocus(event: FocusEvent<HTMLSelectElement>) {
    onFocus?.(event);
  }

  return {
    handleChange,
    handleBlur,
    handleFocus,
  };
}
