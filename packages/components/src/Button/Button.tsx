import React from "react";
import classnames from "classnames";
import { Typography, TypographyOptions } from "../Typography";
import styles from "./Button.css";

interface ButtonProps {
  readonly label: string;
  readonly type?: "work" | "learning" | "destructive" | "cancel";
  readonly variation?: "primary" | "secondary" | "tertiary";
  readonly size?: "small" | "base" | "large";
  readonly disabled?: boolean;
  readonly url?: string;
  readonly external?: boolean;
  onClick?(): void;
}

interface TypeMap {
  [type: string]: TypographyOptions;
}

export function Button({
  label,
  type = "work",
  variation = "primary",
  disabled = false,
  url,
  external,
  size = "base",
  onClick,
}: ButtonProps) {
  const buttonClassNames = classnames(styles.button, size && styles[size], {
    [styles[type]]: type,
    [styles[variation]]: variation,
    [styles.disabled]: disabled,
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
      <Typography {...getTypeProps(type, variation, disabled, size)}>
        {label}
      </Typography>
    </Tag>
  );
}

function getTypeProps(
  type: string,
  variation: string,
  disabled: boolean,
  size: string,
) {
  let isPrimary = variation === "primary";
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
    return { ...textColorMap[type] };
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
