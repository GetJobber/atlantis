import React from "react";
import { FormFieldPureProps } from "./FormFieldTypes";
import { FormFieldHookForm } from "./FormFieldHookForm";
import { FormFieldPure } from "./FormFieldPure";

export function FormField(props: FormFieldPureProps) {
  return props.pure ? (
    <FormFieldPure {...props} />
  ) : (
    <FormFieldHookForm {...props} />
  );
}
