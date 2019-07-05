import React, { useState } from "react";
import classnames from "classnames";
import { Typography } from "../Typography";
import styles from "./Switch.css";

interface SwitchProps {
  readonly value?: boolean;
  readonly ariaLabel: string;
  onChange?(newValue: boolean): void;
}

export function Switch({
  value: providedValue,
  ariaLabel,
  onChange,
}: SwitchProps) {
  const [statefulValue, setValue] = useState(false);
  const value = providedValue != undefined ? providedValue : statefulValue;

  const toggleSwitch = () => {
    onChange && onChange(!value);

    if (providedValue == undefined) {
      setValue(!statefulValue);
    }
  };

  const className = classnames(styles.track, { [styles.isChecked]: value });

  return (
    <>
      <button
        type="button"
        role="switch"
        aria-checked={value}
        aria-label={ariaLabel}
        className={className}
        onClick={toggleSwitch}
      >
        <span className={styles.toggle}>
          <Label as="On" />
          <span className={styles.pip} />
          <Label as="Off" />
        </span>
      </button>
      <input type="hidden" value={String(value)} />
    </>
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
