import React from "react";
import { Button } from "../Button";

interface ButtonDismissProps {
  onClick(event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>): void;
  ariaLabel: string;
}

export function ButtonDismiss({ onClick, ariaLabel }: ButtonDismissProps) {
  return (
    <Button
      ariaLabel={ariaLabel}
      icon="remove"
      onClick={onClick}
      type="tertiary"
      variation="subtle"
    />
  );
}
