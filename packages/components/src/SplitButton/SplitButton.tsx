import React, { ReactNode } from "react";
import classnames from "classnames";
import styles from "./SplitButton.module.css";

export interface SplitButtonProps {
  /**
   * The buttons and/or menu to render in the split button group
   */
  readonly children: ReactNode;

  /**
   * Optional class name for custom styling
   */
  readonly className?: string;
}

export function SplitButton({ children, className }: SplitButtonProps) {
  return (
    <div className={classnames(styles.splitButton, className)}>{children}</div>
  );
}
