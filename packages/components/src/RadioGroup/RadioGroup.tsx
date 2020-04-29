import React, { ReactElement, ReactNode } from "react";
import styles from "./RadioGroup.css";

interface RadioGroupProps {
  readonly children: ReactElement | ReactElement[];
  readonly value: string;
  onChange(newValue: string): void;
  readonly name: string;
}

export function RadioGroup({
  children,
  value,
  onChange,
  name,
}: RadioGroupProps) {
  return (
    <div className={styles.radio}>
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
  readonly value: string;
  readonly children: ReactNode | ReactNode[];
}

export function RadioOption({ children }: RadioOptionProps) {
  return <>{children}</>;
}

interface InternalRadioOptionProps {
  readonly value: string;
  readonly name: string;
  readonly checked: boolean;
  readonly children: ReactNode | ReactNode[];
  onChange(newValue: string): void;
}

function InternalRadioOption({
  value,
  name,
  checked,
  children,
  onChange,
}: InternalRadioOptionProps) {
  return (
    <div>
      <input
        onChange={handleChange}
        type="radio"
        name={name}
        value={value}
        checked={checked}
        id={value}
        className={styles.input}
      />
      <label className={styles.label} htmlFor={value}>
        {children}
      </label>
    </div>
  );

  function handleChange() {
    onChange(value);
  }
}
