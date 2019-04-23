import React from "react";
import classnames from "classnames";
import styles from "./TextField.css";

interface TextFieldProps {
  readonly size: "small" | "normal" | "large";
  readonly name?: string;
  readonly placeholder?: string;
  readonly disabled?: boolean;
  readonly defaultValue?: string;
}

export default function TextField({
  size = "normal",
  name,
  placeholder,
  disabled,
  defaultValue,
}: TextFieldProps) {
  const wrapperClass = classnames(styles.inputWrapper, styles[size]);

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
