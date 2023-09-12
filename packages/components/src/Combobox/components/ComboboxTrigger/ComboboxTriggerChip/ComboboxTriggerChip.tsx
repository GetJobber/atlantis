import React from "react";
import styles from "./ComboboxTriggerChip.css";
import { Icon } from "../../../../Icon";
import { ComboboxContext } from "../../../ComboboxProvider";
import { Typography } from "../../../../Typography";
import { ComboboxTriggerChipProps } from "../../../Combobox.types";

export function ComboboxTriggerChip(
  props: ComboboxTriggerChipProps,
): JSX.Element {
  const { open, setOpen } = React.useContext(ComboboxContext);

  return (
    <button
      className={styles.trigger}
      onClick={() => {
        setOpen(!open);
      }}
    >
      <Typography fontWeight="semiBold" textColor="blue">
        {props.label}
      </Typography>
      <div className={styles.triggerIcon}>
        <Icon color="surfaceReverse" name="add" size="small" />
      </div>
    </button>
  );
}
