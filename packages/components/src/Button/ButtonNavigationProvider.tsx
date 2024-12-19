import noop from "lodash/noop";
import identity from "lodash/identity";
import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useMemo,
} from "react";

export interface NavigationConfig {}
export type RouterOptions = NavigationConfig extends { routerOptions: infer T }
  ? T
  : // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any;
export type NavigationPath = NavigationConfig extends { href: infer T }
  ? T
  : string;
type LocationHref = Location["href"];

interface ButtonNavigationContextProps {
  /**
   * Function that will be called when a user clicks on a Button with a URL and useClientSideRouting is true.
   */
  readonly openLink: (
    href: NavigationPath,
    routerOptions?: RouterOptions,
    event?: React.MouseEvent<HTMLAnchorElement>,
  ) => void;
  /**
   * Function that will build the href used by the anchor tag in the Button component.
   */
  readonly buildLocationHref: (
    href?: NavigationPath,
    routerOptions?: RouterOptions,
  ) => LocationHref;
}

interface ButtonNavigationContext {
  readonly openLink: ButtonNavigationContextProps["openLink"];
  readonly buildLocationHref: ButtonNavigationContextProps["buildLocationHref"];
}

const ButtonNavigationContext = createContext<ButtonNavigationContext>({
  openLink: noop,
  buildLocationHref: href => href || "",
});

export function useButtonNavigationProvider() {
  return useContext(ButtonNavigationContext);
}

export function ButtonNavigationProvider({
  buildLocationHref,
  openLink,
  children,
}: PropsWithChildren<ButtonNavigationContextProps>) {
  const ctx: ButtonNavigationContext = useMemo(
    () => ({
      buildLocationHref: buildLocationHref || identity,
      openLink: (linkPath, routerOptions, rawEvent) => {
        openLink(linkPath, routerOptions, rawEvent);
      },
    }),
    [openLink, buildLocationHref],
  );

  return (
    <ButtonNavigationContext.Provider value={ctx}>
      {children}
    </ButtonNavigationContext.Provider>
  );
}
