import React from "react";
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
  const handleChange = (newValue: number) => {
    const isOverMax = props.max && newValue > props.max;
    const isUnderMin = props.min && newValue < props.min;
    if (isOverMax) {
      newValue = props.max || 0;
    }

    if (isUnderMin) {
      newValue = props.min || 0;
    }

    props.onChange && props.onChange(newValue);
  };
  return <FormField type="number" {...props} onChange={handleChange} />;
}
