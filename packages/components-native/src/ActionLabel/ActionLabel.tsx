import React from "react";
import { tokens } from "../utils/design";
import { TextAlign, TextColor, Typography } from "../Typography";

export type ActionLabelVariation = Extract<
  TextColor,
  "interactive" | "destructive" | "learning" | "subtle" | "onPrimary"
>;

type ActionLabelType = "default" | "cardTitle";

interface ActionLabelProps {
  /**
   * Text to display
   */
  readonly children?: string;

  /**
   * Set the display text to disabled color
   */
  readonly disabled?: boolean;

  /**
   * The text color
   */
  readonly variation?: ActionLabelVariation;

  /**
   * Changes the appearance to match the style of where it's getting used
   */
  readonly type?: ActionLabelType;

  /**
   * Alignment of action label
   */
  readonly align?: TextAlign;
}

export function ActionLabel({
  children,
  variation = "interactive",
  type = "default",
  disabled = false,
  align = "center",
}: ActionLabelProps): JSX.Element {
  return (
    <Typography
      color={getColor(variation, disabled)}
      fontFamily="base"
      size="default"
      fontWeight={getFontWeight(type)}
      align={align}
      lineHeight="tight"
      letterSpacing={getLetterSpacing(type)}
      maxFontScaleSize={tokens["typography--fontSize-large"]}
      selectable={false}
    >
      {children}
    </Typography>
  );
}

function getColor(variation: ActionLabelVariation, disabled: boolean) {
  if (disabled) {
    return "disabled";
  }
  if (variation) {
    return variation;
  }

  return "interactive";
}

function getFontWeight(type: ActionLabelType) {
  if (type === "cardTitle") {
    return "bold";
  }

  return "extraBold";
}

function getLetterSpacing(type: ActionLabelType) {
  if (type === "cardTitle") {
    return "base";
  }

  return "loose";
}
