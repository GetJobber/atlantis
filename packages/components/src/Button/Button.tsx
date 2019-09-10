import React from "react";
import classnames from "classnames";
import { XOR } from "ts-xor";
import { Typography, TypographyOptions } from "../Typography";
import { Icon, IconNames } from "../Icon";
import styles from "./Button.css";

export interface ButtonProps {
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

interface BaseActionProps extends ButtonProps {
  readonly variation?: "work" | "learning";
  readonly type?: "primary" | "secondary" | "tertiary";
}

interface DestructiveActionProps extends ButtonProps {
  readonly variation?: "destructive";
  readonly type?: "primary" | "secondary";
}

interface CancelActionProps extends ButtonProps {
  readonly variation?: "cancel";
}

type ButtonPropOptions = XOR<
  ButtonProps,
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
}: ButtonPropOptions) {
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
      {icon && <Icon name={icon} size={size} />}
      <Typography {...getTypeProps(variation, type, disabled, size)}>
        {label}
      </Typography>
    </Tag>
  );
}

function getTypeProps(
  variation: string,
  type: string,
  disabled: boolean,
  size: string,
) {
  const isPrimary = type === "primary";
  const baseTypeProps: TypographyOptions = {
    element: "span",
    textCase: "uppercase",
    fontWeight: "extraBold",
    size: getTypeSizes(size),
  };

  const textColorMap: TypeMap = {
    work: {
      ...baseTypeProps,
      textColor: isPrimary ? "white" : "green",
    },
    learning: {
      ...baseTypeProps,
      textColor: isPrimary ? "white" : "lightBlue",
    },
    destructive: {
      ...baseTypeProps,
      textColor: isPrimary ? "white" : "red",
    },
    cancel: {
      ...baseTypeProps,
      textColor: "greyBlue",
    },
    disabled: {
      ...baseTypeProps,
      textColor: "grey",
    },
  };

  if (disabled) {
    return { ...textColorMap.disabled };
  } else {
    return { ...textColorMap[variation] };
  }
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
