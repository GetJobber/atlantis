import React, { useRef } from "react";
import { CivilTime } from "@std-proposal/temporal";
import { useTimePredict } from "./hooks/useTimePredict";
import {
  civilTimeToTimeString,
  timeStringToCivilTime,
} from "../utils/civilTimeConversions";
import { CommonFormFieldProps, FormField, FormFieldProps } from "../FormField";

export interface InputTimeProps
  extends Pick<
      CommonFormFieldProps,
      | "align"
      | "description"
      | "disabled"
      | "invalid"
      | "inline"
      | "loading"
      | "name"
      | "onValidation"
      | "placeholder"
      | "size"
      | "clearable"
    >,
    Pick<
      FormFieldProps,
      | "maxLength"
      | "readonly"
      | "autocomplete"
      | "max"
      | "min"
      | "onEnter"
      | "onFocus"
      | "onBlur"
      | "inputRef"
      | "validations"
    > {
  /**
   * Intial value of the input. Only use this when you need to prepopulate the
   * field with a data that is not controlled by the components state. If a
   * state is controlling the value, use the `value` prop instead.
   */
  readonly defaultValue?: CivilTime;
  /**
   * Set the component to the given value.
   */
  readonly value?: CivilTime;
  /**
   * Function called when user changes input value.
   */
  onChange?(newValue?: CivilTime): void;
}

export function InputTime({
  defaultValue,
  value,
  onChange,
  ...params
}: InputTimeProps) {
  const ref = useRef<HTMLInputElement>(null);
  const { setTypedTime } = useTimePredict({ value, handleChange });

  const fieldProps: FormFieldProps = {
    onChange: handleChange,
    ...(defaultValue && { defaultValue: civilTimeToTimeString(defaultValue) }),
    ...(!defaultValue && { value: civilTimeToTimeString(value) }),
    ...params,
  };

  return (
    <FormField
      inputRef={ref}
      type="time"
      {...fieldProps}
      onBlur={handleBlur}
      onKeyUp={e => {
        fieldProps.onKeyUp?.(e);
        !isNaN(parseInt(e.key, 10)) && setTypedTime(prev => prev + e.key);
      }}
    />
  );

  function handleChange(newValue: string) {
    onChange?.(timeStringToCivilTime(newValue));
  }

  function handleBlur() {
    params.onBlur?.();

    // Time inputs doesn't clear the typed value when it's invalid. This should
    // force it to reset the input value when the typed value is invalid.
    if (ref.current) {
      if (!ref.current.checkValidity()) {
        ref.current.value = "";
      }
    }
  }
}
