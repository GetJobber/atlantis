import React, { useState } from "react";
import { InputMask } from "./InputMask";
import { CommonFormFieldProps, FormField, FormFieldProps } from "../FormField";

interface InputPhoneNumberProps
  extends CommonFormFieldProps,
    Pick<
      FormFieldProps,
      | "maxLength"
      | "autocomplete"
      | "max"
      | "min"
      | "onEnter"
      | "onFocus"
      | "onBlur"
      | "inputRef"
      | "validations"
      | "readonly"
      | "defaultValue"
      | "keyboard"
    > {
  readonly value?: string;
  onChange?(value: string): void;
  readonly defaultValue?: string;
}

export function InputPhoneNumber(props: InputPhoneNumberProps) {
  const [maskedValue, setMaskedVal] = useState("");

  return (
    <InputMask mask="(***) ***-****">
      <FormField
        {...props}
        type="tel"
        miniLabelOnly={true}
        validations={{ ...props.validations }}
        value={maskedValue}
        onChange={(value: string) => setMaskedVal(value)}
      />
    </InputMask>
  );
}
