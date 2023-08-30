import React from "react";
import { XOR } from "ts-xor";
import styles from "./EmptyState.css";
import { Button, ButtonProps } from "../../../Button";
import { Text } from "../../../Text";

interface ActionBase {
  label: string;
}
interface AnchorAction extends ActionBase {
  url: ButtonProps["url"];
}
interface LinkAction extends ActionBase {
  to: ButtonProps["to"];
}

interface ClickAction extends ActionBase {
  onClick: ButtonProps["onClick"];
}
export interface EmptyStateProps {
  message: string;
  action?: XOR<ClickAction, XOR<AnchorAction, LinkAction>>;
}

export function DataListEmptyState({ message, action }: EmptyStateProps) {
  return (
    <div className={styles.emptyStateWrapper}>
      <Text align="center">{message}</Text>
      {action && (
        <Button
          {...{
            ...action,
            variation: "subtle",
          }}
        />
      )}
    </div>
  );
}
