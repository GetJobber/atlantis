import React from "react";
import { TriggerProps } from "./types";
import styles from "./TriggerChip.css";
// import { Text } from "../../../Text";
import { Icon } from "../../../Icon";
import { ComboboxContext } from "../../ComboboxProvider";
import { Typography } from "../../../Typography";

export function TriggerChip(props: TriggerProps): JSX.Element {
  const { open, setOpen } = React.useContext(ComboboxContext);

  return (
    <div
      className={styles.trigger}
      onClick={() => {
        setOpen(!open);
      }}
    >
      <Typography fontWeight="heavy" textColor="heading">
        {props.label}
      </Typography>
      <div className={styles.triggerIcon}>
        <Icon color="surfaceReverse" name="add" size="small" />
      </div>
    </div>
  );
}
