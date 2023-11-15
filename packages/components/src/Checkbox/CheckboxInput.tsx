import React from "react";
import classnames from "classnames";
import styles from "./Checkbox.css";
import { Icon, IconNames } from "../Icon";
import { Text } from "../Text";

export type RawCheckboxInputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export const RawCheckboxInput = ({
  placeholder,
  ...rest
}: RawCheckboxInputProps) => {
  return <input {...rest} type="checkbox" aria-label={placeholder} />;
};

export interface CheckboxInputProps extends RawCheckboxInputProps {
  readonly iconName?: IconNames;
  readonly labelText: string;
  readonly description?: string;
  readonly indeterminate?: boolean;
}

export const CheckboxInput = ({
  disabled,
  placeholder,
  iconName = "checkmark",
  labelText,
  description,
  indeterminate = false,
  ...rest
}: CheckboxInputProps) => {
  const wrapperClassName = classnames(
    styles.wrapper,
    disabled && styles.disabled,
  );
  const inputClassName = classnames(styles.input, {
    [styles.indeterminate]: indeterminate,
  });

  return (
    <div className={styles.checkbox}>
      <label className={wrapperClassName}>
        <span className={styles.checkHolder}>
          <RawCheckboxInput
            className={inputClassName}
            placeholder={placeholder}
            disabled={disabled}
            {...rest}
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
};
