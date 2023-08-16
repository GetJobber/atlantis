import React from "react";
import { XOR } from "ts-xor";
import styles from "./EmptyState.css";
import { Button, ButtonProps } from "../../../Button";
import { Text } from "../../../Text";

interface RecommendedActionBase {
  label: string;
}
interface AnchorRecommendedAction extends RecommendedActionBase {
  url: ButtonProps["url"];
}
interface LinkRecommendedAction extends RecommendedActionBase {
  to: ButtonProps["to"];
}

interface ActionRecommendedAction extends RecommendedActionBase {
  onClick: ButtonProps["onClick"];
}
export interface EmptyStateProps {
  message: string;
  recommendedAction?: XOR<
    ActionRecommendedAction,
    XOR<AnchorRecommendedAction, LinkRecommendedAction>
  >;
}

export function DataListEmptyState({
  message,
  recommendedAction,
}: EmptyStateProps) {
  console.warn({ message, recommendedAction });
  return (
    <div className={styles.emptyStateWrapper}>
      <Text align="center">{message}</Text>
      {recommendedAction && (
        <Button
          {...{
            ...recommendedAction,
            type: "secondary",
            variation: "subtle",
          }}
        />
      )}
    </div>
  );
}
