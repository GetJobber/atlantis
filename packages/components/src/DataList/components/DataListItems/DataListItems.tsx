import React, { useState } from "react";
import { useDataListContext } from "../../context/DataListContext";
import { DataListLayoutContext } from "../../context/DataListLayoutContext";
import { DataListItem } from "../DataListItem";
import {
  Breakpoints,
  DataListObject,
} from "../../DataList.types";

interface DataListItemsProps {
  readonly size?: Breakpoints;
}

export function DataListItems<T extends DataListObject>({
  size = "xs",
}: DataListItemsProps) {
  const { data, layouts } = useDataListContext<T>();
  const [hasInLayoutActions, setHasInLayoutActions] = useState(false);

  const layout = layouts[size];
  if (!layout) return null;

  return (
    <DataListLayoutContext.Provider
      value={{
        isInLayoutProvider: true,
        hasInLayoutActions,
        setHasInLayoutActions,
      }}
    >
      {data.map((child, i) => (
        <DataListItem key={data[i].id} index={i} item={child} layout={layout} />
      ))}
    </DataListLayoutContext.Provider>
  );
}
