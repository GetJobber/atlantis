import React from "react";
import styles from "./DataListAction.css";
import {
  DataListActionProps,
  DataListObject,
  InternalDataListActionProps,
} from "../../DataList.types";
import { Typography } from "../../../Typography";
import { Icon } from "../../../Icon";

export function DataListAction<T extends DataListObject>(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _: DataListActionProps<T>,
) {
  return null;
}

export function InternalDataListAction<T extends DataListObject>({
  label,
  icon,
  destructive,
  onClick,
  item,
}: InternalDataListActionProps<T>) {
  const color = destructive ? "critical" : "blue";

  return (
    <button className={styles.action} onClick={handleClick}>
      {icon && <Icon name={icon} color={color} />}

      <Typography textColor={color}>
        <span className={styles.label}>{label}</span>
      </Typography>
    </button>
  );

  function handleClick() {
    if (item) {
      onClick?.(item);
    } else {
      onClick?.();
    }
  }
}
