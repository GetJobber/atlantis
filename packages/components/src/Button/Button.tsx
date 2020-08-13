import React from "react";
import classnames from "classnames";
import { XOR } from "ts-xor";
import { Link } from "react-router-dom";
import { IconNames } from "@jobber/design";
import styles from "./Button.css";
import { Typography } from "../Typography";
import { Icon } from "../Icon";

interface ButtonFoundationProps {
  /**
   * Used for screen readers. Will override label on screen
   * reader if present.
   */
  readonly ariaLabel?: string;
  readonly ariaControls?: string;
  readonly ariaHaspopup?: boolean;
  readonly ariaExpanded?: boolean;
  readonly disabled?: boolean;
  readonly external?: boolean;
  readonly fullWidth?: boolean;
  readonly icon?: IconNames;
  readonly iconOnRight?: boolean;
  readonly id?: string;
  readonly label?: string;
  readonly loading?: boolean;
  readonly size?: "small" | "base" | "large";
  onClick?(): void;
}

interface ButtonIconProps extends ButtonFoundationProps {
  readonly icon: IconNames;
  readonly ariaLabel: string;
}

interface ButtonLabelProps extends ButtonFoundationProps {
  readonly label: string;
}

interface ButtonAnchorProps extends ButtonFoundationProps {
  /**
   * Used to create an 'href' on an anchor tag.
   */
  readonly url?: string;
}

interface ButtonLinkProps extends ButtonFoundationProps {
  /**
   * Used for client side routing. Only use when inside a routed component.
   */
  readonly to?: string;
}

interface BaseActionProps extends ButtonFoundationProps {
  readonly variation?: "work" | "learning";
  readonly type?: "primary" | "secondary" | "tertiary";
}

interface DestructiveActionProps extends ButtonFoundationProps {
  readonly variation: "destructive";
  readonly type?: "primary" | "secondary";
}

interface CancelActionProps extends ButtonFoundationProps {
  readonly variation: "cancel";
  readonly type?: "secondary" | "tertiary";
}

export type ButtonProps = XOR<
  BaseActionProps,
  XOR<DestructiveActionProps, CancelActionProps>
> &
  XOR<ButtonLinkProps, ButtonAnchorProps> &
  XOR<ButtonIconProps, ButtonLabelProps>;

export function Button(props: ButtonProps) {
  const {
    ariaControls,
    ariaHaspopup,
    ariaExpanded,
    ariaLabel,
    disabled = false,
    external,
    fullWidth,
    icon,
    label,
    iconOnRight,
    id,
    loading,
    onClick,
    size = "base",
    type = "primary",
    url,
    to,
    variation = "work",
  } = props;

  const buttonClassNames = classnames(styles.button, styles[size], {
    [styles.hasIconAndLabel]: icon && label,
    [styles.onlyIcon]: icon && !label,
    [styles.iconOnRight]: iconOnRight,
    [styles[variation]]: variation,
    [styles[type]]: type,
    [styles.disabled]: disabled,
    [styles.fullWidth]: fullWidth,
    [styles.loading]: loading,
  });

  const tagProps = {
    className: buttonClassNames,
    disabled,
    id,
    ...(!disabled && { href: url }),
    ...(!disabled && { onClick: onClick }),
    ...(external && { target: "_blank" }),
    ...(url === undefined &&
      to === undefined && { type: "button" as "button" }),
    "aria-controls": ariaControls,
    "aria-haspopup": ariaHaspopup,
    "aria-expanded": ariaExpanded,
    "aria-label": ariaLabel,
  };

  const buttonInternals = <ButtonInternals {...props} />;

  if (to) {
    return (
      <Link {...tagProps} to={to}>
        {buttonInternals}
      </Link>
    );
  }

  const Tag = url ? "a" : "button";

  return <Tag {...tagProps}>{buttonInternals}</Tag>;
}

function ButtonInternals({
  label,
  icon,
  variation = "work",
  type = "primary",
  disabled,
  size = "base",
}: ButtonProps) {
  return (
    <>
      {icon && (
        <Icon
          name={icon}
          size={size}
          color={getColor(variation, type, disabled)}
        />
      )}
      <Typography
        element="span"
        textCase="uppercase"
        fontWeight="extraBold"
        size={getTypeSizes(size)}
        textColor={getColor(variation, type, disabled)}
      >
        {label}
      </Typography>
    </>
  );
}

function getTypeSizes(size: string) {
  switch (size) {
    case "small":
      return "smaller";
    case "large":
      return "base";
    default:
      return "small";
  }
}

function getColor(variation: string, type: string, disabled?: boolean) {
  if (type === "primary" && variation !== "cancel" && !disabled) {
    return "white";
  }

  if (disabled) {
    return "grey";
  }

  switch (variation) {
    case "learning":
      return "lightBlue";
    case "destructive":
      return "red";
    case "cancel":
      return "greyBlue";
    default:
      return "green";
  }
}
