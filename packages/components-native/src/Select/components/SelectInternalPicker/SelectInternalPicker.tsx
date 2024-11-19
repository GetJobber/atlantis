import React from "react";
import { isIOS14AndUp } from "./utils";
import { SelectInternalPickerProps } from "../../types";
import { SelectPressable } from "../SelectPressable";
import { SelectDefaultPicker } from "../SelectDefaultPicker";

export function SelectInternalPicker({
  children,
  options,
  disabled,
  onChange,
}: SelectInternalPickerProps): JSX.Element {
  if (disabled) return <>{children}</>;

  if (isIOS14AndUp()) {
    return <SelectPressable>{children}</SelectPressable>;
  }

  return (
    <SelectDefaultPicker options={options} onChange={onChange}>
      {children}
    </SelectDefaultPicker>
  );
}
