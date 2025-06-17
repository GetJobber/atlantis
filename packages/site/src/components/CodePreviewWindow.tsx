import { PropsWithChildren } from "react";

/**
 * Small wrapping window around the code preview that shows up at the top of the ComponentView (typically)
 * @param param0 {children: ReactNode}
 * @returns ReactNode
 */
export const CodePreviewWindow = ({ children }: PropsWithChildren) => {
  return (
    <div
      style={{
        display: "flex",
        gap: "var(--space-small)",
        width: "100%",
        boxSizing: "border-box",
        padding: "var(--space-small)",
        borderRadius: "var(--radius-base)",
        backgroundColor: "var(--color-surface--background--subtle)",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {children}
    </div>
  );
};
