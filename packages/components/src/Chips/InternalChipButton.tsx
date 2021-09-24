import React, {
  KeyboardEvent,
  MutableRefObject,
  SyntheticEvent,
  useRef,
} from "react";
import { IconNames } from "@jobber/design";
import styles from "./InternalChip.css";
import { ChipIcon } from "./ChipIcon";

export interface ChipButtonProps {
  readonly icon: IconNames;
  readonly invalid?: boolean;
  readonly disabled?: boolean;
  readonly label: string;
  onClick(event: SyntheticEvent<HTMLDivElement>): void;
}

export function InternalChipButton({
  icon,
  invalid,
  disabled,
  label,
  onClick,
}: ChipButtonProps) {
  const buttonRef = useRef() as MutableRefObject<HTMLDivElement>;

  return (
    <div
      ref={buttonRef}
      className={styles.button}
      tabIndex={0}
      aria-label={`Remove ${label}`}
      aria-role="button"
      onKeyUp={handleKeyDown}
      onClick={handleClick}
      data-testid="remove-chip-button"
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
