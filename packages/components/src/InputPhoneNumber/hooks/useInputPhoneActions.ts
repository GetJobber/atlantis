import { ChangeEvent, FocusEvent, KeyboardEvent } from "react";
import { InputPhoneNumberRebuiltProps } from "../InputPhoneNumber.types";

export interface useInputPhoneActionsProps
  extends Pick<
    InputPhoneNumberRebuiltProps,
    "onChange" | "onEnter" | "onFocus" | "onBlur" | "onKeyDown"
  > {
  inputRef?: React.RefObject<HTMLInputElement>;
}

/**
 * Combines the actions on the InputPhoneNumber such as onChange, onEnter, onFocus, onBlur, and onClear to forward information to the consumers of the InputPhoneNumber.
 * Do not repeat this pattern. We are doing this as a proof of concept relating to the refactoring of Form inputs to see what can be removed.
 */
export function useInputPhoneActions({
  onChange,
  inputRef,
  onFocus,
  onBlur,
  onKeyDown,
  onEnter,
}: useInputPhoneActionsProps) {
  function handleClear() {
    handleBlur();
    onChange && onChange("");
    inputRef?.current?.focus();
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const newValue = event.currentTarget.value;

    onChange?.(newValue, event);
  }

  function handleFocus(event: FocusEvent<HTMLInputElement>) {
    onFocus?.(event);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    onKeyDown?.(event);
    if (!onEnter) return;
    if (event.key !== "Enter") return;
    if (event.shiftKey || event.ctrlKey) return;
    event.preventDefault();
    onEnter?.(event);
  }

  function handleBlur(event?: FocusEvent<HTMLInputElement>) {
    onBlur?.(event);
  }

  return {
    handleClear,
    handleChange,
    handleFocus,
    handleBlur,
    handleKeyDown,
  };
}
