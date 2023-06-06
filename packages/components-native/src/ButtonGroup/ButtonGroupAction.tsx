import { IconColorNames, IconNames } from "@jobber/design";
import React from "react";
import { ButtonType, ButtonVariation } from "../Button";

export interface ButtonGroupActionProps {
  /**
   * Text to be displayed on the action button
   */
  label: string;

  /**
   * Icon to be displayed on the action button
   */
  icon?: IconNames;

  /**
   * Determines the color of the icon. If not specified, some icons have a default system colour which will be used
   * Others that don't have a system colour fall back to greyBlue.
   * Only applies the iconColor to ButtonGroup.PrimaryAction when it is rendered under the "more" menu.
   */
  iconColor?: IconColorNames;

  /**
   * Press handler for the action button
   */
  onPress: () => void;
  loading?: boolean;
}

export interface ButtonGroupSecondaryActionProps
  extends ButtonGroupActionProps {
  /**
   * Indicates whether the secondary action is destructive in nature.
   */
  destructive?: boolean;
}

export interface ButtonGroupPrimaryActionProps extends ButtonGroupActionProps {
  /**
   * Sets the action button style (default: "primary")
   */
  buttonType?: ButtonType;

  /**
   * Themes the action button to the type of action it performs (default: "work")
   */
  buttonVariation?: ButtonVariation;

  /**
   * Optional custom button that can be rendered in place of the primary action button
   */
  customButton?: JSX.Element;
  loading?: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function PrimaryAction(_: ButtonGroupPrimaryActionProps): JSX.Element {
  return <></>;
}

export function SecondaryAction(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _: ButtonGroupSecondaryActionProps,
): JSX.Element {
  return <></>;
}
