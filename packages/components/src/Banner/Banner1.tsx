import React from "react";
import classnames from "classnames";
import { tokens } from "@jobber/design";
import { BannerProvider, useBanner } from "./BannerProvider";
import { BannerType } from "./Banner.types";
import styles from "./Banner.module.css";
import bannerIconStyles from "./components/BannerIcon/BannerIcon.module.css";
import { Icon, IconNames, IconProps } from "../Icon";
import { ButtonDismiss, type ButtonDismissProps } from "../ButtonDismiss";
import type { Colors } from "../Box/Box.types";
import { Button, type ButtonProps } from "../Button";

export interface BannerProps extends React.PropsWithChildren {
  readonly type: BannerType;
}

export function Banner(props: BannerProps) {
  return (
    <BannerProvider type={props.type}>
      <BannerInternal {...props} />
    </BannerProvider>
  );
}

function BannerInternal(props: BannerProps) {
  const { isVisible } = useBanner();
  const classNames = classnames(styles.banner, [styles[props.type]]);

  if (!isVisible) return null;

  return <div className={classNames}>{props.children}</div>;
}

Banner.Icon = function BannerIcon(
  props: {
    readonly backgroundColor?: Colors;
  } & Partial<IconProps>,
) {
  const { type } = useBanner();
  const name = getBannerIcon(type);
  const color = "surface";
  const size = "small";

  const overrideStyles: React.CSSProperties = {};

  if (props.backgroundColor) {
    overrideStyles.backgroundColor = tokens[`color-${props.backgroundColor}`];
  }

  const classNames = classnames(styles.iconWrapper, bannerIconStyles[type]);

  return (
    <span className={classNames} style={overrideStyles}>
      <Icon name={name} color={color} size={size} {...props} />
    </span>
  );
};

Banner.Content = function BannerContent({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return <div className={styles.bannerChildren}>{children}</div>;
};

Banner.DismissButton = function DismissButton({
  onDismiss,
  ...buttonDismissProps
}: {
  readonly onDismiss?: () => void;
} & Partial<ButtonDismissProps>) {
  const { setIsVisible } = useBanner();
  const ariaLabel = buttonDismissProps.ariaLabel ?? "Dismiss notification";
  const onClick =
    buttonDismissProps.onClick ??
    (() => {
      setIsVisible(false);
      onDismiss?.();
    });

  return (
    <div className={styles.closeButton}>
      <ButtonDismiss onClick={onClick} ariaLabel={ariaLabel} />
    </div>
  );
};

Banner.Action = function Action(props: ButtonProps) {
  return <Button size="small" type="primary" variation="subtle" {...props} />;
};

function getBannerIcon(type: BannerType): IconNames {
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
