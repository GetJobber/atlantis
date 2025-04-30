import React from "react";
import { InputEmailLegacyProps, validationMessage } from "./InputEmail.types";
import { FormField } from "../FormField";

export function InputEmail(props: InputEmailLegacyProps) {
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
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!value) {
      return true;
    }

    if (!value.match(emailRegex)) {
      return validationMessage;
    }

    return true;
  }
}
