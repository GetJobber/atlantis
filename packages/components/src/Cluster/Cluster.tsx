import React, { useMemo } from "react";
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

export function Cluster({ children, justify, align, space }: ClusterProps) {
  const spaceMapped = useMemo(
    () => (spaceTokens[space as Spaces] ? spaceTokens[space as Spaces] : space),
    [space],
  );

  return (
    <div
      style={
        {
          "--public-cluster-justify": justify,
          "--public-cluster-align": align,
          "--public-cluster-space": spaceMapped,
        } as React.CSSProperties
      }
      className={styles.cluster}
    >
      {children}
    </div>
  );
}
