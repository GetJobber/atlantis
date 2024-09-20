import { PropsWithChildren } from "react";
import { Route, Switch } from "react-router";
import { NavMenu } from "./NavMenu";
import { routes } from "../routes";
import "./code-theme.css";

export const Layout = () => {
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
        height: "100dvh",
        background: "var(--color-surface)",
      }}
    >
      {children}
    </div>
  );
};
