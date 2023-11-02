import React, { useState } from "react";
import classnames from "classnames";
import styles from "./Switch.css";
import { Typography } from "../Typography";

interface SwitchProps {
  readonly value?: boolean;
  /**
   * Adds a name for the hidden input and an ID so a label can be used to
   * describe the switch instead of an aria-label. This prevents screen readers
   * from reading the label twice
   */
  readonly name?: string;
  readonly ariaLabel?: string;
  readonly disabled?: boolean;
  onChange?(newValue: boolean): void;
}

export function Switch({
  value: providedValue,
  ariaLabel,
  name,
  disabled,
  onChange,
}: SwitchProps) {
  const [statefulValue, setValue] = useState(false);
  const value = providedValue != undefined ? providedValue : statefulValue;

  const toggleSwitch = () => {
    if (disabled) {
      return;
    }

    const newValue = !value;
    onChange && onChange(newValue);

    if (providedValue == undefined) {
      setValue(newValue);
    }
  };

  const className = classnames(styles.track, {
    [styles.isChecked]: value,
    [styles.disabled]: disabled,
  });

  return (
    <>
      <button
        id={name}
        type="button"
        role="switch"
        aria-checked={value}
        aria-label={ariaLabel}
        className={className}
        onClick={toggleSwitch}
        disabled={disabled}
      >
        <Label as="On" disabled={disabled} />
        <span className={styles.pip} />
        <Label as="Off" disabled={disabled} />
      </button>
      <input name={name} type="hidden" value={String(value)} />
    </>
  );
}

interface LabelProps {
  readonly as: "On" | "Off";
  readonly disabled?: boolean;
}

function Label({ as, disabled }: LabelProps) {
  const getTextColor = () => {
    if (disabled) {
      return "grey";
    } else if (as === "On") {
      return "white";
    }

    return "greyBlue";
  };

  return (
    <span className={styles.label}>
      <Typography
        element="span"
        textColor={getTextColor()}
        size="small"
        fontWeight="bold"
        textCase="uppercase"
      >
        {as}
      </Typography>
    </span>
  );
}
