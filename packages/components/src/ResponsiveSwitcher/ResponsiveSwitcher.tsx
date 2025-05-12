import React from "react";
import classNames from "classnames";
import styles from "./ResponsiveSwitcher.module.css";
import { ResponsiveSwitcherProps } from "./types";
import {
  getMappedAtlantisSpaceToken,
  spaceTokens,
} from "../sharedHelpers/getMappedAtlantisSpaceToken";

export function ResponsiveSwitcher({
  children,
  threshold = "50%",
  gap = spaceTokens.base,
  limit = 2,
  scaleBy = "container",
  as: Tag = "div",
  dataAttributes,
  ariaAttributes,
  collapseBelow,
  collapsed,
  role,
  id,
  UNSAFE_className,
  UNSAFE_style,
}: ResponsiveSwitcherProps) {
  return (
    <Tag
      role={role}
      id={id}
      {...dataAttributes}
      {...ariaAttributes}
      className={classNames(
        styles.responsiveSwitcher,
        scaleBy === "screen" && styles.scaleByScreen,
        styles[`limit-${limit}` as keyof typeof styles],
        collapseBelow && styles[collapseBelow as keyof typeof styles],
        collapsed ? styles.collapsed : undefined,
        UNSAFE_className?.container,
      )}
      style={
        {
          "--public-responsive-switcher-threshold": threshold,
          "--public-responsive-switcher-space":
            getMappedAtlantisSpaceToken(gap),
          "--public-responsive-switcher-limit": limit,
          ...UNSAFE_style?.container,
        } as React.CSSProperties
      }
    >
      {children}
    </Tag>
  );
}
