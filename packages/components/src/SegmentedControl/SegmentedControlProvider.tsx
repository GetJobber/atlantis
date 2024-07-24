import React, {
  ChangeEventHandler,
  PropsWithChildren,
  createContext,
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

  const handleChange: ChangeEventHandler<HTMLInputElement> = event => {
    setSelectedOption(event.target.value as T);
    onSelectOption(event.target.value as T);
  };

  return (
    <SegmentedControlContext.Provider
      value={{
        handleChange,
        selectedOption,
        setSelectedOption: () => {
          setSelectedOption(defaultOption);
        },
      }}
    >
      {children}
    </SegmentedControlContext.Provider>
  );
}
