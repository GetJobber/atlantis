import React from "react";
import type { ModalBaseProps } from "react-native";
import { View } from "react-native";

// @ts-expect-error tsc-ci
export function MockModal({ visible, children }: ModalBaseProps): JSX.Element {
  return <View>{visible && children}</View>;
}
