import React from "react";
import styles from "./ClearAction.module.css";
import { Icon } from "../../Icon";

interface ClearActionProps {
  /**
   * Click handler
   */
  readonly onClick: () => void;
}

export function ClearAction({ onClick }: ClearActionProps): JSX.Element {
  return (
    <button
      className={styles.clearInput}
      onClick={onClick}
      type="button"
      aria-label="Clear input"
    >
      <Icon name="remove" size="small" />
    </button>
  );
}
