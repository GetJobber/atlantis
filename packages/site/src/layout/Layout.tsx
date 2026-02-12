import { useEffect, useRef } from "react";
import type { PropsWithChildren } from "react";
import { Outlet, useNavigate, useSearch } from "@tanstack/react-router";
import { AtlantisThemeContextProvider } from "@jobber/components";
import { NavMenu } from "./NavMenu";
import { Analytics } from "../components/Analytics";
import "./code-theme.css";
import { hooksList } from "../hooksList";
import { TritonSideDrawer } from "../components/TritonSideDrawer";
import { AtlantisPreviewProvider } from "../preview/AtlantisPreviewProvider";
import { AtlantisSiteProvider } from "../providers/AtlantisSiteProvider";
import { TritonProvider } from "../providers/TritonProvider";

/**
 * Layout for whole application. This will display the NavMenu and the content of the page.
 * @returns ReactNode
 */

export const Layout = () => {
  const scrollPane = useRef<HTMLDivElement>(null);
  const search = useSearch({ strict: false });

  useEffect(() => {
    if (scrollPane?.current) {
      scrollPane?.current.scrollTo({ top: 0 });
    }
  }, [location.pathname, scrollPane?.current]);

  useHookRedirect();

  const minimalMode = search?.minimal === true;

  if (location.pathname.includes("visual-tests")) {
    return (
      <AtlantisThemeContextProvider>
        <AtlantisSiteProvider
          minimal={{ requested: minimalMode, enabled: false }}
        >
          <AtlantisPreviewProvider>
            <TritonProvider>
              <Outlet />
            </TritonProvider>
          </AtlantisPreviewProvider>
        </AtlantisSiteProvider>
      </AtlantisThemeContextProvider>
    );
  }

  return (
    <AtlantisThemeContextProvider>
      <AtlantisSiteProvider
        minimal={{ requested: minimalMode, enabled: false }}
      >
        <AtlantisPreviewProvider>
          <TritonProvider>
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
          </TritonProvider>
        </AtlantisPreviewProvider>
      </AtlantisSiteProvider>
    </AtlantisThemeContextProvider>
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
