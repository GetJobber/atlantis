import type {
  ChangeEvent,
  FocusEvent,
  KeyboardEvent,
  MouseEvent,
  PointerEvent,
} from "react";
import type { InputTextRebuiltProps } from "./InputText.types";

export interface useInputTextActionsProps
  extends Pick<
    InputTextRebuiltProps,
    | "onChange"
    | "onEnter"
    | "onFocus"
    | "onBlur"
    | "onKeyDown"
    | "onKeyUp"
    | "onMouseDown"
    | "onPointerDown"
    | "onClick"
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
  onKeyUp,
  onMouseDown,
  onPointerDown,
  onClick,
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

  function handleKeyUp(
    event: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    onKeyUp?.(event);
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

  function handleMouseDown(
    event: MouseEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    onMouseDown?.(event);
  }

  function handlePointerDown(
    event: PointerEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    onPointerDown?.(event);
  }

  function handleClick(
    event: MouseEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    onClick?.(event);
  }

  return {
    handleClear,
    handleChange,
    handleKeyDown,
    handleKeyUp,
    handleFocus,
    handleBlur,
    handleMouseDown,
    handlePointerDown,
    handleClick,
  };
}
