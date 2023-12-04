import React from "react";
import classnames from "classnames";
import styles from "./FormField.css";
import { Icon } from "../Icon";

interface ClearActionProps {
  /**
   * Click handler
   */
  readonly onClick: () => void;
  readonly hasMarginRight?: boolean;
}

export function ClearAction({
  onClick,
  hasMarginRight = false,
}: ClearActionProps): JSX.Element {
  return (
    <button
      className={classnames(styles.clearInput, {
        [styles.addedMargin]: hasMarginRight,
      })}
      onClick={onClick}
      type="button"
      data-testid="ATL-Input-Clear"
      aria-label="Clear input"
    >
      <Icon name="remove" size="small" />
    </button>
  );
}
