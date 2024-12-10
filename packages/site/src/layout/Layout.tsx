import { PropsWithChildren, useEffect } from "react";
import { Route, Switch, useLocation } from "react-router";
import { NavMenu } from "./NavMenu";
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
            console.log("route", route);
            if (route.inNav === false) return null;

            const iterateSubSubMenu = (childchildroutes: AtlantisRoute[]) => {
              console.log("iteratesubsubsmenu", routes);

              return childchildroutes.map((childchild, childchildIndex) => {
                return (
                  <Route
                    key={childchildIndex}
                    exact={childchild.exact ?? false}
                    path={childchild.path}
                    component={childchild.component}
                  />
                );
              });
            };

            const iterateSubMenu = (childroutes: AtlantisRoute[]) => {
              console.log("iteratesubmenu", routes);

              return childroutes.map((child, childIndex) => {
                if (child.children) {
                  return <>{iterateSubSubMenu(child.children)}</>;
                }

                return (
                  <Route
                    key={childIndex}
                    exact={child.exact ?? false}
                    path={child.path}
                    component={child.component}
                  />
                );
              });
            };

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

            return (
              <Route
                exact={route.exact ?? false}
                key={routeIndex}
                path={route.path}
                component={route.component}
              />
            );
          })}
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
