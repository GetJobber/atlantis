import { CSSProperties, ReactNode, createElement } from "react";
import classnames from "classnames";
import alignments from "./FlexAlign.css";
import gapStyles from "./Gaps.css";
import justifications from "./FlexJustify.css";
import styles from "./Flex.css";
import paddings from "./Paddings.css";

const gaps = {
  smallest: {
    row: gapStyles.rowGapSmallest,
    column: gapStyles.columnGapSmallest,
  },
  smaller: {
    row: gapStyles.rowGapSmaller,
    column: gapStyles.columnGapSmaller,
  },
  small: {
    row: gapStyles.rowGapSmall,
    column: gapStyles.columnGapSmall,
  },
  base: {
    row: gapStyles.rowGapBase,
    column: gapStyles.columnGapBase,
  },
  large: {
    row: gapStyles.rowGapLarge,
    column: gapStyles.columnGapLarge,
  },
  larger: {
    row: gapStyles.rowGapLarger,
    column: gapStyles.columnGapLarger,
  },
  largest: {
    row: gapStyles.rowGapLargest,
    column: gapStyles.columnGapLargest,
  },
  none: {
    row: gapStyles.rowGapNone,
    column: gapStyles.columnGapNone,
  },
};

interface FlexProps {
  /**
   * How flex items should align along the cross axis of the container
   */

  readonly align?: keyof typeof alignments;

  readonly children: ReactNode | ReactNode[];

  /**
   * The gap between flex columns
   */
  readonly columnGap?: keyof typeof gaps;

  /**
   *   Change the flex direction
   *
   *   @default row
   */
  readonly direction?: "row" | "column";

  /**
   * The height of the container
   */
  readonly height?: string;

  /**
   *   The id of the element
   */
  readonly id?: string;

  /**
   * How children should align along the main axis of the container
   */

  readonly justify?: keyof typeof justifications;

  /**
   *   Reverse the flex direction
   *
   *   @default false
   */
  readonly reverse?: boolean;

  /**
   *   Add padding to the flex container
   *
   *   @default none
   */
  readonly padding?: keyof typeof paddings;

  /**
   * The gap between flex rows
   */
  readonly rowGap?: keyof typeof gaps;

  /**
   *   The data-testid of the element
   */
  readonly testId?: string;

  /**
   * Change the wrapping element to be one of the available
   * semantic tags.
   *
   * @default div
   */
  readonly type?:
    | "section"
    | "aside"
    | "header"
    | "footer"
    | "article"
    | "main"
    | "div";

  /**
   * The width of the container
   */

  readonly width?: string;

  /**
   * Should children wrap?
   *
   * @default false
   */
  readonly wrap?: boolean;
}

export function Flex({
  align,
  children,
  columnGap,
  direction,
  height,
  id,
  justify,
  padding = "none",
  reverse,
  rowGap,
  testId,
  type = "div",
  width,
  wrap = false,
}: FlexProps) {
  const className = classnames(
    styles.flex,
    {
      [styles.column]: direction === "column",
      [styles.reverse]: reverse,
      [styles.wrap]: wrap,
    },
    paddings[padding],
    align ? alignments[align] : null,
    justify ? justifications[justify] : null,
    rowGap ? gaps[rowGap].row : null,
    columnGap ? gaps[columnGap].column : null,
  );

  const elementStyle: CSSProperties = {
    width,
    height,
  };

  return createElement(
    type,
    {
      className,
      id,
      ["data-testid"]: testId,
      style: elementStyle,
    },
    children,
  );
}
