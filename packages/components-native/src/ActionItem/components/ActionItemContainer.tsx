import type { ReactNode } from "react";
import React from "react";
import { Pressable, View } from "react-native";
import { useStyles } from "./ActionItemContainer.style";
import { useStyles as useActionItemStyles } from "../ActionItem.style";

interface ActionItemContainerProps {
  readonly children: ReactNode;
  readonly title?: string;
  readonly onPress?: () => void;
  readonly testID?: string;
}

export function ActionItemContainer({
  onPress,
  title,
  children,
  testID,
}: ActionItemContainerProps): React.JSX.Element {
  const styles = useStyles();
  const actionItemStyles = useActionItemStyles();

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          styles.container,
          actionItemStyles.actionItemHorizontalOffset,
          pressed && styles.pressed,
        ]}
        accessibilityRole="button"
        accessibilityLabel={title}
        testID={testID}
      >
        {children}
      </Pressable>
    );
  }

  return (
    <View
      style={[styles.container, actionItemStyles.actionItemHorizontalOffset]}
      testID={testID}
    >
      {children}
    </View>
  );
}
