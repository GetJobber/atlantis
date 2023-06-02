import React from "react";
import { Keyboard, Pressable, PressableProps } from "react-native";
import { styles } from "./SelectPressable.style";
import { SelectInternalPickerProps } from "../../types";
import { useIsScreenReaderEnabled } from "../../../hooks";

type SelectPressableProps = Pick<SelectInternalPickerProps, "children"> &
  Pick<PressableProps, "onPress">;

/**
 * Switches between Pressable with pressed styling and a fragment when a
 * screen-reader is being used to avoid screen-readers from ignoring the press
 * on the MenuView
 */
export function SelectPressable({
  children,
  onPress,
}: SelectPressableProps): JSX.Element {
  const isScreenReaderEnabled = useIsScreenReaderEnabled();

  if (isScreenReaderEnabled) return <>{children}</>;

  return (
    <Pressable
      style={({ pressed }) => [pressed && styles.pressed]}
      onPressIn={Keyboard.dismiss}
      onPress={onPress}
    >
      {children}
    </Pressable>
  );
}
