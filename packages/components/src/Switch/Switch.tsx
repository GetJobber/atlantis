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
    <div className={className}>
      <button
        type="button"
        role="switch"
        aria-checked={value}
        className={styles.toggle}
        onClick={toggle}
      >
        <span className={styles.track}>
          <Label as="On" />
          <span className={styles.pip} />
          <Label as="Off" />
        </span>
      </button>
      <input type="hidden" value={String(value)} />
    </div>
  );
}

interface LabelProps {
  readonly as: "On" | "Off";
}

function Label({ as }: LabelProps) {
  return (
    <span className={styles.label}>
      <Typography
        element="span"
        textColor={as == "On" ? "white" : "greyBlue"}
        size="small"
        fontWeight="bold"
        textCase="uppercase"
      >
        {as}
      </Typography>
    </span>
  );
}
