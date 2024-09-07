import React, { useRef } from "react";
import { useTimePredict } from "./hooks/useTimePredict";
import { InputTimeProps } from "./InputTimeProps";
import {
  civilTimeToTimeString,
  timeStringToCivilTime,
} from "../utils/civilTimeConversions";
import { FormField, FormFieldProps } from "../FormField";

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
