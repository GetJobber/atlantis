import React from "react";
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
      icon={<Banner1.Icon name={icon} />}
      dismissButton={dismissible && <Banner1.DismissButton />}
    >
      <Banner1.Content>{children}</Banner1.Content>

      {primaryAction && <Banner1.Action {...primaryAction} />}
    </BannerProvider>
  );
}
