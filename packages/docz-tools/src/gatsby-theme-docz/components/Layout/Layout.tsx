import React, { PropsWithChildren, useState } from "react";
import classNames from "classnames";
import { useConfig } from "docz";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@jobber/components/Button";
// eslint-disable-next-line import/no-relative-parent-imports
// eslint-disable-next-line import/no-internal-modules
import "@jobber/design/foundation.css";
import * as styles from "./Layout.module.css";
import { TableOfContents } from "./TableOfContents";
import { Sidebar } from "../Sidebar";

export function Layout({ children }: PropsWithChildren<unknown>) {
  const [navigationOpen, setNavigationOpen] = useState(false);
  const {
    themeConfig: { sideBarWidth, containerWidth },
  } = useConfig();
  const menuClass = classNames(styles.menu, {
    [styles.open]: navigationOpen,
  });

  const sidebarStyles = {
    maxWidth: sideBarWidth,
    width: sideBarWidth,
    left: navigationOpen ? 0 : -sideBarWidth,
  };
  const menuStyle = {
    left: navigationOpen ? sideBarWidth : 0,
  };

  return (
    <>
      <div className={styles.layout}>
        <div className={menuClass} style={menuStyle}>
          <Button
            icon={navigationOpen ? "remove" : "menu"}
            onClick={toggleMenu}
            type="tertiary"
          />
        </div>
        <div className={styles.sidebar} style={sidebarStyles}>
          <a
            href="#mainContent"
            className={styles.skipNav}
            onClick={toggleMenu}
          >
            Skip to content
          </a>
          <Sidebar />
        </div>
        <div id="mainContent" className={styles.content}>
          <div
            className={styles.container}
            style={{ maxWidth: containerWidth }}
          >
            {children}
          </div>
        </div>
        <TableOfContents />
      </div>
      <AnimatePresence>
        {navigationOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.9 }}
            exit={{ opacity: 0 }}
            transition={{ ease: "easeInOut", duration: 0.2 }}
            className={styles.overlay}
            onClick={toggleMenu}
          />
        )}
      </AnimatePresence>
    </>
  );

  function toggleMenu() {
    setNavigationOpen(!navigationOpen);
  }
}
