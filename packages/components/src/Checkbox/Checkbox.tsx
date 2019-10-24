import React, { ChangeEvent } from "react";
import classnames from "classnames";
import styles from "./Checkbox.css";
import { Icon } from "../Icon";
import { Text } from "../Text";

interface CheckboxProps {
  /**
   * Determines if the checkbox is checked or not.
   */
  readonly checked?: boolean;

  /**
   * Initial checked value of the checkbox. Only use this when you need to
   * pre-populate the checked attribute that is not controlled by the components
   * state. If a state is controlling it, use the `checked` prop instead.
   */
  readonly defaultChecked?: boolean;

  /**
   * Disables the checkbox.
   */
  readonly disabled?: boolean;

  /**
   * Changes the icon from checkbox to a dash.
   *
   * @default false
   */
  readonly indeterminate?: boolean;

  /**
   * Label that shows up beside the checkbox.
   */
  readonly label?: string;

  /**
   * Checkbox input name
   */
  readonly name?: string;

  /**
   * Value of the checkbox.
   */
  readonly value?: string;

  onClick?(newChecked: boolean): void;
}

export function Checkbox({
  checked,
  defaultChecked,
  disabled,
  label,
  name,
  value,
  indeterminate = false,
  onClick,
}: CheckboxProps) {
  const wrapperClassName = classnames(
    styles.wrapper,
    disabled && styles.disabled,
  );
  const iconName = indeterminate ? "minus2" : "checkmark";

  return (
    <label className={wrapperClassName}>
      <span className={styles.checkHolder}>
        <input
          type="checkbox"
          checked={checked}
          defaultChecked={defaultChecked}
          className={styles.input}
          aria-label={label}
          onChange={handleChange}
          value={value}
          name={name}
        />
        <span className={styles.checkBox}>
          <Icon name={iconName} size="small" color="white" />
        </span>
      </span>

      {label && (
        <span className={styles.label}>
          <Text variation={disabled ? "subdued" : undefined}>{label}</Text>
        </span>
      )}
    </label>
  );

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const newChecked = event.currentTarget.checked;
    onClick && onClick(newChecked);
  }
}
