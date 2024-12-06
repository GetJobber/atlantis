import { ChangeEvent, FocusEvent, KeyboardEvent } from "react";
import { InputTextRebuiltProps } from "./InputText.types";

export interface useInputTextActionsProps
  extends Pick<
    InputTextRebuiltProps,
    "onChange" | "onEnter" | "onFocus" | "onBlur"
  > {
  inputRef?: React.RefObject<HTMLInputElement | HTMLTextAreaElement>;
}

/**
 * Combines the actions from the props of the FormField with the actions from react-hook-form. This is used to
 * manage the form state of a field through react-hook-form while providing support for additional callbacks
 */
export function useInputTextActions({
  onChange,
  inputRef,
  onEnter,
  onFocus,
  onBlur,
}: useInputTextActionsProps) {
  function handleClear() {
    handleBlur();
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
