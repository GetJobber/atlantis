import React, {
  Children,
  PropsWithChildren,
  ReactElement,
  useEffect,
} from "react";
import { useDataListContext } from "@jobber/components/DataList/context/DataListContext";
import { useDataListLayoutContext } from "@jobber/components/DataList/context/DataListLayoutContext";
import { DataListItemActionsOverflow } from "@jobber/components/DataList/components/DataListItemActions";
import { useDataListLayoutActionsContext } from "./DataListLayoutContext";
import styles from "./DataListLayoutActions.css";

export function DataListLayoutActions() {
  const { itemActionComponent } = useDataListContext();
  const { setHasInLayoutActions } = useDataListLayoutContext();
  const { activeItem } = useDataListLayoutActionsContext();

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
