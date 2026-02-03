import React, { useState } from "react";
import classnames from "classnames";
import styles from "./Switch.module.css";
import { Icon } from "../Icon";

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

  const className = classnames(styles.track, styles.switch, {
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
        <span className={styles.icon}>
          <Icon
            size="small"
            name={value ? "checkmark" : "cross"}
            {...getIconColor(value, disabled ?? false)}
          />
        </span>
        <span className={styles.toggle} />
      </button>
      <input name={name} type="hidden" value={String(value)} />
    </>
  );
}

function getIconColor(isChecked: boolean, isDisabled: boolean) {
  const checkedColor = {
    color: "surface",
  } as const;

  const uncheckedColor = {
    customColor: isDisabled
      ? "var(--color-disabled)"
      : "var(--color-inactive--onSurface)",
  } as const;

  return isChecked ? checkedColor : uncheckedColor;
}
