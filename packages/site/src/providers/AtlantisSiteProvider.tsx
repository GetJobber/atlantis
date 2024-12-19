import { ButtonNavigationProvider } from "@jobber/components";
import { LocationDescriptor } from "history";
import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";
import { useHistory } from "react-router-dom";

type RouterActionParameters = Parameters<
  ReturnType<typeof useHistory>["push"]
>[1];

interface RouterOptions {
  action?: "push" | "replace";
  parameters?: RouterActionParameters;
}
declare module "@jobber/components" {
  interface NavigationConfig {
    routerOptions: RouterOptions;
    href: LocationDescriptor<unknown>;
  }
}
const AtlantisSiteContext = createContext<{
  minimal: {
    requested: boolean;
    enabled: boolean;
  };
  enableMinimal: () => void;
  disableMinimal: () => void;
  isMinimal: boolean;
}>({
  minimal: {
    requested: false,
    enabled: false,
  },
  isMinimal: false,
  enableMinimal: () => ({}),
  disableMinimal: () => ({}),
});

export const useAtlantisSite = () => {
  return useContext(AtlantisSiteContext);
};

export const AtlantisSiteProvider = ({
  children,
  minimal,
}: PropsWithChildren<{
  readonly minimal: { enabled: boolean; requested: boolean };
}>) => {
  const [minimalState, setMinimalState] = useState(minimal);

  const enableMinimal = useCallback(() => {
    setMinimalState(prevState => ({
      ...prevState,
      enabled: true,
    }));
  }, []);

  const disableMinimal = useCallback(() => {
    setMinimalState(prevState => ({
      ...prevState,
      enabled: false,
    }));
  }, []);
  const history = useHistory();

  return (
    <AtlantisSiteContext.Provider
      value={{
        minimal: minimalState,
        isMinimal: minimalState.enabled && minimalState.requested,
        enableMinimal,
        disableMinimal,
      }}
    >
      <ButtonNavigationProvider
        openLink={(newPath, routerOptions) => {
          const action = routerOptions?.action || "push";
          const historyAction =
            action === "replace" ? history.replace : history.push;
          const state = routerOptions?.parameters;
          historyAction(newPath, state);
        }}
        buildLocationHref={to => {
          if (typeof to === "string" || !to) {
            return to || "";
          } else {
            return history.createHref(to);
          }
        }}
      >
        {children}
      </ButtonNavigationProvider>
    </AtlantisSiteContext.Provider>
  );
};
