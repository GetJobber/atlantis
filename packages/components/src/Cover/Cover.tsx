import React from "react";
import styles from "./Cover.module.css";
import { CoverProps } from "./types";
import {
  ariaPropsMapped,
  dataPropsMapped,
} from "../sharedHooks/useCommonProps";

export function Cover({
  children,
  minHeight,
  gap,
  as: Tag = "div",
  data,
  aria,
  role,
  id,
}: CoverProps) {
  return (
    <Tag
      role={role}
      id={id}
      {...dataPropsMapped(data)}
      {...ariaPropsMapped(aria)}
      style={
        {
          "--public-cover-min-height": minHeight,
          "--public-cover-space": gap,
        } as React.CSSProperties
      }
      className={styles.cover}
    >
      {children}
    </Tag>
  );
}

Cover.Center = function CenterContent({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return <div className={styles.centerContent}>{children}</div>;
};
