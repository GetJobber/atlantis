import React, { useContext } from "react";
import styles from "./ComboboxAction.css";
import { Typography } from "../../../Typography";
import { ComboboxActionProps } from "../../Combobox.types";
import { ComboboxContext } from "../../ComboboxProvider";

export function ComboboxAction(props: ComboboxActionProps) {
  const { searchValue } = useContext(ComboboxContext);

  if (props.visible) {
    const isVisible =
      typeof props.visible === "function" && !props.visible({ searchValue });

    if (isVisible || !props.visible) {
      return null;
    }
  }

  const options = { searchValue };
  const computedLabel =
    typeof props.label === "string" ? props.label : props.label(options);

  return (
    <div className={styles.actionContainer}>
      <button
        className={styles.actionButton}
        onClick={e => props.onClick(e, options)}
        type="button"
      >
        <Typography
          element="span"
          size="base"
          textColor="interactive"
          fontWeight="semiBold"
        >
          {computedLabel}
        </Typography>
      </button>
    </div>
  );
}
