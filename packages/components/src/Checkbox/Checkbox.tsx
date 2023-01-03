import React, { ChangeEvent, ReactElement } from "react";
import classnames from "classnames";
import { XOR } from "ts-xor";
import styles from "./Checkbox.css";
import { Icon } from "../Icon";
import { Text } from "../Text";

interface BaseCheckboxProps {
  /**
   * Determines if the checkbox is checked or not.
   */
  readonly checked?: boolean;

  /**
   * Initial checked value of the checkbox. Only use this when you need to
   * pre-populate the checked attribute that is not controlled by the component's
   * state. If a state is controlling it, use the `checked` prop instead.
   */
  readonly defaultChecked?: boolean;

  /**
   * Disables the checkbox.
   */
  readonly disabled?: boolean;

  /**
   * When `true` the checkbox to appears in indeterminate.
   *
   * @default false
   */
  readonly indeterminate?: boolean;

  /**
   * Checkbox input name
   */
  readonly name?: string;

  /**
   * Value of the checkbox.
   */
  readonly value?: string;

  /**
   * Further description of the label
   */
  readonly description?: string;

  onChange?(newValue: boolean): void;

  onFocus?(): void;
}

interface CheckboxLabelProps extends BaseCheckboxProps {
  /**
   * Label that shows up beside the checkbox.
   */
  readonly label?: string;
}

interface CheckboxChildrenProps extends BaseCheckboxProps {
  /**
   * Component children, which shows up as a label
   */
  readonly children?: ReactElement;
}

type CheckboxProps = XOR<CheckboxLabelProps, CheckboxChildrenProps>;

export function Checkbox({
  checked,
  defaultChecked,
  disabled,
  label,
  name,
  value,
  indeterminate = false,
  description,
  children,
  onChange,
  onFocus,
}: CheckboxProps) {
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
    <div className={styles.checkbox}>
      <label className={wrapperClassName}>
        <span className={styles.checkHolder}>
          <input
            type="checkbox"
            checked={checked}
            defaultChecked={defaultChecked}
            className={inputClassName}
            aria-label={label}
            onChange={handleChange}
            value={value}
            name={name}
            disabled={disabled}
            onFocus={onFocus}
          />
          <span className={styles.checkBox}>
            <Icon name={iconName} size="small" color="white" />
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
  }
}
