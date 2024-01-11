import React, { useRef } from "react";
import supportsTime from "time-input-polyfill/supportsTime";
import { InputTimeSafari } from "./InputTimeSafari";
import {
  civilTimeToHTMLTime,
  htmlTimeToCivilTime,
} from "./civilTimeConversions";
import { InputTimeProps } from "./InputTimeProps";
import { useTimePredict } from "./hooks/useTimePredict";
import { FormField, FormFieldProps } from "../FormField";

export function InputTime({
  defaultValue,
  value,
  onChange,
  ...params
}: InputTimeProps) {
  const ref = useRef<HTMLInputElement>(null);
  const { setTypedTime } = useTimePredict({ value, handleChange });

  if (supportsTime) {
    const fieldProps: FormFieldProps = {
      onChange: handleChange,
      ...(defaultValue && { defaultValue: civilTimeToHTMLTime(defaultValue) }),
      ...(!defaultValue && { value: civilTimeToHTMLTime(value) }),
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
  } else {
    return (
      <InputTimeSafari
        defaultValue={defaultValue}
        value={value}
        onChange={onChange}
        {...params}
      />
    );
  }

  function handleChange(newValue: string) {
    onChange?.(htmlTimeToCivilTime(newValue));
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
