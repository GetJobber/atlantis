import React from "react";
import { Chip } from "../../Chip";
import { ChipProps } from "../../Chip.types.d";
import { Icon } from "../../../Icon";

export function ChipDismissible(props: ChipProps) {
  return (
    <Chip {...props}>
      <Chip.Suffix>
        <Icon name="cross" size="small" color="blue" />
      </Chip.Suffix>
    </Chip>
  );
}
