import { useMemo } from "react";
import { useDataListContext } from "../context/DataListContext";
import type { DataListObject } from "../DataList.types";

export function useGetItemActions<T extends DataListObject>(item: T) {
  const { itemActionComponent } = useDataListContext<T>();
  const rawActions = itemActionComponent?.props.children;
  const actionsArray = rawActions
    ? Array.isArray(rawActions)
      ? rawActions
      : [rawActions]
    : [];

  const disableContextMenu =
    itemActionComponent?.props.disableContextMenu ?? false;

  const actions = useMemo(() => {
    return actionsArray.filter(action =>
      action.props.visible ? action.props.visible(item) : true,
    );
  }, [actionsArray, item]);

  return {
    actions,
    hasActions: Boolean(actions.length),
    disableContextMenu,
  };
}
