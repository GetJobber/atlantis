import React from "react";
import { Icon } from "../Icon";
import { Chip, ChipProps } from "../Chip";

export function ChipDismissible({ onClick, ...rest }: ChipProps) {
  return (
    <Chip {...rest} onClick={onClick}>
      <Chip.Suffix>
        <Icon name="remove" />
      </Chip.Suffix>
    </Chip>
  );
}
