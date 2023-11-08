import React from "react";
import {
  civilTimeToHTMLTime,
  htmlTimeToCivilTime,
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
    onChange && onChange(htmlTimeToCivilTime(newValue));
  };

  const fieldProps: FormFieldProps = {
    onChange: handleChange,
    ...(defaultValue && { defaultValue: civilTimeToHTMLTime(defaultValue) }),
    ...(!defaultValue && { value: civilTimeToHTMLTime(value) }),
    ...params,
  };

  return <FormField type="time" {...fieldProps} />;
}
