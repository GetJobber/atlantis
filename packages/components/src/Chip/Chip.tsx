import React from "react";
import classnames from "classnames";
import styles from "./Chip.css";
import { Typography } from "../Typography";

interface ChipProps {
  /**
   * Label of the chip
   */
  readonly label: string;

  /**
   * Callback when the chip itself gets clicked.
   */
  onClick?(event: React.MouseEvent<HTMLDivElement>): void;
}

export function Chip({ label, onClick }: ChipProps) {
  const className = classnames(styles.chip, {
    [styles.clickable]: onClick,
  });
  const props = {
    className: className,
    tabindex: 0,
    ...(onClick && {
      onClick: onClick,
      role: "button",
    }),
  };

  return (
    <div {...props}>
      <Typography element="span" size="base" textColor="textSecondary">
        {label}
      </Typography>
    </div>
  );
}
