import React from "react";
import type {
  LayoutChangeEvent,
  StyleProp,
  TextStyle,
  ViewStyle,
} from "react-native";
import { Text as RNText, View } from "react-native";
import type { FieldError } from "react-hook-form";
import type { IconNames } from "@jobber/design";
import { useStyles } from "./InputFieldWrapper.style";
import { PrefixIcon, PrefixLabel } from "./components/Prefix/Prefix";
import { SuffixIcon, SuffixLabel } from "./components/Suffix/Suffix";
import { ClearAction } from "./components/ClearAction";
import { Glimmer } from "../Glimmer/Glimmer";
import { ErrorMessageWrapper } from "../ErrorMessageWrapper";
import type { TextVariation } from "../Typography";
import { useTypographyStyles } from "../Typography";
import { Text } from "../Text";
import { ActivityIndicator } from "../ActivityIndicator";

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

  /**
   * Controls how the placeholder text is displayed.
   * - normal: the placeholder text will be displayed in the normal placeholder position
   * - mini: the placeholder text will float above the input value
   * - hidden: the placeholder text will not be displayed
   * @default "normal"
   */
  readonly placeholderMode?: "normal" | "mini" | "hidden";

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

  /**
   * Add a toolbar below the input field for actions like rewriting the text.
   */
  readonly toolbar?: React.ReactNode;

  /**
   * Change the behaviour of when the toolbar becomes visible.
   */
  readonly toolbarVisibility?: "always" | "while-editing";

  /**
   * Show loading indicator.
   */
  readonly loading?: boolean;

  /**
   * Change the type of loading indicator to spinner or glimmer.
   */
  readonly loadingType?: "spinner" | "glimmer";

  /**
   * @internal DO NOT USE UNLESS YOU TALK TO MICHAEL PARADIS FIRST
   * TODO: JOB-147156 This is a HACK for multiline inputs on iOS scrolling issue.
   * This hack should be removed once we swap keyboard aware libraries in JOB-147156
   *  If this is needed then we need to figure out a better solution.
   */
  readonly scrollViewHackOnLayout?: (event: LayoutChangeEvent) => void;
}

export const INPUT_FIELD_WRAPPER_GLIMMERS_TEST_ID =
  "ATL-InputFieldWrapper-Glimmers";
export const INPUT_FIELD_WRAPPER_SPINNER_TEST_ID =
  "ATL-InputFieldWrapper-Spinner";

export function InputFieldWrapper({
  invalid,
  disabled,
  placeholder,
  assistiveText,
  prefix,
  suffix,
  placeholderMode = "normal",
  hasValue = false,
  error,
  focused = false,
  children,
  onClear,
  showClearAction = false,
  styleOverride,
  toolbar,
  toolbarVisibility = "while-editing",
  loading = false,
  loadingType = "spinner",
  scrollViewHackOnLayout,
}: InputFieldWrapperProps) {
  fieldAffixRequiredPropsCheck([prefix, suffix]);
  const handleClear = onClear ?? noopClear;
  warnIfClearActionWithNoOnClear(onClear, showClearAction);
  const inputInvalid = Boolean(invalid) || Boolean(error);
  const isToolbarVisible =
    toolbar && (toolbarVisibility === "always" || focused);

  const showLoadingSpinner = loading && loadingType === "spinner";
  const showLoadingGlimmer = loading && loadingType === "glimmer";
  const styles = useStyles();

  const placeholderVisible = placeholderMode !== "hidden";
  const miniLabelActive = placeholderMode === "mini";

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
        onLayout={scrollViewHackOnLayout}
      >
        <View style={styles.field}>
          {prefix?.icon && (
            <PrefixIcon
              disabled={disabled}
              focused={focused}
              inputInvalid={inputInvalid}
              icon={prefix.icon}
            />
          )}
          <View style={[styles.inputContainer]}>
            {placeholderVisible && (
              <View
                style={[
                  !!placeholder && styles.label,
                  miniLabelActive && styles.miniLabel,
                  disabled && styles.disabled,
                  miniLabelActive &&
                    showClearAction &&
                    styles.miniLabelShowClearAction,
                ]}
                pointerEvents="none"
              >
                <Placeholder
                  placeholder={placeholder}
                  labelVariation={getLabelVariation(error, invalid, disabled)}
                  miniLabelActive={miniLabelActive}
                  styleOverride={styleOverride?.placeholderText}
                />
              </View>
            )}
            {prefix?.label && hasValue && (
              <PrefixLabel
                disabled={disabled}
                focused={focused}
                miniLabelActive={miniLabelActive}
                inputInvalid={inputInvalid}
                label={prefix.label}
                styleOverride={styleOverride?.prefixLabel}
              />
            )}
            {children}

            {showLoadingGlimmer && (
              <View
                testID={INPUT_FIELD_WRAPPER_GLIMMERS_TEST_ID}
                style={[
                  styles.loadingGlimmers,
                  hasValue && styles.loadingGlimmersHasValue,
                ]}
              >
                <Glimmer size="small" width="80%" />
                <Glimmer size="small" />
                <Glimmer size="small" width="70%" />
              </View>
            )}

            {(showClearAction ||
              suffix?.label ||
              suffix?.icon ||
              showLoadingSpinner) && (
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
                    miniLabelActive={miniLabelActive}
                    inputInvalid={inputInvalid}
                    label={suffix.label}
                    hasLeftMargin={!showClearAction}
                    styleOverride={styleOverride?.suffixLabel}
                  />
                )}

                {showLoadingSpinner && (
                  <View style={styles.loadingSpinner}>
                    <ActivityIndicator
                      testID={INPUT_FIELD_WRAPPER_SPINNER_TEST_ID}
                    />
                  </View>
                )}

                {suffix?.icon && (
                  <SuffixIcon
                    disabled={disabled}
                    focused={focused}
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

        {isToolbarVisible && <View style={styles.toolbar}>{toolbar}</View>}
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
  disabled?: boolean,
): TextVariation {
  if (invalid || error) {
    return "error";
  } else if (disabled) {
    return "disabled";
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
  miniLabelActive,
}: {
  readonly placeholder?: string;
  readonly styleOverride: StyleProp<TextStyle>;
  readonly labelVariation: TextVariation;
  readonly miniLabelActive: boolean;
}) {
  const typographyStyles = useTypographyStyles();

  return (
    <>
      {!styleOverride ? (
        <Text
          hideFromScreenReader={true}
          maxLines="single"
          variation={labelVariation}
          level={miniLabelActive ? "textSupporting" : "text"}
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
            miniLabelActive
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
