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
   * pre-populate the checked attribute that is not controlled by the component's
   * state. If a state is controlling it, use the `checked` prop instead.
   */
  readonly defaultChecked?: boolean;

  /**
   * Disables the checkbox.
   */
  readonly disabled?: boolean;

  /**
   * When `true` the checkbox to appears in indeterminate.
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

  /**
   * Further description of the label
   */
  readonly description?: string;

  onChange?(newValue: boolean): void;
}

export function Checkbox({
  checked,
  defaultChecked,
  disabled,
  label,
  name,
  value,
  indeterminate = false,
  description,
  onChange,
}: CheckboxProps) {
  const wrapperClassName = classnames(
    styles.wrapper,
    disabled && styles.disabled,
  );
  const inputClassName = classnames(styles.input, {
    [styles.indeterminate]: indeterminate,
  });
  const iconName = indeterminate ? "minus2" : "checkmark";

  return (
    <div className={styles.checkbox}>
      <label className={wrapperClassName}>
        <span className={styles.checkHolder}>
          <input
            type="checkbox"
            checked={checked}
            defaultChecked={defaultChecked}
            className={inputClassName}
            aria-label={label}
            onChange={handleChange}
            value={value}
            name={name}
            disabled={disabled}
          />
          <span className={styles.checkBox}>
            <Icon name={iconName} size="small" color="white" />
          </span>
        </span>

        {label != undefined && (
          <span className={styles.label}>
            <Text variation={disabled ? "subdued" : undefined}>{label}</Text>
          </span>
        )}
      </label>
      {description && (
        <div className={styles.description}>
          <Text variation="subdued" size="small">
            {description}
          </Text>
        </div>
      )}
    </div>
  );

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const newChecked = event.currentTarget.checked;
    onChange && onChange(newChecked);
  }
}
