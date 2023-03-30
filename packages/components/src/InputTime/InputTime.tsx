import React from "react";
// eslint-disable-next-line import/no-internal-modules
import supportsTime from "time-input-polyfill/supportsTime";
import { InputTimeSafari } from "./InputTimeSafari";
import {
  atlantisTimeToHTMLTime,
  htmlTimeToAtlantisTime,
} from "./civilTimeConversions";
import { InputTimeProps } from "./InputTimeProps";
import { FormField, FormFieldProps } from "../FormField";

export function InputTime({
  defaultValue,
  value,
  onChange,
  ...params
}: InputTimeProps) {
  const handleChange = (newValue: string) => {
    onChange && onChange(htmlTimeToAtlantisTime(newValue));
  };

  if (supportsTime) {
    const fieldProps: FormFieldProps = {
      onChange: handleChange,
      ...(defaultValue && {
        defaultValue: atlantisTimeToHTMLTime(defaultValue),
      }),
      ...(!defaultValue && { value: atlantisTimeToHTMLTime(value) }),
      ...params,
    };

    return <FormField type="time" {...fieldProps} />;
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
}
