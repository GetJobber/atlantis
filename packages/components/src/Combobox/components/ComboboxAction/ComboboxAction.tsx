import React from "react";
import styles from "./ComboboxAction.css";
// import { Typography } from "../../../Typography";
import { Button } from "../../../Button";

export interface ComboboxActionProps {
  /**
   * The function that should be performed when the action is pressed
   */
  readonly onClick: () => void;

  /**
   * Helper text displayed for press action
   */
  readonly label: string;
}

export function ComboboxAction(props: ComboboxActionProps): JSX.Element {
  return (
    // <button className={styles.action} onClick={props.onClick}>
    //   <Typography
    //     element="span"
    //     size="base"
    //     textColor="green"
    //     fontWeight="bold" // TODO switch to semiBold once Triggers gets merged
    //   >
    //     {props.label}
    //   </Typography>
    // </button>
    <div className={styles.action} onClick={props.onClick}>
      <Button label={props.label} type="tertiary" />
    </div>
  );
}
