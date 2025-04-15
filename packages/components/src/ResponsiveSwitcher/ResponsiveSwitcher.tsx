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
  threshold,
  gap = spaceTokens.base,
  limit = 2,
  as: Tag = "div",
  data,
  aria,
  role,
  id,
  UNSAFE_className,
  UNSAFE_style,
}: ResponsiveSwitcherProps) {
  return (
    <Tag
      role={role}
      id={id}
      {...data}
      {...aria}
      className={classNames(
        styles.responsiveSwitcher,
        styles[`limit-${limit}` as keyof typeof styles],
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
