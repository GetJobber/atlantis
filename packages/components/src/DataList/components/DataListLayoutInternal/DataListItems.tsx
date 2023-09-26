import React, { useState } from "react";
import { DataListItem } from "@jobber/components/DataList/components/DataListItem";
import { Breakpoints } from "@jobber/components/DataList/DataList.const";
import {
  DataListLayoutProps,
  DataListObject,
} from "@jobber/components/DataList/DataList.types";
import { DataListLayoutContext } from "@jobber/components/DataList/context/DataListLayoutContext";
import { DataListLayoutInternal } from "./DataListLayoutInternal";

interface DataListItemsProps<T extends DataListObject> {
  readonly layouts: React.ReactElement<DataListLayoutProps<T>>[] | undefined;
  readonly mediaMatches?: Record<Breakpoints, boolean>;
  readonly data: T[];
}

export function DataListItems<T extends DataListObject>({
  layouts,
  mediaMatches,
  data,
}: DataListItemsProps<T>) {
  const [hasInLayoutActions, setHasInLayoutActions] = useState(false);

  return (
    <DataListLayoutContext.Provider
      value={{
        isInLayoutProvider: true,
        hasInLayoutActions,
        setHasInLayoutActions,
      }}
    >
      <DataListLayoutInternal
        layouts={layouts}
        mediaMatches={mediaMatches}
        renderLayout={layout => (
          <>
            {data.map((child, i) => (
              <DataListItem
                key={data[i].id}
                index={i}
                item={child}
                layout={layout}
              />
            ))}
          </>
        )}
      />
    </DataListLayoutContext.Provider>
  );
}
