import React from "react";
// eslint-disable-next-line import/no-internal-modules
import supportsTime from "time-input-polyfill/supportsTime";
import { FormField, FormFieldProps } from "../FormField";
import { InputTimeSafari } from "./InputTimeSafari";
import {
  civilTimeToHTMLTime,
  htmlTimeToCivilTime,
} from "./civilTimeConversions";
import { InputTimeProps } from "./InputTimeProps";

export function InputTime({
  defaultValue,
  value,
  onChange,
  ...params
}: InputTimeProps) {
  const handleChange = (newValue: string) => {
    onChange && onChange(htmlTimeToCivilTime(newValue) || value);
  };

  if (supportsTime) {
    const fieldProps: FormFieldProps = {
      onChange: handleChange,
      ...(defaultValue && { defaultValue: civilTimeToHTMLTime(defaultValue) }),
      ...(value && { value: civilTimeToHTMLTime(value) }),
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
