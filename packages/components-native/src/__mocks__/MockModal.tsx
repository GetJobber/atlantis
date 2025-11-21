import React from "react";
import type { ModalBaseProps } from "react-native";
import { View } from "react-native";

export function MockModal({
  visible,
  children,
}: React.PropsWithChildren<ModalBaseProps>) {
  return <View>{visible && children}</View>;
}
