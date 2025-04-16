import { ChangeEvent, RefObject } from "react";

interface UseSelectActionsProps {
  readonly onChange?: (
    newValue: string | number,
    event?: ChangeEvent<HTMLSelectElement>,
  ) => void;
  readonly onBlur?: () => void;
  readonly onFocus?: () => void;
  readonly selectRef: RefObject<HTMLSelectElement>;
}

/**
 * Hook with actions on the Select component.
 */
export function useSelectActions({
  onChange,
  onBlur,
  onFocus,
  selectRef,
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

  function handleClear() {
    handleBlur();
    onChange?.("");
    selectRef?.current?.focus();
  }

  return {
    handleChange,
    handleBlur,
    handleFocus,
    handleClear,
  };
}
