import React, { useState } from "react";
import { InputMask } from "./InputMask";
import { CommonFormFieldProps, FormField, FormFieldProps } from "../FormField";

interface InputPhoneNumberProps
  extends Omit<CommonFormFieldProps, "align">,
    Pick<
      FormFieldProps,
      | "autocomplete"
      | "onEnter"
      | "onFocus"
      | "onBlur"
      | "validations"
      | "readonly"
    > {
  readonly value?: string;
  readonly required?: boolean;
  onChange?(value: string): void;
}

export function InputPhoneNumber(props: InputPhoneNumberProps) {
  const [maskedValue, setMaskedVal] = useState("");
  const pattern = "(***) ***-****";

  return (
    <InputMask pattern={pattern}>
      <FormField
        {...props}
        type="tel"
        validations={{
          ...props.validations,
          required: {
            value: Boolean(props.required),
            message: `${props.placeholder || "This"} is required`,
          },
          validate: getValidations,
        }}
        value={maskedValue}
        onChange={(value: string) => setMaskedVal(value)}
      />
    </InputMask>
  );

  function getValidations(value: InputPhoneNumberProps["value"]) {
    if (value && value.length < pattern.length) {
      return `Enter a valid ${props.placeholder || "phone number"}`;
    }

    return true;
  }
}
