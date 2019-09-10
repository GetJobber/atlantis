import React, { ReactNode } from "react";
import classnames from "classnames";
import spacings from "./Spacing.css";
import paddings from "./Paddings.css";

interface ContentProps {
  readonly children: ReactNode | ReactNode[];
  /**
   * Determines the spacing within the component
   */
  readonly padding?: keyof typeof paddings;
  /**
   * The amount of vertical spacing between the children
   *
   * @default base
   */
  readonly spacing?: keyof typeof spacings;
}

export function Content({ children, spacing = "base", padding }: ContentProps) {
  const className = classnames(spacings[spacing], padding && paddings[padding]);

  return <div className={className}>{children}</div>;
}
