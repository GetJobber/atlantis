import React from "react";
import styles from "./ButtonDismiss.css";
import { Button } from "../Button";

interface ButtonDismissProps {
  onClick?(event: React.MouseEvent<HTMLElement>): void;
  ariaLabel: string;
  size?: "small" | "base";
}

export function ButtonDismiss({
  onClick,
  ariaLabel,
  size = "base",
}: ButtonDismissProps) {
  return (
    <div className={styles.closeButtonWrapper}>
      <Button
        ariaLabel={ariaLabel}
        icon="remove"
        onClick={onClick}
        type="tertiary"
        variation="cancel"
        size={size}
      />
    </div>
  );
}
