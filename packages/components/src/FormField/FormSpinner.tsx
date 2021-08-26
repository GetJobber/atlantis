import React from "react";
import styles from "./FormField.css";
import { Spinner } from "../Spinner";

export function FormSpinner() {
  return (
    <span className={styles.postfix}>
      <Spinner size="small" />
    </span>
  );
}
