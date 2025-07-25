import React from "react";
import styles from "./Banner.module.css";
import { BannerProps } from "./Banner.types";
import { BannerProvider } from "./BannerProvider";
import { Banner as Banner1 } from "./Banner1";

export function Banner({
  children,
  type,
  primaryAction,
  dismissible = true,
  icon,
  onDismiss,
  controlledVisiblity,
}: BannerProps) {
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

  return (
    <BannerProvider
      type={type}
      visible={controlledVisiblity}
      onDismiss={onDismiss}
    >
      <Banner1.ContentWrapper>
        <Banner1.Icon name={icon} />

        <Banner1.Content>{children}</Banner1.Content>

        {primaryAction && <Banner1.Action {...primaryAction} />}
      </Banner1.ContentWrapper>

      {dismissible && <Banner1.DismissButton />}
    </BannerProvider>
  );
}
