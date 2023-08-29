import React from "react";
import { View } from "react-native";
import { styles } from "./FormMask.style";
import { ActivityIndicator } from "../../../ActivityIndicator";
import { useAtlantisI18n } from "../../../hooks/useAtlantisI18n";

export function FormMask(): JSX.Element {
  const { t } = useAtlantisI18n();

  return (
    <View style={styles.mask} accessibilityLabel={t("loading")}>
      <ActivityIndicator />
    </View>
  );
}
