import React from "react";
import styles from "./ComboboxAction.css";
import { Typography } from "../../../Typography";

export interface ComboboxActionProps {
  /**
   * The function to call when the action is clicked.
   */
  onClick(event: React.MouseEvent<HTMLButtonElement>): void;

  /**
   * The label text of the action.
   */
  readonly label: string;
}

export function ComboboxAction(props: ComboboxActionProps): JSX.Element {
  return (
    <div className={styles.actionContainer}>
      <button
        className={styles.actionButton}
        onClick={props.onClick}
        type="button"
        aria-label={props.label}
      >
        <Typography
          element="span"
          size="base"
          textColor="green"
          fontWeight="semiBold"
        >
          {props.label}
        </Typography>
      </button>
    </div>
  );
}
