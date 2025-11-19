import type { Ref } from "react";
import React, { forwardRef } from "react";
import type { IconNames } from "@jobber/design";
import type { FieldError } from "react-hook-form";
import { Text as NativeText, Pressable } from "react-native";
import type { Clearable } from "@jobber/hooks";
import { useShowClear } from "@jobber/hooks";
import type { XOR } from "ts-xor";
import { useStyles } from "./InputPressable.style";
import type { InputFieldWrapperProps } from "../InputFieldWrapper";
import { InputFieldWrapper, useCommonInputStyles } from "../InputFieldWrapper";

interface BasicSuffix {
  icon?: IconNames;
  label?: string;
}

interface InteractiveSuffix {
  icon: IconNames;
  label?: string;
  onPress: () => void;
}

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
   * Indicates if the input is focused
   */
  readonly focused?: boolean;

  /**
   * Indicates if there is an validation error
   */
  readonly error?: FieldError;

  /**
   * Indicates the current selection is invalid
   */
  readonly invalid?: boolean | string;

  /**
   * Controls the visibility of the mini label that appears inside the input
   * when a value is entered. By default, the placeholder text moves up to
   * become a mini label. Set to false to disable this behavior.
   *
   * @default true
   */
  readonly showMiniLabel?: boolean;

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
  readonly suffix?: XOR<BasicSuffix, InteractiveSuffix>;

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
    showMiniLabel = true,
    onPress,
    accessibilityLabel,
    accessibilityHint,
    prefix,
    suffix,
    clearable = "never",
    onClear,
    focused,
  }: InputPressableProps,
  ref: Ref<InputPressableRef>,
) {
  const hasValue = !!value;

  const placeholderMode = getPlaceholderMode(showMiniLabel, value);

  const showClear = useShowClear({
    clearable,
    multiline: false,
    focused: false,
    hasValue,
    disabled,
  });

  const styles = useStyles();
  const commonInputStyles = useCommonInputStyles();

  return (
    <InputFieldWrapper
      prefix={prefix}
      suffix={suffix}
      hasValue={hasValue}
      placeholderMode={placeholderMode}
      focused={focused}
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
            placeholderMode === "normal" && commonInputStyles.inputEmpty,
            placeholderMode === "hidden" && styles.withoutMiniLabel,
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

function getPlaceholderMode(
  isMiniLabelAllowed: boolean,
  internalValue: string | undefined,
): InputFieldWrapperProps["placeholderMode"] {
  const hasValue = Boolean(internalValue);

  if (hasValue) {
    if (isMiniLabelAllowed) {
      return "mini";
    } else {
      return "hidden";
    }
  } else {
    return "normal";
  }
}
