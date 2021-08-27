import React, { ReactNode, createRef } from "react";

interface ClickableCardProps {
  onClick?(event: React.MouseEvent<HTMLElement>): void;
  className: string;
  readonly children: ReactNode | ReactNode[];
}

export function CardClickable({
  className,
  onClick,
  children,
}: ClickableCardProps) {
  const cardRef = createRef<HTMLDivElement>();
  let attributes = {};
  if (onClick) {
    attributes = {
      onClick: onClick,
      onKeyUp: handleKeyup,
      role: "button",
      tabIndex: 0,
    };
  }

  return (
    <div ref={cardRef} className={className} {...attributes}>
      {children}
    </div>
  );

  function handleKeyup(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Enter" || event.key === " ") {
      cardRef.current?.click();
    }
  }
}
