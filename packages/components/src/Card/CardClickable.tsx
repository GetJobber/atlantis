import type { ReactNode } from "react";
import React, { useRef } from "react";

interface ClickableCardProps {
  onClick(event: React.MouseEvent<HTMLElement>): void;
  readonly className: string;
  readonly children: ReactNode | ReactNode[];
  readonly UNSAFE_className?: string;
  readonly UNSAFE_style?: React.CSSProperties;
}

const ENTER_KEY = "Enter";
const SPACEBAR_KEY = " ";

/**
 * This is only intended to be used in the Card component.
 * Please use `<Card onClick={onClick} />` component instead.
 */
export function CardClickable({
  className,
  onClick,
  children,
  UNSAFE_style = {},
}: ClickableCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={cardRef}
      data-testid="clickable-card"
      className={className}
      style={UNSAFE_style}
      onClick={onClick}
      onKeyUp={handleKeyup}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
    >
      {children}
    </div>
  );

  function isCardFocused() {
    return document.activeElement === cardRef.current;
  }

  function handleKeyup(event: React.KeyboardEvent<HTMLDivElement>) {
    const shouldClick = event.key === ENTER_KEY || event.key === SPACEBAR_KEY;

    if (shouldClick && isCardFocused()) {
      cardRef.current?.click();
    }
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    // Prevent page scroll when hitting spacebar while focused on a card
    if (event.key === SPACEBAR_KEY && isCardFocused()) {
      event.preventDefault();
    }
  }
}
