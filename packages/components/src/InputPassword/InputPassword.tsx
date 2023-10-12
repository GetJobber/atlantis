import React, { useState } from "react";
import { CommonFormFieldProps, FormField, FormFieldProps } from "../FormField";

interface InputPasswordProps
  extends CommonFormFieldProps,
    Pick<
      FormFieldProps,
      | "autocomplete"
      | "onEnter"
      | "onFocus"
      | "onBlur"
      | "inputRef"
      | "validations"
      | "defaultValue"
    > {
  readonly value?: string;
  onChange?(newValue: string): void;
  /**
   * Display toggle to change the visibility of the password input
   * @default false
   */
  readonly hasVisibility?: boolean;
}

export function InputPassword(props: InputPasswordProps) {
  const { hasVisibility = false } = props;
  const [visible, setVisibility] = useState(false);

  return (
    <FormField
      {...props}
      {...(hasVisibility && {
        suffix: {
          ariaLabel: visible ? "Hide password" : "Show password",
          icon: visible ? "eye" : "eyeCrossed",
          onClick: () => setVisibility(!visible),
        },
      })}
      type={visible ? "text" : "password"}
      onChange={handleChange}
    />
  );

  function handleChange(newValue: string) {
    props.onChange && props.onChange(newValue);
  }
}
