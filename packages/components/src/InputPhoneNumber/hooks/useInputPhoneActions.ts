import type {
  ChangeEvent,
  FocusEvent,
  KeyboardEvent,
  MouseEvent,
  PointerEvent,
} from "react";
import type { InputPhoneNumberRebuiltProps } from "../InputPhoneNumber.types";

export interface useInputPhoneActionsProps
  extends Pick<
    InputPhoneNumberRebuiltProps,
    | "onChange"
    | "onEnter"
    | "onFocus"
    | "onBlur"
    | "onKeyDown"
    | "onClick"
    | "onMouseDown"
    | "onMouseUp"
    | "onPointerDown"
    | "onPointerUp"
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
  onClick,
  onMouseDown,
  onMouseUp,
  onPointerDown,
  onPointerUp,
}: useInputPhoneActionsProps) {
  function handleClear() {
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

  function handleBlur(event: FocusEvent<HTMLInputElement>) {
    onBlur?.(event);
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
    handleFocus,
    handleBlur,
    handleKeyDown,
    handleClick,
    handleMouseDown,
    handleMouseUp,
    handlePointerDown,
    handlePointerUp,
  };
}
