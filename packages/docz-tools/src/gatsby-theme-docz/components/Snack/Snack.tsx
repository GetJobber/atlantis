import React from "react";

interface SnackProps {
  readonly snack: string;
}

export function Snack({ snack }: SnackProps) {
  const styles = {
    overflow: "hidden",
    border: "1px solid var(--color-grey--lighter)",
    borderRadius: "var(--radius-base)",
    height: "750px",
    width: "100%",
    margin: "var(--space-large) 0",
  };

  return (
    <div
      data-snack-id={snack}
      data-snack-platform="android"
      data-snack-preview="true"
      data-snack-theme="light"
      style={styles}
    />
  );
}
