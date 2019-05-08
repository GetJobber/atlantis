import React from "react";
import { InlineLabel } from "../../InlineLabel";
import styles from "./StatusLabel.css";

interface StatusLabelProps {
  readonly status: "draft" | "pending" | "paid";
}

function getStatusLabelColour(status: string) {
  switch (status) {
    case "pending":
      return "yellow";
    case "paid":
      return "green";
    default:
      return "greyBlue";
  }
}

export function StatusLabel({ status }: StatusLabelProps) {
  const statusColour = getStatusLabelColour(status);
  return (
    <span className={styles.statusWrapper}>
      <InlineLabel color={statusColour}>{status}</InlineLabel>
    </span>
  );
}
