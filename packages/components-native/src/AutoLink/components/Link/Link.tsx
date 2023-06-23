import React from "react";
// eslint-disable-next-line no-restricted-imports
import { Text as RNText } from "react-native";
import { Text } from "../../../Text";

interface LinkProps {
  readonly children: string;
  readonly onPress: () => void;
  readonly onLongPress?: () => void;
}

export function Link({
  children,
  onPress,
  onLongPress,
}: LinkProps): JSX.Element {
  return (
    <RNText onPress={onPress} onLongPress={onLongPress}>
      <Text variation="interactive">{children}</Text>
    </RNText>
  );
}
