import React from "react";
import { XOR } from "ts-xor";
import { FormField, FormFieldProps } from "../FormField";

interface InputProps extends FormFieldProps {
  readonly type: "text" | "number" | "time";
}

interface TextareaProps extends FormFieldProps {
  readonly type?: undefined;
  readonly multiline?: boolean;
  readonly rows?: number;
}

type TextFieldPropOptions = XOR<InputProps, TextareaProps>;

export function TextField(props: TextFieldPropOptions) {
  return (
    <FormField type={props.multiline ? "textarea" : props.type} {...props} />
  );
}
