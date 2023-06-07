import React from "react";
import { handlePress, isIOS14AndUp } from "./utils";
import { SelectInternalPickerProps } from "../../types";
import { SelectIOSPicker } from "../SelectIOSPicker";
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
    return (
      <SelectPressable>
        <SelectIOSPicker
          options={options}
          onOptionPress={handlePress(onChange)}
        >
          {children}
        </SelectIOSPicker>
      </SelectPressable>
    );
  }

  return (
    <SelectDefaultPicker options={options} onChange={onChange}>
      {children}
    </SelectDefaultPicker>
  );
}
