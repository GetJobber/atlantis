import { PropsWithChildren } from "react";

export const ComponentWrapper = ({ children }: PropsWithChildren) => {
  return (
    <div
      style={{
        width: "100%",
        padding: "var(--space-large)",
        height: "calc(100% - 57px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxSizing: "border-box",
      }}
    >
      {children}
    </div>
  );
};
