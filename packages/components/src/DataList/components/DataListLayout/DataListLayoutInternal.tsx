import React, { useState } from "react";
import { useDataListContext } from "../../context/DataListContext";
import { DataListLayoutContext } from "../../context/DataListLayoutContext";
import { DataListItemType, DataListObject } from "../../DataList.types";
import { DataListItem } from "../DataListItem";

interface DataListLayoutInternalProps<T extends DataListObject> {
  readonly layout: (item: DataListItemType<T[]>) => JSX.Element;
}

export function DataListLayoutInternal<T extends DataListObject>({
  layout,
}: DataListLayoutInternalProps<T>) {
  const { data } = useDataListContext<T>();
  const [hasInLayoutActions, setHasInLayoutActions] = useState(false);

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
