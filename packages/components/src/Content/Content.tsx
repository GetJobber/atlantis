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
   * The html tag name to use as the container element
   * Defaults to 'div'
   * Must be a valid HTML5 element that accepts children
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
