import React from "react";
import styles from "./ClearAction.css";
import { Icon } from "../../Icon";

interface ClearActionProps {
  /**
   * Click handler
   */
  readonly onClick: () => void;
}

export function ClearAction({ onClick }: ClearActionProps): JSX.Element {
  return (
    <div className={styles.clearContainer}>
      <button
        className={styles.clearInput}
        // Prevent the input from losing focus when the clear button is clicked
        onMouseDown={event => event.preventDefault()}
        onClick={onClick}
        type="button"
        aria-label="Clear input"
      >
        <Icon name="remove" size="small" />
      </button>
    </div>
  );
}
