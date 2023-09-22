import React, {
  Children,
  PropsWithChildren,
  ReactElement,
  useEffect,
} from "react";
import styles from "./DataListLayoutActions.css";
import { useDataListContext } from "../../context/DataListContext";
import { useDataListLayoutContext } from "../../context/DataListLayoutContext";
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

  return (
    <DataListLayoutActionsWrapper>
      <DataListItemActionsOverflow actions={actions} item={activeItem} />
    </DataListLayoutActionsWrapper>
  );
}

function DataListLayoutActionsWrapper({ children }: PropsWithChildren<object>) {
  const { isInLayoutProvider } = useDataListLayoutContext();
  if (isInLayoutProvider) return <>{children}</>;

  return <div className={styles.hidden}>{children}</div>;
}
