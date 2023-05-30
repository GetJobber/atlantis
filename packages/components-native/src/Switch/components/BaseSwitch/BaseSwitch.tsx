import React from "react";
import { Platform } from "react-native";
import { Switch } from "react-native-gesture-handler";
import { useFormController } from "../../../hooks";
import { tokens } from "../../../utils/design";

export interface BaseSwitchProps {
  /**
   * Value of the switch
   */
  readonly value?: boolean;

  /**
   * Default value of the switch when uncontrolled
   */
  readonly defaultValue?: boolean;

  /**
   * Callback to handle value changes
   */
  onValueChange?(val: boolean): void;

  /**
   * When true, the switch cannot be toggled
   */
  readonly disabled?: boolean;

  /**
   * Accessibility label for this switch
   */
  readonly accessibilityLabel?: string;

  /**
   * Name of the input.
   */
  readonly name?: string;
}

export function BaseSwitch({
  value,
  defaultValue,
  onValueChange,
  disabled = false,
  accessibilityLabel,
  name,
}: BaseSwitchProps): JSX.Element {
  const { field } = useFormController({
    name,
    // value: value,
    value: value ?? defaultValue,
  });

  const internalValue = value ?? field.value;

  function getThumbColor() {
    if (Platform.OS === "android") {
      if (disabled) {
        return tokens["color-disabled"];
      } else if (internalValue) {
        return tokens["color-interactive"];
      } else {
        return tokens["color-surface--background"];
      }
    }
    return undefined; //use default iOS
  }

  function getTrackColors() {
    if (Platform.OS === "android") {
      return {
        true: disabled
          ? tokens["color-disabled--secondary"]
          : tokens["color-green--lighter"],
        false: disabled
          ? tokens["color-disabled--secondary"]
          : tokens["color-disabled"],
      };
    } else {
      //iOS
      return {
        true: tokens["color-interactive"],
        false: tokens["color-surface--background"],
      };
    }
  }

  return (
    <Switch
      value={internalValue}
      onValueChange={(val: boolean) => {
        if (!disabled) {
          onValueChange?.(val);
          field.onChange(val);
        }
      }}
      disabled={disabled}
      thumbColor={getThumbColor()}
      trackColor={getTrackColors()}
      ios_backgroundColor={tokens["color-surface--background"]}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole={"switch"}
      accessibilityState={{
        disabled: disabled,
        checked: internalValue,
      }}
    />
  );
}
