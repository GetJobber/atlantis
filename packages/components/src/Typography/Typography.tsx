import React, { ReactNode } from "react";
import classnames from "classnames";
import styles from "./Typography.css";

interface TypographyProps {
  /**
   *
   * @default "p"
   */
  readonly element: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
  readonly children: ReactNode;
}

export function Typography({ children, element = "p" }: TypographyProps) {
  const className = classnames(styles.typography, {});
  const Tag = element;

  return <Tag className={className}>{children}</Tag>;
}
