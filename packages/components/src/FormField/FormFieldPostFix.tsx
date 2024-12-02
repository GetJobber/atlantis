import React from "react";
import styles from "./FormField.module.css";
import { Icon } from "../Icon";
import { Spinner } from "../Spinner";

interface FormFieldPostFixProps {
  readonly variation: "select" | "spinner";
  readonly visible?: boolean;
}

export function FormFieldPostFix({
  variation,
  visible = true,
}: FormFieldPostFixProps) {
  if (!visible) return null;

  return (
    <span className={styles.postfix}>
      {variation === "select" ? (
        <Icon name="arrowDown" />
      ) : (
        <Spinner size="small" />
      )}
    </span>
  );
}
