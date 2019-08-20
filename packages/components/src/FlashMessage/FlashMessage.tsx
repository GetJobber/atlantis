import React, { ReactNode, useState } from "react";
import classnames from "classnames";
import { Icon, IconColorNames } from "../Icon";
import { Text } from "../Text";
import styles from "./FlashMessage.css";
import types from "./notificationTypes.css";

interface FlashMessageProps {
  readonly type: "base" | "notice" | "success" | "warning" | "error";
  readonly children: ReactNode;
}

interface IconColorVariations {
  [variation: string]: IconColorNames;
}

export function FlashMessage({ type = "base", children }: FlashMessageProps) {
  const flashClassNames = classnames(styles.flash, styles.message, types[type]);
  const [showFlash, setShowFlash] = useState(true);

  const iconColors: IconColorVariations = {
    base: "black",
    notice: "lightBlueDark",
    success: "greenDark",
    warning: "yellowDark",
    error: "redDark",
  };

  const handleClose = () => setShowFlash(!showFlash);
  return (
    <>
      {showFlash && (
        <div className={flashClassNames}>
          <Text>{children}</Text>
          <button
            className={styles.closeButton}
            onClick={handleClose}
            aria-label="close flash"
          >
            <Icon name="cross" color={iconColors[type]} />
          </button>
        </div>
      )}
    </>
  );
}
