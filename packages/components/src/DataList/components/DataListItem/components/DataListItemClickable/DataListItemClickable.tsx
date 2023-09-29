import React, { PropsWithChildren } from "react";
import { useDataListContext } from "@jobber/components/DataList/context/DataListContext";
import { DataListItemClickableInternal } from "./DataListItemClickableInternal";

export function DataListItemClickable({ children }: PropsWithChildren<object>) {
  const { itemActionComponent } = useDataListContext();

  if (itemActionComponent) {
    const props = itemActionComponent.props;

    return (
      <DataListItemClickableInternal {...props}>
        {children}
      </DataListItemClickableInternal>
    );
  }

  return <>{children}</>;
}
