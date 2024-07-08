import { ReactElement, ReactNode } from "react";
import colors from "./colors.css";
import { ButtonProps } from "../Button";
import { MenuProps } from "../Menu";

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
   *
   */
  readonly title?: string;

  /**
   * The header props of the card.
   */
  readonly header?: string | HeaderActionProps | ReactElement;
}
