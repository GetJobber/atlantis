import React, { PropsWithChildren } from "react";
import { useConfig } from "docz";
// eslint-disable-next-line import/no-relative-parent-imports
// eslint-disable-next-line import/no-internal-modules
import "@jobber/design/foundation.css";
import * as styles from "./Layout.module.css";
import { Sidebar } from "../Sidebar";
import { Actions } from "../Actions";

export function Layout({ children }: PropsWithChildren<unknown>) {
  const {
    themeConfig: { sideBarWidth, containerWidth, hasActions = true },
  } = useConfig();

  const sidebarStyles = {
    maxWidth: sideBarWidth,
    width: sideBarWidth,
  };

  return (
    <div className={styles.layout}>
      <div className={styles.sidebar} style={sidebarStyles}>
        <Sidebar />
      </div>
      {hasActions && <Actions />}
      <div className={styles.content}>
        <div className={styles.container} style={{ maxWidth: containerWidth }}>
          {children}
        </div>
      </div>
    </div>
  );
}
