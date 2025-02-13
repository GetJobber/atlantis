import React, { ChangeEvent } from "react";
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
  const wrapperClassName = classnames(
    styles.wrapper,
    disabled && styles.disabled,
  );
  const inputClassName = classnames(styles.input, {
    [styles.indeterminate]: indeterminate,
  });
  const iconName = indeterminate ? "minus2" : "checkmark";
  const labelText = typeof label === "string" ? <Text>{label}</Text> : label;
  const descriptionText =
    typeof description === "string" ? (
      <Text size="small" variation="subdued">
        {description}
      </Text>
    ) : (
      description
    );

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const newChecked = event.currentTarget.checked;
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
            checked={checked}
            defaultChecked={defaultChecked}
            value={value}
            disabled={disabled}
            aria-checked={checked}
            onChange={handleChange}
            onFocus={onFocus}
            onBlur={onBlur}
          />
          <span className={styles.checkBox}>
            <Icon name={iconName} color="surface" />
          </span>
        </span>

        {labelText && <span className={styles.label}>{labelText}</span>}
      </label>
      {description && (
        <div className={styles.description}>{descriptionText}</div>
      )}
    </div>
  );
}
