import React, { useContext } from "react";
import styles from "./ComboboxAction.css";
import { Typography } from "../../../Typography";
import { ComboboxActionProps } from "../../Combobox.types";
import { ComboboxContext } from "../../ComboboxProvider";

export function ComboboxAction(props: ComboboxActionProps) {
  const { searchValue, setOpen } = useContext(ComboboxContext);

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

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setOpen(props.keepOpenOnActionClick);
    props.onClick(e, options);
  };

  return (
    <div className={styles.actionContainer}>
      <button
        className={styles.actionButton}
        onClick={handleClick}
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
