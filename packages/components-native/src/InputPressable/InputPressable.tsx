import React, { Ref, forwardRef, useEffect, useState } from "react";
import { IconNames } from "@jobber/design";
import { FieldError } from "react-hook-form";
import { Text as NativeText, Pressable } from "react-native";
import { styles } from "./InputPressable.style";
import {
  Clearable,
  InputFieldWrapper,
  commonInputStyles,
  useShowClear,
} from "../InputFieldWrapper";

export interface InputPressableProps {
  /**
   * Current value of the component
   */
  readonly value?: string;

  /**
   * Placeholder item shown until a selection is made
   */
  readonly placeholder?: string;

  /**
   * Disables input selection
   */
  readonly disabled?: boolean;

  /**
   * Indicates if there is an validation error
   */
  readonly error?: FieldError;

  /**
   * Indicates the current selection is invalid
   */
  readonly invalid?: boolean | string;

  /**
   * Callback that is called when the text input is focused
   * @param event
   */
  readonly onPress?: () => void;

  /**
   * VoiceOver will read this string when a user selects the element
   */
  readonly accessibilityLabel?: string;

  /**
   * Helps users understand what will happen when they perform an action
   */
  readonly accessibilityHint?: string;

  /**
   * Symbol to display before the text input
   */
  readonly prefix?: {
    icon?: IconNames;
    label?: string;
  };

  /**
   * Symbol to display after the text input
   */
  readonly suffix?: {
    icon?: IconNames;
    label?: string;
  };
  /**
   * Add a clear action on the input that clears the value.
   *
   * Since the input value isn't editable (i.e. `InputDateTime`) you can
   * set it to `always`. If you set it to `always` you must also provide an
   * onClear to clear the input's value
   */
  readonly clearable?: Clearable;
  /**
   * Callback called when the user clicks the ClearAction button. Should clear
   * the value passed. To disallow clearing set the clearable prop to never
   */
  readonly onClear?: () => void;
}

export type InputPressableRef = NativeText;
export const InputPressable = forwardRef(InputPressableInternal);

export function InputPressableInternal(
  {
    value,
    placeholder,
    disabled,
    invalid,
    error,
    onPress,
    accessibilityLabel,
    accessibilityHint,
    prefix,
    suffix,
    clearable = "never",
    onClear,
  }: InputPressableProps,
  ref: Ref<InputPressableRef>,
): JSX.Element {
  const hasValue = !!value;
  const [hasMiniLabel, setHasMiniLabel] = useState(Boolean(value));

  useEffect(() => {
    setHasMiniLabel(Boolean(value));
  }, [value]);

  const showClear = useShowClear({
    clearable,
    multiline: false,
    focused: false,
    hasValue,
    disabled,
  });

  return (
    <InputFieldWrapper
      prefix={prefix}
      suffix={suffix}
      hasValue={hasValue}
      hasMiniLabel={hasMiniLabel}
      focused={false}
      error={error}
      invalid={invalid}
      placeholder={placeholder}
      disabled={disabled}
      showClearAction={showClear}
      onClear={onClear}
    >
      <Pressable
        style={styles.pressable}
        onPress={onPress}
        disabled={disabled}
        accessibilityLabel={accessibilityLabel || placeholder}
        accessibilityHint={accessibilityHint}
        accessibilityValue={{ text: value }}
      >
        <NativeText
          style={[
            commonInputStyles.input,
            styles.inputPressableStyles,
            !hasMiniLabel && commonInputStyles.inputEmpty,
            disabled && commonInputStyles.inputDisabled,
            (Boolean(invalid) || error) && styles.inputInvalid,
          ]}
          testID="inputPressableText"
          ref={ref}
          accessibilityRole="none"
          accessible={false}
          importantForAccessibility="no-hide-descendants"
        >
          {value}
        </NativeText>
      </Pressable>
    </InputFieldWrapper>
  );
}
