import React from "react";
import { useIntl } from "react-intl";
import { View } from "react-native";
import { styles } from "./FormMask.style";
import { ActivityIndicator } from "../../../ActivityIndicator";
import { messages } from "../../messages";

export function FormMask(): JSX.Element {
  const { formatMessage } = useIntl();

  return (
    <View
      style={styles.mask}
      accessibilityLabel={formatMessage(messages.loadingA11YLabel)}
    >
      <ActivityIndicator />
    </View>
  );
}
