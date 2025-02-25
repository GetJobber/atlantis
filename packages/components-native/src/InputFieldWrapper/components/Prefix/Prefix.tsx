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
import { useAtlantisTheme } from "../../../AtlantisThemeContext";
import { useTypographyStyles } from "../../../Typography";
import { useStyles } from "../../InputFieldWrapper.style";

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
  const styles = useStyles();
  const typographyStyles = useTypographyStyles();

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
  const styles = useStyles();
  const { tokens } = useAtlantisTheme();

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
