import React, { PropsWithChildren } from "react";
import { XOR } from "ts-xor";
import uuid from "uuid";
import styles from "./RadioGroup.css";
import { Text } from "../Text";

interface BaseRadioOptions {
  readonly value: string | number;
  readonly disabled?: boolean;
}

interface RadioOptionsWithDescription extends BaseRadioOptions {
  /**
   * The label to appear beside the radio button.
   */
  label: string;
  /**
   * Further description of the label.
   */
  description?: string;
}

type RadioOptionProps = XOR<
  RadioOptionsWithDescription,
  PropsWithChildren<BaseRadioOptions>
>;

/**
 * For rendering props only. To make updates to
 * the real RadioOption, look at InternalRadioOption
 */
export function RadioOption({ children }: PropsWithChildren<RadioOptionProps>) {
  return <>{children}</>;
}

interface BaseInternalRadioOptions extends BaseRadioOptions {
  readonly name: string;
  readonly checked: boolean;
  onChange(newValue: string | number): void;
}

interface InternalRadioOptionsWithDescription extends BaseInternalRadioOptions {
  label: string;
  description?: string;
}

type InternalRadioOptionProps = XOR<
  InternalRadioOptionsWithDescription,
  PropsWithChildren<BaseInternalRadioOptions>
>;

export function InternalRadioOption({
  value,
  name,
  label,
  description,
  disabled,
  checked,
  children,
  onChange,
}: PropsWithChildren<InternalRadioOptionProps>) {
  const inputId = `${value.toString()}_${uuid()}`;
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
    </div>
  );

  function handleChange() {
    onChange(value);
  }
}
