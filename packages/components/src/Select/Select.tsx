import React, { ChangeEvent, ReactNode } from "react";
import classnames from "classnames";
import { Icon } from "../Icon";
import styles from "./Select.css";

interface SelectProps {
  /**
   * List of options
   */
  readonly children?: ReactNode | ReactNode[];

  /**
   * Text size.
   */
  readonly size?: "small" | "large";

  /**
   * Input is disabled.
   * @default false
   */
  readonly disabled?: boolean;

  /**
   * Indicates an error. Adds a red border.
   * @default false
   */
  readonly invalid?: boolean;

  /**
   * Set the initialy selected option.
   */
  readonly defaultValue?: string;

  /**
   * Set the component to the given value.
   * Must be used with onChange to create a "controlled component" or
   * set `readOnly` to silence the warning.
   */
  readonly value?: string;

  /**
   * Simplified onChange handler that only provides the new value.
   * @param newValue
   */
  onChange?(newValue: string): void;
}

export function Select({
  children,
  size,
  disabled = false,
  invalid = false,
  defaultValue,
  value,
  onChange,
}: SelectProps) {
  const wrapperClasses = classnames(styles.wrapper, size && styles[size], {
    [styles.disabled]: disabled,
    [styles.invalid]: invalid,
  });

  const onChangeWrapper = (event: ChangeEvent<HTMLSelectElement>) => {
    if (onChange) {
      onChange(event.currentTarget.value);
    }
  };

  return (
    <div className={wrapperClasses}>
      <span className={styles.icon}>
        <Icon name="arrowDown" />
      </span>
      <select
        className={styles.select}
        defaultValue={defaultValue}
        value={value}
        disabled={disabled}
        onChange={onChangeWrapper}
      >
        {children}
      </select>
    </div>
  );
}
