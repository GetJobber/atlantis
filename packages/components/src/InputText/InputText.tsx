import React from "react";
import { FormField, FormFieldProps } from "../FormField";

interface InputTextProps extends FormFieldProps {
  readonly multiline?: boolean;
  readonly rows?: number;
}

type TypographyOptions = Omit<InputTextProps, "type" | "children">;

export function InputText(props: TypographyOptions) {
  return <FormField type={props.multiline ? "textarea" : "text"} {...props} />;
}
