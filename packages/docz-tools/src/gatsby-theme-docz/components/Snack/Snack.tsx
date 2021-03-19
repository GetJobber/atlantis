import React, { useLayoutEffect } from "react";

interface SnackProps {
  readonly code: string;
  readonly meta: string;
}

declare const window: any;

export function Snack({ code }: SnackProps) {
  const styles = {
    overflow: "hidden",
    border: "1px solid var(--color-grey--lighter)",
    borderRadius: "var(--radius-base)",
    height: "750px",
    width: "100%",
    margin: "var(--space-large) 0",
  };

  useLayoutEffect(() => {
    if (window.ExpoSnack) {
      window.ExpoSnack.initialize();
    }
  });

  return (
    <div
      style={styles}
      data-snack-name="Atlantis Eats Snacks"
      data-snack-code={code}
    />
  );
}
