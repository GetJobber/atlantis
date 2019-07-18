import React from "react";
import { XOR } from "ts-xor";
import { FormField, FormFieldProps } from "../FormField";

interface TextFieldProps extends FormFieldProps {
  readonly type?: "text" | "number" | "time";
}

interface InputProps extends FormFieldProps {
  readonly type?: "text" | "number" | "time";
}

interface TextareaProps extends FormFieldProps {
  readonly type?: "textarea";
  readonly multiline?: boolean;
  readonly rows?: number;
}

type TextFieldPropOptions = XOR<InputProps, TextareaProps>;

export function TextField({
  align,
  disabled = false,
  inline = false,
  invalid = false,
  maxLength,
  multiline = false,
  name,
  onChange,
  placeholder,
  readonly = false,
  rows,
  size,
  type,
  value,
}: TextFieldPropOptions) {
  return (
    <FormField
      align={align}
      disabled={disabled}
      inline={inline}
      invalid={invalid}
      maxLength={maxLength}
      name={name}
      onChange={onChange}
      placeholder={placeholder}
      readonly={readonly}
      rows={rows}
      size={size}
      type={multiline ? "textarea" : type}
      value={value}
    />
  );
}
