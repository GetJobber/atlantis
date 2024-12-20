import { Box } from "@jobber/components";
import React from "react";

export function BaseView({ children }: PropsWithChildren) {
  return <div style={{ display: "flex", height: "100dvh" }}>{children}</div>;
}

BaseView.Main = function Main({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return (
    <main
      style={{
        overflowY: "scroll",
        backgroundColor: "var(--color-surface)",
        boxShadow: "var(--shadow-low)",
        flexGrow: 1,
      }}
    >
      <Box alignItems="center">
        <div style={{ width: "100%", maxWidth: "768px" }}>{children}</div>
      </Box>
    </main>
  );
};

BaseView.Siderail = function Siderail({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return (
    <aside
      style={{
        width: "200px",
        padding: "36px var(--space-base)",
        display: "flex",
        flexDirection: "column",
        flexShrink: "0",
        boxSizing: "border-box",
        overflowY: "auto",
        height: "100%",
      }}
    >
      {children}
    </aside>
  );
};
