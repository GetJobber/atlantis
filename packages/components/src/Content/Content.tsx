import React, { ReactNode } from "react";
import classnames from "classnames";
import spacings from "./Spacing.css";
import styles from "./Content.css";
import { useResizeObserver } from "../useResizeObserver";

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
  const [ref, result] = useResizeObserver();
  const isWide = result.width > 300;
  const isSuperWide = result.width > 600;
  const className = classnames(
    styles.padded,
    spacings[spacing],
    isWide && styles.wide,
    isSuperWide && styles.superWide,
  );

  return (
    <div className={className} ref={ref}>
      {children}
    </div>
  );
}
