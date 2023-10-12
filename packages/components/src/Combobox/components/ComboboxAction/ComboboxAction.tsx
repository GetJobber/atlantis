import React from "react";
import { ComboboxActionProps } from "@jobber/components/Combobox/Combobox.types";
import styles from "./ComboboxAction.css";
import { Typography } from "../../../Typography";

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
