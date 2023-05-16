import React from "react";
import {
  // eslint-disable-next-line no-restricted-imports
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
  focused: boolean;
  disabled?: boolean;
  hasMiniLabel: boolean;
  inputInvalid: boolean;
  label: string;
  styleOverride?: StyleProp<TextStyle>;
}

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
  focused: boolean;
  disabled?: boolean;
  hasMiniLabel: boolean;
  inputInvalid?: boolean;
  icon: IconNames;
  styleOverride?: StyleProp<ViewStyle>;
}

export function PrefixIcon({
  focused,
  disabled,
  inputInvalid,
  icon,
}: PrefixIconProps): JSX.Element {
  return (
    <View
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
