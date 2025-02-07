import { Box } from "@jobber/components";
import { PropsWithChildren } from "react";

export function BaseView({ children }: PropsWithChildren) {
  return <div style={{ display: "flex", height: "100%" }}>{children}</div>;
}

BaseView.Main = function Main({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return (
    <main
      style={{
        overflowY: "auto",
        backgroundColor: "var(--color-surface)",
        boxShadow: "var(--shadow-low)",
        flexGrow: 1,
      }}
    >
      <Box alignItems="center">
        <div
          style={{
            width: "100%",
            maxWidth: "calc(768px + var(--space-large)",
            padding: "0 var(--space-base)",
            boxSizing: "border-box",
          }}
        >
          {children}
        </div>
      </Box>
    </main>
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
