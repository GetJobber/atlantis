import React, { useState, ChangeEvent } from "react";
import classnames from "classnames";
import styles from "./PlaceholderField.css";

interface PlaceholderFieldProps {
  readonly placeholder?: string;
  readonly disabled?: boolean;
  readonly defaultValue?: string;
  readonly size: "small" | "normal" | "large";
}

export default function PlaceholderField({
  placeholder,
  disabled,
  defaultValue,
  size = "normal",
}: PlaceholderFieldProps) {
  const [, setValue] = useState();

  function handleChanged(e: ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
  }

  const wrapperClass = classnames(styles.inputWrapper, styles[size]);

  return (
    <div className={wrapperClass}>
        <input
          type="text"
          placeholder={placeholder}
          onChange={handleChanged}
          disabled={disabled}
          defaultValue={defaultValue}
          required
        />
        {size !== "small" && (
        <span className={styles.labelContent}>{placeholder}</span>
        )}
      </label>
    </div>
  );
}
