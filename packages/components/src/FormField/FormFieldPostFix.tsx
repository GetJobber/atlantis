import React from "react";
import styles from "./FormField.css";
import { Icon } from "../Icon";
import { Spinner } from "../Spinner";

interface FormFieldPostFixProps {
  readonly variation: "select" | "spinner";
}

export function FormFieldPostFix({ variation }: FormFieldPostFixProps) {
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
