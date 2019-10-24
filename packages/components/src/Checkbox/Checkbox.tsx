import React from "react";
import styles from "./Checkbox.css";
import { Icon } from "../Icon";
import { Text } from "../Text";

interface CheckboxProps {
  /**
   * Text to display.
   */
  readonly label: string;
}

export function Checkbox({ label }: CheckboxProps) {
  return (
    <label className={styles.wrapper}>
      <span className={styles.checkHolder}>
        <input
          type="checkbox"
          name="foo"
          className={styles.input}
          aria-label={label}
        />
        <span className={styles.checkBox}>
          <Icon name="checkmark" size="small" color="white" />
        </span>
      </span>
      <span className={styles.label}>
        <Text>{label}</Text>
      </span>
    </label>
  );
}
