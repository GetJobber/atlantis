import { PropsWithChildren } from "react";

export const CodePreviewWindow = ({ children }: PropsWithChildren) => {
  return (
    <div
      style={{
        display: "flex",
        gap: "var(--space-small)",
        width: "100%",
        boxSizing: "border-box",
        padding: "var(--space-largest)",
        border: "var(--border-base) solid var(--color-border)",
        borderRadius: "var(--radius-base)",
        backgroundColor: "var(--color-surface)",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {children}
    </div>
  );
};
