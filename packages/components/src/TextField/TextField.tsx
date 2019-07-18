import React from "react";
import { FormField, FormFieldProps } from "../FormField";

interface TextFieldProps extends FormFieldProps {
  multiline?: boolean;
}

export function TextField({
  type,
  name,
  placeholder,
  value,
  size,
  align,
  maxLength,
  onChange,
  multiline = false,
  disabled = false,
  readonly = false,
  invalid = false,
  inline = false,
}: TextFieldProps) {
  return (
    <FormField
      type={multiline ? "textarea" : type}
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
