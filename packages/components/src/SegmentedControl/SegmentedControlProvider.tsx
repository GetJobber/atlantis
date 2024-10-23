import React, {
  ChangeEventHandler,
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";

interface SegmentedControlProviderContext {
  handleChange: ChangeEventHandler<HTMLInputElement>;
  selectedOption: unknown;
  setSelectedOption: (option: string) => void;
}

export const SegmentedControlContext =
  createContext<SegmentedControlProviderContext>({
    handleChange: () => ({}),
    selectedOption: null,
    setSelectedOption: () => ({}),
  });

interface SegmentedControlProviderProps<T> extends PropsWithChildren {
  readonly onSelectOption: (value: T) => void;
  readonly defaultOption: T;
}

export const useSegmentedControl = () => {
  const { handleChange, selectedOption, setSelectedOption } = useContext(
    SegmentedControlContext,
  );

  return { handleChange, selectedOption, setSelectedOption };
};

export function SegmentedControlProvider<T>({
  children,
  onSelectOption,
  defaultOption,
}: SegmentedControlProviderProps<T>) {
  const [selectedOption, setSelectedOption] = useState<T>(defaultOption);

  const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    event => {
      const value = event.target.value as T;
      setSelectedOption(value);
      onSelectOption(value);
    },
    [onSelectOption],
  );

  const resetToDefaultOption = useCallback(() => {
    setSelectedOption(defaultOption);
  }, [defaultOption]);

  return (
    <SegmentedControlContext.Provider
      value={{
        handleChange,
        selectedOption,
        setSelectedOption: resetToDefaultOption,
      }}
    >
      {children}
    </SegmentedControlContext.Provider>
  );
}
