import React, { useState } from "react";
import classnames from "classnames";
import { Typography } from "../Typography";
import styles from "./Switch.css";

interface SwitchProps {
  readonly value?: boolean;
  readonly ariaLabel: string;
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

  const className = classnames(styles.container, { [styles.isChecked]: value });

  return (
    <button
      type="button"
      role="switch"
      aria-checked={value}
      className={className}
      onClick={toggle}
    >
      <div className={styles.track}>
        <input type="hidden" value={value} />
        <Label as="On" />
        <span className={styles.pip} />
        <Label as="Off" />
      </div>
    </button>
  );
}

interface LabelProps {
  readonly as: "On" | "Off";
}

function Label({ as }: LabelProps) {
  return (
    <div className={styles.label}>
      <Typography
        textColor={as == "On" ? "white" : "greyBlue"}
        size="small"
        fontWeight="bold"
        textCase="uppercase"
      >
        {as}
      </Typography>
    </div>
  );
}
