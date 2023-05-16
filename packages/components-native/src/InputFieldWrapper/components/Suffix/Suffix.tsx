import React from "react";
import {
  Pressable,
  // eslint-disable-next-line no-restricted-imports
  Text as RNText,
  StyleProp,
  TextStyle,
  View,
} from "react-native";
import { IconNames } from "@jobber/design";
import { tokens } from "../../../utils/design";
import { Icon } from "../../../Icon";
import { Text } from "../../../Text";
import { typographyStyles } from "../../../Typography";
import { styles } from "../../InputFieldWrapper.style";

export interface SuffixLabelProps {
  focused: boolean;
  disabled?: boolean;
  hasMiniLabel: boolean;
  inputInvalid?: boolean;
  label: string;
  hasLeftMargin?: boolean;
  styleOverride?: StyleProp<TextStyle>;
}

export function SuffixLabel({
  focused,
  disabled,
  hasMiniLabel,
  inputInvalid,
  label,
  hasLeftMargin = true,
  styleOverride,
}: SuffixLabelProps): JSX.Element {
  return (
    <View
      testID="suffixLabel"
      style={[
        styles.fieldAffix,
        focused && styles.inputFocused,
        inputInvalid && styles.inputInvalid,
        hasLeftMargin && styles.suffixLabelMargin,
      ]}
    >
      <View
        style={[styles.suffixLabel, hasMiniLabel && styles.fieldAffixMiniLabel]}
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

export interface SuffixIconProps {
  focused: boolean;
  disabled?: boolean;
  hasMiniLabel: boolean;
  inputInvalid?: boolean;
  icon: IconNames;
  hasLeftMargin?: boolean;
  onPress?: () => void;
}

export function SuffixIcon({
  focused,
  disabled,
  inputInvalid,
  icon,
  hasLeftMargin = false,
  onPress,
}: SuffixIconProps): JSX.Element {
  return (
    <View
      testID="suffixIcon"
      style={[
        styles.fieldAffix,
        focused && styles.inputFocused,
        inputInvalid && styles.inputInvalid,
      ]}
    >
      <Pressable
        style={[styles.suffixIcon, hasLeftMargin && styles.suffixIconMargin]}
        onPress={onPress}
      >
        <Icon
          customColor={
            disabled ? tokens["color-disabled"] : tokens["color-greyBlue"]
          }
          name={icon}
        />
      </Pressable>
    </View>
  );
}
