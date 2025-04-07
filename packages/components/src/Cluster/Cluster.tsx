import React, { useMemo } from "react";
import { Breakpoints } from "@jobber/hooks/useResizeObserver";
import { useMediaQuery } from "@jobber/hooks";
import classNames from "classnames";
import styles from "./Cluster.module.css";
import { ClusterProps, Spaces } from "./types";

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

export function Cluster({
  children,
  justify,
  align,
  space,
  collapseBelow,
}: ClusterProps) {
  const spaceMapped = useMemo(
    () => (spaceTokens[space as Spaces] ? spaceTokens[space as Spaces] : space),
    [space],
  );

  const collapseBelowMapped = useMemo(() => {
    const collapsedKey = collapseBelow as keyof typeof Breakpoints;

    if (Breakpoints[collapsedKey]) {
      return Breakpoints[collapsedKey] + "px";
    }

    return collapseBelow as string;
  }, [collapseBelow]);

  const isCollapsed = useMediaQuery(`(max-width: ${collapseBelowMapped})`);
  console.log("collapseBelowMapped", collapseBelowMapped, isCollapsed);

  return (
    <div
      style={
        {
          "--public-cluster-justify": justify,
          "--public-cluster-align": align,
          "--public-cluster-space": spaceMapped,
        } as React.CSSProperties
      }
      className={classNames(styles.cluster, isCollapsed && styles.collapsed)}
    >
      {children}
    </div>
  );
}
