import React, { useMemo, useState } from "react";
import { Breakpoints } from "@jobber/components/DataList/DataList.const";
import {
  DataListLayoutProps,
  DataListObject,
} from "@jobber/components/DataList/DataList.types";
import { generateListItemElements } from "@jobber/components/DataList/DataList.utils";
import { DataListLayoutContext } from "@jobber/components/DataList/context/DataListLayoutContext";
import { DataListLayoutInternal } from "./DataListLayoutInternal";
import { DataListItem } from "./DataListItem";

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
  const elementData = useMemo(() => generateListItemElements(data), [data]);
  const [hasInLayoutActions, setHasInLayoutActions] = useState(false);

  return (
    <DataListLayoutContext.Provider
      value={{
        isInLayoutProvider: true,
        hasInLayoutActions,
        setHasInLayoutActions,
        activeItem: { id: 1 },
      }}
    >
      <DataListLayoutInternal
        layouts={layouts}
        mediaMatches={mediaMatches}
        renderLayout={layout => (
          <>
            {elementData.map((child, i) => (
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
