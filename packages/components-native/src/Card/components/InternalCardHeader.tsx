import type { ReactNode } from "react";
import React from "react";
import { Pressable, View } from "react-native";
import { useStyles } from "./InternalCardHeader.style";

interface InternalCardHeaderProps {
  readonly children: ReactNode[] | ReactNode;
  readonly onPress?: () => void;
  readonly testID?: string;
  readonly collapsable: boolean;
}

export function InternalCardHeader({
  onPress,
  children,
  testID,
  collapsable,
}: InternalCardHeaderProps): JSX.Element {
  const styles = useStyles();

  const conditionalChildStyling = collapsable ? undefined : styles.noChildren;

  if (onPress) {
    return (
      <Pressable
        testID={testID}
        onPress={onPress}
        style={({ pressed }) => [
          styles.header,
          pressed && styles.pressed,
          conditionalChildStyling,
        ]}
        accessibilityRole={"button"}
      >
        {children}
      </Pressable>
    );
  }

  return (
    <View testID={testID} style={[styles.header, conditionalChildStyling]}>
      {children}
    </View>
  );
}
