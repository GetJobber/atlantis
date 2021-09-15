import React from "react";
import styles from "./ButtonDismiss.css";
import { Button } from "../Button";

interface ButtonDismissProps {
  onClick?(
    event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
  ): void;
  ariaLabel: string;
}

export function ButtonDismiss({ onClick, ariaLabel }: ButtonDismissProps) {
  return (
    <div className={styles.closeButtonWrapper}>
      <Button
        ariaLabel={ariaLabel}
        icon="remove"
        onClick={onClick}
        type="tertiary"
        variation="subtle"
      />
    </div>
  );
}
