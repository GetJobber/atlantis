import React, { CSSProperties, Children, ReactNode } from "react";
// import chunk from "lodash/chunk";
import classnames from "classnames";
import { ColumnKeys, Spacing } from "./types";
import styles from "./Flex.css";

interface FlexProps {
  children: ReactNode;

  /**
   * Determine how the children gets laid out
   *
   * **Supported keys**
   * - `"grow"` - Grows to the space available. If all children are set to
   *   grow, then they'll have equal width.
   * - `"shrink"` - Shrinks to the smallest size possible. Normally the size of
   *   the child.
   * - `"auto"` - Grows to the size of the content.
   * - `"max-content"` - Grows to the size of the largest child.
   *
   * By default, this will set every children to grow in equal widths.
   */
  readonly template?: ColumnKeys[];

  /**
   * It works the same way as `alignItems` style with flex.
   */
  readonly align?: "start" | "end" | "center";

  /**
   * The spacing between the children.
   *
   *  @default "none"
   */
  readonly gap?: Spacing;

  /**
   * The direction of the content.
   *
   * @default "row"
   */

  readonly direction?: "row" | "column";
}

const templateValues = {
  grow: "1fr",
  auto: "auto",
  shrink: "min-content",
};

export function Flex({
  align = "center",
  children,
  direction = "row",
  gap = "none",
  template = [],
}: FlexProps) {
  if (template.length === 1) {
    console.warn("Please use <Content /> component for a stacked layout");
  }

  const templateKey =
    direction === "row" ? "gridTemplateColumns" : "gridTemplateRows";

  const containerStyles: CSSProperties = {
    [templateKey]: template.length
      ? template.map(item => templateValues[item]).join(" ")
      : new Array(Children.count(children)).fill("auto").join(" "),
  };

  return (
    <div
      className={classnames(
        template.length ? styles.grid : styles.flex,
        template.length === 0 && direction === "column" ? styles.column : null,
        gap ? styles[`${gap}Gap`] : null,
        align ? styles[`${align}Align`] : null,
      )}
      style={containerStyles}
    >
      {children}
    </div>
  );
}
