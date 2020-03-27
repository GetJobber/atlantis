import React, { ReactNode } from "react";
import classnames from "classnames";
import styles from "./InputGroup.css";

interface InputGroupProps {
  readonly children: ReactNode | ReactNode[];
  readonly flowDirection: "horizontal" | "vertical";
}

export function InputGroup({
  children,
  flowDirection = "vertical",
}: InputGroupProps) {
  const className = classnames(styles.inputGroup, styles[flowDirection]);

  return <div className={className}>{children}</div>;
}
