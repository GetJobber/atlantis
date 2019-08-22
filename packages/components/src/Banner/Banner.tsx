import React, { ReactNode, useState } from "react";
import classnames from "classnames";
import { Icon, IconColorNames } from "../Icon";
import { Text } from "../Text";
import styles from "./Banner.css";
import types from "./notificationTypes.css";

interface BannerProps {
  readonly children: ReactNode;
  readonly type: "notice" | "success" | "warning" | "error";
  onDismiss?(): void;
}

interface IconColorMap {
  [variation: string]: IconColorNames;
}

export function Banner({ children, type, onDismiss }: BannerProps) {
  const [showFlash, setShowFlash] = useState(true);

  const iconColors: IconColorMap = {
    notice: "lightBlue",
    success: "green",
    warning: "yellow",
    error: "red",
  };

  const flashClassNames = classnames(styles.flash, types[type]);
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
            <Icon name="cross" color={iconColors[type]} />
          </button>
        </div>
      )}
    </>
  );

  function handleClose() {
    setShowFlash(!showFlash);
    onDismiss && onDismiss();
  }
}
