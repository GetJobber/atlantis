import type { ChangeEvent, FocusEvent, KeyboardEvent } from "react";
import type { InputEmailRebuiltProps } from "../InputEmail.types";

export interface UseInputEmailActionsProps
  extends Pick<
    InputEmailRebuiltProps,
    "onChange" | "onEnter" | "onFocus" | "onBlur" | "onKeyDown" | "onKeyUp"
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

  return {
    handleClear,
    handleChange,
    handleKeyDown,
    handleKeyUp,
    handleFocus,
    handleBlur,
  };
}
