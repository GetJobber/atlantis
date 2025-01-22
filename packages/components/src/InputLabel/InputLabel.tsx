import React from "react";
import styles from "./InputLabel.module.css";

export function InputLabel({
  label,
  inputId,
  style,
}: {
  readonly label?: string;
  readonly inputId?: string;
  readonly style?: React.CSSProperties;
}) {
  if (!label) return null;

  return (
    <label className={styles.label} htmlFor={inputId} style={style}>
      {label}
    </label>
  );
}
