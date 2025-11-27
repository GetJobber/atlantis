import type {
  ChangeEvent,
  FocusEvent,
  KeyboardEvent,
  MouseEvent,
  PointerEvent,
} from "react";
import type { InputTimeRebuiltProps } from "../InputTime.types";
import { timeStringToDate } from "../utils/input-time-utils";

export interface UseInputTimeActionsProps
  extends Pick<
    InputTimeRebuiltProps,
    | "onChange"
    | "onFocus"
    | "onBlur"
    | "onKeyDown"
    | "onClick"
    | "onMouseDown"
    | "onMouseUp"
    | "onPointerDown"
    | "onPointerUp"
  > {
  readonly value?: Date;
  readonly readOnly?: boolean;
  readonly disabled?: boolean;
  readonly inputRef?: React.RefObject<HTMLInputElement | null>;
}

export function useInputTimeActions({
  onChange,
  value,
  inputRef,
  onFocus,
  onBlur,
  onKeyDown,
  onClick,
  onMouseDown,
  onMouseUp,
  onPointerDown,
  onPointerUp,
}: UseInputTimeActionsProps) {
  function handleChangeEvent(event: ChangeEvent<HTMLInputElement>) {
    handleChange(event.target.value);
  }

  function handleChange(newValue: string) {
    onChange?.(timeStringToDate(newValue, value));
  }

  function handleBlur(event: FocusEvent<HTMLInputElement>) {
    onBlur?.(event);

    if (inputRef?.current) {
      if (!inputRef.current.checkValidity()) {
        inputRef.current.value = "";
      }
    }
  }

  function handleClear() {
    // Clear the value and refocus without triggering blur event
    onChange?.(undefined);
    inputRef?.current?.focus();
  }

  function handleFocus(event: FocusEvent<HTMLInputElement>) {
    onFocus?.(event);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    onKeyDown?.(event);
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
    handleChangeEvent,
    handleChange,
    handleBlur,
    handleClear,
    handleFocus,
    handleKeyDown,
    handleClick,
    handleMouseDown,
    handleMouseUp,
    handlePointerDown,
    handlePointerUp,
  };
}
