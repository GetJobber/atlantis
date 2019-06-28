import React, { useState } from "react";
import classnames from "classnames";
import { Typography } from "../Typography";
import styles from "./Switch.css";

interface SwitchProps {
  readonly value?: boolean;
  onChange?(newValue: boolean): void;
}

export function Switch({ value: providedValue, onChange }: SwitchProps) {
  const [statefulValue, setValue] = useState(false);
  const value = providedValue != undefined ? providedValue : statefulValue;

  const toggle = () => {
    onChange && onChange(!value);

    if (providedValue == undefined) {
      setValue(!statefulValue);
    }
  };

  const className = classnames(styles.track, { [styles.isChecked]: value });

  return (
    <button
      type="button"
      role="switch"
      aria-checked={value}
      className={className}
      onClick={toggle}
    >
      <input type="hidden" value={value} />
      <div className={styles.label}>
        <Typography
          textColor="white"
          size="small"
          fontWeight="bold"
          textCase="uppercase"
        >
          On
        </Typography>
      </div>
      <div className={styles.label}>
        <Typography
          textColor="greyBlue"
          size="small"
          fontWeight="bold"
          textCase="uppercase"
        >
          Off
        </Typography>
      </div>
      <span className={styles.pip} />
    </button>
  );
}
