import React, { PropsWithChildren } from "react";
import styles from "@jobber/components/DataList/DataList.css";
import { useDataListContext } from "@jobber/components/DataList/context/DataListContext";
import { useDataListLayoutActionsContext } from "../../../DataListLayoutActions/DataListLayoutContext";

export function DataListItemClickable({ children }: PropsWithChildren<object>) {
  const { itemActionComponent } = useDataListContext();
  const { activeItem } = useDataListLayoutActionsContext();

  if (itemActionComponent) {
    const { onClick } = itemActionComponent.props;

    return (
      <button
        className={styles.listItemClickable}
        onClick={() => onClick?.(activeItem)}
      >
        {children}
      </button>
    );
  }

  return <>{children}</>;
}
