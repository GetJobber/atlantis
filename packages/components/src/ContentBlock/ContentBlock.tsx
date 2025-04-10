import React, { useMemo } from "react";
import classNames from "classnames";
import { Breakpoints } from "@jobber/hooks/useResizeObserver";
import styles from "./ContentBlock.module.css";
import { ContentBlockProps, Spaces } from "./types";

const spaceTokens: Record<Spaces, string> = {
  minuscule: "var(--space-minuscule)",
  smallest: "var(--space-smallest)",
  smaller: "var(--space-smaller)",
  small: "var(--space-small)",
  base: "var(--space-base)",
  large: "var(--space-large)",
  larger: "var(--space-larger)",
  largest: "var(--space-largest)",
  extravagant: "var(--space-extravagant)",
};

export function ContentBlock({
  children,
  maxWidth = Breakpoints.smaller,
  andText,
  gutters,
  justify = "left",
}: ContentBlockProps) {
  const guttersMapped = useMemo(
    () =>
      spaceTokens[gutters as Spaces] ? spaceTokens[gutters as Spaces] : gutters,
    [gutters],
  );

  const maxWidthMapped = useMemo(() => {
    if (typeof maxWidth === "number") {
      return `${maxWidth}px`;
    }

    if (Breakpoints[maxWidth as keyof typeof Breakpoints]) {
      return Breakpoints[maxWidth as keyof typeof Breakpoints] + "px";
    }

    return maxWidth;
  }, [maxWidth]);

  const style = useMemo(() => {
    return {
      "--content-block-max-width": maxWidthMapped,
      "--content-block-gutters": guttersMapped,
    } as React.CSSProperties;
  }, [maxWidthMapped, guttersMapped]);

  return (
    <div
      style={style}
      className={classNames(
        styles.contentBlock,
        andText && styles.andText,
        gutters && styles.gutters,
        justify === "left" && styles.left,
        justify === "right" && styles.right,
        justify === "center" && styles.center,
      )}
    >
      {children}
    </div>
  );
}
