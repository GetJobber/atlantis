import React from "react";
import classnames from "classnames";
import { Typography, TypographyOptions } from "../Typography";
import styles from "./Button.css";

interface ButtonProps {
  readonly label: string;
  readonly interactionType?: "work" | "learning" | "destructive" | "cancel";
  readonly variation?: "primary" | "secondary" | "tertiary";
  readonly disabled?: boolean;
  readonly url?: string;
  readonly external?: boolean;
  readonly size?: "small" | "large";
  onClick?(): void;
}

interface TypeMap {
  [type: string]: TypographyOptions;
}

export function Button({
  label,
  interactionType = "work",
  variation = "primary",
  disabled,
  url,
  external,
  size,
  onClick,
}: ButtonProps) {
  const buttonClassNames = classnames(styles.button, size && styles[size], {
    [styles[interactionType]]: interactionType,
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

  const getTextColor = () => {
    let isPrimary = variation === "primary";
    const textColorMap: TypeMap = {
      work: { textColor: isPrimary ? "white" : "green" },
      learning: { textColor: isPrimary ? "white" : "lightBlue" },
      destructive: { textColor: isPrimary ? "white" : "red" },
      cancel: { textColor: "greyBlue" },
      disabled: { textColor: "grey" },
    };

    if (disabled) {
      return { ...textColorMap["disabled"] };
    } else {
      return { ...textColorMap[interactionType] };
    }
  };

  const Tag = url ? "a" : "button";
  return (
    <Tag {...props}>
      <Typography
        element="span"
        textCase="uppercase"
        fontWeight="extraBold"
        size="small"
        {...getTextColor()}
      >
        {label}
      </Typography>
    </Tag>
  );
}
