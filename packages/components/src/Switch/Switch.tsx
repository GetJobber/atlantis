import React, { useState } from "react";
import classnames from "classnames";
import { Switch as BaseSwitch } from "@base-ui/react/switch";
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
  const isControlled = providedValue != undefined;
  const value = isControlled ? providedValue : statefulValue;

  const handleCheckedChange = (newValue: boolean) => {
    onChange && onChange(newValue);

    if (!isControlled) {
      setValue(newValue);
    }
  };

  const className = classnames(styles.track, styles.switch);

  return (
    <>
      <BaseSwitch.Root
        id={name}
        aria-label={ariaLabel}
        checked={isControlled ? value : undefined}
        disabled={disabled}
        onCheckedChange={handleCheckedChange}
        className={className}
        nativeButton={true}
        render={props => <button {...props} type="button" />}
      >
        <span className={styles.icon} aria-hidden="true">
          <Icon
            size="small"
            name={value ? "checkmark" : "cross"}
            {...getIconColor(value, disabled ?? false)}
          />
        </span>
        <BaseSwitch.Thumb className={styles.toggle} />
      </BaseSwitch.Root>
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
