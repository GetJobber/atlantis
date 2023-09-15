import { ReactNode, createElement } from "react";
import classnames from "classnames";
import spacings from "./Spacing.css";
import styles from "./Content.css";

interface ContentProps {
  readonly children: ReactNode | ReactNode[];
  /**
   * The amount of vertical spacing between the children
   *
   * @default base
   */
  readonly spacing?: keyof typeof spacings;

  /**
   * Change the wrapping element to be one of the available
   * semantic tags.
   *
   * @default 'div'
   */
  readonly type?:
    | "section"
    | "aside"
    | "header"
    | "footer"
    | "article"
    | "main"
    | "div";
}

export function Content({
  children,
  spacing = "base",
  type = "div",
}: ContentProps) {
  const className = classnames(styles.padded, spacings[spacing]);

  return createElement(type, { className }, children);
}
