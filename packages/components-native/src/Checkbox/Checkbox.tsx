import React from "react";
import { ColorValue, Pressable, View } from "react-native";
import { XOR } from "ts-xor";
import { tokens } from "@jobber/design/foundation";
import { styles } from "./Checkbox.style";
import { Text } from "../Text";
import { Icon } from "../Icon";
import { FormField } from "../FormField";

interface CommonCheckboxProps {
  /**
   * Label to be displayed beside the checkbox
   */
  readonly label?: string;

  /**
   * Default value for when the checkbox is uncontrolled
   */
  readonly defaultChecked?: boolean;

  /**
   * When true, the checkbox is shown as indeterminate
   */
  readonly indeterminate?: boolean;

  /**
   * Checkbox is disabled
   */
  readonly disabled?: boolean;

  /**
   * Assistive Text, shown under label
   */
  readonly assistiveText?: string;

  /**
   * Accessibility Label for the checkbox. Defaults to label
   */
  readonly accessibilityLabel?: string;

  /**
   * Press handler
   */
  onChange?(value: boolean): void;

  /**
   * If the checkbox is checked. This should be set when this is intended as a controlled component
   */
  readonly checked?: boolean;

  /**
   * Name of the checkbox; this is important when using in a form component
   */
  readonly name?: string;
}

interface ControlledCheckboxProps extends CommonCheckboxProps {
  /**
   * Press handler
   */
  onChange(value: boolean): void;

  /**
   * If the checkbox is checked. This should be set when this is intended as a controlled component
   */
  readonly checked: boolean;
}

interface UncontrolledCheckboxProps extends CommonCheckboxProps {
  /**
   * Name of the checkbox; this is important when using in a form component
   */
  readonly name: string;
}

export type CheckboxProps = XOR<
  ControlledCheckboxProps,
  UncontrolledCheckboxProps
>;

export function Checkbox(props: CheckboxProps): JSX.Element {
  if (props.checked !== undefined && props.onChange !== undefined) {
    return <CheckboxInternal {...props} />;
  } else if (props.name) {
    return (
      <FormField<boolean> name={props.name} defaultValue={props.defaultChecked}>
        {field => {
          return (
            <CheckboxInternal
              {...props}
              checked={field.value}
              onChange={newValue => {
                props?.onChange?.(newValue);
                field.onChange(newValue);
              }}
            />
          );
        }}
      </FormField>
    );
  } else {
    throw new Error("Checkbox was given invalid props");
  }
}

function CheckboxInternal({
  label,
  checked,
  defaultChecked,
  indeterminate = false,
  disabled = false,
  assistiveText,
  onChange,
  accessibilityLabel,
}: CheckboxProps): JSX.Element {
  const internalValue = checked ?? !!defaultChecked;

  const iconName = indeterminate ? "minus2" : "checkmark";
  const textVariation = disabled ? "disabled" : "subdued";
  const a11yStateChecked = indeterminate ? "mixed" : internalValue;

  const backgroundColor = getBackgroundColor(
    internalValue,
    disabled,
    indeterminate,
  );

  return (
    <Pressable
      accessibilityRole="checkbox"
      accessibilityLabel={accessibilityLabel || label}
      accessibilityState={{
        disabled: disabled,
        checked: a11yStateChecked,
      }}
      disabled={disabled}
      style={({ pressed }) => [
        {
          opacity: pressed ? 0.2 : 1,
        },
        styles.container,
      ]}
      onPress={() => {
        onChange?.(!internalValue);
      }}
    >
      <View style={styles.checkBoxContainer}>
        {label && (
          <View style={styles.label}>
            <Text variation={textVariation} align="start">
              {label}
            </Text>
          </View>
        )}
        <View
          style={[
            styles.checkbox,
            disabled && styles.disabledCheckbox,
            {
              backgroundColor,
            },
          ]}
        >
          {(internalValue || indeterminate) && (
            <Icon name={iconName} color="white" />
          )}
        </View>
      </View>
      {assistiveText && (
        <Text level="textSupporting" align="start" variation={textVariation}>
          {assistiveText}
        </Text>
      )}
    </Pressable>
  );
}

function getBackgroundColor(
  checked: boolean,
  disabled: boolean,
  indeterminate: boolean,
): ColorValue {
  if (checked || indeterminate) {
    if (disabled) {
      return tokens["color-disabled"];
    } else {
      return tokens["color-interactive"];
    }
  } else {
    return tokens["color-overlay--dimmed"];
  }
}
