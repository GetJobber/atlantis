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

  return (
    <InputMask pattern={pattern} strict={false}>
      <FormField
        {...props}
        type="tel"
        validations={{
          required: {
            value: Boolean(required),
            message: `${placeholder || "This"} is required`,
          },
          ...validations,
        }}
      />
    </InputMask>
  );
}
