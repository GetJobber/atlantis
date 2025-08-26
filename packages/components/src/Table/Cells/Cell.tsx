import type { ReactNode } from "react";
import React from "react";
import classnames from "classnames";
import styles from "./Cell.module.css";

interface CellProps {
  readonly children?: ReactNode | ReactNode[];
  readonly align?: "left" | "center" | "right";
}

export function Cell({ children, align = "left" }: CellProps) {
  const className = classnames(styles.cell, styles[align]);

  return <td className={className}>{children}</td>;
}
