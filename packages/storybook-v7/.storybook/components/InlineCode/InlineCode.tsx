import React from "react";

export function InlineCode(props: unknown) {
  const styles = {
    display: "inline-block",
    borderRadius: "var(--radius--base)",
    fontFamily: "monospace",
    background: "var(--color-surface--background)",
    padding: "var(--space-smaller)",
  };

  return <code {...props} style={styles} />;
}
