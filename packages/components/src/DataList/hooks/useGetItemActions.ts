import type { ReactElement } from "react";
import { Children, isValidElement, useMemo } from "react";
import { useDataListContext } from "../context/DataListContext";
import type { DataListActionProps, DataListObject } from "../DataList.types";

export function useGetItemActions<T extends DataListObject>(item: T) {
  const { itemActionComponent } = useDataListContext<T>();
  const itemActions = itemActionComponent?.props.children || [];
  const actionsArray = Children.toArray(itemActions);

  const disableContextMenu =
    itemActionComponent?.props.disableContextMenu ?? false;

  const actions = useMemo(() => {
    return actionsArray.filter(action => {
      // @ts-expect-error - TODO: fix action.props type is unknown
      if (isValidElement(action) && action.props.visible) {
        // @ts-expect-error - TODO: fix action.props type is unknown
        return action.props.visible(item);
      }

      return true;
    });
  }, [itemActionComponent?.props.children, item]);

  return {
    actions: actions as ReactElement<DataListActionProps<T>>[],
    hasActions: Boolean(actions.length),
    disableContextMenu,
  };
}
