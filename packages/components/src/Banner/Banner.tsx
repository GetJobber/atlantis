import React, { ReactNode, useState } from "react";
import classnames from "classnames";
import styles from "./Banner.css";
import types from "./notificationTypes.css";
import { Icon, IconColorNames } from "../Icon";
import { Text } from "../Text";

interface BannerProps {
  readonly children: ReactNode;
  readonly type: "notice" | "success" | "warning" | "error";
  readonly showClose?: boolean;
  onDismiss?(): void;
}

interface IconColorMap {
  [variation: string]: IconColorNames;
}

export function Banner({
  children,
  type,
  onDismiss,
  showClose = true,
}: BannerProps) {
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

          {showClose && (
            <button
              className={styles.closeButton}
              onClick={handleClose}
              aria-label="Close"
            >
              <Icon name="cross" color={iconColors[type]} />
            </button>
          )}
        </div>
      )}
    </>
  );

  function handleClose() {
    setShowFlash(!showFlash);
    onDismiss && onDismiss();
  }
}
