import React, { ReactNode, useState } from "react";
import classnames from "classnames";
import { IconColorNames } from "@jobber/design";
import { useResizeObserver } from "@jobber/hooks";
import styles from "./Banner.css";
import types from "./notificationTypes.css";
import { Icon } from "../Icon";
import { Text } from "../Text";
import { Button, ButtonProps } from "../Button";

interface BannerProps {
  readonly children: ReactNode;
  readonly type: "notice" | "success" | "warning" | "error";
  /**
   * The default cta variation should be a 'work' variation. If the banner
   * 'type' is set to 'notice' we change the cta variation to 'learning'
   */
  readonly primaryAction?: ButtonProps;
  /**
   * @default true
   */
  readonly dismissible?: boolean;
  onDismiss?(): void;
}

interface IconColorMap {
  [variation: string]: IconColorNames;
}

export function Banner({
  children,
  type,
  primaryAction,
  dismissible = true,
  onDismiss,
}: BannerProps) {
  const [showFlash, setShowFlash] = useState(true);

  const bannerWidths = {
    small: 320,
    medium: 480,
  };

  const [
    bannerRef,
    { width: bannerWidth = bannerWidths.small },
  ] = useResizeObserver<HTMLDivElement>({
    widths: bannerWidths,
  });

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

  const flashClassNames = classnames(styles.flash, types[type], {
    [styles.medium]: bannerWidth >= bannerWidths.medium,
  });

  const contentClassNames = classnames(styles.bannerContent, {
    [styles.dismissibleSpacing]: dismissible,
  });

  return (
    <>
      {showFlash && (
        <div className={flashClassNames} ref={bannerRef} role="status">
          <div className={contentClassNames}>
            <Text>{children}</Text>
            {primaryAction && (
              <div className={styles.bannerAction}>
                <Button {...primaryAction} />
              </div>
            )}
          </div>
          {dismissible && (
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
