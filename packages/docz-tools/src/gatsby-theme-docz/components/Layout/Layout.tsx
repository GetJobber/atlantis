import React, { PropsWithChildren, useState } from "react";
import { useConfig } from "docz";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@jobber/components/Button";
// eslint-disable-next-line import/no-relative-parent-imports
// eslint-disable-next-line import/no-internal-modules
import "@jobber/design/foundation.css";
import * as styles from "./Layout.module.css";
import { Sidebar } from "../Sidebar";
import { Actions } from "../Actions";

export function Layout({ children }: PropsWithChildren<unknown>) {
  const [open, setOpen] = useState(false);
  const {
    themeConfig: { sideBarWidth, containerWidth, hasActions = true },
  } = useConfig();

  const sidebarStyles = {
    maxWidth: sideBarWidth,
    width: sideBarWidth,
    left: open ? 0 : -sideBarWidth,
  };
  const menuStyle = { left: open ? sideBarWidth : 0 };

  return (
    <>
      <div className={styles.layout}>
        <div className={styles.menu} style={menuStyle}>
          <Button
            icon={open ? "remove" : "menu"}
            onClick={toggleMenu}
            type="tertiary"
          />
        </div>
        <div className={styles.sidebar} style={sidebarStyles}>
          <Sidebar />
        </div>
        {hasActions && <Actions />}
        <div className={styles.content}>
          <div
            className={styles.container}
            style={{ maxWidth: containerWidth }}
          >
            {children}
          </div>
        </div>
      </div>
      <AnimatePresence>
        {open && (
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
    setOpen(!open);
  }
}
