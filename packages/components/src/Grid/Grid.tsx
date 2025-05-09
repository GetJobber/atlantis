import React, { ReactNode } from "react";
import classNames from "classnames";
import styles from "./Grid.module.css";
import alignments from "./GridAlign.module.css";
import { GridCell } from "./GridCell";
import { GapSpacing } from "../sharedHelpers/types";
import {
  getMappedAtlantisSpaceToken,
  spaceTokens,
} from "../sharedHelpers/getMappedAtlantisSpaceToken";

interface GridProps {
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

export function Grid({
  alignItems = "start",
  gap = true,
  children,
}: GridProps) {
  const gapValue = (() => {
    if (typeof gap === "boolean") {
      return gap ? spaceTokens.base : undefined;
    }

    return getMappedAtlantisSpaceToken(gap);
  })();

  const style: React.CSSProperties | undefined = gapValue
    ? { gap: gapValue }
    : undefined;

  return (
    <div
      data-testid={GRID_TEST_ID}
      className={classNames(styles.grid, alignments[alignItems])}
      style={style}
    >
      {children}
    </div>
  );
}

Grid.Cell = GridCell;
