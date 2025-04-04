import React, { useMemo } from "react";
import classNames from "classnames";
import styles from "./Stack.module.css";
import { Spaces, StackProps } from "./types";

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

export function Stack({
  space = spaceTokens.base,
  recursive,
  splitAfter,
  children,
}: StackProps) {
  const spaceMapped = useMemo(
    () => (spaceTokens[space as Spaces] ? spaceTokens[space as Spaces] : space),
    [space],
  );

  return (
    <div
      style={
        {
          "--public-stack-split": splitAfter,
          "--public-stack-space": spaceMapped,
        } as React.CSSProperties
      }
      className={classNames(
        styles.stack,
        recursive ? styles.recursive : styles.topOnly,
        splitAfter
          ? styles[`splitAfter-${splitAfter}` as keyof typeof styles]
          : undefined,
      )}
    >
      {children}
    </div>
  );
}
