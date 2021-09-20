import React from "react";
import classnames from "classnames";
import styles from "./Chip.css";
import { ChipLabel } from "./ChipLabel";
import { ChipProps } from "./ChipProps";

export function Chip({ label, active = false, onClick }: ChipProps) {
  const className = classnames(styles.chip, {
    [styles.clickable]: onClick,
    [styles.active]: active,
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
      <ChipLabel label={label} active={active} />
    </div>
  );
}
