import { useEffect, useRef } from "react";
import type { PropsWithChildren } from "react";
import { Outlet, useLocation, useNavigate } from "@tanstack/react-router";
import { NavMenu } from "./NavMenu";
import { Analytics } from "../components/Analytics";
import "./code-theme.css";
import { hooksList } from "../hooksList";
import { TritonSideDrawer } from "../components/TritonSideDrawer";

/**
 * Layout for whole application. This will display the NavMenu and the content of the page.
 * @returns ReactNode
 */

export const Layout = () => {
  const location = useLocation();
  const scrollPane = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollPane?.current) {
      scrollPane?.current.scrollTo({ top: 0 });
    }
  }, [location.pathname, scrollPane?.current]);

  useHookRedirect();

  if (location.pathname.includes("visual-tests")) {
    return <Outlet />;
  }

  return (
    <>
      <Analytics />
      <LayoutWrapper>
        <NavMenu mainContentRef={scrollPane} />
        <div
          style={{
            overflow: "auto",
            width: "100%",
            height: "100dvh",
            outline: "transparent",
          }}
          ref={scrollPane}
          tabIndex={0}
        >
          <Outlet />
        </div>
        <TritonSideDrawer />
      </LayoutWrapper>
    </>
  );
};

const useHookRedirect = () => {
  const path = new URLSearchParams(location.search).get("path");
  const navigate = useNavigate();

  if (path && path.includes("hooks")) {
    const pathRegex = /hooks-(.*)--docs/g.exec(path);
    const match = hooksList.find(
      hook => pathRegex?.[1] === hook.title.toLowerCase(),
    );

    if (match) {
      navigate({ to: match.to });
    }
  }
};

export const LayoutWrapper = ({ children }: PropsWithChildren) => {
  return (
    <div
      style={{
        display: "flex",
        background: "var(--color-surface--background)",
      }}
    >
      {children}
    </div>
  );
};
