import React from "react";
import { FormField, FormFieldProps } from "../FormField";

interface InputTextProps extends FormFieldProps {
  readonly multiline?: boolean;
  readonly rows?: number;
}

/**
 * The following is the same as:
 *   type TypographyOptions = Omit<InputTextProps, "type" | "children">;
 * Unfortunately Docz doesn't currently support Omit so it has been reduced to
 * its component parts.
 */
type InputTextOptions = Pick<
  InputTextProps,
  Exclude<keyof InputTextProps, "type" | "children">
>;

export function InputText(props: InputTextOptions) {
  return <FormField type={props.multiline ? "textarea" : "text"} {...props} />;
}
