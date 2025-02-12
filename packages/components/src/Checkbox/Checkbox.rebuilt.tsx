import React, { ChangeEvent, ForwardedRef, forwardRef } from "react";
import classnames from "classnames";
import styles from "./Checkbox.module.css";
import { CheckboxRebuiltProps } from "./Checkbox.types";
import { Icon } from "../Icon";
import { Text } from "../Text";

export const Checkbox = forwardRef(function CheckboxRebuilt(
  {
    checked,
    defaultChecked,
    disabled,
    label,
    name,
    value,
    indeterminate = false,
    description,
    children,
    id,
    onBlur,
    onChange,
    onFocus,
  }: CheckboxRebuiltProps,
  ref: ForwardedRef<HTMLInputElement>,
) {
  const wrapperClassName = classnames(
    styles.wrapper,
    disabled && styles.disabled,
  );
  const inputClassName = classnames(styles.input, {
    [styles.indeterminate]: indeterminate,
  });
  const iconName = indeterminate ? "minus2" : "checkmark";
  const labelText = label ? <Text>{label}</Text> : children;

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const newChecked = event.currentTarget.checked;
    onChange?.(newChecked);
  }

  return (
    <div className={styles.checkBoxParent}>
      <label className={wrapperClassName}>
        <span className={styles.checkHolder}>
          <input
            ref={ref}
            type="checkbox"
            id={id}
            className={inputClassName}
            name={name}
            checked={checked}
            defaultChecked={defaultChecked}
            value={value}
            disabled={disabled}
            aria-label={label}
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
        <div className={styles.description}>
          <Text variation="subdued" size="small">
            {description}
          </Text>
        </div>
      )}
    </div>
  );
});
