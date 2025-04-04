import React, { ChangeEvent, useEffect, useId, useState } from "react";
import classnames from "classnames";
import { Controller, useForm, useFormContext, useWatch } from "react-hook-form";
import styles from "./Checkbox.module.css";
import { CheckboxLegacyProps } from "./Checkbox.types";
import { Icon } from "../Icon";
import { Text } from "../Text";

export function CheckboxLegacy({
  checked,
  defaultChecked,
  disabled,
  label,
  name,
  value,
  indeterminate = false,
  description,
  children,
  onBlur,
  onChange,
  onFocus,
}: CheckboxLegacyProps) {
  const { control, setValue } =
    useFormContext() != undefined
      ? useFormContext()
      : // If there isn't a Form Context being provided, get a form for this field.
        useForm({ mode: "onTouched" });

  const [identifier] = useState(useId());

  /**
   * Generate a name if one is not supplied, this is the name
   * that will be used for react-hook-form and not neccessarily
   * attached to the DOM
   */
  const [controlledName] = useState(
    name ? name : `generatedName--${identifier}`,
  );

  const watchedValue = useWatch({
    control,
    name: controlledName,
  });

  useEffect(() => {
    if (value != undefined) {
      setValue(controlledName, value);
    }
  }, [value, watchedValue]);

  const wrapperClassName = classnames(
    styles.wrapper,
    disabled && styles.disabled,
  );
  const inputClassName = classnames(styles.input, {
    [styles.indeterminate]: indeterminate,
  });
  const iconName = indeterminate ? "minus2" : "checkmark";
  const labelText = label ? <Text>{label}</Text> : children;

  return (
    <Controller
      control={control}
      name={controlledName}
      defaultValue={defaultChecked}
      render={({
        field: { onChange: onControllerChange, name: controllerName, ...rest },
      }) => {
        const fieldProps = {
          ...rest,
          id: identifier,
          className: inputClassName,
          name: name && controllerName,
          onChange: handleChange,
          disabled: disabled,
        };

        return (
          <div className={styles.checkBoxParent}>
            <label className={wrapperClassName}>
              <span className={styles.checkHolder}>
                <input
                  {...fieldProps}
                  type="checkbox"
                  checked={checked}
                  defaultChecked={defaultChecked}
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

        function handleChange(event: ChangeEvent<HTMLInputElement>) {
          const newChecked = event.currentTarget.checked;
          onChange && onChange(newChecked);
          onControllerChange(event);
        }
      }}
    />
  );
}
