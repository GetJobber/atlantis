import React, { PropsWithChildren } from "react";
import { XOR } from "ts-xor";
import { v1 as uuidv1 } from "uuid";
import styles from "./RadioGroup.css";
import { Text } from "../Text";

type BaseRadioOptions = PropsWithChildren<{
  /**
   * The value of the radio button.
   */
  readonly value: string | number;

  /**
   * Disables the radio button.
   */
  readonly disabled?: boolean;

  /**
   * Further description of the label.
   */
  readonly description?: string;

  /**
   * The label to appear beside the radio button.
   */
  readonly label?: string;
}>;

type RadioOptions = Pick<
  BaseRadioOptions,
  Exclude<keyof BaseRadioOptions, "label" | "children">
> &
  // At least one of label or children must be provided
  XOR<
    Required<Pick<BaseRadioOptions, "label">> &
      Partial<Pick<BaseRadioOptions, "children">>,
    Required<Pick<BaseRadioOptions, "children">> &
      Partial<Pick<BaseRadioOptions, "label">>
  >;

/**
 * For rendering props only. To make updates to
 * the real RadioOption, look at InternalRadioOption
 */
export function RadioOption({ children }: RadioOptions) {
  return <>{children}</>;
}

type InternalRadioOptions = RadioOptions & {
  readonly name: string;
  readonly checked: boolean;
  onChange(newValue: string | number): void;
};

export function InternalRadioOption({
  value,
  name,
  label,
  description,
  disabled,
  checked,
  children,
  onChange,
}: InternalRadioOptions) {
  const inputId = `${value.toString()}_${uuidv1()}`;
  return (
    <div>
      <input
        onChange={handleChange}
        type="radio"
        name={name}
        value={value}
        disabled={disabled}
        checked={checked}
        id={inputId}
        className={styles.input}
        aria-describedby={description ? `${inputId}_description` : undefined}
      />
      <label className={styles.label} htmlFor={inputId}>
        {label ? label : children}
      </label>
      {description && (
        <div className={styles.description} id={`${inputId}_description`}>
          <Text variation="subdued" size="small">
            {description}
          </Text>
        </div>
      )}
      {children && label && (
        <div className={styles.children} id={`${inputId}_children`}>
          {children}
        </div>
      )}
    </div>
  );

  function handleChange() {
    onChange(value);
  }
}
