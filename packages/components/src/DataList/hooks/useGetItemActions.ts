import { Children, ReactElement, isValidElement, useMemo } from "react";
import { useDataListContext } from "../context/DataListContext";
import { DataListActionProps, DataListObject } from "../DataList.types";

export function useGetItemActions<T extends DataListObject>(item: T) {
  const { itemActionComponent } = useDataListContext<T>();
  const itemActions = itemActionComponent?.props.children || [];
  const actionsArray = Children.toArray(itemActions);

  const actions = useMemo(() => {
    return actionsArray.filter(action => {
      if (isValidElement(action) && action.props.visible) {
        return action.props.visible(item);
      }

      return true;
    });
  }, [itemActionComponent?.props.children, item]);

  return {
    actions: actions as ReactElement<DataListActionProps<T>>[],
    hasActions: Boolean(actions.length),
  };
}
