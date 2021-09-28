import React, { ReactNode, useState } from "react";
import classnames from "classnames";
import { useResizeObserver } from "@jobber/hooks";
import { IconColorNames } from "@jobber/design";
import styles from "./Banner.css";
import types from "./notificationTypes.css";
import { Icon } from "../Icon";
import { Text } from "../Text";
import { Button, ButtonProps } from "../Button";

export type BannerType = "notice" | "success" | "warning" | "error";

interface BannerProps {
  readonly children: ReactNode;
  readonly type: BannerType;
  /**
   * The default cta variation should be a 'work' variation. If the banner
   * 'type' is set to 'notice' we change the cta variation to 'learning'
   */
  readonly primaryAction?: ButtonProps;
  /**
   * @default true
   */
  readonly dismissible?: boolean;
  multiple?: boolean;
  messages?: string[];
  onDismiss?(): void;
}

interface IconColorMap {
  [variation: string]: IconColorNames;
}
const globalMessages = [
  "First of a kind",
  "Second to none",
  "Third times a charm",
  "Gang of four",
];
// eslint-disable-next-line max-statements
export function Banner({
  children,
  type,
  primaryAction,
  dismissible = true,
  multiple = false,
  messages = globalMessages,
  onDismiss,
}: BannerProps) {
  const [showFlash, setShowFlash] = useState(true);
  const [current, setCurrent] = useState(0);

  const bannerWidths = {
    small: 320,
    medium: 480,
  };

  const [bannerRef, { width: bannerWidth = bannerWidths.small }] =
    useResizeObserver<HTMLDivElement>({
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

  function getPrev() {
    current > 0 && setCurrent((current - 1) % messages.length);
  }
  function getNext() {
    setCurrent((current + 1) % messages.length);
  }

  return (
    <>
      {showFlash && (
        <div className={flashClassNames} ref={bannerRef} role="status">
          <div className={contentClassNames}>
            {!multiple && <Text>{children}</Text>}
            {multiple && (
              <>
                <div className={styles.message}>
                  <Text>{messages[current]}</Text>
                </div>
                <div className={styles.pagination}>
                  <div className={styles.prev} onClick={getPrev}>
                    <Icon name="arrowLeft" />
                  </div>
                  <Text>
                    {current + 1} of {messages.length}
                  </Text>
                  <div className={styles.next} onClick={getNext}>
                    <Icon name="arrowRight" />
                  </div>
                </div>
              </>
            )}
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
