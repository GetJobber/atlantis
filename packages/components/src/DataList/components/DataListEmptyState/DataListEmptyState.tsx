import type { ReactElement } from "react";
import React, { cloneElement, useContext } from "react";
import styles from "./DataListEmptyState.module.css";
import { DataListContext } from "../../context/DataListContext";
import type { DataListEmptyStateProps } from "../../DataList.types";
import { Text } from "../../../Text";
import type { ButtonProps } from "../../../Button";
import { Button } from "../../../Button";
import {
  EMPTY_FILTER_RESULTS_MESSAGE,
  EMPTY_RESULTS_MESSAGE,
  EMPTY_STATE_ACTION_BUTTON_ONLY_ERROR,
} from "../../DataList.const";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function DataListEmptyState(_: DataListEmptyStateProps) {
  return null;
}

export function InternalDataListEmptyState() {
  const { emptyStateComponents: components, filtered } =
    useContext(DataListContext);
  const { customRender, ...contentProps } = getEmptyStateContent();

  return (
    <div className={styles.emptyStateWrapper}>
      {customRender ? (
        customRender({ ...contentProps })
      ) : (
        <>
          <Text align="center">{contentProps.message}</Text>
          {renderButton(contentProps.action)}
        </>
      )}
    </div>
  );

  function getEmptyStateContent() {
    const { defaultEmptyState, filteredEmptyState } =
      getEmptyStates(components);

    if (filtered) {
      return {
        message:
          filteredEmptyState?.props.message || EMPTY_FILTER_RESULTS_MESSAGE,
        action: filteredEmptyState?.props.action,
        customRender: filteredEmptyState?.props.customRender,
      };
    }

    return {
      message: defaultEmptyState?.props.message || EMPTY_RESULTS_MESSAGE,
      action: defaultEmptyState?.props.action,
      customRender: defaultEmptyState?.props.customRender,
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

    throw new Error(EMPTY_STATE_ACTION_BUTTON_ONLY_ERROR);
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
