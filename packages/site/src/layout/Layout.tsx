import { PropsWithChildren, useEffect } from "react";
import { Route, Switch, useLocation } from "react-router";
import { NavMenu } from "./NavMenu";
import { routes } from "../routes";
import "./code-theme.css";

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
          {routes.map((route, index) =>
            route.children ? (
              route.children.map((child, childIndex) => (
                <Route
                  key={childIndex}
                  exact={child.exact ?? false}
                  path={child.path}
                  component={child.component}
                />
              ))
            ) : (
              <Route
                exact={route.exact ?? false}
                key={index}
                path={route.path}
                component={route.component}
              />
            ),
          )}
        </Switch>
      </div>
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
