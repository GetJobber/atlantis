import React, { useRef } from "react";
import { Picker } from "@react-native-picker/picker";
import { useStyles } from "./SelectDefaultPicker.style";
import { SelectInternalPickerProps } from "../../types";
import { SelectPressable } from "../SelectPressable";
import { useAtlantisTheme } from "../../../AtlantisThemeContext";

type SelectDefaultPickerProps = SelectInternalPickerProps;

export function SelectDefaultPicker({
  children,
  options,
  disabled,
  onChange,
}: SelectDefaultPickerProps): JSX.Element {
  const selectedItem = options.find(option => option.isActive);
  const pickerRef = useRef<Picker<string>>(null);
  const styles = useStyles();
  const { tokens } = useAtlantisTheme();

  return (
    <SelectPressable onPress={pickerRef.current?.focus}>
      {children}
      <Picker
        ref={pickerRef}
        selectedValue={selectedItem?.value}
        onValueChange={onChange}
        mode="dropdown"
        enabled={!disabled}
        style={styles.androidPickerContainer}
      >
        {options.map(({ label, value, isActive }, i) => (
          <Picker.Item
            key={i}
            label={label}
            value={value}
            color={isSelected(isActive)}
          />
        ))}
      </Picker>
    </SelectPressable>
  );

  function isSelected(isActive: boolean | undefined): string {
    return isActive ? tokens["color-interactive"] : tokens["color-text"];
  }
}
