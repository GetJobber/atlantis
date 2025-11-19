import React from "react";
import { Keyboard } from "react-native";
import { IconButton } from "../../IconButton";

interface FilterButtonProps {
  readonly accessibilityLabel: string;
  readonly onClick: () => void;
}

export function FilterButton({
  accessibilityLabel,
  onClick,
}: FilterButtonProps): JSX.Element {
  return (
    <IconButton
      onPress={() => {
        onClick();
        Keyboard.dismiss();
      }}
      name="filter"
      accessibilityLabel={accessibilityLabel}
    />
  );
}
