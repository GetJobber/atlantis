import React, { ChangeEvent, useState } from "react";
import classnames from "classnames";
import styles from "./FormField.css";

interface FormFieldProps {
  readonly type?: string;
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
  type = "text",
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
  const [hasVal, setHasVal] = useState(value ? true : false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.currentTarget.value;
    setHasVal(newValue.length > 0);
    if (onChange) {
      onChange(newValue);
    }
  };

  const Wrapper = inline ? "span" : "div";
  const wrapperClassNames = classnames(
    styles.wrapper,
    hasVal && styles.hasValue,
    inline && styles.inline,
    size && styles[size],
    invalid && styles.invalid,
    disabled && styles.disabled,
  );

  return (
    <Wrapper className={wrapperClassNames}>
      {placeholder && (
        <label className={styles.label} htmlFor={name}>
          {placeholder}
        </label>
      )}
      <input
        type={type}
        id={name}
        className={styles.formField}
        name={name}
        disabled={disabled}
        readOnly={readonly}
        onChange={handleChange}
        defaultValue={value}
      />
    </Wrapper>
  );
}
