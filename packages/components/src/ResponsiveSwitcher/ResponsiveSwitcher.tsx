import React from "react";
import styles from "./ResponsiveSwitcher.module.css";

export const ResponsiveSwitcher = ({
  children,
  threshold = "30rem",
  space = "var(--space-base)",
  limit = 4,
}: {
  readonly children: React.ReactNode;
  readonly threshold: string;
  readonly space: string;
  readonly limit: number;
}) => {
  return (
    <div
      className={styles.responsiveSwitcher}
      style={
        {
          "--public-responsive-switcher-threshold": threshold,
          "--public-responsive-switcher-space": space,
          "--public-responsive-switcher-limit": limit,
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
};
