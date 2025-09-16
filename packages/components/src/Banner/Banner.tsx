import React, { type PropsWithChildren, useState } from "react";
import classnames from "classnames";
import { useResizeObserver } from "@jobber/hooks";
import type {
  BannerActionProps,
  BannerContentProps,
  BannerDismissButtonProps,
  BannerIconProps,
  BannerProps,
  BannerProviderProps,
  BannerType,
} from "./Banner.types";
import styles from "./Banner.module.css";
import { BannerContextProvider, useBanner } from "./BannerContext";
import { Icon, type IconNames } from "../Icon";
import { ButtonDismiss } from "../ButtonDismiss";
import { Button, type ButtonProps } from "../Button";
import { Text } from "../Text";

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
    <Banner.Provider
      type={type}
      visible={controlledVisiblity}
      onDismiss={onDismiss}
      icon={<Banner.Icon name={icon} />}
      dismissButton={dismissible && <Banner.DismissButton />}
    >
      <Banner.Content>{children}</Banner.Content>

      {primaryAction && <Banner.Action {...primaryAction} />}
    </Banner.Provider>
  );
}

Banner.Provider = function BannerProvider({
  children,
  visible,
  type,
  onDismiss,
  icon,
  dismissButton,
  UNSAFE_className,
  UNSAFE_style,
}: BannerProviderProps) {
  const [isVisible, _setIsVisible] = useState(true);
  const showBanner = visible ?? isVisible;

  const setIsVisible = (newValue: boolean) => {
    // Only update internal visibility if it's not controlled by the parent.
    if (typeof visible === "undefined") {
      _setIsVisible(newValue);
    }
    onDismiss?.();
  };

  return (
    <BannerContextProvider
      value={{
        type,
        isVisible: showBanner,
        setIsVisible,
      }}
    >
      <InternalWrapper
        icon={icon}
        dismissButton={dismissButton}
        UNSAFE_className={UNSAFE_className}
        UNSAFE_style={UNSAFE_style}
      >
        {children}
      </InternalWrapper>
    </BannerContextProvider>
  );
};

function InternalWrapper({
  children,
  icon,
  dismissButton,
  UNSAFE_className,
  UNSAFE_style,
}: PropsWithChildren &
  Pick<
    BannerProviderProps,
    "icon" | "dismissButton" | "UNSAFE_className" | "UNSAFE_style"
  >) {
  const { isVisible, type } = useBanner();

  const bannerWidths = {
    small: 320,
    medium: 480,
  };

  const [bannerRef, { width: bannerWidth = bannerWidths.small }] =
    useResizeObserver<HTMLDivElement>({
      widths: bannerWidths,
    });

  const bannerClassNames = classnames(
    styles.banner,
    [styles[type]],
    {
      [styles.medium]: bannerWidth >= bannerWidths.medium,
    },
    UNSAFE_className?.container,
  );

  if (!isVisible) return null;

  return (
    <div
      ref={bannerRef}
      className={bannerClassNames}
      style={UNSAFE_style?.container}
      role={type === "error" ? "alert" : "status"}
    >
      <div className={styles.bannerContent}>
        {icon ?? <Banner.Icon />}
        {children}
      </div>
      {dismissButton ?? <Banner.DismissButton />}
    </div>
  );
}

Banner.Icon = function BannerIcon({
  backgroundColor,
  UNSAFE_className,
  UNSAFE_style,
  ...iconProps
}: BannerIconProps) {
  const { type } = useBanner();
  const name = iconProps.name || getBannerIcon(type);
  const color = iconProps.customColor ? undefined : "surface";
  const size = "small";

  if (!name) return null;

  const overrideStyles: React.CSSProperties = {};

  if (backgroundColor) {
    overrideStyles.backgroundColor = `var(--color-${backgroundColor})`;
  }

  const classNames = classnames(
    styles.iconWrapper,
    styles[`${type}Icon`],
    UNSAFE_className?.container,
  );

  return (
    <span
      className={classNames}
      style={{
        ...overrideStyles,
        ...UNSAFE_style?.container,
      }}
    >
      <Icon
        color={color}
        size={size}
        UNSAFE_className={UNSAFE_className?.icon}
        UNSAFE_style={UNSAFE_style?.icon}
        {...iconProps}
        name={name}
      />
    </span>
  );
};

Banner.Content = function BannerContent(props: BannerContentProps) {
  let children = props.children;

  if (children && typeof children === "string") {
    children = <Text>{children}</Text>;
  }

  return (
    <div
      className={classnames(
        styles.bannerChildren,
        props.UNSAFE_className?.container,
      )}
      style={props.UNSAFE_style?.container}
    >
      {children}
    </div>
  );
};

Banner.DismissButton = function DismissButton(props: BannerDismissButtonProps) {
  const { setIsVisible } = useBanner();
  const ariaLabel = props.ariaLabel ?? "Dismiss notification";
  const onClick =
    props.onClick ??
    (() => {
      setIsVisible(false);
    });

  return (
    <div
      className={classnames(
        styles.closeButton,
        props.UNSAFE_className?.container,
      )}
      style={props.UNSAFE_style?.container}
    >
      <ButtonDismiss onClick={onClick} ariaLabel={ariaLabel} />
    </div>
  );
};

Banner.Action = function Action({
  UNSAFE_className,
  UNSAFE_style,
  ...buttonProps
}: BannerActionProps) {
  const classNames = classnames(
    styles.bannerAction,
    UNSAFE_className?.container,
  );

  return (
    <div className={classNames} style={UNSAFE_style?.container}>
      <Button
        size="small"
        type="primary"
        variation="subtle"
        UNSAFE_className={UNSAFE_className?.button}
        UNSAFE_style={UNSAFE_style?.button}
        {...(buttonProps as ButtonProps)}
      />
    </div>
  );
};

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
