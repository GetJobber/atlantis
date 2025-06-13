import { ChangeEvent, FocusEvent, KeyboardEvent } from "react";
import { InputEmailRebuiltProps } from "../InputEmail.types";

export interface UseInputEmailActionsProps
  extends Pick<
    InputEmailRebuiltProps,
    "onChange" | "onEnter" | "onFocus" | "onBlur" | "onKeyDown"
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
}: UseInputEmailActionsProps) {
  function handleClear() {
    handleBlur();
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

  function handleBlur(event?: FocusEvent) {
    onBlur?.(event);
  }

  return {
    handleClear,
    handleChange,
    handleKeyDown,
    handleFocus,
    handleBlur,
  };
}
