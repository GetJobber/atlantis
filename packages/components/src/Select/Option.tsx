import React, { ReactNode } from "react";

interface InputSelectProps {
  readonly children?: ReactNode;
  readonly disabled?: boolean;

  /**
   * This attribute is text for the label indicating the meaning of the option.
   * If the label attribute isn't defined, its value is that of the element text
   * content.
   */
  readonly label?: string;

  /**
   * The content of this attribute represents the value to be submitted with the
   * form, should this option be selected.
   */
  readonly value?: string;
}

export function Option({ children, disabled, label, value }: InputSelectProps) {
  return (
    <option disabled={disabled} label={label} value={value}>
      {children}
    </option>
  );
}
