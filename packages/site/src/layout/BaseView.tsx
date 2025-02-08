import { Box } from "@jobber/components";
import { PropsWithChildren } from "react";
import { Header } from "./Header";

export function BaseView({ children }: PropsWithChildren) {
  return <div style={{ display: "flex", height: "100dvh" }}>{children}</div>;
}

BaseView.Main = function Main({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return (
    <Box>
      <Header />
      <Box
        as="main"
        background="surface"
        radius="base"
        position="relative"
        overflow="auto"
        alignItems="center"
      >
        <Box alignItems="center" radius="base" overflow="auto">
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
      </Box>
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
