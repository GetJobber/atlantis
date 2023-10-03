import React from "react";
import { Pressable, View } from "react-native";
import capitalize from "lodash/capitalize";
import { styles } from "./MenuOption.style";
import { MenuOptionInternalProps } from "../../types";
import { tokens } from "../../../utils/design";
import { Flex } from "../../../Flex";
import { Typography } from "../../../Typography";
import { Icon } from "../../../Icon";

export function MenuOption({
  label,
  icon,
  iconColor = "heading",
  textAlign,
  destructive,
  textTransform = "capitalize",
  onPress,
  setOpen,
}: MenuOptionInternalProps): JSX.Element {
  const destructiveColor = "critical";
  const textVariation = destructive ? destructiveColor : "heading";
  return (
    <View testID="ATL-MENU-OPTIONS">
      <Pressable
        style={({ pressed }) => [
          styles.menuOption,
          { opacity: pressed ? tokens["opacity-pressed"] : 1 },
        ]}
        onPress={() => {
          onPress();
          setOpen(false);
        }}
        accessibilityLabel={label}
      >
        <Flex
          template={["grow", "shrink"]}
          align={"flex-start"}
          gap={"smaller"}
        >
          <Typography
            selectable={false}
            color={textVariation}
            fontWeight={"semiBold"}
            lineHeight={"large"}
            align={textAlign}
          >
            {textTransform === "capitalize"
              ? capitalize(label.toLocaleLowerCase())
              : label}
          </Typography>

          {icon && (
            <Icon
              name={icon}
              color={destructive ? destructiveColor : iconColor}
            />
          )}
        </Flex>
      </Pressable>
    </View>
  );
}
