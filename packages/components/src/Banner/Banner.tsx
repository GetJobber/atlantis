import React, { ReactNode, useState } from "react";
import classnames from "classnames";
import { IconColorNames, IconNames } from "@jobber/design";
import { useResizeObserver } from "@jobber/hooks/useResizeObserver";
import styles from "./Banner.css";
import types from "./notificationTypes.css";
import { BannerIcon } from "./components/BannerIcon";
import { BannerType } from "./Banner.types";
import { Icon } from "../Icon";
import { Text } from "../Text";
import { Button, ButtonProps } from "../Button";
import { useAtlantisConfig } from "../utils/useAtlantisConfig";

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

  /**
   * Adds an icon to the left of the banner content
   */
  readonly icon?: IconNames;
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
  icon,
  onDismiss,
}: BannerProps) {
  const { JOBBER_RETHEME } = useAtlantisConfig();
  const [showBanner, setShowBanner] = useState(true);
  const bannerIcon = icon || getBannerIcon(type);

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

  if (!showBanner) return null;

  return (
    <div
      className={bannerClassNames}
      ref={bannerRef}
      role={type === "error" ? "alert" : "status"}
    >
      <div className={styles.bannerContent}>
        {bannerIcon && <BannerIcon icon={bannerIcon} type={type} />}

        <div className={styles.bannerChildren}>
          <BannerChildren>{children}</BannerChildren>
        </div>

        {primaryAction && (
          <div className={styles.bannerAction}>
            <Button {...primaryAction} />
          </div>
        )}
      </div>

      {dismissible && (
        <button
          type="button"
          className={styles.closeButton}
          onClick={handleClose}
          aria-label="Close this notification"
        >
          <Icon
            name="cross"
            color={JOBBER_RETHEME ? "interactiveSubtle" : iconColors[type]}
          />
        </button>
      )}
    </div>
  );

  function handleClose() {
    setShowBanner(!showBanner);
    onDismiss && onDismiss();
  }
}

function getBannerIcon(type: BannerType): IconNames | undefined {
  const { JOBBER_RETHEME } = useAtlantisConfig();
  if (!JOBBER_RETHEME) return;

  switch (type) {
    case "notice":
      return "starburst";
    case "success":
      return "checkmark";
    case "warning":
      return "help";
    case "error":
      return "alert";
  }
}

function BannerChildren({
  children,
}: {
  readonly children?: ReactNode;
}): JSX.Element {
  if (!children) return <></>;

  if (children && typeof children === "string") {
    return <Text>{children}</Text>;
  }

  return <>{children}</>;
}
