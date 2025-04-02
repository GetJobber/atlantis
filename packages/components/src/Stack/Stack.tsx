import React, { useMemo } from "react";
import classNames from "classnames";
import styles from "./Stack.module.css";

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

export const Stack = ({
  space = spaceTokens.base,
  recursive,
  splitAfter,
  children,
}: {
  readonly space?: string | Spaces;
  readonly splitAfter?: number;
  readonly recursive?: boolean;
  readonly children: React.ReactNode;
}) => {
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
};
