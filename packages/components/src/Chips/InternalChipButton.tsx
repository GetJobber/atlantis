import React, { SyntheticEvent } from "react";
import { ChipIcon, ChipIconProps } from "./ChipIcon";

interface ChipButtonProps extends Pick<ChipIconProps, "name"> {
  readonly invalid?: boolean;
  readonly disabled?: boolean;
  onClick?(event: SyntheticEvent<HTMLDivElement>): void;
}

export function InternalChipButton({
  name: icon,
  invalid,
  disabled,
  onClick,
}: ChipButtonProps) {
  return (
    <div onClick={handleClick}>
      <ChipIcon name={icon} color={getColor()} />
    </div>
  );

  function getColor() {
    if (invalid) return "criticalOnSurface";
    if (disabled) return "disabled";
    return "greyBlue";
  }

  function handleClick(event: SyntheticEvent<HTMLDivElement>) {
    event.stopPropagation();
    onClick?.(event);
  }
}
