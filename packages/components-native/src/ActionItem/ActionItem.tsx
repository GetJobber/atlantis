import React, { ReactNode } from "react";
import { View } from "react-native";
import { IconColorNames, IconNames } from "@jobber/design";
import { styles } from "./ActionItem.style";
import { ActionItemContainer } from "./components/ActionItemContainer";
import { Typography } from "../Typography";
import { Icon } from "../Icon";

export interface ActionItemProps {
  /**
   * Title of the Action Item
   */
  readonly title?: string;

  /**
   * Name of the icon to display before content
   */
  readonly icon?: IconNames;

  /**
   * Colour of the icon displayed before content
   */
  readonly iconColor?: IconColorNames;

  /**
   * Content to display.
   */
  readonly children?: ReactNode;

  /**
   * Action icon to display
   */
  readonly actionIcon?: ActionIconNames;

  /**
   * Colour of the action icon
   */
  readonly actionIconColour?: ActionIconColour;

  /**
   * Alignment of action icon
   */
  readonly actionIconAlignment?: "flex-start" | "flex-end" | "center";

  /**
   * Press handler
   */
  readonly onPress?: () => void;

  readonly testID?: string;
}

export function ActionItem({
  title,
  icon,
  iconColor,
  children,
  actionIcon = "edit",
  actionIconColour = "interactive",
  actionIconAlignment = "center",
  onPress,
  testID = "actionItem",
}: ActionItemProps): JSX.Element {
  const actionIconStyle = {
    justifyContent: actionIconAlignment,
  };

  const addIconOffset = icon || onPress ? styles.offsetForIcons : undefined;
  const titlePadding = children ? styles.titlePadding : undefined;

  return (
    <ActionItemContainer onPress={onPress} testID={testID} title={title}>
      {icon && (
        <View style={styles.icon}>
          <Icon name={icon} color={iconColor} />
        </View>
      )}
      <View style={[styles.content, addIconOffset]}>
        {title && (
          <View style={titlePadding}>
            <Typography
              color="heading"
              fontFamily="base"
              fontWeight="bold"
              size="default"
              lineHeight="base"
              accessibilityRole="header"
            >
              {title}
            </Typography>
          </View>
        )}
        {children}
      </View>
      {onPress && (
        <View style={[actionIconStyle, styles.actionIcon]}>
          <Icon
            name={getActionIcon(actionIcon)}
            color={getActionIconColour(actionIconColour)}
          />
        </View>
      )}
    </ActionItemContainer>
  );
}

type ActionIconColour =
  | "interactive"
  | "destructive"
  | "informative"
  | "subtle";

function getActionIconColour(
  actionIconColour: ActionIconColour,
): IconColorNames {
  if (actionIconColour === "subtle") {
    return "interactiveSubtle";
  }
  return actionIconColour;
}

type ActionIconNames = IconNames | "editpencil";

function getActionIcon(icon: ActionIconNames): IconNames {
  if (icon === "edit") {
    return "arrowRight";
  } else if (icon === "editpencil") {
    return "edit";
  }
  return icon;
}
