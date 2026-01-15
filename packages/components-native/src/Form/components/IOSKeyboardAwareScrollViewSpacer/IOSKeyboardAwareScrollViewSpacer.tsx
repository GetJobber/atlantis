import React from "react";
import { Platform, View } from "react-native";

/**
 * This is a spacer to help prevent issues with the KeyboardAwareScrollView on iOS.
 * This will be removed as a part of JOB-147156
 */
export function IOSKeyboardAwareScrollViewSpacer() {
  if (Platform.OS === "ios") {
    return <View style={{ height: 400 }} />;
  }

  return null;
}
