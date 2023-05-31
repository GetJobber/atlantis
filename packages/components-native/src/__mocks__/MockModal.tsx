import React from "react";
import { ModalBaseProps, View } from "react-native";

// @ts-expect-error tsc-ci
export function MockModal({ visible, children }: ModalBaseProps): JSX.Element {
  return <View>{visible && children}</View>;
}
