import type { ReactElement } from "react";
import React, { useId } from "react";
import classnames from "classnames";
import { InternalRadioOption } from "./RadioOption";
import styles from "./RadioGroup.module.css";

export interface RadioGroupProps {
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
        // @ts-expect-error - TODO: it thinks value is missing, but it's probably coming from option.props
        <InternalRadioOption
          // @ts-expect-error - TODO: fix option.props type is unknown
          checked={value === option.props.value}
          name={name}
          onChange={handleChange}
          // @ts-expect-error - TODO: fix option.props type is unknown
          {...option.props}
        >
          {/* @ts-expect-error - TODO: fix option.props type is unknown */}
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
