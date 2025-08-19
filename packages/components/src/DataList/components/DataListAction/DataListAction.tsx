import React from "react";
import type {
  DataListActionProps,
  DataListObject,
} from "@jobber/components/DataList/DataList.types";
import { Typography } from "@jobber/components/Typography";
import { Icon } from "@jobber/components/Icon";
import { useDataListLayoutActionsContext } from "@jobber/components/DataList/components/DataListLayoutActions/DataListLayoutContext";
import styles from "./DataListAction.module.css";

export function DataListAction<T extends DataListObject>({
  label,
  icon,
  destructive,
  visible = () => true,
  onClick,
  actionUrl,
}: DataListActionProps<T>) {
  const { activeItem } = useDataListLayoutActionsContext<T>();

  // Don't render if the item is not visible
  if (activeItem && !visible(activeItem)) {
    return null;
  }

  const color = destructive ? "destructive" : "heading";

  function getActionLabel() {
    if (typeof label === "string") {
      return label;
    }

    if (activeItem) {
      return label(activeItem);
    }
  }

  if (actionUrl) {
    return (
      <a
        href={actionUrl}
        rel="noopener noreferrer"
        className={`${styles.action} ${styles.actionUrl}`}
        onClick={handleClick}
      >
        <Typography textColor={color}>
          <span className={styles.label}>{getActionLabel()}</span>
        </Typography>
        {icon && <Icon name={icon} color={color} />}
      </a>
    );
  }

  return (
    <button type="button" className={styles.action} onClick={handleClick}>
      <Typography textColor={color}>
        <span className={styles.label}>{getActionLabel()}</span>
      </Typography>

      {icon && <Icon name={icon} color={color} />}
    </button>
  );

  function handleClick() {
    if (activeItem) {
      onClick?.(activeItem);
    } else {
      (onClick as () => void)?.();
    }
  }
}
