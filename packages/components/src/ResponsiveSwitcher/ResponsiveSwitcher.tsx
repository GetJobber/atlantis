import React, { useMemo } from "react";
import classNames from "classnames";
import styles from "./ResponsiveSwitcher.module.css";
import { ResponsiveSwitcherProps, Spaces } from "./types";

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

export function ResponsiveSwitcher({
  children,
  threshold,
  space = spaceTokens.base,
  limit = 2,
}: ResponsiveSwitcherProps) {
  const spaceMapped = useMemo(
    () => (spaceTokens[space as Spaces] ? spaceTokens[space as Spaces] : space),
    [space],
  );

  return (
    <div
      className={classNames(
        styles.responsiveSwitcher,
        styles[`limit-${limit}` as keyof typeof styles],
      )}
      style={
        {
          "--public-responsive-switcher-threshold": threshold,
          "--public-responsive-switcher-space": spaceMapped,
          "--public-responsive-switcher-limit": limit,
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}
