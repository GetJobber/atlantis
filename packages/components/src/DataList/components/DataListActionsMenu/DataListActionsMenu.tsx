import type { CSSProperties, MouseEvent, PropsWithChildren } from "react";
import React, { useState } from "react";
import type { Variants } from "framer-motion";
import { AnimatePresence, motion } from "framer-motion";
import {
  useFocusTrap,
  useIsMounted,
  useOnKeyDown,
  useRefocusOnActivator,
} from "@jobber/hooks";
import { createPortal } from "react-dom";
import { tokens } from "@jobber/design";
import styles from "./DataListActionsMenu.module.css";
import { TRANSITION_DELAY_IN_SECONDS } from "../../DataList.const";

interface DataListActionsMenuProps {
  readonly visible: boolean;
  readonly position: {
    readonly x: number;
    readonly y: number;
  };
  readonly onRequestClose: () => void;
}

const variants: Variants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0 },
};

export function DataListActionsMenu({
  visible = false,
  position,
  onRequestClose,
  children,
}: PropsWithChildren<DataListActionsMenuProps>) {
  const [ref, setRef] = useState<HTMLDivElement | null>();
  const mounted = useIsMounted();

  useRefocusOnActivator(visible);
  const focusTrapRef = useFocusTrap<HTMLDivElement>(visible);
  useOnKeyDown(onRequestClose, "Escape");

  const actionsMenu = (
    <AnimatePresence>
      {visible && (
        <div ref={focusTrapRef} onClick={handleClick}>
          <motion.div
            role="menu"
            data-elevation={"elevated"}
            ref={setRef}
            variants={variants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: TRANSITION_DELAY_IN_SECONDS }}
            className={styles.menu}
            style={getPositionCssVars()}
            onClick={onRequestClose}
          >
            {children}
          </motion.div>

          <button
            type="button"
            className={styles.overlay}
            onClick={onRequestClose}
            aria-label="Close menu"
          />
        </div>
      )}
    </AnimatePresence>
  );

  return mounted.current
    ? createPortal(actionsMenu, document.body)
    : actionsMenu;

  function handleClick(event: MouseEvent<HTMLDivElement>): void {
    // Prevent menu from firing the parent's onClick event when it is nested
    // within a clickable list item
    event.stopPropagation();
  }

  function getPositionCssVars() {
    const { posX, posY } = getPosition();

    return {
      "--actions-menu-x": `${posX}px`,
      "--actions-menu-y": `${posY}px`,
    } as CSSProperties;
  }

  function getPosition() {
    const rect = ref?.getBoundingClientRect();
    const { width = 0, height = 0 } = rect || {};
    const { x, y } = position;

    const xIsOffScreen = x + width > window.innerWidth;
    const yIsOffScreen = y + height > window.innerHeight;
    const xOffSet = x + width - window.innerWidth + tokens["space-base"];
    const yOffSet = y + height - window.innerHeight;

    const newPosX = Math.floor(xIsOffScreen ? x - xOffSet : x);
    const newPosY = Math.floor(yIsOffScreen ? y - yOffSet : y);

    return { posX: newPosX, posY: newPosY };
  }
}
