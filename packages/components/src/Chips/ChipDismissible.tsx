import React, { MouseEvent } from "react";
import { InternalChipProps } from "./ChipTypes";
import { InternalChip } from "./InternalChip";
import { InternalChipButton } from "./InternalChipButton";

interface ChipDismissibleProps
  extends Pick<
    InternalChipProps,
    "label" | "disabled" | "invalid" | "prefix" | "onClick"
  > {
  onRequestRemove(event: MouseEvent<HTMLDivElement>): void;
}

export function ChipDismissible({
  label,
  disabled,
  invalid,
  prefix,
  onClick,
  onRequestRemove,
}: ChipDismissibleProps) {
  return (
    <InternalChip
      label={label}
      disabled={disabled}
      invalid={invalid}
      prefix={prefix}
      onClick={onClick}
      suffix={
        <InternalChipButton
          icon="remove"
          label={label}
          invalid={invalid}
          disabled={disabled}
          onClick={onRequestRemove}
        />
      }
    />
  );
}
