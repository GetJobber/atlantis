import React, { MouseEvent } from "react";
import { AnimatePresence, Variants, motion } from "framer-motion";
import styles from "./ThiccList.css";
import { useThiccListContext } from "./ThiccListContext";
import { data } from "./data";
import { Icon } from "../Icon";
import { Text } from "../Text";

interface ThiccListItemMenuProps {
  readonly id: number;
  readonly visible: boolean;
  readonly position: { x: number; y: number };
  readonly onRequestClose: () => void;
  readonly onSelect: (event: MouseEvent<HTMLButtonElement>) => void;
}

const variants: Variants = {
  hidden: { y: "-10%", opacity: 0 },
  visible: { y: 0, opacity: 1 },
};
const variantsReversed: Variants = {
  hidden: { y: "10%", opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

export function ThiccListItemMenu({
  id,
  visible,
  position,
  onRequestClose,
  onSelect,
}: ThiccListItemMenuProps) {
  const { selectedItems, addOrRemoveSelectedItem } = useThiccListContext();
  const [ref, setRef] = React.useState<HTMLDivElement | null>();
  const isSelected = selectedItems.includes(id);
  const menuWidth = ref?.offsetWidth || 160;
  const menuHeight = ref?.offsetHeight || 160;
  const shouldOffsetX = position.x + menuWidth > window.innerWidth;
  const shouldOffsetY = position.y + menuHeight > window.innerHeight;

  const actions = [
    { label: "View Client" },
    {
      label: isSelected ? "Deselect Client" : "Select Client",
      onClick: (e: React.MouseEvent<HTMLButtonElement>): void => {
        onSelect(e);
        const selected = data.find(d => d.id === id);
        selected && addOrRemoveSelectedItem(selected);
      },
    },
    { label: "Create new...", deep: true },
    { label: "Tag with...", deep: true },
    { label: "Delete", destructive: true },
  ];

  if (shouldOffsetY) actions.reverse();

  return (
    <AnimatePresence>
      {visible && (
        <>
          <div
            className={styles.listContentMenuOverlay}
            onClick={onRequestClose}
            onContextMenu={e => e.stopPropagation()}
          />
          <motion.div
            ref={setRef}
            variants={shouldOffsetY ? variantsReversed : variants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.2 }}
            className={styles.listContentMenu}
            style={{
              left: shouldOffsetX ? position.x - menuWidth : position.x,
              top: shouldOffsetY ? position.y - menuHeight : position.y,
            }}
            onContextMenu={e => e.stopPropagation()}
          >
            {actions.map(({ label, onClick, destructive, deep }) => (
              <button
                key={label}
                className={styles.listContentMenuItem}
                onClick={onClick}
              >
                <Text>
                  <b
                    style={{
                      color: destructive ? "var(--color-red)" : undefined,
                    }}
                  >
                    {label}
                  </b>
                </Text>

                {deep && <Icon name="arrowRight" color="blue" />}
              </button>
            ))}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
