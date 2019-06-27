import React from "react";
import classnames from "classnames";
import styles from "./Switch.css";

interface SwitchProps {
  readonly on: boolean;
}

export function Switch({ on = false }: SwitchProps) {
  const className = classnames(styles.track, { [styles.isChecked]: on });

  return (
    <div className={className}>
      <input type="checkbox" className={styles.checkbox} checked={on} />
      <span className={styles.pip} />
    </div>
  );
}
