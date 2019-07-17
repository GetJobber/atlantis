import React from "react";
import { FormField } from "../FormField";

interface InputTextProps {
  /** The input name  */
  readonly name: string;

  /** The text that appears when no value is set and displayed as a hover label when a value is present. */
  readonly placeholder?: string;

  readonly value?: string;

  /** Callback fired when the value is changed. */
  onChange?(newValue: string): void;

  /**
   * The size of the input
   * @default normal
   */
  readonly size?: "small" | "large";

  /**
   * If true, the input is disabled.
   * @default false
   */
  readonly disabled?: boolean;

  /**
   * If true, the input cannot be edited.
   * @default false
   */
  readonly readonly?: boolean;

  /**
   * If true, the input is in an invalid state.
   * @default false
   */
  readonly invalid?: boolean;
}

export function InputText({
  name,
  placeholder,
  value,
  onChange,
  size,
  disabled = false,
  readonly = false,
  invalid = false,
}: InputTextProps) {
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
      size={size}
    />
  );
}
