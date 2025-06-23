import React, { ChangeEvent, forwardRef, useId } from "react";
import classnames from "classnames";
import styles from "./Checkbox.module.css";
import { CheckboxRebuiltProps } from "./Checkbox.types";
import { Icon } from "../Icon";
import { Text } from "../Text";

export const CheckboxRebuilt = forwardRef(function CheckboxRebuiltInternal(
  {
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
    invalid,
  }: CheckboxRebuiltProps,
  ref: React.Ref<HTMLInputElement>,
) {
  const descriptionId = useId();
  const wrapperClassName = classnames(
    styles.wrapper,
    disabled && styles.disabled,
    invalid && styles.invalid,
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
    onChange?.(newChecked, event);
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
            aria-describedby={description ? descriptionId : undefined}
            checked={checked}
            value={value}
            defaultChecked={defaultChecked}
            disabled={disabled}
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
        <div id={descriptionId} className={styles.description}>
          {descriptionContent}
        </div>
      )}
    </div>
  );
});

CheckboxRebuilt.displayName = "CheckboxRebuilt";
