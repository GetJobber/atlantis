import React from "react";
import { CommonFormFieldProps, FormField, FormFieldProps } from "../FormField";

type InputEmailProps = CommonFormFieldProps &
  Pick<
    FormFieldProps,
    "maxLength" | "readonly" | "validations" | "defaultValue"
  >;

export const validationMessage = "Please enter a valid email";

export function InputEmail(props: InputEmailProps) {
  const [miniLabel, setMiniLabel] = React.useState(!!props.defaultValue);
  const { validations } = props;

  return (
    <FormField
      {...props}
      type="email"
      miniLabel={miniLabel}
      validations={{
        ...validations,
        validate: checkForValidEmail,
      }}
    />
  );

  function checkForValidEmail(value: string) {
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    setMiniLabel(!!value);

    if (!value) {
      return true;
    }

    if (!value.match(emailRegex)) {
      return validationMessage;
    }

    return true;
  }
}
