import React from "react";
import { TriggerProps } from "./types";
import styles from "./TriggerChip.css";
import { Text } from "../../../Text";
import { Icon } from "../../../Icon";

export function TriggerChip(props: TriggerProps): JSX.Element {
  return (
    <div
      className={styles.trigger}
      onClick={() => {
        console.log("hi");
      }}
    >
      <Text>{props.label}</Text>
      <div className={styles.triggerIcon}>
        <Icon name="add" size="small" />
      </div>
    </div>
  );
}
