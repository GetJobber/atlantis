import { Children, isValidElement, useMemo } from "react";
import type { ReactElement } from "react";
import { useDataListContext } from "../context/DataListContext";
import type { DataListActionProps, DataListObject } from "../DataList.types";

export function useGetItemActions<T extends DataListObject>(item: T) {
  const { itemActionComponent } = useDataListContext<T>();

  const disableContextMenu =
    itemActionComponent?.props.disableContextMenu ?? false;

  const actions = useMemo(() => {
    const children = itemActionComponent?.props.children ?? [];
    const nodes = Children.toArray(children);

    return nodes.filter(
      (node): node is ReactElement<DataListActionProps<T>> => {
        if (isValidElement<DataListActionProps<T>>(node)) {
          return node.props.visible ? node.props.visible(item) : true;
        }

        return false;
      },
    );
  }, [itemActionComponent?.props.children, item]);

  return {
    actions,
    hasActions: Boolean(actions.length),
    disableContextMenu,
  };
}
