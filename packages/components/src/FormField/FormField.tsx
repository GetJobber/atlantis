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
   * Intial value of the input. Only use this when you need to prepopulate the
   * field with a data that is not controlled by the components state. If a
   * state is controlling the value, use the `value` prop instead.
   */
  readonly defaultValue?: string;

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
   * Name of the input.
   */
  readonly name?: string;

  /**
   * Hint text that goes above the value once the form is filled out.
   */
  readonly placeholder?: string;

  /**
   * Prevents users from editing the value.
   */
  readonly readonly?: boolean;

  /**
   * Exclusively for textareas. Specifies the visible height of a textarea.
   */
  readonly rows?: number;

  /**
   * Adjusts the interface to either have small or large spacing.
   */
  readonly size?: "small" | "large";

  /**
   * Determines what kind of form field should the component give you.
   */
  readonly type?: "text" | "number" | "time" | "textarea" | "select";

  /**
   * Set the component to the given value.
   */
  readonly value?: string | number;

  /**
   * Simplified onChange handler that only provides the new value.
   * @param newValue
   */
  onChange?(newValue: string | number): void;
}

export function FormField({
  align,
  children,
  defaultValue,
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
  const [hasMiniLabel, setHasMiniLabel] = useState(
    defaultValue || value ? true : false,
  );

  const handleChange = (
    event:
      | ChangeEvent<HTMLInputElement>
      | ChangeEvent<HTMLTextAreaElement>
      | ChangeEvent<HTMLSelectElement>,
  ) => {
    let newValue: string | number;
    newValue = event.currentTarget.value;
    setHasMiniLabel(newValue.length > 0);

    if (type === "number" && newValue.length > 0) {
      newValue = parseFloat(newValue);
    }
    onChange && onChange(newValue);
  };

  const handleFocus = (
    event:
      | React.FocusEvent<HTMLInputElement>
      | React.FocusEvent<HTMLTextAreaElement>,
  ) => {
    const target = event.currentTarget;
    setTimeout(() => readonly && target.select());
  };

  const fieldProps = {
    id: name,
    className: styles.formField,
    name: name,
    disabled: disabled,
    readOnly: readonly,
    onChange: handleChange,
    value: value,
    ...(defaultValue && { defaultValue: defaultValue }),
  };

  const fieldElement = () => {
    switch (type) {
      case "select":
        return <select {...fieldProps}>{children}</select>;
      case "textarea":
        return <textarea rows={rows} onFocus={handleFocus} {...fieldProps} />;
      default:
        return (
          <input
            type={type}
            maxLength={maxLength}
            onFocus={handleFocus}
            {...fieldProps}
          />
        );
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

  const Wrapper = inline ? "span" : "div";

  return (
    <Wrapper
      className={wrapperClassNames}
      style={{ ["--formField-maxLength" as string]: maxLength }}
    >
      {placeholder && (
        <label className={styles.label} htmlFor={name}>
          {placeholder}
        </label>
      )}
      {fieldElement()}
    </Wrapper>
  );
}
