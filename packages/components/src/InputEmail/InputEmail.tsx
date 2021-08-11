import React from "react";
import { FormField, FormFieldProps } from "../FormField";

type InputEmailProps = Pick<
  FormFieldProps,
  Exclude<
    keyof FormFieldProps,
    | "children"
    | "autocomplete"
    | "max"
    | "min"
    | "rows"
    | "type"
    | "keyboard"
    | "onEnter"
    | "onBlur"
    | "inputRef"
    | "actionsRef"
    | "onFocus"
  >
>;

export function InputEmail(props: InputEmailProps) {
  const { validations } = props;

  return (
    <FormField
      {...props}
      type="email"
      validations={{
        ...validations,
        validate: checkForValidEmail,
      }}
    />
  );

  function checkForValidEmail(value: string) {
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!value) {
      return true;
    }

    if (!value.match(emailRegex)) {
      return "Please enter a valid email";
    }

    return true;
  }
}
