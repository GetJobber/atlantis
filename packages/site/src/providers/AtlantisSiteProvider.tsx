import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";
import { useBreakpoints } from "@jobber/hooks";

const AtlantisSiteContext = createContext<{
  minimal: {
    requested: boolean;
    enabled: boolean;
  };
  enableMinimal: () => void;
  disableMinimal: () => void;
  isMinimal: boolean;
  isMobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
}>({
  minimal: {
    requested: false,
    enabled: false,
  },
  isMinimal: false,
  enableMinimal: () => ({}),
  disableMinimal: () => ({}),
  isMobileMenuOpen: false,
  toggleMobileMenu: () => ({}),
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { mediumAndUp } = useBreakpoints();

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

  const toggleMobileMenu = () => {
    if (!mediumAndUp) {
      setIsMobileMenuOpen(prevState => !prevState);
    }
  };

  return (
    <AtlantisSiteContext.Provider
      value={{
        minimal: minimalState,
        isMinimal: minimalState.enabled && minimalState.requested,
        enableMinimal,
        disableMinimal,
        isMobileMenuOpen,
        toggleMobileMenu,
      }}
    >
      {children}
    </AtlantisSiteContext.Provider>
  );
};
