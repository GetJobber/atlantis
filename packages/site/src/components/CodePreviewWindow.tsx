import { PropsWithChildren } from "react";

//STODO: Move to CSS Modules?
//STODO: Add a prop to allow for a custom border color?

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
