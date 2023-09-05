import React from "react";
import styles from "./TriggerChip.css";
import { Icon } from "../../../../Icon";
import { ComboboxContext } from "../../../ComboboxProvider";
import { Typography } from "../../../../Typography";
import { TriggerChipProps } from "../types";

export function TriggerChip(props: TriggerChipProps): JSX.Element {
  const { open, setOpen } = React.useContext(ComboboxContext);

  return (
    <button
      className={styles.trigger}
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
