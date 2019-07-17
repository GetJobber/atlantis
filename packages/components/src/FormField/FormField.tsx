import React, { ChangeEvent } from "react";
import classnames from "classnames";
import styles from "./FormField.css";

interface FormFieldProps {
  readonly name?: string;
  readonly placeholder?: string;
  readonly value?: string;
  readonly size?: "small" | "large";
  readonly disabled?: boolean;
  readonly readonly?: boolean;
  readonly invalid?: boolean;
  readonly inline?: boolean;
  onChange?(newValue: string): void;
}

export function FormField({
  name,
  placeholder,
  value,
  size,
  disabled,
  readonly,
  invalid,
  inline,
  onChange,
}: FormFieldProps) {
  const className = classnames(
    styles.formField,
    size && styles[size],
    invalid && styles.invalid,
    inline && styles.inline,
    disabled && styles.disabled,
  );

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.currentTarget.value;
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <input
      type="text"
      className={className}
      name={name}
      placeholder={placeholder}
      disabled={disabled}
      readOnly={readonly}
      onChange={handleChange}
      defaultValue={value}
    />
  );
}
