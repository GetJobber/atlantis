import React from "react";
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
      | "prefix"
      | "suffix"
    > {
  readonly value?: string;
  readonly onChange?: (value: string) => void;

  /**
   * Shows a "required" validation message when the component is left empty.
   */
  readonly required?: boolean;
}

export function InputPhoneNumber(props: InputPhoneNumberProps) {
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
