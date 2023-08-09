import React, { ReactElement } from "react";
import { View } from "react-native";
import { ActionItem, ActionItemProps } from "./ActionItem";
import { styles } from "./ActionItem.style";
import { Divider } from "../Divider";

export type ActionItemElement =
  | ReactElement<ActionItemProps, typeof ActionItem>
  | boolean
  | null
  | undefined;

interface ActionItemGroupProps {
  /**
   * Action Items
   */
  readonly children: ActionItemElement | ActionItemElement[];
}

export function ActionItemGroup({
  children,
}: ActionItemGroupProps): JSX.Element {
  return <View>{renderChildren(children)}</View>;
}

function renderChildren(children: ActionItemElement | ActionItemElement[]) {
  const childArray = React.Children.toArray(children);
  if (childArray.length === 1) return children;

  return childArray.map((child, index) => {
    const isSubsequentChild = index !== 0;
    return (
      <View key={index}>
        {isSubsequentChild && (
          <View style={styles.actionItemHorizontalOffset}>
            <Divider />
          </View>
        )}
        {child}
      </View>
    );
  });
}
