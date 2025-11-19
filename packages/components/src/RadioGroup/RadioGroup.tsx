import type { ReactElement } from "react";
import React, { useId } from "react";
import classnames from "classnames";
import { InternalRadioOption } from "./RadioOption";
import type { RadioOptionProps } from "./RadioOption";
import styles from "./RadioGroup.module.css";

export interface RadioGroupProps {
  readonly children:
    | ReactElement<RadioOptionProps>
    | ReactElement<RadioOptionProps>[];

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
   * Defines the aria label that describes the radio group.
   */
  readonly ariaLabel: string;

  /**
   * The name of the radio group, that links the radio options back up
   * to the group.
   *
   * @default useId()
   */
  readonly name?: string;

  /**
   * Layout direction for the options.
   * @default "vertical"
   */
  readonly direction?: "vertical" | "horizontal";
}

export function RadioGroup({
  children,
  value,
  ariaLabel,
  onChange,
  name = useId(),
  direction = "vertical",
}: RadioGroupProps) {
  const className = classnames(styles.radioGroup, {
    [styles.directionHorizontal]: direction === "horizontal",
  });

  return (
    <div role="radiogroup" aria-label={ariaLabel} className={className}>
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
  );

  function handleChange(newValue: string) {
    if (newValue !== value) {
      onChange(newValue);
    }
  }
}
