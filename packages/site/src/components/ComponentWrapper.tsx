import { PropsWithChildren } from "react";

/**
 * Little bit of code to surround a component with padding when displaying within a contentCard
 * @param param0 {children:ReactNode}
 * @returns ReactNode
 */
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
