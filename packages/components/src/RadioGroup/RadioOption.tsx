import React, { PropsWithChildren } from "react";
import uuid from "uuid";
import styles from "./RadioGroup.css";

interface RadioOptionProps {
  readonly value: string | number;
  readonly disabled?: boolean;
}

export function RadioOption({ children }: PropsWithChildren<RadioOptionProps>) {
  return <>{children}</>;
}

interface InternalRadioOptionProps extends RadioOptionProps {
  readonly name: string;
  readonly checked: boolean;
  onChange(newValue: string | number): void;
}

export function InternalRadioOption({
  value,
  name,
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
      />
      <label className={styles.label} htmlFor={inputId}>
        {children}
      </label>
    </div>
  );

  function handleChange() {
    onChange(value);
  }
}
