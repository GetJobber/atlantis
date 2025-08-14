import React, { useRef } from "react";
import omit from "lodash/omit";
import { useTimePredict } from "./hooks/useTimePredict";
import type { InputTimeProps } from "./InputTime.types";
import { dateToTimeString, timeStringToDate } from "./utils/input-time-utils";
import type { FormFieldProps } from "../FormField";
import { FormField } from "../FormField";

export function InputTime({
  defaultValue,
  value,
  onChange,
  ...params
}: InputTimeProps) {
  const ref = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { setTypedTime } = useTimePredict({ value, handleChange });

  const fieldProps: FormFieldProps = omit(
    {
      onChange: handleChange,
      ...(defaultValue && { defaultValue: dateToTimeString(defaultValue) }),
      ...(!defaultValue && { value: dateToTimeString(value) }),
      ...params,
    },
    ["version"],
  );

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
      wrapperRef={wrapperRef}
    />
  );

  function handleChange(newValue: string) {
    onChange?.(timeStringToDate(newValue, value));
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
