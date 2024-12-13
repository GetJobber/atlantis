import { PropsWithChildren } from "react";

/**
 * A very cool grid-based wrapper to make the contents auto-scale.
 *
 * @param param0 {children: ReactNode}
 * @returns ReactNode
 */
export const ContentCardWrapper = ({ children }: PropsWithChildren) => {
  return (
    <div
      style={{
        display: "grid",
        width: "100%",
        gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
        gridTemplateRows: "auto",
        gap: "var(--space-larger)",
      }}
      data-elevation="elevated"
    >
      {children}
    </div>
  );
};
