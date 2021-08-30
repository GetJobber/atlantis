import React, { ReactNode, createRef } from "react";

interface ClickableCardProps {
  onClick(event: React.MouseEvent<HTMLElement>): void;
  className: string;
  readonly children: ReactNode | ReactNode[];
}

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
      className={className}
      onClick={onClick}
      onKeyUp={handleKeyup}
      role="button"
      tabIndex={0}
    >
      {children}
    </div>
  );

  function handleKeyup(event: React.KeyboardEvent<HTMLDivElement>) {
    const ENTER_KEY = "Enter";
    const SPACEBAR_KEY = " ";
    if (event.key === ENTER_KEY || event.key === SPACEBAR_KEY) {
      cardRef.current?.click();
    }
  }
}
