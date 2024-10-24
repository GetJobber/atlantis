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
}

export const SegmentedControlContext =
  createContext<SegmentedControlProviderContext>({
    handleChange: () => ({}),
    selectedOption: null,
  });

interface SegmentedControlProviderProps<T> extends PropsWithChildren {
  readonly onSelectOption: (value: T) => void;
  readonly defaultOption: T;
}

export const useSegmentedControl = () => {
  const { handleChange, selectedOption } = useContext(SegmentedControlContext);

  return { handleChange, selectedOption };
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

  return (
    <SegmentedControlContext.Provider
      value={{
        handleChange,
        selectedOption,
      }}
    >
      {children}
    </SegmentedControlContext.Provider>
  );
}
