import { PropsWithChildren, useEffect, useRef } from "react";
import { Route, Switch, useLocation } from "react-router";
import { NavMenu } from "./NavMenu";
import { AtlantisRoute, routes } from "../routes";
import "./code-theme.css";
import { ToggleThemeButton } from "../components/ToggleThemeButton";

//STODO: Update to use TanStack Router
//STODO: Move the hook to be generically available.
// useScrollToTopOnNavigate(ref) would be useful.

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
  }, [location, scrollPane?.current]);

  return (
    <LayoutWrapper>
      <NavMenu />
      <div
        style={{ overflow: "auto", width: "100%", height: "100dvh" }}
        ref={scrollPane}
      >
        <Switch>
          <>
            {routes?.map((route, routeIndex) => {
              const iterateSubMenu = (childroutes: AtlantisRoute[]) => {
                return childroutes.map((child, childIndex) => {
                  // We don't want to loop through the components
                  if (!child.children) {
                    return (
                      <Route
                        key={childIndex}
                        exact={child.exact ?? false}
                        path={child.path}
                        component={child.component}
                      />
                    );
                  }
                });
              };

              // Top level items with children (Changelog)
              if (route.children) {
                return (
                  <>
                    <Route
                      key={routeIndex}
                      exact={route.exact ?? false}
                      path={route.path}
                      component={route.component}
                    />
                    {iterateSubMenu(route.children)}
                  </>
                );
              }

              // Top level items with no children
              return (
                <Route
                  exact={route.exact ?? false}
                  key={routeIndex}
                  path={route.path}
                  component={route.component}
                />
              );
            })}
          </>
        </Switch>
      </div>

      <ToggleThemeButton />
    </LayoutWrapper>
  );
};

export const LayoutWrapper = ({ children }: PropsWithChildren) => {
  return (
    <div
      style={{
        display: "flex",
        background: "var(--color-surface)",
      }}
    >
      {children}
    </div>
  );
};
