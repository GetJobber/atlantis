import React from "react";
import classnames from "classnames";
import { Typography, TypographyOptions } from "../Typography";
import { Icon, IconNames } from "../Icon";
import styles from "./Button.css";

interface ButtonProps {
  readonly label: string;
  readonly variation?: "work" | "learning" | "destructive" | "cancel";
  readonly type?: "primary" | "secondary" | "tertiary";
  readonly size?: "small" | "base" | "large";
  readonly disabled?: boolean;
  readonly url?: string;
  readonly external?: boolean;
  readonly icon?: IconNames;
  readonly iconOnRight?: boolean;
  readonly fullWidth?: boolean;
  onClick?(): void;
}

interface TypeMap {
  [type: string]: TypographyOptions;
}

export function Button({
  label,
  variation = "work",
  type = "primary",
  disabled = false,
  url,
  external,
  size = "base",
  icon,
  iconOnRight,
  fullWidth,
  onClick,
}: ButtonProps) {
  const buttonClassNames = classnames(styles.button, size && styles[size], {
    [styles.hasIcon]: icon,
    [styles.iconOnRight]: iconOnRight,
    [styles[variation]]: variation,
    [styles[type]]: type,
    [styles.disabled]: disabled,
    [styles.fullWidth]: fullWidth,
  });

  const props = {
    className: buttonClassNames,
    disabled: disabled,
    ...(!disabled && { href: url }),
    ...(!disabled && { onClick: onClick }),
    ...(external && { target: "_blank" }),
  };

  const Tag = url ? "a" : "button";
  return (
    <Tag {...props}>
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
  let isPrimary = type === "primary";
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
    return { ...textColorMap["disabled"] };
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
