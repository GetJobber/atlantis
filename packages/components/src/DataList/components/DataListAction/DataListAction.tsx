import React from "react";
import styles from "./DataListAction.css";
import { DataListActionProps, DataListObject } from "../../DataList.types";
import { Typography } from "../../../Typography";
import { Icon } from "../../../Icon";

export function DataListAction<T extends DataListObject>({
  label,
  icon,
}: DataListActionProps<T>) {
  return (
    <button className={styles.action}>
      <div>{icon && <Icon name={icon} />}</div>
      <Typography textColor="blue">
        <span className={styles.label}>{label}</span>
      </Typography>
    </button>
  );
}
