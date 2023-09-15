import React, { CSSProperties, PropsWithChildren, useState } from "react";
import { AnimatePresence, Variants, motion } from "framer-motion";
import { tokens } from "@jobber/design";
import { useFocusTrap } from "@jobber/hooks/useFocusTrap";
import { useRefocusOnActivator } from "@jobber/hooks/useRefocusOnActivator";
import { useOnKeyDown } from "@jobber/hooks/useOnKeyDown";
import styles from "./DataListActionsMenu.css";

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

  useRefocusOnActivator(visible);
  const focusTrapRef = useFocusTrap<HTMLDivElement>(visible);
  useOnKeyDown(onRequestClose, "Escape");

  return (
    <AnimatePresence>
      {visible && (
        <>
          <div className={styles.overlay} onClick={onRequestClose} />

          <motion.div
            ref={setRef}
            variants={variants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: tokens["timing-base"] / 1000 }}
            className={styles.menu}
            style={getPositionCssVars()}
          >
            <div tabIndex={0} ref={focusTrapRef}>
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

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
    const { x = 0, y = 0 } = position;

    const xIsOffScreen = x + width > window.innerWidth;
    const yIsOffScreen = y + height > window.innerHeight;
    const yOffSet = y + height - window.innerHeight;

    const newPosX = Math.floor(xIsOffScreen ? x - width : x);
    const newPosY = Math.floor(yIsOffScreen ? y - yOffSet : y);
    return { posX: newPosX, posY: newPosY };
  }
}
