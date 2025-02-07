import { PropsWithChildren, useEffect, useRef } from "react";
import { Route, Switch, useHistory, useLocation } from "react-router";
import { NavMenu } from "./NavMenu";
import { routes } from "../routes";
import "./code-theme.css";
import { hooksList } from "../hooksList";
import { NotFoundPage } from "../pages/NotFoundPage";
import { TritonSideDrawer } from "../components/TritonSideDrawer";

/**
 * Layout for whole application. This will display the NavMenu and the content of the page.
 * @returns ReactNode
 */

// eslint-disable-next-line max-statements
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
          width: "100%",
          height: "100dvh",
          outline: "transparent",
        }}
        ref={scrollPane}
        tabIndex={0}
      >
        <RoutesSwitch />
      </div>
      <TritonSideDrawer />
    </LayoutWrapper>
  );
};

const RoutesSwitch = () => {
  const baseRoutes: JSX.Element[] = [];

  routes?.forEach((route, routeIndex) => {
    // Top level items with children (Changelog)
    if (route.children) {
      baseRoutes.push(
        <Route
          key={routeIndex}
          exact={route.exact ?? false}
          path={route.path}
          component={route.component}
        />,
      );
    } else {
      // Top level items with no children
      baseRoutes.push(
        <Route
          exact={route.exact ?? false}
          key={routeIndex}
          path={route.path}
          component={route.component}
        />,
      );
    }
  });
  baseRoutes.push(
    <Route key={routes.length} path="*" component={NotFoundPage} />,
  );

  return (
    // The key is used to force a remount of the Switch
    // when the path changes. This ensures:
    // 1. The component props are updated when the path changes
    // 2. The Design tab is selected when the path changes
    <Switch key={location.pathname}>{baseRoutes}</Switch>
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
