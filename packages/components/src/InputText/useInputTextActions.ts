import type { ChangeEvent, FocusEvent, KeyboardEvent } from "react";
import type { InputTextRebuiltProps } from "./InputText.types";

export interface useInputTextActionsProps
  extends Pick<
    InputTextRebuiltProps,
    "onChange" | "onEnter" | "onFocus" | "onBlur" | "onKeyDown"
  > {
  inputRef?: React.RefObject<HTMLInputElement | HTMLTextAreaElement | null>;
}

/**
 * Combines the actions on the InputText such as onChange, onEnter, onFocus, onBlur, and onClear to forward information to the consumers of the InputText.
 * DO not repeat this pattern. We are doing this as a proof of concept relating to the refactoring of Form inputs to see what can be removed.
 */
export function useInputTextActions({
  onChange,
  inputRef,
  onEnter,
  onFocus,
  onBlur,
  onKeyDown,
}: useInputTextActionsProps) {
  function handleClear() {
    onChange && onChange("");
    inputRef?.current?.focus();
  }

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const newValue = event.currentTarget.value;

    onChange?.(newValue, event);
  }

  function handleKeyDown(
    event: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    onKeyDown?.(event);
    if (!onEnter) return;
    if (event.key !== "Enter") return;
    if (event.shiftKey || event.ctrlKey) return;
    event.preventDefault();
    onEnter && onEnter(event);
  }

  function handleFocus(
    event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    onFocus?.(event);
  }

  function handleBlur(
    event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
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
