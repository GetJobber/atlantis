import React, { CSSProperties, PropsWithChildren } from "react";
// import chunk from "lodash/chunk";
import classnames from "classnames";
import { ColumnKeys, Direction, Spacing } from "./Flex.types";
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
   * Adjusts the alignment of the Flex children.
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

  readonly direction?: Direction;
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

function generateGridStylesFromTemplate(
  direction: Direction,
  layoutTemplate: ColumnKeys[],
): CSSProperties {
  const containerStyles: CSSProperties = {};
  const templateKeys = {
    row: "gridTemplateColumns",
    column: "gridTemplateRows",
  } as const;
  const templateValues = {
    grow: "1fr",
    shrink: "max-content",
  } as const;

  containerStyles[templateKeys[direction]] = layoutTemplate
    .map(key => templateValues[key])
    .join(" ");

  return containerStyles;
}
