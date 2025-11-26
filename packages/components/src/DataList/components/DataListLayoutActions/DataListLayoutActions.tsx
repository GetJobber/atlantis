import type { PropsWithChildren, ReactElement } from "react";
import React, { Children, useEffect } from "react";
import { useDataListContext } from "@jobber/components/DataList/context/DataListContext";
import { useDataListLayoutContext } from "@jobber/components/DataList/context/DataListLayoutContext";
import { DataListItemActionsOverflow } from "@jobber/components/DataList/components/DataListItemActionsOverflow";
import { Glimmer } from "@jobber/components/Glimmer";
import styles from "./DataListLayoutActions.module.css";
import type { DataListActionProps, DataListObject } from "../../DataList.types";

export function DataListLayoutActions() {
  const { itemActionComponent, loadingState } = useDataListContext();
  const { setHasInLayoutActions } = useDataListLayoutContext();

  const { children: actionsChildren } = itemActionComponent?.props || {};
  const actions = Children.toArray(actionsChildren) as ReactElement<
    DataListActionProps<DataListObject>
  >[];
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
