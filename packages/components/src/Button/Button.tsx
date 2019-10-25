import React from "react";
import classnames from "classnames";
import { XOR } from "ts-xor";
import styles from "./Button.css";
import { Typography, TypographyOptions } from "../Typography";
import { Icon, IconNames } from "../Icon";

interface ButtonFoundationProps {
  readonly ariaControls?: string;
  readonly ariaHaspopup?: boolean;
  readonly ariaExpanded?: boolean;
  readonly disabled?: boolean;
  readonly external?: boolean;
  readonly fullWidth?: boolean;
  readonly icon?: IconNames;
  readonly iconOnRight?: boolean;
  readonly id?: string;
  readonly label: string;
  readonly loading?: boolean;
  readonly size?: "small" | "base" | "large";
  readonly url?: string;
  onClick?(): void;
}

interface BaseActionProps extends ButtonFoundationProps {
  readonly variation?: "work" | "learning";
  readonly type?: "primary" | "secondary" | "tertiary";
}

interface DestructiveActionProps extends ButtonFoundationProps {
  readonly variation?: "destructive";
  readonly type?: "primary" | "secondary";
}

interface CancelActionProps extends ButtonFoundationProps {
  readonly variation?: "cancel";
}

export type ButtonProps = XOR<
  ButtonFoundationProps,
  XOR<BaseActionProps, XOR<DestructiveActionProps, CancelActionProps>>
>;

interface TypeMap {
  [type: string]: TypographyOptions;
}

export function Button({
  ariaControls,
  ariaHaspopup,
  ariaExpanded,
  disabled = false,
  external,
  fullWidth,
  icon,
  iconOnRight,
  id,
  label,
  loading,
  onClick,
  size = "base",
  type = "primary",
  url,
  variation = "work",
}: ButtonProps) {
  const buttonClassNames = classnames(styles.button, size && styles[size], {
    [styles.hasIcon]: icon,
    [styles.iconOnRight]: iconOnRight,
    [styles[variation]]: variation,
    [styles[type]]: type,
    [styles.disabled]: disabled,
    [styles.fullWidth]: fullWidth,
    [styles.loading]: loading,
  });

  const props = {
    className: buttonClassNames,
    disabled: disabled,
    id: id,
    ...(!disabled && { href: url }),
    ...(!disabled && { onClick: onClick }),
    ...(external && { target: "_blank" }),
    ...(url === undefined && { type: "button" as "button" }),
  };

  const Tag = url ? "a" : "button";
  return (
    <Tag
      {...props}
      aria-controls={ariaControls}
      aria-haspopup={ariaHaspopup}
      aria-expanded={ariaExpanded}
    >
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
    </Tag>
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
