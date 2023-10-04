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
   *  @default "base"
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
  shrink: "max-content",
};

export function Flex({
  align = "center",
  children,
  direction = "row",
  gap = "base",
  template = [],
}: FlexProps) {
  if (template.length && template.length !== Children.count(children)) {
    console.warn(
      "Flex template length does not match children count, this may cause unexpected results.",
    );
  }

  const templateKey =
    direction === "row" ? "gridTemplateColumns" : "gridTemplateRows";

  const containerStyles: CSSProperties = {};

  if (template.length) {
    containerStyles[templateKey] = template
      .map(key => templateValues[key])
      .join(" ");
  }

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
