import React, { useContext } from "react";
import styles from "./ComboboxAction.css";
import { Typography } from "../../../Typography";
import { ComboboxActionProps } from "../../Combobox.types";
import { ComboboxContext } from "../../ComboboxProvider";

export function ComboboxAction(props: ComboboxActionProps): JSX.Element {
  const { searchValue } = useContext(ComboboxContext);
  const computedLabel =
    typeof props.label === "string"
      ? props.label
      : props.label({ searchValue });

  return (
    <div className={styles.actionContainer}>
      <button
        className={styles.actionButton}
        onClick={props.onClick}
        type="button"
      >
        <Typography
          element="span"
          size="base"
          textColor="green"
          fontWeight="semiBold"
        >
          {computedLabel}
        </Typography>
      </button>
    </div>
  );
}
