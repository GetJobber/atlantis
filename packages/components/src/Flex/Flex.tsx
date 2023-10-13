import React, { CSSProperties, PropsWithChildren } from "react";
// import chunk from "lodash/chunk";
import classnames from "classnames";
import { ColumnKeys, Spacing } from "./Flex.types";
import styles from "./Flex.css";

interface FlexProps extends PropsWithChildren {
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
  readonly template: ColumnKeys[];

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

function generateGridStylesFromTemplate(
  flowDirection: string,
  layoutTemplate: ColumnKeys[],
): CSSProperties {
  const containerStyles: CSSProperties = {};
  const templateKey =
    flowDirection === "row" ? "gridTemplateColumns" : "gridTemplateRows";

  containerStyles[templateKey] = layoutTemplate
    .map(key => (key === "grow" ? "1fr" : "max-content"))
    .join(" ");

  return containerStyles;
}

export function Flex({
  align = "center",
  children,
  direction = "row",
  gap = "base",
  template = [],
}: FlexProps) {
  return (
    <div
      className={classnames(styles.flexible, {
        [styles[`${gap}Gap`]]: Boolean(gap),
        [styles[`${align}Align`]]: Boolean(align),
      })}
      style={generateGridStylesFromTemplate(direction, template)}
    >
      {children}
    </div>
  );
}
