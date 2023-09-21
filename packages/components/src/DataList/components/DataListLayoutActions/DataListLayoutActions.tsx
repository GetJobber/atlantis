import React, { Children, ReactElement, useEffect } from "react";
import { useDataListContext } from "../../context/DataListContext";
import { useDataListLayoutContext } from "../../context/DataListLayoutContext/DataListLayoutContext";
import { DataListItemActionsOverflow } from "../DataListItemActions/DataListItemActionsOverflow";

export function DataListLayoutActions() {
  const { itemActionComponent } = useDataListContext();
  const { setHasInLayoutActions, activeItem } = useDataListLayoutContext();

  const { children: actionsChildren } = itemActionComponent?.props || {};
  const actions = Children.toArray(actionsChildren) as ReactElement[];
  const hasActions = actions.length > 0;

  useEffect(() => {
    setHasInLayoutActions(hasActions);

    return () => {
      setHasInLayoutActions(false);
    };
  }, []);

  if (!hasActions) return null;

  return <DataListItemActionsOverflow actions={actions} item={activeItem} />;
}
