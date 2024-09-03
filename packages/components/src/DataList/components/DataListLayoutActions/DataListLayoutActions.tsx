import React, {
  Children,
  PropsWithChildren,
  ReactElement,
  useEffect,
} from "react";
import { useDataListContext } from "../../context/DataListContext";
import { useDataListLayoutContext } from "../../context/DataListLayoutContext";
import { DataListItemActionsOverflow } from "../DataListItemActionsOverflow";
import { Glimmer } from "@jobber/components/Glimmer";
import styles from "./DataListLayoutActions.css";

export function DataListLayoutActions() {
  const { itemActionComponent, loadingState } = useDataListContext();
  const { setHasInLayoutActions } = useDataListLayoutContext();

  const { children: actionsChildren } = itemActionComponent?.props || {};
  const actions = Children.toArray(actionsChildren) as ReactElement[];
  const hasActions = actions.length > 0;

  useEffect(() => {
    setHasInLayoutActions(hasActions);

    return () => {
      setHasInLayoutActions(false);
    };
  }, []);

  if (loadingState === "initial") {
    return <Glimmer shape="square" size="large" />;
  }

  if (!hasActions) return null;

  return (
    <DataListLayoutActionsWrapper>
      <DataListItemActionsOverflow actions={actions} />
    </DataListLayoutActionsWrapper>
  );
}

function DataListLayoutActionsWrapper({ children }: PropsWithChildren<object>) {
  const { isInLayoutProvider } = useDataListLayoutContext();
  if (isInLayoutProvider) return <>{children}</>;

  return <div className={styles.hidden}>{children}</div>;
}
