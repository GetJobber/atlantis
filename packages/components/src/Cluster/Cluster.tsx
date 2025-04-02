import React, { useMemo } from "react";
import styles from "./Cluster.module.css";

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

export const Cluster = ({
  children,
  justify,
  align,
  space,
}: {
  readonly children: React.ReactNode;
  readonly justify?: "start" | "end" | "center" | "between" | "around";
  readonly align?: "start" | "end" | "center";
  readonly space?: Spaces | (string & NonNullable<unknown>);
}) => {
  const spaceMapped = useMemo(
    () => (spaceTokens[space as Spaces] ? spaceTokens[space as Spaces] : space),
    [space],
  );
  console.log(spaceMapped);

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
};
