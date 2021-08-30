import React from "react";
import { BaseFormFieldProps, FormField, FormFieldProps } from "../FormField";

interface InputPasswordProps
  extends BaseFormFieldProps,
    Pick<
      FormFieldProps,
      "autocomplete" | "onEnter" | "onFocus" | "onBlur" | "inputRef"
    > {
  value?: string;
  onChange?(newValue: string): void;
}

export function InputPassword(props: InputPasswordProps) {
  return <FormField {...props} type="password" onChange={handleChange} />;

  function handleChange(newValue: string) {
    props.onChange && props.onChange(newValue);
  }
}
