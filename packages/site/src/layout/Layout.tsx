import React, { PropsWithChildren, useEffect, useRef } from "react";
import { Route, Switch, useHistory, useLocation } from "react-router";
import { NavMenu } from "./NavMenu";
import { AtlantisRoute, routes } from "../routes";
import "./code-theme.css";
import { ToggleThemeButton } from "../components/ToggleThemeButton";
import { hooksList } from "../hooksList";
/**
 * Layout for whole application. This will display the NavMenu and the content of the page.
 * @returns ReactNode
 */

export const Layout = () => {
  const location = useLocation();
  const scrollPane = useRef<HTMLDivElement>(null);
  const path = new URLSearchParams(location.search).get("path");
  const history = useHistory();

  useEffect(() => {
    if (scrollPane?.current) {
      scrollPane?.current.scrollTo({ top: 0 });
    }
  }, [location, scrollPane?.current]);

  // Redirects for the links on the hooks packages page
  if (path && path.includes("hooks")) {
    const pathRegex = /hooks-(.*)--docs/g.exec(path);
    const match = hooksList.find(
      hook => pathRegex?.[1] === hook.title.toLowerCase(),
    );

    if (match) {
      history.push(match.to);
    }
  }

  return (
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
        <Switch>
          <React.Fragment key={location.pathname}>
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
                  <React.Fragment key={route.path}>
                    <Route
                      key={routeIndex}
                      exact={route.exact ?? false}
                      path={route.path}
                      component={route.component}
                    />
                    {iterateSubMenu(route.children)}
                  </React.Fragment>
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
          </React.Fragment>
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
        background: "var(--color-surface--background)",
      }}
    >
      {children}
    </div>
  );
};
