import React, { useMemo } from "react";
import classNames from "classnames";
import { useMediaQuery } from "@jobber/hooks";
import styles from "./SideKick.module.css";
import { SideKickProps, Spaces } from "./types";

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

export function SideKick({
  children,
  sideWidth,
  contentMinWidth = "50%",
  space = "var(--space-base)",
  onRight,
  collapseBelow,
}: SideKickProps) {
  const spaceMapped = useMemo(
    () => (spaceTokens[space as Spaces] ? spaceTokens[space as Spaces] : space),
    [space],
  );
  const collapsed = useMediaQuery(`(max-width: ${collapseBelow || "0"})`);

  return (
    <div
      style={
        {
          "--public-sidekick-side-width": sideWidth,
          "--public-sidekick-min-width": contentMinWidth,
          "--public-sidekick-space": spaceMapped,
        } as React.CSSProperties
      }
      className={classNames(
        styles.sidekick,
        onRight ? styles.right : styles.left,
        sideWidth
          ? onRight
            ? styles.withWidthRight
            : styles.withWidthLeft
          : null,
        collapsed && collapseBelow ? styles.collapsed : null,
      )}
    >
      {children}
    </div>
  );
}
