import React from "react";
import { FormField, FormFieldProps } from "../FormField";

/**
 * The following is the same as:
 *   type BaseProps = Omit<FormFieldProps, "type" | "children">;
 * Unfortunately Docz doesn't currently support Omit so it has been reduced to
 * its component parts.
 */
type SelectProps = Pick<
  FormFieldProps,
  Exclude<keyof FormFieldProps, "type" | "rows">
>;

export function Select(props: SelectProps) {
  return <FormField type="select" {...props} />;
}
