import React from "react";
import { Chip } from "../../Chip";
import { ChipProps } from "../../Chip.types.d";
import { Icon } from "../../../Icon";

export function ChipDismissible({ onClick, ...rest }: ChipProps) {
  return (
    <Chip {...rest}>
      <Chip.Suffix onClick={onClick}>
        <Icon name="cross" size="small" color="blue" />
      </Chip.Suffix>
    </Chip>
  );
}
