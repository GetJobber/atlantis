import { ChangeEvent } from "react";

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

  // Noop for SelectRebuilt since onClear is a required prop for FormFieldWrapper
  // but Select is not clearable.
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  function handleClear() {}

  return {
    handleChange,
    handleBlur,
    handleFocus,
    handleClear,
  };
}
