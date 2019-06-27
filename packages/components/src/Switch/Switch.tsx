import React, { useState } from "react";
import classnames from "classnames";
import styles from "./Switch.css";

interface SwitchProps {
  readonly value?: boolean;
  onChange?(newValue: boolean): void;
}

export function Switch({ value: providedValue, onChange }: SwitchProps) {
  const [statefulValue, setValue] = useState(false);
  const value = providedValue != undefined ? providedValue : statefulValue;

  const className = classnames(styles.track, { [styles.isChecked]: value });

  const toggle = () => {
    onChange && onChange(!value);

    if (providedValue == undefined) {
      setValue(!statefulValue);
    }
  };

  return (
    <div className={className} onClick={toggle}>
      <input type="checkbox" className={styles.checkbox} checked={value} />
      <span className={styles.pip} />
    </div>
  );
}
