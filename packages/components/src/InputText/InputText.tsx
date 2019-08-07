import React, { Ref, forwardRef } from "react";
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
  Exclude<keyof FormFieldProps, "type" | "children" | "rows">
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

function AnInputText(
  props: InputTextPropOptions,
  ref: Ref<HTMLInputElement> | undefined,
) {
  return (
    <FormField
      ref={ref}
      type={props.multiline ? "textarea" : "text"}
      {...props}
    />
  );
}

export const InputText = forwardRef(AnInputText);
