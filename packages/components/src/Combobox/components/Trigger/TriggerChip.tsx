import React from "react";
import styles from "./TriggerChip.css";
import { TriggerProps } from "../../types";
import { Text } from "../../../Text";
import { Icon } from "../../../Icon";
import { ComboboxContext } from "../../ComboboxProvider";

export function TriggerChip(props: TriggerProps): JSX.Element {
  const { open, setOpen } = React.useContext(ComboboxContext);

  return (
    <div
      className={styles.trigger}
      onClick={() => {
        setOpen(!open);
      }}
    >
      <Text>{props.label}</Text>
      <div className={styles.triggerIcon}>
        <Icon name="add" size="small" />
      </div>
    </div>
  );
}
