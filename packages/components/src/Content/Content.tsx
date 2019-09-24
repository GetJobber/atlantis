import React, { ReactNode } from "react";
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
   * Adds a padding around the component. This padding adapts to the component
   * it's used in such as Card or Modal. If there's no padding to adapt to, then
   * the padding doesn't apply.
   *
   * @default true
   */
  readonly padded?: boolean;
}

export function Content({
  children,
  spacing = "base",
  padded = true,
}: ContentProps) {
  const className = classnames(padded && styles.padded, spacings[spacing]);

  return <div className={className}>{children}</div>;
}
