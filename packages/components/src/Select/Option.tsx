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

function SelectOption({ children, disabled, value }: InputSelectProps) {
  return (
    <option disabled={disabled} value={value}>
      {children}
    </option>
  );
}

/**
 * Whatever mechanism that docz is using to parse out props fails if this
 * component is called Option internally. We have opened an issue with them
 * to find out more information.
 */
export { SelectOption as Option };
