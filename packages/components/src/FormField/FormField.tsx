import React, { ChangeEvent, ReactNode, useState } from "react";
import classnames from "classnames";
import styles from "./FormField.css";

export interface FormFieldProps {
  /**
   * Determines the alignment of the text inside the input.
   */
  readonly align?: "center" | "right";

  /**
   * If you need to pass in a children. For example, `<options>` inside
   * `<select>`.
   */
  readonly children?: ReactNode;

  /**
   * Disable the input
   */
  readonly disabled?: boolean;

  /**
   * Adjusts the form field to go inline with a content.
   */
  readonly inline?: boolean;

  /**
   * Highlights the field red to indicate an error.
   */
  readonly invalid?: boolean;

  /**
   * Maximum character length for an input. This also changes the width to
   * roughly the same size as the max length. This is to communicate that the
   * user that on certain cases, they can only type a limited amount of
   * characters.
   */
  readonly maxLength?: number;

  /**
   * Name of the input
   */
  readonly name?: string;

  /**
   * Hint text that goes above the value once the form is filled out
   */
  readonly placeholder?: string;

  /**
   * Prevents users from editing the value
   */
  readonly readonly?: boolean;

  /**
   * Exclusively for textareas. Specifies the cisible height of a textarea.
   */
  readonly rows?: number;

  /**
   * Adjusts the interface to either have small or large spacing
   */
  readonly size?: "small" | "large";

  /**
   * Determines what kind of form field should the component give you
   */
  readonly type?: "text" | "number" | "time" | "textarea" | "select";

  /**
   * Initial value for the input
   */
  readonly value?: string;

  /**
   * Simplified onChange handler that only provides the new value.
   * @param newValue
   */
  onChange?(newValue: string): void;
}

export function FormField({
  align,
  children,
  disabled,
  inline,
  invalid,
  maxLength,
  name,
  onChange,
  placeholder,
  readonly,
  rows,
  size,
  type = "text",
  value,
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
        return <textarea rows={rows} {...fieldProps} />;
      default:
        return <input type={type} maxLength={maxLength} {...fieldProps} />;
    }
  };

  const wrapperClassNames = classnames(
    styles.wrapper,
    inline && styles.inline,
    size && styles[size],
    align && styles[align],
    invalid && styles.invalid,
    disabled && styles.disabled,
    maxLength && styles.maxLength,
    {
      [styles.miniLabel]:
        (hasMiniLabel || type === "time" || type === "select") && placeholder,
    },
  );

  if (maxLength) {
    document.documentElement.style.setProperty(
      "--formField-maxLength",
      `${maxLength}`,
    );
  }

  const Wrapper = inline ? "span" : "div";

  return (
    <Wrapper className={wrapperClassNames}>
      {placeholder && (
        <label className={styles.label} htmlFor={name}>
          {placeholder}
        </label>
      )}
      {fieldElement()}
    </Wrapper>
  );
}
