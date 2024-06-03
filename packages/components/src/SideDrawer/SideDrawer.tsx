import React, { useId, useState } from "react";
import type { KeyboardEvent, PropsWithChildren } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, Variants, motion } from "framer-motion";
import { tokens } from "@jobber/design";
import { useRefocusOnActivator } from "@jobber/hooks/useRefocusOnActivator";
import { useFocusTrap } from "@jobber/hooks/useFocusTrap";
import { SideDrawerActions } from "./SideDrawerActions";
import { SideDrawerContext } from "./SideDrawerContext";
import { SideDrawerTitle } from "./SideDrawerTitle";
import { SideDrawerToolbar } from "./SideDrawerToolbar";
import styles from "./SideDrawer.css";
import { Button } from "../Button";
import { Flex } from "../Flex";

interface SideDrawerProps extends PropsWithChildren {
  /**
   * Whether or not the drawer is open.
   */
  readonly open: boolean;

  /**
   * Callback function to close the drawer.
   */
  readonly onRequestClose: () => void;
}

const variants: Variants = {
  hidden: { x: "100%" },
  visible: { x: 0, transitionEnd: { x: 0 } },
};

export function SideDrawer({
  children,
  onRequestClose,
  open,
}: SideDrawerProps) {
  const [ref, setRef] = useState<HTMLDivElement | null>(null);
  const [toolbarPortalId, toolbarPortalSelector] = usePortalId();
  const [titlePortalId, titlePortalSelector] = usePortalId();
  const [actionsPortalId, actionsPortalSelector] = usePortalId();

  useRefocusOnActivator(open);
  const sideDrawerRef = useFocusTrap<HTMLDivElement>(open);

  const container = globalThis.document?.body || null;

  if (!container) return null;

  return createPortal(
    <SideDrawerContext.Provider
      value={{
        actionPortal: ref?.querySelector(actionsPortalSelector),
        titlePortal: ref?.querySelector(titlePortalSelector),
        toolbarPortal: ref?.querySelector(toolbarPortalSelector),
      }}
    >
      {open && (
        <button
          type="button"
          aria-label="Close"
          onClick={onRequestClose}
          className={styles.overlay}
        />
      )}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            className={styles.drawer}
            ref={setRef}
            variants={variants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{
              duration: tokens["timing-base"] / 1000,
            }}
          >
            <div
              ref={sideDrawerRef}
              role="dialog"
              className={styles.container}
              tabIndex={0}
              onKeyUp={handleKeyUp}
            >
              <div className={styles.header}>
                <Flex template={["grow", "shrink"]}>
                  <div data-portal-id={titlePortalId} />

                  <div className={styles.headerActions}>
                    <div
                      className={styles.hideWhenEmpty}
                      data-portal-id={actionsPortalId}
                    />
                    <Button
                      ariaLabel="Close"
                      icon="cross"
                      onClick={onRequestClose}
                      type="secondary"
                      variation="subtle"
                    />
                  </div>
                </Flex>

                <div
                  className={styles.hideWhenEmpty}
                  data-portal-id={toolbarPortalId}
                />
              </div>

              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </SideDrawerContext.Provider>,
    container,
  );

  function handleKeyUp(event: KeyboardEvent<HTMLDivElement>): void {
    if (event.key === "Escape") {
      onRequestClose();
    }
  }
}

function usePortalId(): [string, string] {
  const id = useId();
  const portalId = `[data-portal-id="${id}"]`;

  return [id, portalId];
}

SideDrawer.Title = SideDrawerTitle;
SideDrawer.Toolbar = SideDrawerToolbar;
SideDrawer.Actions = SideDrawerActions;
