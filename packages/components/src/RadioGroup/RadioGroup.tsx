import React, { ReactElement, ReactNode, useState } from "react";
import classnames from "classnames";
import styles from "./RadioGroup.css";
import { option } from "../Autocomplete/Autocomplete.css";
import { selected } from "../Tabs/Tabs.css";

interface RadioGroupProps {
  readonly children: ReactElement[];
  value: string;
  onChange(newValue: string): void;
  name: string;
  header: string;
}

export function RadioGroup({
  children,
  value,
  onChange,
  name,
  header,
}: RadioGroupProps) {
  const className = classnames(styles.radioGroup);

  return (
    <>
      {React.Children.map(children, (option, index) => (
        <InternalRadioOption
          selected={value === option.props.value}
          value={option.props.value}
          name={name}
          onChange={handleChange}
        >
          {option.props.children}
        </InternalRadioOption>
      ))}
    </>
  );

  function handleChange(newValue: string) {
    if (newValue !== value) {
      onChange(newValue);
    }
  }
}

interface RadioOptionProps {
  value: string;
  children: ReactElement[];
}

export function RadioOption() {
  return <></>;
}

interface InternalRadioOptionProps {
  value: string;
  name: string;
  selected: boolean;
  children: ReactElement[];
  onChange(newValue: string): void;
}

function InternalRadioOption({
  value,
  name,
  selected,
  children,
  onChange,
}: InternalRadioOptionProps) {
  return (
    <div onClick={handleChange}>
      {selected ? "( )" : "(•)"}
      {children}
    </div>
  );

  function handleChange() {
    onChange(value);
  }
}
