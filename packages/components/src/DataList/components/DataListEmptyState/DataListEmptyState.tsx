import React, { ReactElement, cloneElement, useContext } from "react";
import styles from "./DataListEmptyState.css";
import { DataListContext } from "../../context/DataListContext";
import { DataListEmptyStateProps } from "../../DataList.types";
import { Text } from "../../../Text";
import { Button, ButtonProps } from "../../../Button";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function DataListEmptyState(_: DataListEmptyStateProps) {
  return null;
}

export function InternalDataListEmptyState() {
  const { emptyStateComponents: components, filterApplied } =
    useContext(DataListContext);
  if (!components) return null;

  const { message, action } = getMessages();

  return (
    <div className={styles.emptyStateWrapper}>
      <Text align="center">{message}</Text>
      {renderButton(action)}
    </div>
  );

  function getMessages() {
    const { defaultEmptyState, filteredEmptyState } =
      getEmptyStates(components);

    if (filterApplied) {
      return {
        message: filteredEmptyState?.props.message || "No results found",
        action: filteredEmptyState?.props.action,
      };
    }

    return {
      message: defaultEmptyState?.props.message || "List is looking empty",
      action: defaultEmptyState?.props.action,
    };
  }
}

function renderButton(action?: ReactElement<ButtonProps>) {
  if (action) {
    if (action.type === Button) {
      return cloneElement(action, {
        variation: action.props.variation || "subtle",
      });
    }

    throw new Error(
      "DataListEmptyState: action prop must be a Button component",
    );
  }

  return;
}

function getEmptyStates(components?: ReactElement<DataListEmptyStateProps>[]) {
  const defaultEmptyState = components?.find(
    es => es.props.type === "empty" || es.props.type === undefined,
  );

  const filteredEmptyState = components?.find(
    es => es.props.type === "filtered",
  );

  return { defaultEmptyState, filteredEmptyState };
}
