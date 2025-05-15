import React, { ReactNode } from "react";
import classNames from "classnames";
import styles from "./Grid.module.css";
import alignments from "./GridAlign.module.css";
import { GridCell } from "./GridCell";
import { GapSpacing } from "../sharedHelpers/types";
import { getMappedAtlantisSpaceToken } from "../sharedHelpers/getMappedAtlantisSpaceToken";

export interface GridProps {
  /**
   * Add spacing between elements. Can be a boolean for default spacing,
   * or a semantic token for custom spacing.
   * @default true
   */
  readonly gap?: boolean | GapSpacing;

  /**
   * Adjust the alignment of columns. We only support a few select properties
   * from `align-items` due to the nature of the other properties acting the
   * same. Read more about [align-items](https://developer.mozilla.org/en-US/docs/Web/CSS/align-items) property values.
   */
  readonly alignItems?: keyof typeof alignments;

  /**
   * `Grid.Cell` children
   */
  readonly children: ReactNode;
}

export const GRID_TEST_ID = "ATL-Grid";

function getGapStyles(gap: boolean | GapSpacing): {
  className?: string;
  style?: React.CSSProperties;
} {
  if (typeof gap === "boolean") {
    if (gap === true) {
      return { className: styles.gap };
    }

    return {};
  }

  const gapValue = getMappedAtlantisSpaceToken(gap);

  if (gapValue) {
    return { style: { gap: gapValue } };
  }

  return {};
}

export function Grid({
  alignItems = "start",
  gap = true,
  children,
}: GridProps) {
  if (typeof gap === "boolean") {
    console.warn(
      "Deprecation Warning: The boolean type for the 'gap' prop in the Grid component is deprecated and will be removed in a future version. " +
        "Please use a GapSpacing token (e.g., 'small', 'base', 'large') for fixed spacing. " +
        "Using 'true' applies default responsive spacing. Using 'false' results in no gap.",
    );
  }

  const { className: gapClass, style: gapStyle } = getGapStyles(gap);

  return (
    <div
      data-testid={GRID_TEST_ID}
      className={classNames(styles.grid, alignments[alignItems], gapClass)}
      style={gapStyle}
    >
      {children}
    </div>
  );
}

Grid.Cell = GridCell;
