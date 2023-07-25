import React from "react";
import styles from "./ThiccList.css";
import { Icon } from "../Icon";
import { Text } from "../Text";
import { Typography } from "../Typography";

interface ThiccListItemMenuProps {
  readonly visible: boolean;
  readonly position: { x: number; y: number };
  readonly onRequestClose: () => void;
  readonly onSelect: () => void;
}

export function ThiccListItemMenu({
  visible,
  position,
  onRequestClose,
  onSelect,
}: ThiccListItemMenuProps) {
  if (!visible) return <></>;

  return (
    <>
      <div className={styles.listContentMenuOverlay} onClick={onRequestClose} />
      <div
        className={styles.listContentMenu}
        style={{ left: position.x, top: position.y }}
        onContextMenu={e => e.stopPropagation()}
      >
        <button className={styles.listContentMenuItem} onClick={onSelect}>
          <Text>
            <b>Select Client</b>
          </Text>
        </button>
        <button className={styles.listContentMenuItem}>
          <Text>
            <b>Create new...</b>
          </Text>
          <Icon name="arrowRight" color="blue" />
        </button>
        <button className={styles.listContentMenuItem}>
          <Text>
            <b>Tag with...</b>
          </Text>
          <Icon name="arrowRight" color="blue" />
        </button>
        <button className={styles.listContentMenuItem}>
          <Text>
            <b>
              <Typography element="span" textColor="red">
                Delete
              </Typography>
            </b>
          </Text>
        </button>
      </div>
    </>
  );
}
