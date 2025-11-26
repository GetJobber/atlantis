import type { ChangeEvent } from "react";
import { useState } from "react";
import type { InputDateRebuiltProps } from "./InputDate.types";
import type { DatePickerActivatorProps } from "../DatePicker/DatePickerActivator";

export interface useInputDateActivatorActionsProps
  extends Pick<InputDateRebuiltProps, "onFocus" | "onBlur"> {
  onChange: DatePickerActivatorProps["onChange"];
}

export function useInputDateActivatorActions({
  onChange,
  onBlur,
  onFocus,
}: useInputDateActivatorActionsProps) {
  const [isFocused, setIsFocused] = useState(false);

  function handleChange(
    _newValue: string,
    event?: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    onChange?.(event as ChangeEvent<HTMLInputElement>);
  }

  function handleFocus(
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    onFocus?.(event as React.FocusEvent<HTMLInputElement>);
    setIsFocused(true);
  }

  function handleBlur(
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    onBlur?.(event as React.FocusEvent<HTMLInputElement>);
    setIsFocused(false);
  }

  return {
    handleBlur,
    handleChange,
    handleFocus,
    isFocused,
  };
}
