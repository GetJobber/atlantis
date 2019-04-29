import React from "react";
import classnames from "classnames";
import styles from "./TextField.css";

interface TextFieldProps {
  /** The input name  */
  readonly name?: string;
  /** The text that appears when no value is set and displayed as a hover label when a value is present. */
  readonly placeholder?: string;
  /** The initial input value */
  readonly defaultValue?: string;

  /**
   * The size of the input
   * @default normal
   */
  readonly size?: "small" | "normal" | "large";
  /**
   * Indicates whether the input is disabled or not.
   * @default false
   */
  readonly disabled?: boolean;
  /**
   * Indicates whether the input is in an error state or not.
   * @default false
   */
  readonly error?: boolean;
}

export default function TextField({
  name,
  placeholder,
  defaultValue,
  size = "normal",
  disabled = false,
  error = false,
}: TextFieldProps) {
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
          defaultValue={defaultValue}
        />
        {size !== "small" && (
          <span className={styles.labelContent}>{placeholder}</span>
        )}
      </label>
    </div>
  );
}
