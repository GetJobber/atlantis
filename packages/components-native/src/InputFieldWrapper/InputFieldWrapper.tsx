import React from "react";
import {
  // eslint-disable-next-line no-restricted-imports
  Text as RNText,
  StyleProp,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import { FieldError } from "react-hook-form";
import { IconNames } from "@jobber/design";
import { styles } from "./InputFieldWrapper.style";
import { PrefixIcon, PrefixLabel } from "./components/Prefix/Prefix";
import { SuffixIcon, SuffixLabel } from "./components/Suffix/Suffix";
import { ClearAction } from "./components/ClearAction";
import { ErrorMessageWrapper } from "../ErrorMessageWrapper";
import { TextVariation, typographyStyles } from "../Typography";
import { Text } from "../Text";

export type Clearable = "never" | "while-editing" | "always";

export interface InputFieldStyleOverride {
  prefixLabel?: StyleProp<TextStyle>;
  suffixLabel?: StyleProp<TextStyle>;
  container?: StyleProp<ViewStyle>;
  placeholderText?: StyleProp<TextStyle>;
}
export interface InputFieldWrapperProps {
  /**
   * Highlights the field red and shows message below (if string) to indicate an error
   */
  readonly invalid?: boolean | string;

  /**
   * Disable the input
   */
  readonly disabled?: boolean;

  /**
   * Hint text that goes above the value once the field is filled out
   */
  readonly placeholder?: string;

  /**
   * Text that goes below the input to help the user understand the input
   */
  readonly assistiveText?: string;

  readonly hasMiniLabel?: boolean;

  readonly hasValue?: boolean;

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
    onPress?: () => void;
  };

  readonly error?: FieldError;

  readonly focused?: boolean;

  readonly children: React.ReactNode;

  /**
   * Adds the ClearAction that will call the onClear handler when pressed
   */
  readonly showClearAction?: boolean;

  /**
   * Callback called when the user clicks the ClearAction button. Should clear the value passed.
   * To disallow clearing set the clearable prop to never
   */
  readonly onClear?: () => void;

  /**
   * Custom styling to override default style of the input field
   */
  readonly styleOverride?: InputFieldStyleOverride;
}

export function InputFieldWrapper({
  invalid,
  disabled,
  placeholder,
  assistiveText,
  prefix,
  suffix,
  hasMiniLabel = false,
  hasValue = false,
  error,
  focused = false,
  children,
  onClear,
  showClearAction = false,
  styleOverride,
}: InputFieldWrapperProps): JSX.Element {
  fieldAffixRequiredPropsCheck([prefix, suffix]);
  const handleClear = onClear ?? noopClear;
  warnIfClearActionWithNoOnClear(onClear, showClearAction);
  const inputInvalid = Boolean(invalid) || Boolean(error);

  return (
    <ErrorMessageWrapper message={getMessage({ invalid, error })}>
      <View
        testID={"ATL-InputFieldWrapper"}
        style={[
          styles.container,
          focused && styles.inputFocused,
          (Boolean(invalid) || error) && styles.inputInvalid,
          disabled && styles.disabled,
          styleOverride?.container,
        ]}
      >
        {prefix?.icon && (
          <PrefixIcon
            disabled={disabled}
            focused={focused}
            hasMiniLabel={hasMiniLabel}
            inputInvalid={inputInvalid}
            icon={prefix.icon}
          />
        )}
        <View style={[styles.inputContainer]}>
          <View
            style={[
              !!placeholder && styles.label,
              hasMiniLabel && styles.miniLabel,
              disabled && styles.disabled,
              hasMiniLabel &&
                showClearAction &&
                styles.miniLabelShowClearAction,
            ]}
            pointerEvents="none"
          >
            <Placeholder
              placeholder={placeholder}
              labelVariation={getLabelVariation(
                error,
                invalid,
                focused,
                disabled,
              )}
              hasMiniLabel={hasMiniLabel}
              styleOverride={styleOverride?.placeholderText}
            />
          </View>
          {prefix?.label && hasValue && (
            <PrefixLabel
              disabled={disabled}
              focused={focused}
              hasMiniLabel={hasMiniLabel}
              inputInvalid={inputInvalid}
              label={prefix.label}
              styleOverride={styleOverride?.prefixLabel}
            />
          )}
          {children}
          {(showClearAction || suffix?.label || suffix?.icon) && (
            <View style={styles.inputEndContainer}>
              {showClearAction && (
                <ClearAction
                  hasMarginRight={!!suffix?.icon || !!suffix?.label}
                  onPress={handleClear}
                />
              )}
              {suffix?.label && hasValue && (
                <SuffixLabel
                  disabled={disabled}
                  focused={focused}
                  hasMiniLabel={hasMiniLabel}
                  inputInvalid={inputInvalid}
                  label={suffix.label}
                  hasLeftMargin={!showClearAction}
                  styleOverride={styleOverride?.suffixLabel}
                />
              )}
              {suffix?.icon && (
                <SuffixIcon
                  disabled={disabled}
                  focused={focused}
                  hasMiniLabel={hasMiniLabel}
                  hasLeftMargin={!!(!showClearAction || suffix?.label)}
                  inputInvalid={inputInvalid}
                  icon={suffix.icon}
                  onPress={suffix.onPress}
                />
              )}
            </View>
          )}
        </View>
      </View>
      {assistiveText && !error && !invalid && (
        <Text
          level="textSupporting"
          variation={
            disabled ? "disabled" : focused ? "interactive" : "subdued"
          }
        >
          {assistiveText}
        </Text>
      )}
    </ErrorMessageWrapper>
  );
}

function getLabelVariation(
  error?: FieldError,
  invalid?: boolean | string,
  focused?: boolean,
  disabled?: boolean,
): TextVariation {
  if (invalid || error) {
    return "error";
  } else if (disabled) {
    return "disabled";
  } else if (focused) {
    return "interactive";
  }
  return "subdued";
}

function fieldAffixRequiredPropsCheck(
  affixPair: [
    InputFieldWrapperProps["prefix"],
    InputFieldWrapperProps["suffix"],
  ],
) {
  affixPair.map(affix => {
    if (typeof affix !== "undefined" && !affix.icon && !affix.label) {
      throw new Error(
        `One of 'label' or 'icon' is required by the field affix component.`,
      );
    }
  });
}

function warnIfClearActionWithNoOnClear(
  onClear?: () => void,
  showClearAction?: boolean,
): void {
  if (showClearAction && !onClear && __DEV__) {
    console.warn(
      "Declare an `onClear` prop on your input. You can set `clearable` to never or `showClearAction` to false if you don't need a clearable input",
    );
  }
}

function noopClear() {
  warnIfClearActionWithNoOnClear(undefined, true);
}

function getMessage({
  invalid,
  error,
}: Pick<InputFieldWrapperProps, "invalid" | "error">): string | undefined {
  const messages: string[] = [];
  if (error?.message) messages.push(error.message);
  if (invalid && typeof invalid === "string") messages.push(invalid);

  return messages.join("\n");
}

function Placeholder({
  placeholder,
  styleOverride,
  labelVariation,
  hasMiniLabel,
}: {
  placeholder?: string;
  styleOverride: StyleProp<TextStyle>;
  labelVariation: TextVariation;
  hasMiniLabel: boolean;
}) {
  return (
    <>
      {!styleOverride ? (
        <Text
          hideFromScreenReader={true}
          maxLines="single"
          variation={labelVariation}
          level={hasMiniLabel ? "textSupporting" : "text"}
        >
          {placeholder}
        </Text>
      ) : (
        <RNText
          accessibilityRole="none"
          accessible={false}
          importantForAccessibility="no-hide-descendants"
          numberOfLines={1}
          style={[
            typographyStyles[labelVariation],
            typographyStyles.baseRegularRegular,
            hasMiniLabel
              ? typographyStyles.smallSize
              : typographyStyles.defaultSize,
            styleOverride,
          ]}
        >
          {placeholder}
        </RNText>
      )}
    </>
  );
}
