import React from "react";
import {
  DataListActionProps,
  DataListObject,
} from "@jobber/components/DataList/DataList.types";
import { Typography } from "@jobber/components/Typography";
import { Icon } from "@jobber/components/Icon";
import { useDataListLayoutActionsContext } from "@jobber/components/DataList/components/DataListLayoutActions/DataListLayoutContext";
import styles from "./DataListAction.css";

export function DataListAction<T extends DataListObject>({
  label,
  icon,
  destructive,
  visible = () => true,
  onClick,
}: DataListActionProps<T>) {
  const { activeItem } = useDataListLayoutActionsContext<T>();

  // Don't render if the item is not visible
  if (activeItem && !visible(activeItem)) {
    return null;
  }

  const color = destructive ? "critical" : "blue";

  return (
    <button type="button" className={styles.action} onClick={handleClick}>
      {icon && <Icon name={icon} color={color} />}

      <Typography textColor={color}>
        <span className={styles.label}>{label}</span>
      </Typography>
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
