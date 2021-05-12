/* eslint-disable import/no-relative-parent-imports */
/* eslint-disable import/no-internal-modules */
import React, { PropsWithChildren } from "react";
import { useConfig } from "docz";
import "@jobber/design/foundation.css";
import * as styles from "./Layout.module.css";

export function Layout({ children }: PropsWithChildren<unknown>) {
  const {
    themeConfig: { sideBarWidth, containerWidth },
  } = useConfig();

  const sidebarStyles = {
    flex: `0 0 ${sideBarWidth}`,
    maxWidth: sideBarWidth,
    width: sideBarWidth,
    background: "var(--color-green)",
    minHeight: "100vh",
  };

  return (
    <div className={styles.layout}>
      <div style={sidebarStyles}>Sidebar</div>
      <div className={styles.content}>
        <div className={styles.container} style={{ maxWidth: containerWidth }}>
          {children}
        </div>
      </div>
    </div>
  );
}
