import React, { ChangeEvent, useEffect, useState } from "react";
import classnames from "classnames";
import styles from "./Checkbox.module.css";
import { CheckboxRebuiltProps } from "./Checkbox.types";
import { Icon } from "../Icon";
import { Text } from "../Text";

export function CheckboxRebuilt({
  checked,
  defaultChecked,
  disabled,
  label,
  name,
  value,
  indeterminate = false,
  description,
  id,
  onBlur,
  onChange,
  onFocus,
}: CheckboxRebuiltProps) {
  const [internalChecked, setInternalChecked] = useState(
    defaultChecked ?? false,
  );
  const isControlled = checked !== undefined;
  const effectiveChecked = isControlled ? checked : internalChecked;

  useEffect(() => {
    if (defaultChecked !== undefined) {
      setInternalChecked(defaultChecked);
    }
  }, [defaultChecked]);

  const wrapperClassName = classnames(
    styles.wrapper,
    disabled && styles.disabled,
  );
  const inputClassName = classnames(styles.input, {
    [styles.indeterminate]: indeterminate,
  });
  const iconName = indeterminate ? "minus2" : "checkmark";
  const labelContent = typeof label === "string" ? <Text>{label}</Text> : label;
  const descriptionContent =
    typeof description === "string" ? (
      <Text size="small" variation="subdued">
        {description}
      </Text>
    ) : (
      description
    );

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const newChecked = event.currentTarget.checked;

    if (!isControlled) {
      setInternalChecked(newChecked);
    }
    onChange?.(newChecked);
  }

  return (
    <div className={styles.checkBoxParent}>
      <label className={wrapperClassName}>
        <span className={styles.checkHolder}>
          <input
            type="checkbox"
            id={id}
            className={inputClassName}
            name={name}
            checked={effectiveChecked}
            value={value}
            disabled={disabled}
            aria-checked={indeterminate ? "mixed" : effectiveChecked}
            onChange={handleChange}
            onFocus={onFocus}
            onBlur={onBlur}
          />
          <span className={styles.checkBox}>
            <Icon name={iconName} color="surface" />
          </span>
        </span>

        {labelContent && <span className={styles.label}>{labelContent}</span>}
      </label>
      {description && (
        <div className={styles.description}>{descriptionContent}</div>
      )}
    </div>
  );
}
