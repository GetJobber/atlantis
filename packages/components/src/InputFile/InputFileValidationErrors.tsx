import React from "react";
import { InputFileValidationError } from "./types";
import styles from "./InputFile.module.css";
import { InputValidation } from "../InputValidation";

export function InputFileValidationErrors({
  validationErrors,
}: {
  readonly validationErrors: InputFileValidationError[];
}) {
  if (validationErrors.length === 0) {
    return null;
  }

  return (
    <div className={styles.validationErrors}>
      {validationErrors.map(error => (
        <InputValidation message={error.message} key={error.code} />
      ))}
    </div>
  );
}
