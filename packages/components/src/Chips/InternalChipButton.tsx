import React, {
  KeyboardEvent,
  MutableRefObject,
  SyntheticEvent,
  useRef,
} from "react";
import styles from "./InternalChip.css";
import { ChipIcon, ChipIconProps } from "./ChipIcon";

interface ChipButtonProps extends Pick<ChipIconProps, "name"> {
  readonly invalid?: boolean;
  readonly disabled?: boolean;
  onClick(event: SyntheticEvent<HTMLDivElement>): void;
}

export function InternalChipButton({
  name: icon,
  invalid,
  disabled,
  onClick,
}: ChipButtonProps) {
  const buttonRef = useRef() as MutableRefObject<HTMLDivElement>;

  return (
    <div
      ref={buttonRef}
      className={styles.button}
      tabIndex={0}
      onKeyPress={handleKeyDown}
      onClick={handleClick}
    >
      <ChipIcon name={icon} color={getColor()} />
    </div>
  );

  function handleKeyDown(event: KeyboardEvent) {
    if (
      document.activeElement === buttonRef.current &&
      (event.key === " " || event.key === "Enter")
    ) {
      buttonRef.current.click();
    }
  }

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
