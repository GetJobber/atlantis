import React, { ReactNode, useState } from "react";
import classnames from "classnames";
import styles from "./Banner.css";
import types from "./notificationTypes.css";
import { Icon, IconColorNames } from "../Icon";
import { Text } from "../Text";
import { Button, ButtonProps } from "../Button";

interface BannerProps {
  readonly children: ReactNode;
  readonly type: "notice" | "success" | "warning" | "error";
  readonly primaryAction?: ButtonProps;
  /**
   * @default "page"
   */
  readonly placement?: "page" | "site";
  onDismiss?(): void;
}

interface IconColorMap {
  [variation: string]: IconColorNames;
}

export function Banner({
  children,
  type,
  primaryAction,
  placement = "page",
  onDismiss,
}: BannerProps) {
  const [showFlash, setShowFlash] = useState(true);

  const iconColors: IconColorMap = {
    notice: "lightBlue",
    success: "green",
    warning: "yellow",
    error: "red",
  };

  if (primaryAction != undefined) {
    primaryAction = Object.assign(
      {
        size: "small",
        type: "tertiary",
        variation: type === "notice" ? "learning" : "work",
      },
      primaryAction,
    );
  }

  const flashClassNames = classnames(styles.flash, types[type]);
  return (
    <>
      {showFlash && (
        <div className={flashClassNames}>
          <Text>{children}</Text>
          {primaryAction && <Button {...primaryAction} />}

          {placement === "page" && (
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
