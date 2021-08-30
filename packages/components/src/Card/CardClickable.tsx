import React, { ReactNode, createRef } from "react";

interface ClickableCardProps {
  onClick(event: React.MouseEvent<HTMLElement>): void;
  className: string;
  readonly children: ReactNode | ReactNode[];
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
}: ClickableCardProps) {
  const cardRef = createRef<HTMLDivElement>();

  return (
    <div
      ref={cardRef}
      data-testid="clickable-card"
      className={className}
      onClick={onClick}
      onKeyUp={handleKeyup}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
    >
      {children}
    </div>
  );

  function handleKeyup(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key === ENTER_KEY || event.key === SPACEBAR_KEY) {
      cardRef.current?.click();
    }
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key === SPACEBAR_KEY) {
      event.preventDefault();
    }
  }
}
