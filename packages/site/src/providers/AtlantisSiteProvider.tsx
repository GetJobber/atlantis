import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";

const AtlantisSiteContext = createContext<{
  minimal: {
    requested: boolean;
    enabled: boolean;
  };
  enableMinimal: () => void;
  disableMinimal: () => void;
  isMinimal: boolean;
  context: string;
}>({
  minimal: {
    requested: false,
    enabled: false,
  },
  isMinimal: false,
  context: "",
  enableMinimal: () => ({}),
  disableMinimal: () => ({}),
});

export const useAtlantisSite = () => {
  return useContext(AtlantisSiteContext);
};

export const AtlantisSiteProvider = ({
  children,
  minimal,
  context,
}: PropsWithChildren<{
  readonly minimal: { enabled: boolean; requested: boolean };
  readonly context: string;
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
        context,
      }}
    >
      {children}
    </AtlantisSiteContext.Provider>
  );
};
