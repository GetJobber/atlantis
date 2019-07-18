import React, { ChangeEvent, ReactNode, useState } from "react";
import classnames from "classnames";
import styles from "./FormField.css";

export interface FormFieldProps {
  readonly type?: "text" | "number" | "time" | "textarea" | "select";
  readonly name?: string;
  readonly placeholder?: string;
  readonly value?: string;
  readonly size?: "small" | "large";
  readonly disabled?: boolean;
  readonly readonly?: boolean;
  readonly invalid?: boolean;
  readonly inline?: boolean;
  readonly children?: ReactNode;
  readonly maxLength?: number;
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
  children,
  maxLength,
  onChange,
}: FormFieldProps) {
  const [hasMiniLabel, setHasMiniLabel] = useState(value ? true : false);

  const handleChange = (
    event:
      | ChangeEvent<HTMLInputElement>
      | ChangeEvent<HTMLTextAreaElement>
      | ChangeEvent<HTMLSelectElement>,
  ) => {
    const newValue = event.currentTarget.value;
    setHasMiniLabel(newValue.length > 0);
    if (onChange) {
      onChange(newValue);
    }
  };

  const fieldProps = {
    id: name,
    className: styles.formField,
    name: name,
    disabled: disabled,
    readOnly: readonly,
    onChange: handleChange,
    defaultValue: value,
  };

  const fieldElement = () => {
    switch (type) {
      case "select":
        return <select {...fieldProps}>{children}</select>;
      case "textarea":
        return <textarea {...fieldProps} />;
      default:
        return <input type={type} maxLength={maxLength} {...fieldProps} />;
    }
  };

  const wrapperClassNames = classnames(
    styles.wrapper,
    inline && styles.inline,
    size && styles[size],
    invalid && styles.invalid,
    disabled && styles.disabled,
    {
      [styles.miniLabel]: hasMiniLabel || type === "time" || type === "select",
    },
  );

  const baseUnit = parseInt(
    getComputedStyle(document.documentElement).getPropertyValue("--base-unit"),
  );

  const wrapperStyle = {
    ...(maxLength && { width: `${maxLength * baseUnit + 16}px` }),
  };

  const Wrapper = inline ? "span" : "div";

  return (
    <Wrapper className={wrapperClassNames} style={wrapperStyle}>
      {placeholder && (
        <label className={styles.label} htmlFor={name}>
          {placeholder}
        </label>
      )}
      {fieldElement()}
    </Wrapper>
  );
}
