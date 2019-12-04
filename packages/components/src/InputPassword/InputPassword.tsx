import React from "react";
import { FormField, FormFieldProps } from "../FormField";

/**
 * The following is the same as:
 *   type BaseProps = Omit<FormFieldProps, "type" | "children">;
 * Unfortunately Docz doesn't currently support Omit so it has been reduced to
 * its component parts.
 */
interface InputPasswordProps
  extends Pick<
    FormFieldProps,
    Exclude<
      keyof FormFieldProps,
      "type" | "children" | "rows" | "min" | "max" | "maxLength" | "readonly"
    >
  > {
  value?: string;
}

export function InputPassword(props: InputPasswordProps) {
  return (
    <FormField
      type="password"
      {...props}
      onChange={handleChange}
      errorMessage={props.errorMessage}
    />
  );

  function handleChange(newValue: string) {
    props.onChange && props.onChange(newValue);
  }
}
