import React, { ReactElement, ReactNode } from "react";
import uuid from "uuid";
import styles from "./RadioGroup.css";

interface RadioGroupProps {
  readonly children: ReactElement | ReactElement[];

  /**
   * Defines the default value that will be pre-selected in the radio group.
   */
  readonly value: string | number;

  /**
   * Change handler for the RadioGroup.
   *
   * @param {string} newValue
   */
  onChange(newValue: string | number): void;

  /**
   * The name of the radio group, that links the radio options back up
   * to the group.
   *
   * @default uuid
   */
  readonly name?: string;
}

export function RadioGroup({
  children,
  value,
  onChange,
  name = uuid.v1(),
}: RadioGroupProps) {
  return (
    <div className={styles.radioGroup}>
      {React.Children.map(children, option => (
        <InternalRadioOption
          checked={value === option.props.value}
          value={option.props.value}
          name={name}
          onChange={handleChange}
        >
          {option.props.children}
        </InternalRadioOption>
      ))}
    </div>
  );

  function handleChange(newValue: string) {
    if (newValue !== value) {
      onChange(newValue);
    }
  }
}

interface RadioOptionProps {
  readonly value: string | number;
  readonly children: ReactNode | ReactNode[];
}

export function RadioOption({ children }: RadioOptionProps) {
  return <>{children}</>;
}

interface InternalRadioOptionProps {
  readonly value: string | number;
  readonly name: string;
  readonly checked: boolean;
  readonly children: ReactNode | ReactNode[];
  onChange(newValue: string | number): void;
}

function InternalRadioOption({
  value,
  name,
  checked,
  children,
  onChange,
}: InternalRadioOptionProps) {
  const inputId = value.toString();
  return (
    <div>
      <input
        onChange={handleChange}
        type="radio"
        name={name}
        value={value}
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
