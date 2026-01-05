import type { PropsWithChildren } from "react";
import React from "react";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

/**
 * This is a workaround suggested by react-native-gesture-handler to prevent
 * accidental highlighting of text in Android devices
 * https://github.com/software-mansion/react-native-gesture-handler/issues/1372
 */
export function TypographyGestureDetector(props: PropsWithChildren<unknown>) {
  return <GestureDetector {...props} gesture={Gesture.Native()} />;
}
