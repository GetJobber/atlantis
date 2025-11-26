import type { ChangeEvent } from "react";
import React, { forwardRef, useId } from "react";
import classnames from "classnames";
import styles from "./Checkbox.module.css";
import type { CheckboxRebuiltProps } from "./Checkbox.types";
import { Icon } from "../Icon";
import { Text } from "../Text";
import { filterDataAttributes } from "../sharedHelpers/filterDataAttributes";

export const CheckboxRebuilt = forwardRef(function CheckboxRebuiltInternal(
  props: CheckboxRebuiltProps,
  ref: React.Ref<HTMLInputElement>,
) {
  const {
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
    onClick,
    onMouseDown,
    onMouseUp,
    onPointerDown,
    onPointerUp,
    invalid,
  } = props;

  const descriptionIdentifier = useId();
  const descriptionVisible = Boolean(description);
  const wrapperClassName = classnames(
    styles.wrapper,
    disabled && styles.disabled,
    invalid && styles.invalid,
  );
  const isInvalid = Boolean(invalid);
  const inputClassName = classnames(styles.input, {
    [styles.indeterminate]: indeterminate,
  });
  const dataAttrs = filterDataAttributes(props);

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
            aria-label={props["aria-label"]}
            aria-describedby={
              descriptionVisible
                ? descriptionIdentifier
                : props["aria-describedby"]
            }
            aria-invalid={isInvalid ? true : undefined}
            aria-required={props["aria-required"]}
            checked={checked}
            value={value}
            defaultChecked={defaultChecked}
            disabled={disabled}
            onChange={handleChange}
            onFocus={onFocus}
            onBlur={onBlur}
            onClick={onClick}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
            {...dataAttrs}
          />
          <span className={styles.checkBox}>
            <Icon name={iconName} color="surface" />
          </span>
        </span>

        {labelContent && <span className={styles.label}>{labelContent}</span>}
      </label>
      {description && (
        <div id={descriptionIdentifier} className={styles.description}>
          {descriptionContent}
        </div>
      )}
    </div>
  );
});

CheckboxRebuilt.displayName = "CheckboxRebuilt";
