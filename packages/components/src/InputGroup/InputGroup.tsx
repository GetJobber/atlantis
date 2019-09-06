import React, { ReactNode } from "react";
import classnames from "classnames";
import styles from "./InputGroup.css";

interface InputGroupProps {
  readonly children: ReactNode | ReactNode[];
  readonly horizontal?: boolean;
}

export function InputGroup({ children, horizontal }: InputGroupProps) {
  const className = classnames(
    styles.inputGroup,
    horizontal && styles.horizontal,
    !horizontal && styles.vertical,
  );

  return <div className={className}>{children}</div>;
}
