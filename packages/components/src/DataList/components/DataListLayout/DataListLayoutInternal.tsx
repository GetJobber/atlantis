import React, { useState } from "react";
import { useDataListContext } from "../../context/DataListContext";
import { DataListLayoutContext } from "../../context/DataListLayoutContext";
import { Breakpoints, DataListObject } from "../../DataList.types";
import { DataListItem } from "../DataListItem";

interface DataListLayoutInternalProps {
  readonly size: Breakpoints;
}

export function DataListLayoutInternal<T extends DataListObject>({
  size,
}: DataListLayoutInternalProps) {
  const { data, layouts: visibleLayout } = useDataListContext<T>();
  const [hasInLayoutActions, setHasInLayoutActions] = useState(false);

  const layout = visibleLayout[size];
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
