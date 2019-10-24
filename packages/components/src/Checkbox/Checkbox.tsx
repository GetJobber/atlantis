import React, { ChangeEvent } from "react";
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
   * The label that shows up beside the checkbox.
   */
  readonly label?: string;

  onChange?(newChecked: boolean): void;
}

export function Checkbox({
  checked,
  defaultChecked,
  label,
  onChange,
}: CheckboxProps) {
  return (
    <label className={styles.wrapper}>
      <span className={styles.checkHolder}>
        <input
          type="checkbox"
          name="foo"
          checked={checked}
          defaultChecked={defaultChecked}
          className={styles.input}
          aria-label={label}
          onChange={handleChange}
        />
        <span className={styles.checkBox}>
          <Icon name="checkmark" size="small" color="white" />
        </span>
      </span>

      {label && (
        <span className={styles.label}>
          <Text>{label}</Text>
        </span>
      )}
    </label>
  );

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const newChecked = event.currentTarget.checked;
    onChange && onChange(newChecked);
  }
}
