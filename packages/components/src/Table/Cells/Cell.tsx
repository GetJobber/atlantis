import React, { ReactNode } from "react";
import classnames from "classnames";
import styles from "./Cell.css";

interface CellProps {
  children?: ReactNode | ReactNode[];
  align?: "left" | "center" | "right";
}

export function Cell({ children, align = "left" }: CellProps) {
  const className = classnames(styles.cell, styles[align]);

  return <td className={className}>{children}</td>;
}
