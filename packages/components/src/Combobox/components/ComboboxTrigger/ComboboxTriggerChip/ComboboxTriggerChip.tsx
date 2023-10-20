import React from "react";
import { ComboboxTriggerChipProps } from "@jobber/components/Combobox/Combobox.types";
import styles from "./ComboboxTriggerChip.css";
import { Icon } from "../../../../Icon";
import { ComboboxContext } from "../../../ComboboxProvider";
import { Typography } from "../../../../Typography";

export function ComboboxTriggerChip(
  props: ComboboxTriggerChipProps,
): JSX.Element {
  const { open, setOpen } = React.useContext(ComboboxContext);

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
        setOpen(!open);
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
