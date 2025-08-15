import React from "react";
import type { InternalChipProps } from "./ChipTypes";
import { Chip } from "../Chip";

export function InternalChip({
  label,
  active = false,
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
      variation={active ? "base" : "subtle"}
      role={tabIndex !== undefined ? "option" : undefined}
      onClick={onClick ? (_, ev) => onClick(ev) : undefined}
      label={label}
    >
      {prefix && <Chip.Prefix>{prefix}</Chip.Prefix>}
      {suffix && <Chip.Suffix>{suffix}</Chip.Suffix>}
    </Chip>
  );
}
