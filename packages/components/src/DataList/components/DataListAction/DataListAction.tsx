import React from "react";
import classNames from "classnames";
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
  withIconOffset,
}: InternalDataListActionProps<T>) {
  return (
    <button
      className={classNames(styles.action, {
        [styles.withIconOffset]: withIconOffset,
      })}
      onClick={() => onClick?.(item)}
    >
      <div>
        {icon && <Icon name={icon} color={destructive ? "critical" : "blue"} />}
      </div>
      <Typography textColor={destructive ? "critical" : "blue"}>
        <span className={styles.label}>{label}</span>
      </Typography>
    </button>
  );
}
