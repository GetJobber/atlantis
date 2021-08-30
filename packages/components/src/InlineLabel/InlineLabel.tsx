import React, { ReactNode } from "react";
import { XOR } from "ts-xor";
import classnames from "classnames";
import styles from "./InlineLabel.css";
import { Typography } from "../Typography";
import { ButtonDismiss } from "../ButtonDismiss";

export type InlineLabelColors =
  | "greyBlue"
  | "red"
  | "orange"
  | "green"
  | "blue"
  | "yellow"
  | "lime"
  | "purple"
  | "pink"
  | "teal"
  | "yellowGreen"
  | "blueDark"
  | "lightBlue"
  | "indigo";

interface BaseInlineLabelProps {
  /**
   * The size of the label
   * @default base
   */
  size?: "base" | "large" | "larger";
  /**
   * The color of the label
   * @default "greyBlue"
   */
  color?: InlineLabelColors;
  children: ReactNode;
}

interface DismissableInlineLabelProps extends BaseInlineLabelProps {
  dismissable: boolean;
  dismissAriaLabel: string;
  onDismiss(): void;
}

type InlineLabelProps = XOR<BaseInlineLabelProps, DismissableInlineLabelProps>;

interface SizeMapProps {
  [key: string]: "small" | "base" | "large";
}

export function InlineLabel({
  size = "base",
  color = "greyBlue",
  children,
  dismissable = false,
  dismissAriaLabel,
  onDismiss,
}: InlineLabelProps) {
  const className = classnames(styles.inlineLabel, styles[size], styles[color]);

  const sizeMapper: SizeMapProps = {
    base: "small",
    large: "base",
    larger: "large",
  };

  return (
    <span className={className}>
      <Typography element="span" size={sizeMapper[size]} textCase="uppercase">
        {children}
      </Typography>
      {dismissable && (
        <ButtonDismiss
          onClick={() => {
            onDismiss && onDismiss();
          }}
          ariaLabel={dismissAriaLabel || ""}
          size="small"
        />
      )}
    </span>
  );
}
