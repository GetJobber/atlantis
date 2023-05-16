import React, { ReactNode } from "react";
import { Pressable, View } from "react-native";
import { styles } from "./InternalCardHeader.style";

interface InternalCardHeaderProps {
  readonly children: ReactNode[] | ReactNode;
  readonly onPress?: () => void;
  testID?: string;
  readonly collapsable: boolean;
}

export function InternalCardHeader({
  onPress,
  children,
  testID,
  collapsable,
}: InternalCardHeaderProps): JSX.Element {
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
