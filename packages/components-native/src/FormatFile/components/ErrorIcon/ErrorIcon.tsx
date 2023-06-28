import React from "react";
import { View } from "react-native";
import { styles } from "./ErrorIcon.style";
import { Icon } from "../../../Icon";

export function ErrorIcon(): JSX.Element {
  return (
    <View testID="format-file-error-icon" style={styles.circle}>
      <Icon name="alert" color="critical" />
    </View>
  );
}
