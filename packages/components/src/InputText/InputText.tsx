import React from "react";
import { FormField, FormFieldProps } from "../FormField";

export function InputText({
  name,
  placeholder,
  value,
  onChange,
  size,
  maxLength,
  align,
  disabled = false,
  readonly = false,
  invalid = false,
  inline = false,
}: FormFieldProps) {
  return (
    <FormField
      type="text"
      name={name}
      placeholder={placeholder}
      disabled={disabled}
      readonly={readonly}
      onChange={onChange}
      value={value}
      invalid={invalid}
      inline={inline}
      size={size}
      maxLength={maxLength}
      align={align}
    />
  );
}
