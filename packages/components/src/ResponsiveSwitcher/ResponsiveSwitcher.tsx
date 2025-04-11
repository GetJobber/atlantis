import React from "react";
import classNames from "classnames";
import styles from "./ResponsiveSwitcher.module.css";
import { ResponsiveSwitcherProps } from "./types";
import { spaceTokens, useSpaces } from "../sharedHooks/useSpaces";

export function ResponsiveSwitcher({
  children,
  threshold,
  space = spaceTokens.base,
  limit = 2,
}: ResponsiveSwitcherProps) {
  const spaceMapped = useSpaces(space);

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
