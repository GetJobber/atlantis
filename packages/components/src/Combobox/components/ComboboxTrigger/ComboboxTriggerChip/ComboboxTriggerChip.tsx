import React from "react";
import styles from "./ComboboxTriggerChip.css";
import { ComboboxTriggerChipProps } from "../../../Combobox.types";
import { Icon } from "../../../../Icon";
import { ComboboxContext } from "../../../ComboboxProvider";
import { Typography } from "../../../../Typography";

export function ComboboxTriggerChip(
  props: ComboboxTriggerChipProps,
): JSX.Element {
  const { open, handleClose, setOpen } = React.useContext(ComboboxContext);

  return (
    <button
      className={styles.trigger}
      role="combobox"
      type="button"
      aria-expanded={open}
      aria-haspopup="listbox"
      aria-controls="ATL-Combobox-Content"
      aria-autocomplete="list"
      onClick={() => {
        if (open) {
          handleClose();
        } else {
          setOpen(true);
        }
      }}
    >
      <Typography fontWeight="semiBold" textColor="heading">
        {props.label}
      </Typography>
      <div className={styles.triggerIcon}>
        <Icon color="surfaceReverse" name="add" size="small" />
      </div>
    </button>
  );
}
