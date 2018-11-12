import classNames from "classnames";
import React, { InputHTMLAttributes, useState } from "react";
import FieldAffix from "./FieldAffix/FieldAffix";
import Input from "./Input/Input";
import Label from "./Label/Label";
import styles from "./TextField.css";

type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;

type Size = "normal" | "small" | "large";

interface TextFieldProps
  extends Omit<
      InputHTMLAttributes<HTMLInputElement>,
      "size" | "defaultValue" | "prefix"
    > {
  /**
   * The text field label
   */
  label?: React.ReactNode | string;
  error?: boolean;
  disabled?: boolean;
  defaultValue?: string | number;
  size?: Size;

  multiline?: boolean;
  /**
   * Number of rows for a multiline text field
   */
  rows?: number;

  prefix?: React.ReactNode | string;
  suffix?: React.ReactNode | string;
}

export default function TextField(props: TextFieldProps) {
  const {
    children,
    className,
    name,
    label,
    required,
    defaultValue,
    multiline,
    size,
    error,
    prefix,
    suffix,
    ...other
  } = props;

  const { filled, ...handleInput } = useInputValue(defaultValue);
  const { focused, ...handleFocus } = useFocusState();

  const classes = classNames([
    styles[size],
    error && styles.error,
    focused && styles.focused,
    multiline && styles.multiline,
    styles.wrapper,
  ]);

  const showLabel: boolean = size !== "small" && label !== undefined;
  let labelElement;
  if (showLabel) {
    labelElement = (
      <Label htmlFor={name} error={error} shrink={filled}>
        {label}
      </Label>
    );
  }

  if (!filled) {
    other.placeholder = `${label}`;
  }

  return (
    <div className={classes}>
      <FieldAffix position="start">{prefix}</FieldAffix>
      <div className={styles.field}>
        {labelElement}
        <Input
          id={name}
          name={name}
          multiline={multiline}
          {...handleFocus}
          {...handleInput}
          {...other}
        />
      </div>
      <FieldAffix position="end">{suffix}</FieldAffix>
    </div>
  );
}

function useFocusState() {
  const [focused, setFocused] = useState(false);

  return {
    focused,
    onBlur: (): void => setFocused(false),
    onFocus: (): void => setFocused(true),
  };
}

function useInputValue(initialValue: string | number) {
  const [value, setValue] = useState(initialValue);
  const [filled, setFilled] = useState(initialValue && initialValue !== "");

  return {
    value,
    filled,
    onChange(e: React.ChangeEvent<HTMLInputElement>): void {
      setValue(e.target.value);
      setFilled(/\S/.test(e.target.value));
    },
  };
}

const defaultProps: TextFieldProps = {
  size: "normal",
  defaultValue: "",
  rows: 3,
};

TextField.defaultProps = defaultProps;
