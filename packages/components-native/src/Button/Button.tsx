import React from "react";
import { TouchableHighlight, View } from "react-native";
import { IconColorNames, IconNames } from "@jobber/design";
import { XOR } from "ts-xor";
import { styles } from "./Button.style";
// eslint-disable-next-line import/no-internal-modules
import { InternalButtonLoading } from "./components/InternalButtonLoading";
import { ButtonSize, ButtonType, ButtonVariation } from "./types";
import { ActionLabel, ActionLabelVariation } from "../ActionLabel";
import { Icon } from "../Icon";
import { tokens } from "../utils/design";

interface CommonButtonProps {
  /**
   * Press handler
   */
  readonly onPress?: () => void;

  /**
   * Themes the button to the type of action it performs
   */
  readonly variation?: ButtonVariation;

  /**
   * Sets the visual hierarchy
   */
  readonly type?: ButtonType;

  /**
   * Defines the size of the button
   *
   * @default "base"
   */
  readonly size?: ButtonSize;

  /**
   * Will make the button scale to take up all the available height
   */
  readonly fullHeight?: boolean;

  /**
   * Will make the button scale to take up all of the available width
   */
  readonly fullWidth?: boolean;

  /**
   * Makes the button un-clickable
   */
  readonly disabled?: boolean;

  /**
   * Accessibility hint to help users understand what will happen when they press the button
   */
  readonly accessibilityHint?: string;

  /**
   * Changes the button interface to imply loading and prevents the press callback
   *
   * @default false
   */
  readonly loading?: boolean;

  /**
   * Adds an leading icon beside the label.
   */
  readonly icon?: IconNames;

  /**
   * Accessibility label for the component. This is required for components that
   * have an `icon` but not a `label`.
   *
   * If the string is the same as the `label` prop, you don't need to add an
   * `accessibilityLabel`. **Don't use this for testing purposes.**
   */
  readonly accessibilityLabel?: string;
}

interface LabelButton extends CommonButtonProps {
  /**
   * Text to be displayed on the button
   */
  readonly label: string;
}

interface IconButton extends CommonButtonProps {
  readonly icon: IconNames;
  readonly accessibilityLabel: string;
}

export type ButtonProps = XOR<LabelButton, IconButton>;
export function Button({
  label,
  onPress,
  variation = "work",
  type = "primary",
  fullHeight = false,
  fullWidth = true,
  disabled = false,
  loading = false,
  size = "base",
  accessibilityLabel,
  accessibilityHint,
  icon,
}: ButtonProps): JSX.Element {
  const buttonStyle = [
    styles.button,
    styles[variation],
    styles[type],
    styles[size],
    disabled && styles.disabled,
    fullHeight && styles.fullHeight,
    fullWidth && styles.reducedPaddingForFullWidth,
  ];

  // attempts to use Pressable caused problems.  When a ScrollView contained
  // an InputText that was focused, it required two presses to activate the
  // Pressable.  Using a TouchableHighlight made things register correctly
  // in a single press

  return (
    <TouchableHighlight
      onPress={onPress}
      testID={accessibilityLabel || label}
      accessibilityLabel={accessibilityLabel || label}
      accessibilityHint={accessibilityHint}
      accessibilityRole="button"
      accessibilityState={{ disabled, busy: loading }}
      disabled={disabled || loading}
      underlayColor={tokens["color-greyBlue--dark"]}
      activeOpacity={tokens["opacity-pressed"]}
      style={[
        styles.touchable,
        fullWidth && styles.fullWidth,
        fullHeight && styles.fullHeight,
      ]}
    >
      <View style={buttonStyle}>
        {loading && <InternalButtonLoading variation={variation} type={type} />}
        <View style={getContentStyles(label, icon)}>
          {icon && (
            <View style={styles.iconStyle}>
              <Icon
                name={icon}
                color={getIconColorVariation(variation, type, disabled)}
              />
            </View>
          )}
          {label && (
            <View style={styles.labelStyle}>
              <ActionLabel
                variation={getActionLabelVariation(variation, type)}
                disabled={disabled}
                align={icon ? "start" : undefined}
              >
                {label}
              </ActionLabel>
            </View>
          )}
        </View>
      </View>
    </TouchableHighlight>
  );
}

function getActionLabelVariation(
  variation: string,
  type: string,
): ActionLabelVariation {
  if (type === "primary" && variation !== "cancel") {
    return "onPrimary";
  }

  switch (variation) {
    case "learning":
      return "learning";
    case "destructive":
      return "destructive";
    case "cancel":
      return "subtle";
    default:
      return "interactive";
  }
}

function getIconColorVariation(
  variation: ButtonVariation,
  type: string,
  disabled: boolean,
): IconColorNames {
  if (disabled) {
    return "disabled";
  }

  if (type === "primary" && variation !== "cancel") {
    return "white";
  }

  switch (variation) {
    case "learning":
      return "informative";
    case "destructive":
      return "destructive";
    case "cancel":
      return "interactiveSubtle";
    default:
      return "interactive";
  }
}

function getContentStyles(
  label: string | undefined,
  icon: IconNames | undefined,
) {
  if (label && !icon) {
    return undefined;
  }

  return [
    styles.content,
    icon && !!label && styles.iconPaddingOffset,
    !!label && styles.contentWithLabel,
  ];
}
