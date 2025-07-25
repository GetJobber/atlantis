import React, { PropsWithChildren } from "react";
import classnames from "classnames";
import { tokens } from "@jobber/design";
import { BannerProvider, useBanner } from "./BannerProvider";
import { BannerType } from "./Banner.types";
import styles from "./Banner.module.css";
import bannerIconStyles from "./BannerIcon.module.css";
import { Icon, IconNames, IconProps } from "../Icon";
import { ButtonDismiss, type ButtonDismissProps } from "../ButtonDismiss";
import type { Colors } from "../Box/Box.types";
import { Button, type ButtonProps } from "../Button";
import { Text } from "../Text";

export function Banner() {
  // TODO delete this
}

Banner.Provider = BannerProvider;

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

Banner.ContentWrapper = function ContentWrapper(props: PropsWithChildren) {
  return <div className={styles.bannerContent}>{props.children}</div>;
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

// const children = props.children ?? <BannerInternal {...props} />;
// function BannerInternal(props: BannerProps) {
//   return (
//     <>
//       <Banner.Icon icon={props.accent} />
//       <Banner.Text>body content</Banner.Text>
//       <Banner.DismissButton  />
//     </>
//   );
// }
