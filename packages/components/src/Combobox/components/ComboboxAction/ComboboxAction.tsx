import React from "react";
import styles from "./ComboboxAction.css";
import { Typography } from "../../../Typography";

export interface ComboboxActionProps {
  /**
   * The function that should be performed when the action is pressed
   */
  onClick(event: React.MouseEvent<HTMLButtonElement>): void;

  /**
   * Helper text displayed for press action
   */
  readonly label: string;
}

export function ComboboxAction(props: ComboboxActionProps): JSX.Element {
  return (
    <div className={styles.actionContainer}>
      <button
        className={styles.actionButton}
        onClick={props.onClick}
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
