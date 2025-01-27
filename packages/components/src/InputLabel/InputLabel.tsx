import React from "react";
import styles from "./InputLabel.module.css";

export interface InputLabelProps {
  readonly children?: React.ReactNode;
  readonly htmlFor?: string;
  readonly style?: React.CSSProperties;
  readonly external?: boolean;
}

export function InputLabel({
  children,
  htmlFor,
  style,
  external = true,
}: InputLabelProps): JSX.Element | null {
  if (!children) return null;

  return (
    <label
      className={external ? styles.external : styles.label}
      htmlFor={htmlFor}
      style={style}
    >
      {children}
    </label>
  );
}
