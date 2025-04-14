import React from "react";
import styles from "./ClearAction.module.css";
import { Icon } from "../../Icon";

interface ClearActionProps {
  /**
   * Click handler
   */
  readonly onClick: () => void;
  readonly visible?: boolean;
}

export function ClearAction({
  onClick,
  visible,
}: ClearActionProps): React.ReactElement | null {
  if (!visible) return null;

  return (
    <button
      className={styles.clearInput}
      onClick={onClick}
      type="button"
      aria-label="Clear input"
      data-testid="ATL-FormField-clearButton"
    >
      <Icon name="remove" size="small" />
    </button>
  );
}
