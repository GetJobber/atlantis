import React from "react";
import classNames from "classnames";
import styles from "./SideKick.module.css";
import { SideKickProps } from "./types";
import { useSpaces } from "../sharedHooks/useSpaces";
import {
  ariaPropsMapped,
  dataPropsMapped,
} from "../sharedHooks/useCommonProps";

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
  data,
  aria,
  role,
  id,
}: SideKickProps) {
  const spaceMapped = useSpaces(gap);

  return (
    <Tag
      role={role}
      id={id}
      {...dataPropsMapped(data)}
      {...ariaPropsMapped(aria)}
      style={
        {
          "--public-sidekick-side-width": sideWidth,
          "--public-sidekick-min-width": contentMinWidth,
          "--public-sidekick-space": spaceMapped,
          "--public-sidekick-width": autoWidth ? "auto" : "100%",
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
        collapseBelow,
        collapsed ? styles.collapsed : undefined,
      )}
    >
      {children}
    </Tag>
  );
}
