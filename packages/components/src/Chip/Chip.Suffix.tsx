import React, { PropsWithChildren } from "react";
import classNames from "classnames";
import styles from "./Chip.css";

interface ChipSuffixProps extends PropsWithChildren {
  className?: string;
}

export function ChipSuffix({ children, className }: ChipSuffixProps) {
  return (
    <span className={classNames(styles.suffix, className)}>{children}</span>
  );
}
