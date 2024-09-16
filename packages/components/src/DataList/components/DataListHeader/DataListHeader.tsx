import React, { Children } from "react";
import classNames from "classnames";
import { useDataListContext } from "@jobber/components/DataList/context/DataListContext";
import { Breakpoints } from "@jobber/components/DataList/DataList.const";
import {
  generateHeaderElements,
  sortBreakpoints,
} from "@jobber/components/DataList/DataList.utils";
import { useResponsiveSizing } from "@jobber/components/DataList/hooks/useResponsiveSizing";
import { DataListHeaderCheckbox } from "./DataListHeaderCheckbox";
import { useActiveLayout } from "../../hooks/useActiveLayout";
import { useBatchSelect } from "../../hooks/useBatchSelect";
import styles from "../../DataList.css";

export function DataListHeader() {
  const breakpoints = useResponsiveSizing();
  const {
    headerVisibility = { xs: true, sm: true, md: true, lg: true, xl: true },
    headers,
    layoutBreakpoints,
    itemActionComponent,
  } = useDataListContext();
  const { hasAtLeastOneSelected } = useBatchSelect();
  const hasInLayoutActions = Children.toArray(itemActionComponent).length > 0;

  const size = getVisibleSize();
  const { layout } = useActiveLayout();

  const visible = headerVisibility[size];

  if ((!visible && !hasAtLeastOneSelected) || !layout) return null;

  const headerData = generateHeaderElements(headers);
  if (!headerData) return null;

  return (
    <div
      className={classNames(styles.headerTitles, {
        [styles.hasActions]: hasInLayoutActions,
      })}
    >
      <DataListHeaderCheckbox>{layout(headerData)}</DataListHeaderCheckbox>
    </div>
  );

  function getVisibleSize() {
    const visibilityKeys = Object.keys(headerVisibility) as Breakpoints[];
    const headerBreakpoints = sortBreakpoints(visibilityKeys).reverse();
    const visibleHeaderSize = headerBreakpoints.find(key => breakpoints[key]);

    return visibleHeaderSize || layoutBreakpoints[0];
  }
}
