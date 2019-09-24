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
}

export function Content({ children, spacing = "base" }: ContentProps) {
  const className = classnames(styles.padded, spacings[spacing]);

  return <div className={className}>{children}</div>;
}
