import React, { ReactNode, useState } from "react";
import classnames from "classnames";
import { IconColorNames } from "@jobber/design";
import { useResizeObserver } from "@jobber/hooks";
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
  const [showBanner, setShowBanner] = useState(true);

  const bannerWidths = {
    small: 320,
    medium: 480,
  };

  const [bannerRef, { width: bannerWidth = bannerWidths.small }] =
    useResizeObserver<HTMLDivElement>({
      widths: bannerWidths,
    });

  const iconColors: IconColorMap = {
    notice: "informative",
    success: "success",
    warning: "warning",
    error: "critical",
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

  const bannerClassNames = classnames(styles.banner, types[type], {
    [styles.medium]: bannerWidth >= bannerWidths.medium,
  });

  return (
    <>
      {showBanner && (
        <div
          className={bannerClassNames}
          ref={bannerRef}
          role={type === "error" ? "alert" : "status"}
        >
          {/* <div className={styles.bannerContent}> */}
          <div className={styles.bannerChildren}>
            <BannerChildren>{children}</BannerChildren>
          </div>
          {primaryAction && (
            <div className={styles.bannerAction}>
              <Button {...primaryAction} />
            </div>
          )}
          {/* </div> */}
          {dismissible && (
            <button
              className={styles.closeButton}
              onClick={handleClose}
              aria-label="Close this notification"
            >
              <Icon name="cross" color={iconColors[type]} />
            </button>
          )}
        </div>
      )}
    </>
  );

  function handleClose() {
    setShowBanner(!showBanner);
    onDismiss && onDismiss();
  }
}

function BannerChildren({ children }: { children?: ReactNode }): JSX.Element {
  if (!children) return <></>;

  if (children && typeof children === "string") {
    return <Text>{children}</Text>;
  }

  return <>{children}</>;
}
