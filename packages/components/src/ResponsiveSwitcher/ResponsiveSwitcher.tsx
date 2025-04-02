import React, { useMemo } from "react";
import classNames from "classnames";
import styles from "./ResponsiveSwitcher.module.css";

type Spaces =
  | "minuscule"
  | "smallest"
  | "smaller"
  | "small"
  | "base"
  | "large"
  | "larger"
  | "largest"
  | "extravagant";

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
interface BreakpointSizes {
  sm: number;
  md: number;
  lg: number;
  xl: number;
}

export const BREAKPOINT_SIZES: BreakpointSizes = {
  sm: 490,
  md: 768,
  lg: 1080,
  xl: 1440,
};

export const ResponsiveSwitcher = ({
  children,
  threshold,
  space = spaceTokens.base,
  limit = 2,
}: {
  readonly children: React.ReactNode;
  readonly threshold: BreakpointSizes | (string & NonNullable<unknown>);
  readonly space?: Spaces | (string & NonNullable<unknown>);
  readonly limit?: number;
}) => {
  const spaceMapped = useMemo(
    () => (spaceTokens[space as Spaces] ? spaceTokens[space as Spaces] : space),
    [space],
  );

  const thresholdMapped = useMemo(
    () =>
      BREAKPOINT_SIZES[threshold as keyof BreakpointSizes]
        ? BREAKPOINT_SIZES[threshold as keyof BreakpointSizes]
        : threshold,
    [threshold],
  );

  return (
    <div
      className={classNames(
        styles.responsiveSwitcher,
        styles[`limit-${limit}` as keyof typeof styles],
      )}
      style={
        {
          "--public-responsive-switcher-threshold": thresholdMapped,
          "--public-responsive-switcher-space": spaceMapped,
          "--public-responsive-switcher-limit": limit,
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
};
