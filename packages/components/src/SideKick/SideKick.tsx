import React from "react";
import classNames from "classnames";
import { useMediaQuery } from "@jobber/hooks";
import styles from "./SideKick.module.css";
import { SideKickProps } from "./types";
import { useSpaces } from "../sharedHooks/useSpaces";

export function SideKick({
  children,
  sideWidth,
  contentMinWidth = "50%",
  space = "var(--space-base)",
  onRight,
  collapseBelow,
}: SideKickProps) {
  const spaceMapped = useSpaces(space);
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
