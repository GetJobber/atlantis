import React, { useState } from "react";
import { FormField, FormFieldProps } from "../FormField";

/**
 * The following is the same as:
 *   type BaseProps = Omit<FormFieldProps, "type" | "children">;
 * Unfortunately Docz doesn't currently support Omit so it has been reduced to
 * its component parts.
 */
type InputNumberProps = Pick<
  FormFieldProps,
  Exclude<keyof FormFieldProps, "type" | "children" | "rows">
>;

export function InputNumber(props: InputNumberProps) {
  const [overLimit, setOverLimit] = useState("");

  const handleChange = (newValue: number) => {
    const isOverMax = props.max != undefined && newValue > props.max;
    const isUnderMin = props.min != undefined && newValue < props.min;

    if (isOverMax || isUnderMin || newValue.toString() === "") {
      let message = "";

      if (props.min != undefined && props.max === undefined) {
        message = `Enter a number that is greater than or equal to ${props.min}`;
      } else if (props.max != undefined && props.min === undefined) {
        message = `Enter a number that is less than or equal to ${props.max}`;
      } else if (props.min != undefined && props.max != undefined) {
        message = `Enter a number between ${props.min} and ${props.max}`;
      }

      setOverLimit(message);
    } else {
      setOverLimit("");
    }

    props.onChange && props.onChange(newValue);
  };

  return (
    <FormField
      type="number"
      {...props}
      onChange={handleChange}
      errorMessage={props.errorMessage || overLimit}
    />
  );
}
