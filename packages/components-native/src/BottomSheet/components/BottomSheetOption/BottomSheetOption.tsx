import React from "react";
import { TouchableOpacity, View } from "react-native";
import { IconColorNames, IconNames } from "@jobber/design";
import { styles } from "./BottomSheetOption.styles";
import { TextAlign } from "../../../Typography";
import { capitalize } from "../../../utils/intl";
import { Text } from "../../../Text";
import { Icon } from "../../../Icon";

export interface BottomSheetOptionProps {
  readonly text: string;
  readonly icon?: IconNames;
  readonly iconColor?: IconColorNames;
  readonly textAlign?: TextAlign;
  readonly destructive?: boolean;
  readonly textTransform?: "none" | "capitalize";
  readonly onPress: () => void;
}

export function BottomSheetOption({
  text,
  icon,
  iconColor,
  textAlign,
  destructive,
  textTransform = "capitalize",
  onPress,
}: BottomSheetOptionProps): JSX.Element {
  const destructiveColor = "critical";
  const textVariation = destructive ? destructiveColor : "subdued";

  return (
    <TouchableOpacity
      style={styles.bottomSheetOption}
      onPress={onPress}
      accessibilityLabel={text}
    >
      {icon && (
        <View style={styles.icon}>
          <Icon
            name={icon}
            color={destructive ? destructiveColor : iconColor}
          />
        </View>
      )}
      <View style={styles.title}>
        <Text variation={textVariation} emphasis={"strong"} align={textAlign}>
          {textTransform === "capitalize"
            ? capitalize(text.toLocaleLowerCase())
            : text}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
