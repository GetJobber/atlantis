import { PropsWithChildren } from "react";

export const ContentCardWrapper = ({ children }: PropsWithChildren) => {
  return (
    <div
      style={{
        display: "grid",
        width: "100%",
        gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
        gridTemplateRows: "auto",
        gap: "var(--space-base)",
      }}
    >
      {children}
    </div>
  );
};
