import React, { CSSProperties, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import styles from "./DataListActionsMenu.css";
import { useDataListContext } from "../../context/DataListContext";

interface DataListActionsMenuProps {
  readonly visible: boolean;
  readonly position: {
    readonly x: number;
    readonly y: number;
  };
  readonly onRequestClose: () => void;
}

export function DataListActionsMenu({
  visible = false,
  position,
  onRequestClose,
}: DataListActionsMenuProps) {
  const [ref, setRef] = useState<HTMLDivElement | null>();

  const { itemActionComponent } = useDataListContext();
  if (!itemActionComponent) return null;
  const { children } = itemActionComponent.props;

  return (
    <AnimatePresence>
      {visible && (
        <>
          <div className={styles.overlay} onClick={onRequestClose} />

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            ref={setRef}
            className={styles.menu}
            style={getPositionCssVars()}
          >
            {children}
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

    const newPosX = Math.floor(xIsOffScreen ? x - width : x);
    const newPosY = Math.floor(yIsOffScreen ? y - height : y);
    return { posX: newPosX, posY: newPosY };
  }
}
