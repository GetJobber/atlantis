import React from "react";
import { Pressable, View } from "react-native";
import { useStyles } from "./Overlay.style";
import { OverlayProp } from "../../types";

export function Overlay({ setOpen }: OverlayProp): JSX.Element {
  const styles = useStyles();

  return (
    <Pressable
      onPressIn={() => {
        setOpen(false);
      }}
    >
      <View style={styles.overlay} />
    </Pressable>
  );
}
