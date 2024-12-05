import React from "react";
import classnames from "classnames";
import styles from "./Divider.module.css";
import sizes from "./DividerSizes.module.css";
import directions from "./DividerDirections.module.css";

interface DividerProps {
  /**
   * The weight of the divider.
   *
   * @default "base"
   */
  readonly size?: keyof typeof sizes;

  /**
   * The direction of the divider
   *
   * @default "horizontal"
   */
  readonly direction?: keyof typeof directions;

  /**
   * A reference to the element in the rendered output
   */
  readonly testID?: string;
}

export function Divider({
  size = "base",
  direction = "horizontal",
  testID,
}: DividerProps) {
  const className = classnames(
    styles.divider,
    sizes[size],
    directions[direction],
  );

  return (
    <div className={className} data-testid={testID} role="none presentation" />
  );
}
