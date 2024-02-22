import React from "react";
// eslint-disable-next-line import/no-internal-modules
import {
  civilTimeToHTMLTime,
  htmlTimeToCivilTime,
} from "./civilTimeConversions";
import { InputTimeProps } from "./InputTimeProps";
import { FormField, FormFieldProps } from "../FormField";

export function InternalInputTime({
  defaultValue,
  value,
  onChange,
  ...params
}: InputTimeProps) {
  const handleChange = (newValue: string) => {
    onChange && onChange(htmlTimeToCivilTime(newValue));
  };

  const fieldProps: FormFieldProps = {
    onChange: onChange && handleChange,
    ...(defaultValue && { defaultValue: civilTimeToHTMLTime(defaultValue) }),
    ...(!defaultValue && onChange && { value: civilTimeToHTMLTime(value) }),
    ...params,
  };

  return <FormField type="time" {...fieldProps} />;
}
