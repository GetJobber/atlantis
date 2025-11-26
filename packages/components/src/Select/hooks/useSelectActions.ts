import type { ChangeEvent, FocusEvent, MouseEvent, PointerEvent } from "react";

interface UseSelectActionsProps {
  readonly onChange?: (
    newValue: string | number,
    event?: ChangeEvent<HTMLSelectElement>,
  ) => void;
  readonly onBlur?: (event: FocusEvent<HTMLSelectElement>) => void;
  readonly onFocus?: (event: FocusEvent<HTMLSelectElement>) => void;
  readonly onClick?: (event: MouseEvent<HTMLSelectElement>) => void;
  readonly onMouseDown?: (event: MouseEvent<HTMLSelectElement>) => void;
  readonly onMouseUp?: (event: MouseEvent<HTMLSelectElement>) => void;
  readonly onPointerDown?: (event: PointerEvent<HTMLSelectElement>) => void;
  readonly onPointerUp?: (event: PointerEvent<HTMLSelectElement>) => void;
}

/**
 * Hook with actions on the Select component.
 */
export function useSelectActions({
  onChange,
  onBlur,
  onFocus,
  onClick,
  onMouseDown,
  onMouseUp,
  onPointerDown,
  onPointerUp,
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

  function handleClick(event: MouseEvent<HTMLSelectElement>) {
    onClick?.(event);
  }

  function handleMouseDown(event: MouseEvent<HTMLSelectElement>) {
    onMouseDown?.(event);
  }

  function handleMouseUp(event: MouseEvent<HTMLSelectElement>) {
    onMouseUp?.(event);
  }

  function handlePointerDown(event: PointerEvent<HTMLSelectElement>) {
    onPointerDown?.(event);
  }

  function handlePointerUp(event: PointerEvent<HTMLSelectElement>) {
    onPointerUp?.(event);
  }

  return {
    handleChange,
    handleBlur,
    handleFocus,
    handleClick,
    handleMouseDown,
    handleMouseUp,
    handlePointerDown,
    handlePointerUp,
  };
}
