import { PropsWithChildren, useEffect } from "react";
import { Route, Switch, useLocation } from "react-router";
import { NavMenu } from "./NavMenu";
import { ComponentView } from "./ComponentView";
import { AtlantisRoute, routes } from "../routes";
import "./code-theme.css";
import { ToggleThemeButton } from "../components/ToggleThemeButton";

/**
 * Layout for whole application. This will display the NavMenu and the content of the page.
 * @returns ReactNode
 */

export const Layout = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [location]);

  return (
    <LayoutWrapper>
      <NavMenu />
      <div style={{ overflow: "auto", width: "100%", minHeight: "100%" }}>
        <Switch>
          {routes?.map((route, routeIndex) => {
            if (route.inNav === false) return null;

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

          {/* The component page */}
          <Route
            key={"component"}
            exact={true}
            path={"/components/:name"}
            component={ComponentView}
          />
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
