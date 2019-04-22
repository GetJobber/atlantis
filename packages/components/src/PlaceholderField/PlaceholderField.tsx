import React, { useState, ChangeEvent } from "react";
import classnames from "classnames";
import styles from "./PlaceholderField.css";

interface PlaceholderFieldProps {
  readonly size: "small" | "normal" | "large";
  readonly multiline: boolean;
  readonly name?: string;
  readonly placeholder?: string;
  readonly disabled?: boolean;
  readonly defaultValue?: string;
}

export default function PlaceholderField({
  size = "normal",
  multiline = false,
  name,
  placeholder,
  disabled,
  defaultValue,
}: PlaceholderFieldProps) {
  const [, setValue] = useState();

  function handleChanged({
    target,
  }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setValue(target.value);
  }

  const wrapperClass = classnames(
    styles.inputWrapper,
    multiline && styles.multiline,
    styles[size],
  );
  const InputElement = multiline ? "textarea" : "input";

  return (
    <div className={wrapperClass}>
      <label className={styles.label} htmlFor={name}>
        <InputElement
          className={styles.input}
          type="text"
          name={name}
          placeholder={placeholder}
          onChange={handleChanged}
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
