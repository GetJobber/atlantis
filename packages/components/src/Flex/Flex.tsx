import React, { CSSProperties, PropsWithChildren, useState } from "react";
// import chunk from "lodash/chunk";
import classnames from "classnames";
import { useSafeLayoutEffect } from "@jobber/hooks/useSafeLayoutEffect";
import { ColumnKeys, Direction, Spacing } from "./Flex.types";
import styles from "./Flex.module.css";

interface FlexProps extends PropsWithChildren {
  /**
   * Determine how the children gets laid out
   *
   * **Supported keys**
   * - `"grow"` - Grows to the space available. If all children are set to
   *   grow, then they'll have equal width.
   * - `"shrink"` - Shrinks to the smallest size possible. Normally the size of
   *   the child.
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
  template,
}: FlexProps) {
  const [style, setStyle] = useState<CSSProperties>({});

  useSafeLayoutEffect(() => {
    setStyle(generateGridStylesFromTemplate(direction, template));
  }, [direction, template]);

  return (
    <div
      className={classnames(styles.flexible, {
        [styles[`${gap}Gap`]]: Boolean(gap),
        [styles[`${align}Align`]]: Boolean(align),
      })}
      style={style}
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
