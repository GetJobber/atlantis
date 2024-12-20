import React, { useContext } from "react";
import styles from "./ComboboxAction.module.css";
import { Typography } from "../../../Typography";
import { ComboboxActionProps } from "../../Combobox.types";
import { ComboboxContext } from "../../ComboboxProvider";

export function ComboboxAction(props: ComboboxActionProps) {
  const { searchValue, handleClose } = useContext(ComboboxContext);

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
    if (!props.keepOpenOnClick) {
      handleClose();
    }

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
          textColor="interactive"
          fontWeight="semiBold"
        >
          {computedLabel}
        </Typography>
      </button>
    </div>
  );
}
