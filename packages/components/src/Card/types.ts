import { ReactElement, ReactNode } from "react";
import colors from "./cardcolors.module.css";
import { type ButtonProps } from "../Button";
import { type MenuProps } from "../Menu";

export type ActionProps = ReactElement<
  Omit<ButtonProps, "size" | "fullWidth"> | MenuProps
>;

export interface HeaderActionProps {
  /**
   * The title of the card.
   */
  readonly title?: string;
  /**
   * The action props that renders into a button on the card header.
   */
  readonly action?: ActionProps;
}

export type elevationProp = "none" | "low" | "base" | "high";

export interface CardProps {
  /**
   * The `accent`, if provided, will effect the color accent at the top of
   * the card.
   */
  readonly accent?: keyof typeof colors;
  readonly children: ReactNode | ReactNode[];
  /**
   * @deprecated
   * Use header instead.
   */
  readonly title?: string;

  /**
   * The header props of the card.
   */
  readonly header?: string | HeaderActionProps | ReactElement;
  readonly elevation?: elevationProp;
}

export interface CardHeaderProps {
  readonly children: ReactNode;
}

export interface CardBodyProps {
  readonly children: ReactNode;
}

export interface CardCompositionProps {
  Header: React.FC<CardHeaderProps>;
  Body: React.FC<CardBodyProps>;
}
