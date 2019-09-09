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
  const { max, value, min, validations } = props;
  return (
    <FormField type="number" {...props} validations={generateValidations()} />
  );

  function generateValidations() {
    const validationMessages = validations ? validations : [];

    const isOverMax = max != undefined && value !== undefined && value > max;
    const isUnderMin = min != undefined && value !== undefined && value < min;
    const emptyValue = value !== undefined && value.toString() === "";

    if (min !== undefined && max === undefined) {
      validationMessages.push({
        message: `Enter a number that is greater than or equal to ${min}`,
        status: "error",
        shouldShow: isUnderMin || emptyValue,
      });
    }

    if (max !== undefined && min === undefined) {
      validationMessages.push({
        message: `Enter a number that is less than or equal to ${max}`,
        status: "error",
        shouldShow: isOverMax || emptyValue,
      });
    }

    if (max !== undefined && min !== undefined) {
      validationMessages.push({
        message: `Enter a number between ${min} and ${max}`,
        status: "error",
        shouldShow: isUnderMin || isOverMax || emptyValue,
      });
    }

    return validationMessages;
  }
}
