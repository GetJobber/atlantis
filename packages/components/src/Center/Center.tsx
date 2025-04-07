import React, { useMemo } from "react";
import classNames from "classnames";
import { Breakpoints } from "@jobber/hooks/useResizeObserver";
import styles from "./Center.module.css";
import { CenterProps, Spaces } from "./types";

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

export function Center({
  children,
  maxWidth = Breakpoints.smaller,
  andText,
  gutters,
  intrinsic,
  align = "center",
}: CenterProps) {
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
      "--center-measure": maxWidthMapped,
      "--center-gutters": guttersMapped,
    } as React.CSSProperties;
  }, [maxWidthMapped, guttersMapped, align]);

  return (
    <div
      style={style}
      className={classNames(
        styles.center,
        andText && styles.andText,
        gutters && styles.gutters,
        intrinsic && styles.intrinsic,
        align === "left" && styles.left,
        align === "right" && styles.right,
      )}
    >
      {children}
    </div>
  );
}
