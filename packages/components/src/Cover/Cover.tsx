import React from "react";
import styles from "./Cover.module.css";
import { CoverProps } from "./types";

export function Cover({
  children,
  minHeight,
  gap,
  as: Tag = "div",
}: CoverProps) {
  return (
    <Tag
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
