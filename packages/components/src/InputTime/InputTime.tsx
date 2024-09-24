import React, { useRef } from "react";
import { useTimePredict } from "./hooks/useTimePredict";
import { InputTimeProps } from "./InputTimeProps";
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
    ...(defaultValue && { defaultValue: dateToTimeString(defaultValue) }),
    ...(!defaultValue && { value: dateToTimeString(value) }),
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
    onChange?.(timeStringToDate(newValue));
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

function dateToTimeString(date?: Date): string {
  if (date == undefined || !(date instanceof Date)) {
    return "";
  }

  // Extract hours and minutes from the Date object
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  // Return the time string in HH:MM format
  return `${hours}:${minutes}`;
}

export function timeStringToDate(timeString: string): Date | undefined {
  try {
    const [hours, minutes] = timeString.split(":").map(Number);

    if (isNaN(hours) || isNaN(minutes)) {
      return undefined;
    }

    const date = new Date();
    date.setHours(hours, minutes, 0, 0);

    return date;
  } catch {
    return undefined;
  }
}
