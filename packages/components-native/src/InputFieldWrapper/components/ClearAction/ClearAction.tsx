import React from "react";
import { Pressable, View } from "react-native";
import { useIntl } from "react-intl";
import { styles } from "./ClearAction.style";
import { messages } from "./messages";
import { Icon } from "../../../Icon";

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
}: ClearActionProps): JSX.Element {
  const { formatMessage } = useIntl();
  return (
    <Pressable
      style={[styles.container, hasMarginRight && styles.addedMargin]}
      onPress={onPress}
      accessibilityLabel={formatMessage(messages.clearTextLabel)}
    >
      <View style={styles.circle}>
        <Icon size="small" name="cross" color="interactiveSubtle" />
      </View>
    </Pressable>
  );
}
