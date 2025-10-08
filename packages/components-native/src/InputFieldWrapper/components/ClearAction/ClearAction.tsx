import React from "react";
import { Pressable, View } from "react-native";
import { useStyles } from "./ClearAction.style";
import { Icon } from "../../../Icon";
import { useAtlantisI18n } from "../../../hooks/useAtlantisI18n";

interface ClearActionProps {
  /**
   * Press handler
   */
  readonly onPress: () => void;
  readonly hasMarginRight?: boolean;
}

export function ClearAction({
  onPress,
  hasMarginRight = false,
}: ClearActionProps): React.JSX.Element {
  const { t } = useAtlantisI18n();
  const styles = useStyles();

  return (
    <Pressable
      style={[styles.container, hasMarginRight && styles.addedMargin]}
      onPress={onPress}
      accessibilityLabel={t("InputFieldWrapper.clear")}
    >
      <View style={styles.circle}>
        <Icon size="small" name="cross" color="interactiveSubtle" />
      </View>
    </Pressable>
  );
}
