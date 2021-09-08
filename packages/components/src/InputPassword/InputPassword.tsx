import React, { useState } from "react";
import { FormField, FormFieldProps } from "../FormField";

/**
 * The following is the same as:
 *   type BaseProps = Omit<FormFieldProps, "type" | "children">;
 * Unfortunately Docz doesn't currently support Omit so it has been reduced to
 * its component parts.
 */
interface InputPasswordProps
  extends Pick<
    FormFieldProps,
    Exclude<
      keyof FormFieldProps,
      | "type"
      | "children"
      | "rows"
      | "min"
      | "max"
      | "maxLength"
      | "readonly"
      | "keyboard"
      | "actionsRef"
    >
  > {
  value?: string;
  onChange?(newValue: string): void;
  /**
   * Display toggle to change the visibility of the password input
   * @default false
   */
  hasVisibility?: boolean;
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
