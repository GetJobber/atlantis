import React from "react";
import { TouchableOpacity } from "react-native";
import { IconColorNames, IconNames } from "@jobber/design";
import { styles } from "./IconButton.style";
import { Icon } from "../Icon";

interface IconButtonProps {
  /**
   * Press handler
   */
  onPress?(): void;

  /** The icon to show.  */
  readonly name: IconNames;

  /**
   * Accessibilty label for the component. It's also used for testing
   */
  readonly accessibilityLabel: string;

  /**
   * Determines the color of the icon. If not specified, some icons have a default system colour
   * like quotes, jobs, and invoices.
   * Others that don't have a system colour fall back to greyBlue.
   */
  readonly color?: IconColorNames;

  /**
   * Sets a custom color for the icon. Can be a rgb() or hex value.
   */
  readonly customColor?: string;

  /**
   * a component that would render over the icon
   * e.g. the number of notifications over the activity feed icon
   */
  readonly badge?: React.ReactNode;

  /**
   * Used to locate this button in tests
   */
  readonly testID?: string;
}

export function IconButton({
  badge,
  name,
  color,
  customColor,
  onPress,
  accessibilityLabel,
  testID,
}: IconButtonProps): JSX.Element {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.container}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="button"
      testID={testID}
    >
      {badge}
      <Icon name={name} color={color} customColor={customColor} />
    </TouchableOpacity>
  );
}
