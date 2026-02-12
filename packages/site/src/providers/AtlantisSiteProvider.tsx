import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearch,
} from "@tanstack/react-router";
import type { ComponentType } from "../types/content";

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
  /** Component type derived from URL (path tab + isLegacy) when on a component page; null otherwise */
  componentTypeFromUrl: ComponentType | null;
  /** Update isLegacy in the URL (only affects web platform; only has effect on component pages) */
  setComponentTypeInUrl: (type: ComponentType) => void;
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
  componentTypeFromUrl: null,
  setComponentTypeInUrl: () => ({}),
});

export const useAtlantisSite = () => {
  return useContext(AtlantisSiteContext);
};

// eslint-disable-next-line max-statements
export const AtlantisSiteProvider = ({
  children,
  minimal,
}: PropsWithChildren<{
  readonly minimal: { enabled: boolean; requested: boolean };
}>) => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams({ strict: false });
  const search = useSearch({ strict: false }) as
    | { isLegacy?: boolean }
    | undefined;

  const isComponentPage = location.pathname.startsWith("/components/");
  const tab = params.tab?.toLowerCase().trim();
  const isLegacy = search?.isLegacy === true;
  const componentTypeFromUrl: ComponentType | null = useMemo(() => {
    if (!isComponentPage) return null;
    if (tab === "mobile") return "mobile";
    if (tab === "web") return isLegacy ? "web" : "webSupported";

    return null;
  }, [isComponentPage, tab, isLegacy]);

  const setComponentTypeInUrl = useCallback(
    (type: ComponentType) => {
      if (!isComponentPage) return;
      const isLegacyForType = type === "web";
      navigate({
        to: ".",
        search: (prev: { isLegacy?: boolean }) => ({
          ...prev,
          ...(isLegacyForType ? { isLegacy: true } : { isLegacy: false }),
        }),
      });
    },
    [isComponentPage, navigate],
  );

  const [minimalState, setMinimalState] = useState(minimal);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
    setIsMobileMenuOpen(prevState => !prevState);
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
        componentTypeFromUrl,
        setComponentTypeInUrl,
      }}
    >
      {children}
    </AtlantisSiteContext.Provider>
  );
};
