import React, { ReactNode, useState } from "react";
import classnames from "classnames";
import { IconNames } from "@jobber/design";
import { useResizeObserver } from "@jobber/hooks/useResizeObserver";
import styles from "./Banner.module.css";
import { BannerIcon } from "./components/BannerIcon";
import { BannerProps, BannerType } from "./Banner.types";
import { Text } from "../Text";
import { Button } from "../Button";
import { ButtonDismiss } from "../ButtonDismiss/ButtonDismiss";

export function Banner({
  children,
  type,
  primaryAction,
  dismissible = true,
  icon,
  onDismiss,
  controlledVisiblity,
}: BannerProps) {
  const [showBanner, setShowBanner] = useState(true);
  const bannerIcon = icon || getBannerIcon(type);
  const controlledVisible = controlledVisiblity ?? true;
  const visible = controlledVisible && showBanner;

  const bannerWidths = {
    small: 320,
    medium: 480,
  };

  const [bannerRef, { width: bannerWidth = bannerWidths.small }] =
    useResizeObserver<HTMLDivElement>({
      widths: bannerWidths,
    });

  if (primaryAction != undefined) {
    primaryAction = Object.assign(
      {
        size: "small",
        type: "primary",
        variation: "subtle",
      },
      primaryAction,
    );
  }

  const bannerClassNames = classnames(styles.banner, [styles[type]], {
    [styles.medium]: bannerWidth >= bannerWidths.medium,
  });

  if (!visible) return null;

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
        <div className={styles.closeButton}>
          <ButtonDismiss
            ariaLabel={"Dismiss notification"}
            onClick={handleClose}
          />
        </div>
      )}
    </div>
  );

  function handleClose() {
    if (typeof controlledVisiblity === "undefined") {
      setShowBanner(!showBanner);
    }
    onDismiss?.();
  }
}

function getBannerIcon(type: BannerType): IconNames | undefined {
  switch (type) {
    case "notice":
      return "info";
    case "success":
      return "checkmark";
    case "warning":
      return "warning";
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
