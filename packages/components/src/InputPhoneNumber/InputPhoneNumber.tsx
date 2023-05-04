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
  readonly value: string;
  readonly onChange: (value: string) => void;

  /**
   * Shows a "required" validation message when the component is left empty.
   */
  readonly required?: boolean;
}

export function InputPhoneNumber({
  required,
  ...props
}: InputPhoneNumberProps) {
  const { placeholder, validations } = props;
  const pattern = "(***) ***-****";
  const errorSubject = placeholder || "Phone number";

  return (
    <InputMask pattern={pattern} strict={false}>
      <FormField
        {...props}
        type="tel"
        validations={{
          required: {
            value: Boolean(required),
            message: `${errorSubject} is required`,
          },
          ...validations,
          validate: getPhoneNumberValidation,
        }}
      />
    </InputMask>
  );

  function getPhoneNumberValidation(value: string) {
    // Remove space, parenthesis and hyphen
    const cleanValue = value.replace(/[- )(]/g, "");

    if (cleanValue.length < 10) {
      return `${errorSubject} must contain ten or more digits`;
    }

    if (typeof validations?.validate === "function") {
      return validations.validate(value);
    }

    return true;
  }
}
