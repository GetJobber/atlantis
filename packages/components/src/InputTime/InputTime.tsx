import React, { useRef } from "react";
import { useTimePredict } from "./hooks/useTimePredict";
import { InputTimeLegacyProps } from "./InputTime.types";
import { dateToTimeString, timeStringToDate } from "./timeUtils";
import { FormField, FormFieldProps } from "../FormField";

export function InputTimeLegacy({
  defaultValue,
  value,
  onChange,
  onBlur,
  onKeyUp,
  ...params
}: InputTimeLegacyProps) {
  const ref = useRef<HTMLInputElement>(null);
  const { setTypedTime } = useTimePredict({ value, handleChange });

  const fieldProps: FormFieldProps = {
    onChange: handleChange,
    ...(defaultValue && { defaultValue: dateToTimeString(defaultValue) }),
    ...(!defaultValue &&
      value !== undefined && { value: dateToTimeString(value) }),
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
        onKeyUp?.(e);
        !isNaN(parseInt(e.key, 10)) && setTypedTime(prev => prev + e.key);
      }}
    />
  );

  function handleChange(newValue: string) {
    onChange?.(timeStringToDate(newValue));
  }

  function handleBlur(event: React.FocusEvent<HTMLInputElement>) {
    onBlur?.(event);

    if (ref.current) {
      const inputElement = ref.current;

      if (!inputElement.checkValidity()) {
        inputElement.value = value !== undefined ? dateToTimeString(value) : "";

        if (value === undefined && defaultValue === undefined) {
          inputElement.value = "";
        }
      } else if (inputElement.value) {
        const formattedDate = timeStringToDate(inputElement.value);

        if (formattedDate) {
          const formattedString = dateToTimeString(formattedDate);

          if (inputElement.value !== formattedString) {
            inputElement.value = formattedString;
          }
        }
      }
    }
  }
}
