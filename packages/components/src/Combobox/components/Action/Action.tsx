import React from "react";
import styles from "./Action.css";
import { Typography } from "../../../Typography";

export interface ActionProps {
  /**
   * The function that should be performed when the action is pressed
   */
  readonly onClick: () => void;

  /**
   * Helper text displayed for press action
   */
  readonly label: string;
}

export function Action(props: ActionProps): JSX.Element {
  return (
    <button className={styles.action} onClick={props.onClick}>
      <Typography
        element="span"
        size="base"
        textColor="green"
        fontWeight="bold"
      >
        {props.label}
      </Typography>
    </button>
  );
}
