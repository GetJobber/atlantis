import type {
  ChangeEvent,
  FocusEvent,
  KeyboardEvent,
  MouseEvent,
  PointerEvent,
} from "react";
import type { InputEmailRebuiltProps } from "../InputEmail.types";

export interface UseInputEmailActionsProps
  extends Pick<
    InputEmailRebuiltProps,
    | "onChange"
    | "onEnter"
    | "onFocus"
    | "onBlur"
    | "onKeyDown"
    | "onKeyUp"
    | "onClick"
    | "onMouseDown"
    | "onMouseUp"
    | "onPointerDown"
    | "onPointerUp"
  > {
  inputRef?: React.RefObject<HTMLInputElement>;
}

export function useInputEmailActions({
  onChange,
  inputRef,
  onEnter,
  onFocus,
  onBlur,
  onKeyDown,
  onKeyUp,
  onClick,
  onMouseDown,
  onMouseUp,
  onPointerDown,
  onPointerUp,
}: UseInputEmailActionsProps) {
  function handleClear() {
    onChange?.("");
    inputRef?.current?.focus();
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const newValue = event.currentTarget.value;

    onChange?.(newValue, event);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    onKeyDown?.(event);
    if (!onEnter) return;
    if (event.key !== "Enter") return;
    if (event.shiftKey || event.ctrlKey) return;
    event.preventDefault();
    onEnter?.(event);
  }

  function handleFocus(event: FocusEvent<HTMLInputElement>) {
    onFocus?.(event);
  }

  function handleBlur(event: FocusEvent<HTMLInputElement>) {
    onBlur?.(event);
  }

  function handleKeyUp(event: KeyboardEvent<HTMLInputElement>) {
    onKeyUp?.(event);
  }

  function handleClick(event: MouseEvent<HTMLInputElement>) {
    onClick?.(event);
  }

  function handleMouseDown(event: MouseEvent<HTMLInputElement>) {
    onMouseDown?.(event);
  }

  function handleMouseUp(event: MouseEvent<HTMLInputElement>) {
    onMouseUp?.(event);
  }

  function handlePointerDown(event: PointerEvent<HTMLInputElement>) {
    onPointerDown?.(event);
  }

  function handlePointerUp(event: PointerEvent<HTMLInputElement>) {
    onPointerUp?.(event);
  }

  return {
    handleClear,
    handleChange,
    handleKeyDown,
    handleKeyUp,
    handleFocus,
    handleBlur,
    handleClick,
    handleMouseDown,
    handleMouseUp,
    handlePointerDown,
    handlePointerUp,
  };
}
