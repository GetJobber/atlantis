import React from "react";
import classnames from "classnames";
import { Typography, TypographyOptions } from "../Typography";
import styles from "./Button.css";

interface ButtonProps {
  readonly label: string;
  readonly interactionType?: "work" | "learning" | "destructive" | "cancel";
  readonly variation?: "primary" | "secondary" | "tertiary";
}

interface TypeMap {
  [type: string]: TypographyOptions;
}

export function Button({
  label,
  interactionType = "work",
  variation = "primary",
}: ButtonProps) {
  let isPrimary = variation === "primary";
  const textColorMap: TypeMap = {
    work: { textColor: isPrimary ? "white" : "green" },
    learning: { textColor: isPrimary ? "white" : "lightBlue" },
    destructive: { textColor: isPrimary ? "white" : "red" },
    cancel: { textColor: "greyBlue" },
  };

  const className = classnames(styles.button, {
    [styles[interactionType]]: interactionType,
    [styles[variation]]: variation,
  });

  return (
    <button className={className}>
      <Typography
        element="span"
        textCase="uppercase"
        fontWeight="extraBold"
        size="small"
        {...textColorMap[interactionType]}
      >
        {label}
      </Typography>
    </button>
  );
}
