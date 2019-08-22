import React, { ReactNode, useState } from "react";
import classnames from "classnames";
import { Icon, IconColorNames } from "../Icon";
import { Text } from "../Text";
import styles from "./FlashMessage.css";
import types from "./notificationTypes.css";

interface FlashMessageProps {
  readonly children: ReactNode;
  readonly type?: "notice" | "success" | "warning" | "error";
  onClose?(): void;
}

interface IconColorMap {
  [variation: string]: IconColorNames;
}

export function FlashMessage({ children, type, onClose }: FlashMessageProps) {
  const [showFlash, setShowFlash] = useState(true);

  const iconColors: IconColorMap = {
    notice: "lightBlue",
    success: "green",
    warning: "yellow",
    error: "red",
  };

  const flashClassNames = classnames(styles.flash, type && types[type]);
  const getColors = type ? iconColors[type] : "greyBlue";
  return (
    <>
      {showFlash && (
        <div className={flashClassNames}>
          <Text>{children}</Text>

          <button
            className={styles.closeButton}
            onClick={handleClose}
            aria-label="Close"
          >
            <Icon name="cross" color={getColors} />
          </button>
        </div>
      )}
    </>
  );

  function handleClose() {
    setShowFlash(!showFlash);
    onClose && onClose();
  }
}
