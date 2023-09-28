import React, { useState } from "react";
import { useDataListContext } from "../../context/DataListContext";
import { DataListLayoutContext } from "../../context/DataListLayoutContext";
import { DataListObject } from "../../DataList.types";
import { DataListItem } from "../DataListItem";

export function DataListLayoutInternal<T extends DataListObject>() {
  const { data, visibleLayout } = useDataListContext<T>();
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
        <DataListItem
          key={data[i].id}
          index={i}
          item={child}
          layout={visibleLayout.children}
        />
      ))}
    </DataListLayoutContext.Provider>
  );
}
