import type { ChangeEvent, FocusEvent } from "react";
import { useState } from "react";
import type { InputDateRebuiltProps } from "./InputDate.types";
import type { DatePickerActivatorProps } from "../DatePicker/DatePickerActivator";

export interface useInputDateActivatorActionsProps
  extends Pick<InputDateRebuiltProps, "onFocus" | "onBlur"> {
  onChange: DatePickerActivatorProps["onChange"];
}

/**
 * Combines the actions on the InputDate such as onChange, onFocus, onBlur to forward event handler passed to the InputDate component to the DatePicker component.
 * DO not repeat this pattern. We are doing this as a proof of concept relating to the refactoring of Form inputs to see what can be removed.
 */
export function useInputDateActivatorActions({
  onChange,
  onBlur,
  onFocus,
}: useInputDateActivatorActionsProps) {
  const [isFocused, setIsFocused] = useState(false);

  function handleChange(
    _: unknown,
    event?: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    onChange?.(event);
  }

  function handleFocus(
    event?: FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    if (event) {
      onFocus?.(event as FocusEvent<HTMLInputElement>);
    }
    setIsFocused(true);
  }

  function handleBlur(
    event?: FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    setIsFocused(false);

    if (event) {
      onBlur?.(event as FocusEvent<HTMLInputElement>);
    }
  }

  return {
    handleBlur,
    handleChange,
    handleFocus,
    isFocused,
  };
}
