import React, {
  KeyboardEvent,
  MouseEvent,
  MutableRefObject,
  useRef,
} from "react";
import { IconNames } from "@jobber/design";
import styles from "./InternalChip.css";
import { Icon } from "../Icon";

export interface ChipButtonProps {
  readonly icon: IconNames;
  readonly invalid?: boolean;
  readonly disabled?: boolean;
  readonly label: string;
  onClick(event: MouseEvent<HTMLDivElement>): void;
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
      onKeyUp={handleKeyUp}
      onKeyDown={handleKeyDown}
      onClick={handleClick}
      role="button"
      aria-label={`Remove ${label}`}
      aria-hidden={true}
      aria-disabled={disabled}
      data-testid="remove-chip-button"
    >
      <Icon name={icon} color={getColor()} />
    </div>
  );

  function handleKeyUp(event: KeyboardEvent) {
    if (
      document.activeElement === buttonRef.current &&
      (event.key === " " || event.key === "Enter")
    ) {
      event.stopPropagation();
      buttonRef.current.click();
    }
  }

  function handleKeyDown(event: KeyboardEvent) {
    if (document.activeElement === buttonRef.current && event.key === " ") {
      // Don't scroll down
      event.preventDefault();
    }
  }

  function getColor() {
    if (disabled) return "disabled";
    if (invalid) return "critical";
    return "greyBlue";
  }

  function handleClick(event: MouseEvent<HTMLDivElement>) {
    event.stopPropagation();
    onClick?.(event);
  }
}
