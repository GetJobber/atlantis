import React, { ChangeEvent } from "react";
import classnames from "classnames";
import styles from "./TimePicker.css";

interface TimePickerProps {
  /**
   * Intial value.
   */
  readonly defaultValue?: string;

  /**
   * Prevent the input from being changed.
   */
  readonly readOnly?: boolean;

  /**
   * Set the component to the given value.
   * Must be used with onChange to create a "controlled component" or
   * set `readOnly` to silence the warning.
   */
  readonly value?: string;

  /**
   * Indicates an error. Adds a red border.
   * @default false
   */
  readonly invalid?: boolean;

  /**
   * Indicates the input is not changeable. Greys out the input.
   * @default false
   */
  readonly disabled?: boolean;

  /**
   * Indicates the input is not changeable. Greys out the input.
   */
  readonly size?: "small" | "large";

  /**
   * Function called when user changes input value.
   */
  onChange?(newValue: string): void;
}

export function TimePicker({
  defaultValue,
  readOnly,
  value,
  disabled = false,
  invalid = false,
  size,
  onChange,
}: TimePickerProps) {
  const wrapperClasses = classnames(styles.wrapper, size && styles[size], {
    [styles.disabled]: disabled,
    [styles.invalid]: invalid,
  });

  interface InternalProps {
    defaultValue?: string;
    disabled?: boolean;
    value?: string;
    readOnly?: boolean;
    onChange?(event: ChangeEvent<HTMLInputElement>): void;
  }

  let timeProps: InternalProps = {
    defaultValue,
    disabled,
    readOnly,
  };

  if (onChange) {
    timeProps.onChange = (event: ChangeEvent<HTMLInputElement>) => {
      onChange(event.currentTarget.value);
    };
  }

  if (value) {
    timeProps.value = value;
  }

  return (
    <div className={wrapperClasses}>
      <input className={styles.input} type="time" {...timeProps} />
    </div>
  );
}
