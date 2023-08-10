import React, { ReactNode } from "react";
import { XOR } from "ts-xor";
import { v1 as uuidv1 } from "uuid";
import styles from "./RadioGroup.css";
import { Text } from "../Text";

interface BaseRadioOptionProps {
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

  /**
   * Render a custom label or additional content below the `label`
   * and `description`.
   *
   * Prefer using `label` and `description` over adding child elements if the
   * content of either would be a string.
   */
  readonly children?: ReactNode;
}

interface WithRequiredChildren extends BaseRadioOptionProps {
  readonly children: ReactNode;
}

interface WithRequiredLabel extends BaseRadioOptionProps {
  readonly label: string;
}

type RadioOptionProps = XOR<WithRequiredChildren, WithRequiredLabel>;

/**
 * For rendering props only. To make updates to
 * the real RadioOption, look at InternalRadioOption
 */
export function RadioOption({ children }: RadioOptionProps) {
  return <>{children}</>;
}

interface InternalRadioOptionProps extends BaseRadioOptionProps {
  readonly name: string;
  readonly checked: boolean;
  onChange(newValue: string | number): void;
}

export function InternalRadioOption({
  value,
  name,
  label,
  description,
  disabled,
  checked,
  children,
  onChange,
}: InternalRadioOptionProps) {
  const inputId = `${value.toString()}_${uuidv1()}`;
  const shouldRenderIndependentChildren = label && children;
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
      {shouldRenderIndependentChildren && (
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
