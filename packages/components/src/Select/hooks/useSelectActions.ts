import type { ChangeEvent } from "react";

interface UseSelectActionsProps {
  readonly onChange?: (
    newValue: string | number,
    event?: ChangeEvent<HTMLSelectElement>,
  ) => void;
  readonly onBlur?: () => void;
  readonly onFocus?: () => void;
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

  function handleBlur() {
    onBlur?.();
  }

  function handleFocus() {
    onFocus?.();
  }

  return {
    handleChange,
    handleBlur,
    handleFocus,
  };
}
