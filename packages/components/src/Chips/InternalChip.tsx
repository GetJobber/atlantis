import React from "react";
import { InternalChipProps } from "./ChipTypes";
import { Chip } from "../Chip";

export function InternalChip({
  label,
  disabled = false,
  invalid = false,
  prefix,
  suffix,
  tabIndex,
  ariaLabel,
  onClick,
  onKeyDown,
}: InternalChipProps) {
  return (
    <Chip
      disabled={disabled}
      invalid={invalid}
      onKeyDown={onKeyDown}
      testID="ATL-InternalChip"
      ariaLabel={ariaLabel}
      tabIndex={tabIndex}
      role={tabIndex !== undefined ? "option" : undefined}
      onClick={onClick ? (_, ev) => onClick(ev) : undefined}
      label={label}
    >
      {prefix && <Chip.Prefix>{prefix}</Chip.Prefix>}
      {suffix && <Chip.Suffix>{suffix}</Chip.Suffix>}
    </Chip>
  );
}
