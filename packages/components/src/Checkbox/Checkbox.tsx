import React from "react";
import uuid from "uuid";
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
  const checkboxID = uuid.v1();
  return (
    <div className={styles.wrapper}>
      <span className={styles.checkHolder}>
        <input
          type="checkbox"
          name="foo"
          id={checkboxID}
          className={styles.input}
        />
        <label htmlFor={checkboxID} className={styles.checkBox}>
          <Icon name="checkmark" size="small" color="white" />
        </label>
      </span>
      <label htmlFor={checkboxID} className={styles.label}>
        <Text>{label}</Text>
      </label>
    </div>
  );
}
