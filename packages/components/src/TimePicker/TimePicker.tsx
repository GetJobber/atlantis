import React, { ChangeEvent } from "react";
import classnames from "classnames";
import { CivilTime } from "@std-proposal/temporal";
import { TextField } from "../TextField";
import styles from "./TimePicker.css";

interface TimePickerProps {
  /**
   * Intial value.
   *
   * defaultValue is for when you want to set an initial value of
   * an uncontrolled component, i.e a component that you won't be monitoring
   * through a value/onChange loop. The value/onChange pair is for controlled
   * components. If you try to set value without setting onChange you end up
   * with a readOnly component and have to set that flag to get rid of the React
   * warning.
   */
  readonly defaultValue?: CivilTime;

  /**
   * Prevent the input from being changed.
   */
  readonly readOnly?: boolean;

  /**
   * Set the component to the given value.
   * Must be used with onChange to create a "controlled component" or
   * set `readOnly` to silence the warning.
   */
  readonly value?: CivilTime;

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
  onChange?(newValue: CivilTime): void;
}

function civilTimeToHTMLTime(ct: CivilTime) {
  const s = ct.toString();
  return s.substring(0, s.indexOf("."));
}

function htmlTimeToCivilTime(s: string) {
  return CivilTime.fromString(s + ":00.000000000");
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
    disabled,
    readOnly,
  };

  if (onChange) {
    timeProps.onChange = (event: ChangeEvent<HTMLInputElement>) => {
      onChange(htmlTimeToCivilTime(event.currentTarget.value));
    };
  }

  if (defaultValue) {
    timeProps.defaultValue = civilTimeToHTMLTime(defaultValue);
  }

  if (value) {
    timeProps.value = civilTimeToHTMLTime(value);
  }

  return (
    <div className={wrapperClasses}>
      <input className={styles.input} type="time" {...timeProps} />
    </div>
  );
}
