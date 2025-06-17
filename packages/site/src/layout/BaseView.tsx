import { Box } from "@jobber/components";
import { PropsWithChildren } from "react";
import { TopNav } from "./TopNav";

export function BaseView({ children }: PropsWithChildren) {
  return <div style={{ display: "flex", height: "100dvh" }}>{children}</div>;
}

BaseView.Main = function Main({
  children,
  noMaxWidth = false,
}: {
  readonly children: React.ReactNode;
  readonly noMaxWidth?: boolean;
}) {
  return (
    <Box width="grow">
      <TopNav />
      <main
        style={{
          backgroundColor: "var(--color-surface)",
          boxShadow: "var(--shadow-base)",
          flexGrow: 1,
          borderRadius: "var(--radius-base) var(--radius-base) 0 0",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            overflowY: "scroll",
            borderRadius: "inherit",
          }}
        >
          <Box alignItems="center">
            <div
              style={{
                width: "100%",
                maxWidth: noMaxWidth
                  ? "none"
                  : "calc(768px + var(--space-large))",
                padding: "0 var(--space-base)",
                boxSizing: "border-box",
              }}
            >
              {children}
            </div>
          </Box>
        </div>
      </main>
    </Box>
  );
};

BaseView.Siderail = function Siderail({
  children,
  visible = true,
}: {
  readonly children: React.ReactNode;
  readonly visible?: boolean;
}) {
  if (!visible) {
    return null;
  }

  return <aside className="baseView-sideRail">{children}</aside>;
};
