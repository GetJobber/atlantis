import React from "react";
import {
  Text as RNText,
  StyleProp,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import { IconNames } from "@jobber/design";
import { Icon } from "../../../Icon";
import { Text } from "../../../Text";
import { tokens } from "../../../utils/design";
import { typographyStyles } from "../../../Typography";
import { styles } from "../../InputFieldWrapper.style";

export interface PrefixLabelProps {
  readonly focused: boolean;
  readonly disabled?: boolean;
  readonly hasMiniLabel: boolean;
  readonly inputInvalid: boolean;
  readonly label: string;
  readonly styleOverride?: StyleProp<TextStyle>;
}

export const prefixLabelTestId = "ATL-InputFieldWrapper-PrefixLabel";
export const prefixIconTestId = "ATL-InputFieldWrapper-PrefixIcon";

export function PrefixLabel({
  focused,
  disabled,
  hasMiniLabel,
  inputInvalid,
  label,
  styleOverride,
}: PrefixLabelProps): JSX.Element {
  return (
    <View
      style={[
        styles.fieldAffix,
        focused && styles.inputFocused,
        inputInvalid && styles.inputInvalid,
      ]}
      testID={prefixLabelTestId}
    >
      <View
        style={[styles.prefixLabel, hasMiniLabel && styles.fieldAffixMiniLabel]}
      >
        {!styleOverride ? (
          <Text variation={disabled ? "disabled" : "base"}>{label}</Text>
        ) : (
          <RNText
            allowFontScaling={true}
            style={[
              typographyStyles.baseRegularRegular,
              typographyStyles.base,
              typographyStyles.defaultSize,
              disabled ? typographyStyles.subdued : typographyStyles.base,
              styleOverride,
            ]}
          >
            {label}
          </RNText>
        )}
      </View>
    </View>
  );
}

export interface PrefixIconProps {
  readonly focused: boolean;
  readonly disabled?: boolean;
  readonly hasMiniLabel: boolean;
  readonly inputInvalid?: boolean;
  readonly icon: IconNames;
  readonly styleOverride?: StyleProp<ViewStyle>;
}

export function PrefixIcon({
  focused,
  disabled,
  inputInvalid,
  icon,
}: PrefixIconProps): JSX.Element {
  return (
    <View
      testID={prefixIconTestId}
      style={[
        styles.fieldAffix,
        focused && styles.inputFocused,
        inputInvalid && styles.inputInvalid,
      ]}
    >
      <View style={styles.prefixIcon}>
        <Icon
          customColor={
            disabled ? tokens["color-disabled"] : tokens["color-greyBlue"]
          }
          name={icon}
        />
      </View>
    </View>
  );
}
