import { IconColorNames, IconNames } from "@jobber/design";
import React from "react";
import { View } from "react-native";
import { styles } from "./EmptyState.style";
import { Text } from "../Text";
import { Content } from "../Content";
import { Icon } from "../Icon";
import { Heading } from "../Heading";
import { Button, ButtonType } from "../Button";

interface Action {
  label: string;
  onPress: () => void;
  disabled?: boolean;
}

interface ButtonAction {
  readonly action?: Action;
  readonly type: ButtonType;
}

function ButtonAction({ action, type }: ButtonAction) {
  if (!action) return <></>;

  return <Button fullWidth={false} type={type} {...action} />;
}

export interface EmptyStateProps {
  /**
   * Icon to display.
   */
  readonly icon?: IconNames;

  /**
   * Color of Icon to display.
   */
  readonly iconColor?: IconColorNames;

  /**
   * Title of the empty state.
   */
  readonly title?: string;

  /**
   * Description of the empty state.
   */
  readonly description?: string;

  /**
   * Handler for the primary action.
   */
  readonly primaryAction?: Action;

  /**
   * Handler for the secondary action.
   */
  readonly secondaryAction?: Action;
}

export function EmptyState({
  icon,
  title,
  description,
  primaryAction,
  secondaryAction,
  iconColor = "blue",
}: EmptyStateProps): JSX.Element {
  return (
    <Content>
      {icon && (
        <View style={styles.icon}>
          <Icon name={icon} size="large" color={iconColor} />
        </View>
      )}
      <Content spacing="none" childSpacing="small">
        {title && (
          <Heading level="subHeading" align="center">
            {title}
          </Heading>
        )}
        {description && <Text align="center">{description}</Text>}
        {(primaryAction || secondaryAction) && (
          <Content spacing="none" childSpacing="small">
            <ButtonAction action={primaryAction} type="primary" />
            <ButtonAction action={secondaryAction} type="tertiary" />
          </Content>
        )}
      </Content>
    </Content>
  );
}
