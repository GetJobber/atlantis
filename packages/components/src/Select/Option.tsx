import React, { ReactNode } from "react";

interface InputSelectProps {
  readonly children?: ReactNode;
  readonly disabled?: boolean;

  /**
   * The content of this attribute represents the value to be submitted with the
   * form, should this option be selected.
   */
  readonly value?: string;
}

export function Option({ children, disabled, value }: InputSelectProps) {
  return (
    <option disabled={disabled} value={value}>
      {children}
    </option>
  );
}
