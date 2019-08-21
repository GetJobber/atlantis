import React from "react";
import { XOR } from "ts-xor";
import { FormField, FormFieldProps } from "../FormField";

/**
 * The following is the same as:
 *   type BaseProps = Omit<FormFieldProps, "type" | "children">;
 * Unfortunately Docz doesn't currently support Omit so it has been reduced to
 * its component parts.
 */
type BaseProps = Pick<
  FormFieldProps,
  Exclude<keyof FormFieldProps, "type" | "children" | "rows" | "min" | "max">
>;

interface MultilineProps extends BaseProps {
  /**
   * Use this when you're expecting a long answer.
   */
  readonly multiline: true;

  /**
   * Specifies the visible height of a long answer form field.
   */
  readonly rows?: number;
}

type InputTextPropOptions = XOR<BaseProps, MultilineProps>;

export function InputText(props: InputTextPropOptions) {
  return <FormField type={props.multiline ? "textarea" : "text"} {...props} />;
}
