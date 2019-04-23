import React, { useState, ChangeEvent, useRef, useLayoutEffect } from "react";
import classnames from "classnames";
import styles from "./TextField.css";

interface PlaceholderFieldProps {
  readonly size: "small" | "normal" | "large";
  readonly name?: string;
  readonly placeholder?: string;
  readonly disabled?: boolean;
  readonly defaultValue?: string;
  readonly multiline?: boolean;
  readonly autoexpand?: boolean;
  readonly rows?: number;
}

type InputFieldProps = PlaceholderFieldProps & {
  readonly multiline: false;
  readonly autoexpand: false;
};

type MultilinePlaceholderFieldProps = PlaceholderFieldProps & {
  readonly multiline: true;
  readonly rows: number;
  readonly autoexpand: boolean;
};

const getHeight = (textAreaElement: HTMLTextAreaElement) => {
  const {
    borderBottomWidth,
    borderTopWidth,
    lineHeight,
    paddingBottom,
    paddingTop,
  } = window.getComputedStyle(textAreaElement);

  const rowHeight =
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    parseFloat(lineHeight!) * textAreaElement.rows +
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    parseFloat(borderBottomWidth!) +
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    parseFloat(borderTopWidth!) +
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    parseFloat(paddingBottom!) +
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    parseFloat(paddingTop!);

  const scrollHeight =
    textAreaElement.scrollHeight +
    parseFloat(borderBottomWidth || "2") +
    parseFloat(borderTopWidth || "2");

  return Math.max(rowHeight, scrollHeight);
};

export default function PlaceholderField({
  size = "normal",
  multiline = false,
  autoexpand = false,
  name,
  placeholder,
  disabled,
  defaultValue,
  ...props
}: InputFieldProps | MultilinePlaceholderFieldProps) {
  const inputRef = useRef(null);
  const [value, setValue] = useState();

  function handleChanged({
    target,
  }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setValue(target.value);
  }

  useLayoutEffect(() => {
    const element = (inputRef.current as unknown) as HTMLTextAreaElement;

    if (!multiline || !autoexpand || !element || !element.rows) {
      return;
    }

    element.style.height = "0";
    element.style.height = `${getHeight(element)}px`;
  }, [value]);

  const wrapperClass = classnames(
    styles.inputWrapper,
    multiline && styles.multiline,
    autoexpand && styles.autoexpand,
    styles[size],
  );
  const InputElement = multiline ? "textarea" : "input";

  return (
    <div className={wrapperClass}>
      <label className={styles.label} htmlFor={name}>
        <InputElement
          className={styles.input}
          type="text"
          ref={inputRef}
          name={name}
          placeholder={placeholder}
          onChange={handleChanged}
          disabled={disabled}
          defaultValue={defaultValue}
          {...props}
        />
        {size !== "small" && (
          <span className={styles.labelContent}>{placeholder}</span>
        )}
      </label>
    </div>
  );
}
