import React from "react";
import { Chip } from "../../Chip";
import type { ChipProps } from "../../Chip.types";
import { Icon } from "../../../Icon";

export function ChipDismissible(props: ChipProps) {
  return (
    <Chip {...props}>
      <Chip.Suffix>
        <Icon name="cross" size="small" color="interactiveSubtle" />
      </Chip.Suffix>
    </Chip>
  );
}
