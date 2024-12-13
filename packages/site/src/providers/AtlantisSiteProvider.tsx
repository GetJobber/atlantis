import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";

// STODO: We already have a few providers, should we consolidate them?
// Or should be have a provider for each feature?
// Should we use Zustand for this?

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

  return (
    <AtlantisSiteContext.Provider
      value={{
        minimal: minimalState,
        isMinimal: minimalState.enabled && minimalState.requested,
        enableMinimal,
        disableMinimal,
      }}
    >
      {children}
    </AtlantisSiteContext.Provider>
  );
};
