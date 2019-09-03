import React, { useState } from "react";
import { FormField, FormFieldProps } from "../FormField";

/**
 * The following is the same as:
 *   type BaseProps = Omit<FormFieldProps, "type" | "children">;
 * Unfortunately Docz doesn't currently support Omit so it has been reduced to
 * its component parts.
 */
interface InputNumberProps
  extends Pick<
    FormFieldProps,
    Exclude<keyof FormFieldProps, "type" | "children" | "rows">
  > {
  value?: number;
}

export function InputNumber(props: InputNumberProps) {
  const [overLimitMessage, setOverLimitMessage] = useState(
    getOverLimitMessage(props.value),
  );

  return (
    <FormField
      type="number"
      {...props}
      onChange={handleChange}
      errorMessage={props.errorMessage || overLimitMessage}
    />
  );

  function handleChange(newValue: number) {
    setOverLimitMessage(getOverLimitMessage(newValue));
    props.onChange && props.onChange(newValue);
  }

  function getOverLimitMessage(value: InputNumberProps["value"]): string {
    let message = "";

    const isOverMax = props.max != undefined && value && value > props.max;
    const isUnderMin = props.min != undefined && value && value < props.min;

    if (isOverMax || isUnderMin || (value && value.toString() === "")) {
      if (props.min != undefined && props.max === undefined) {
        message = `Enter a number that is greater than or equal to ${props.min}`;
      } else if (props.max != undefined && props.min === undefined) {
        message = `Enter a number that is less than or equal to ${props.max}`;
      } else if (props.min != undefined && props.max != undefined) {
        message = `Enter a number between ${props.min} and ${props.max}`;
      }
    }

    return message;
  }
}
