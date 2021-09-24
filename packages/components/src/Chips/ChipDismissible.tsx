import React from "react";
import { ChipIcon } from "./ChipIcon";
import { InternalChip, InternalChipProps } from "./InternalChip";

type ChipDismissibleProps = Pick<
  InternalChipProps,
  "label" | "disabled" | "invalid" | "prefix" | "onClick"
>;

export function ChipDismissible(props: ChipDismissibleProps) {
  return (
    <InternalChip
      {...props}
      type="button"
      suffix={<ChipIcon name="remove" />}
    />
  );
}
