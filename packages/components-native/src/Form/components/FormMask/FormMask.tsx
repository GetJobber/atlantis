import React from "react";
import { View } from "react-native";
import { useStyles } from "./FormMask.style";
import { ActivityIndicator } from "../../../ActivityIndicator";
import { useAtlantisI18n } from "../../../hooks/useAtlantisI18n";

export function FormMask() {
  const { t } = useAtlantisI18n();
  const styles = useStyles();

  return (
    <View style={styles.mask} accessibilityLabel={t("loading")}>
      <ActivityIndicator />
    </View>
  );
}
