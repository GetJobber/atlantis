import React from "react";
import classNames from "classnames";
import styles from "./SideKick.module.css";
import { SideKickProps } from "./types";
import { getMappedAtlantisSpaceToken } from "../sharedHelpers/getMappedAtlantisSpaceToken";

export function SideKick({
  children,
  sideWidth,
  contentMinWidth = "50%",
  gap = "var(--space-base)",
  onRight,
  collapseBelow,
  collapsed,
  autoWidth = false,
  as: Tag = "div",
  dataAttributes,
  ariaAttributes,
  role,
  id,
  UNSAFE_className,
  UNSAFE_style,
}: SideKickProps) {
  return (
    <Tag
      role={role}
      id={id}
      {...dataAttributes}
      {...ariaAttributes}
      style={
        {
          "--public-sidekick-side-width": sideWidth,
          "--public-sidekick-min-width": contentMinWidth,
          "--public-sidekick-space": getMappedAtlantisSpaceToken(gap),
          "--public-sidekick-width": autoWidth ? "auto" : "100%",
          ...UNSAFE_style?.container,
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
        collapseBelow && styles[collapseBelow as keyof typeof styles],
        collapsed ? styles.collapsed : undefined,
        UNSAFE_className?.container,
      )}
    >
      {children}
    </Tag>
  );
}
