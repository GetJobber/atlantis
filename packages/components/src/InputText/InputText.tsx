import React, { ChangeEventHandler } from "react";
import classnames from "classnames";
import styles from "./InputText.css";

interface InputTextProps {
  /** The input name  */
  readonly name?: string;

  /** The text that appears when no value is set and displayed as a hover label when a value is present. */
  readonly placeholder?: string;

  /** The initial input value. */
  readonly defaultValue?: string;

  /** Callback fired when the value is changed. */
  readonly onChange?: ChangeEventHandler<HTMLInputElement>;

  /**
   * The size of the input
   * @default normal
   */
  readonly size?: "small" | "normal";

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
   * If true, the input is in an error state.
   * @default false
   */
  readonly error?: boolean;
}

export function InputText({
  name,
  placeholder,
  defaultValue,
  onChange,
  size = "normal",
  disabled = false,
  readonly = false,
  error = false,
}: InputTextProps) {
  const wrapperClass = classnames(
    styles.inputWrapper,
    styles[size],
    error && styles.error,
  );

  return (
    <div className={wrapperClass}>
      <label className={styles.label} htmlFor={name}>
        <input
          type="text"
          className={styles.input}
          name={name}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readonly}
          onChange={onChange}
          defaultValue={defaultValue}
        />
        {size !== "small" && placeholder && (
          <span className={styles.labelContent}>{placeholder}</span>
        )}
      </label>
    </div>
  );
}
