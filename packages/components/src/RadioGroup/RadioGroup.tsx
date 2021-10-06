import React, { ReactElement } from "react";
import uuid from "uuid";
import { InternalRadioOption } from "./RadioOption";
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
   * Defines the label that describes the radio group.
   */
  readonly label: string;

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
  label,
  onChange,
  name = uuid.v1(),
}: RadioGroupProps) {
  const labelId = `${name}_label`;

  return (
    <>
      <span id={labelId} className={styles.groupLabel}>
        {label}
      </span>
      <div
        role="radiogroup"
        aria-labelledby={labelId}
        className={styles.radioGroup}
      >
        {React.Children.map(children, option => (
          <InternalRadioOption
            checked={value === option.props.value}
            name={name}
            onChange={handleChange}
            {...option.props}
          >
            {option.props.children}
          </InternalRadioOption>
        ))}
      </div>
    </>
  );

  function handleChange(newValue: string) {
    if (newValue !== value) {
      onChange(newValue);
    }
  }
}
