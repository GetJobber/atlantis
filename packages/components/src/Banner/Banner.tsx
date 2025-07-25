import React, { PropsWithChildren, useCallback, useState } from "react";
import classnames from "classnames";
import { tokens } from "@jobber/design";
import { useResizeObserver } from "@jobber/hooks/useResizeObserver";
import { BannerProps, BannerProviderProps, BannerType } from "./Banner.types";
import styles from "./Banner.module.css";
import bannerIconStyles from "./BannerIcon.module.css";
import { BannerContextProvider, useBanner } from "./BannerContext";
import { Icon, IconNames, IconProps } from "../Icon";
import { ButtonDismiss, type ButtonDismissProps } from "../ButtonDismiss";
import type { Colors } from "../Box/Box.types";
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
}: {
  readonly children: React.ReactNode;
} & BannerProviderProps) {
  const [isVisible, _setIsVisible] = useState(true);
  const showBanner = visible ?? isVisible;

  const setIsVisible = useCallback(
    (newValue: boolean) => {
      // Only update internal visibility if it's not controlled by the parent.
      if (typeof visible === "undefined") {
        _setIsVisible(newValue);
      }
      onDismiss?.();
    },
    [visible],
  );

  return (
    <BannerContextProvider
      value={{
        type,
        isVisible: showBanner,
        setIsVisible,
      }}
    >
      <InternalWrapper icon={icon} dismissButton={dismissButton}>
        {children}
      </InternalWrapper>
    </BannerContextProvider>
  );
};

function InternalWrapper({
  children,
  icon,
  dismissButton,
}: PropsWithChildren & {
  readonly icon?: React.ReactNode;
  readonly dismissButton?: React.ReactNode;
}) {
  const { isVisible, type } = useBanner();

  const bannerWidths = {
    small: 320,
    medium: 480,
  };

  const [bannerRef, { width: bannerWidth = bannerWidths.small }] =
    useResizeObserver<HTMLDivElement>({
      widths: bannerWidths,
    });

  const bannerClassNames = classnames(styles.banner, [styles[type]], {
    [styles.medium]: bannerWidth >= bannerWidths.medium,
  });

  if (!isVisible) return null;

  return (
    <div
      ref={bannerRef}
      className={bannerClassNames}
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

Banner.Icon = function BannerIcon(
  props: {
    readonly backgroundColor?: Colors;
  } & Partial<IconProps>,
) {
  const { type } = useBanner();
  const name = props.name || getBannerIcon(type);
  const color = props.customColor ? undefined : "surface";
  const size = "small";

  if (!name) return null;

  const overrideStyles: React.CSSProperties = {};

  if (props.backgroundColor) {
    overrideStyles.backgroundColor = tokens[`color-${props.backgroundColor}`];
  }

  const classNames = classnames(styles.iconWrapper, bannerIconStyles[type]);

  return (
    <span className={classNames} style={overrideStyles}>
      <Icon color={color} size={size} {...props} name={name} />
    </span>
  );
};

Banner.Content = function BannerContent(props: PropsWithChildren) {
  let children = props.children;

  if (children && typeof children === "string") {
    children = <Text>{children}</Text>;
  }

  return <div className={styles.bannerChildren}>{children}</div>;
};

Banner.DismissButton = function DismissButton(
  buttonDismissProps: Partial<ButtonDismissProps>,
) {
  const { setIsVisible } = useBanner();
  const ariaLabel = buttonDismissProps.ariaLabel ?? "Dismiss notification";
  const onClick =
    buttonDismissProps.onClick ??
    (() => {
      setIsVisible(false);
    });

  return (
    <div className={styles.closeButton}>
      <ButtonDismiss onClick={onClick} ariaLabel={ariaLabel} />
    </div>
  );
};

Banner.Action = function Action(props: ButtonProps) {
  return (
    <div className={styles.bannerAction}>
      <Button size="small" type="primary" variation="subtle" {...props} />
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
