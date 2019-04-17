import React, { useState, ChangeEvent } from "react";
import styles from "./PlaceholderField.css";

interface PlaceholderFieldProps {
  readonly placeholder?: string;
  readonly disabled?: boolean;
  readonly defaultValue?: string;
}

export default function PlaceholderField({
  placeholder,
  disabled,
  defaultValue
}: PlaceholderFieldProps) {
  const [, setValue] = useState();

  function handleChanged(e: ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
  }

  return (
    <div className={styles.inputWrapper}>
      <label>
        <input
          type="text"
          placeholder={placeholder}
          onChange={handleChanged}
          disabled={disabled}
          defaultValue={defaultValue}
          required
        />
        <span className={styles.labelContent}>{placeholder}</span>
      </label>
    </div>
  );
}
