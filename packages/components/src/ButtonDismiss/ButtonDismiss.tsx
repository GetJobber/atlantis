import React from "react";
import styles from "./ButtonDismiss.css";
import { Button, ButtonProps } from "../Button";

interface ButtonDismissProps extends Pick<ButtonProps, "size"> {
  onClick?(): void;
  ariaLabel: string;
}

export function ButtonDismiss({
  onClick,
  ariaLabel,
  size,
}: ButtonDismissProps) {
  return (
    <div className={styles.closeButtonWrapper}>
      <Button
        ariaLabel={ariaLabel}
        icon="remove"
        size={size}
        onClick={onClick}
        type="tertiary"
        variation="cancel"
      />
    </div>
  );
}
