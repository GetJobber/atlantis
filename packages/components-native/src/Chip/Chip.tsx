import React, { useMemo } from "react";
import { AccessibilityRole, Pressable, View } from "react-native";
import { IconNames } from "@jobber/design";
import { styles } from "./Chip.style";
import { Icon } from "../Icon";
import { Typography } from "../Typography";
import { tokens } from "../utils/design";

export type AccentType = "client" | "invoice" | "job" | "request" | "quote";

export interface ChipProps {
  /**
   * label of the chip.
   */
  readonly label?: string;

  /**
   * chip's active status
   */
  readonly isActive: boolean;

  /**
   * Boolean for chip's ability to be dismissed
   */
  readonly isDismissible?: boolean;

  /**
   * Background color to be used for inactive chips
   *
   * @default "background"
   */
  readonly inactiveBackgroundColor?: "surface" | "background";

  /**
   * Accessibility label for the component. It's also used for testing
   */
  readonly accessibilityLabel?: string;

  /**
   * Accessibility role for the component
   */
  readonly accessibilityRole?: AccessibilityRole;

  /**
   * Press handler
   */
  onPress?(): void;

  /**
   * Optional Icon
   */
  readonly icon?: IconNames;

  /**
   * Background color to be used for Active chips
   */
  readonly accent?: AccentType;
}

const defaultAccentColor = tokens["color-surface--reverse"];

export function Chip({
  icon,
  label,
  onPress,
  isDismissible,
  isActive,
  inactiveBackgroundColor = "background",
  accessibilityLabel,
  accessibilityRole = "radio",
  accent,
}: ChipProps): JSX.Element {
  const { chipStyle, iconCustomColor, dismissColor } = useMemo(() => {
    const accentColor = accent ? tokens[`color-${accent}`] : defaultAccentColor;

    const iconColor = isActive ? tokens["color-surface"] : accentColor;
    const chip = [
      styles.container,
      {
        backgroundColor:
          inactiveBackgroundColor === "surface"
            ? tokens["color-surface"]
            : tokens["color-surface--background"],
      },
      isActive && { backgroundColor: accentColor },
    ];
    const dismiss =
      (isActive || inactiveBackgroundColor === "surface") &&
      styles.activeDismissIcon;

    return {
      chipStyle: chip,
      iconCustomColor: iconColor,
      dismissColor: dismiss,
    };
  }, [accent, isActive, inactiveBackgroundColor]);

  const accessibilityState = useMemo(() => {
    const checkableRoles = ["radio", "switch", "togglebutton", "checkbox"];
    if (checkableRoles.includes(accessibilityRole)) {
      return { checked: isActive };
    }
    return {};
  }, [accessibilityRole, isActive]);

  return (
    <Pressable
      testID="chipTest"
      hitSlop={{ top: 8, bottom: 8, left: 4, right: 4 }}
      onPress={onPress}
      disabled={typeof onPress !== "function"}
      style={chipStyle}
      accessibilityLabel={accessibilityLabel || label}
      accessibilityRole={accessibilityRole}
      accessibilityState={accessibilityState}
    >
      {icon && (
        <View style={styles.iconLeft}>
          <Icon name={icon} size={"base"} customColor={iconCustomColor} />
        </View>
      )}
      {label && (
        <View style={styles.chipText}>
          <Typography
            color="base"
            fontWeight="medium"
            maxFontScaleSize={tokens["typography--fontSize-large"]}
            maxLines="single"
            reverseTheme={isActive}
          >
            {label}
          </Typography>
        </View>
      )}
      {isDismissible && (
        <View style={[styles.dismissIcon, dismissColor]}>
          <Icon name={"remove"} size={"small"} />
        </View>
      )}
    </Pressable>
  );
}
