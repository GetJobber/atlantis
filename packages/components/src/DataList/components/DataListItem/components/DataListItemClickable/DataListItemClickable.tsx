import React, { PropsWithChildren } from "react";
import { useDataListContext } from "@jobber/components/DataList/context/DataListContext";
import { DataListItemClickableInternal } from "./DataListItemClickableInternal";
import { useDataListLayoutActionsContext } from "../../../DataListLayoutActions/DataListLayoutContext";

export function DataListItemClickable({ children }: PropsWithChildren<object>) {
  const { itemActionComponent } = useDataListContext();
  const { activeItem } = useDataListLayoutActionsContext();

  if (itemActionComponent && activeItem) {
    const props = itemActionComponent.props;

    return (
      <DataListItemClickableInternal {...props}>
        {children}
      </DataListItemClickableInternal>
    );
  }

  return <>{children}</>;
}
