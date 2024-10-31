import React, {
  ChangeEventHandler,
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";

interface SegmentedControlProviderContext<T = unknown> {
  handleChange: ChangeEventHandler<HTMLInputElement>;
  selectedOption: T;
}

export const SegmentedControlContext = createContext<
  SegmentedControlProviderContext<unknown>
>({
  handleChange: () => ({}),
  selectedOption: null,
});

interface SegmentedControlProviderProps<T> extends PropsWithChildren {
  readonly selectedOption?: T;
  readonly onSelectOption?: (value: T) => void;
  readonly defaultOption?: T;
}

export const useSegmentedControl = () => {
  return useContext(SegmentedControlContext);
};

export function SegmentedControlProvider<T>({
  children,
  selectedOption,
  onSelectOption: onSelectOption,
  defaultOption,
}: SegmentedControlProviderProps<T>) {
  // const [selectedOption, setSelectedOption] = useState<T>(defaultOption);
  const isControlled =
    selectedOption !== undefined && onSelectOption !== undefined;
  const [internalSelectedOption, setInternalSelectedOption] = useState<
    T | undefined
  >(defaultOption);

  const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    event => {
      const value = event.target.value as T;
      if (!isControlled) setInternalSelectedOption(value);
      onSelectOption?.(value);
    },
    [onSelectOption, isControlled],
  );

  const currentSelectedOption = isControlled
    ? selectedOption
    : internalSelectedOption;

  return (
    <SegmentedControlContext.Provider
      value={{
        handleChange,
        selectedOption: currentSelectedOption,
      }}
    >
      {children}
    </SegmentedControlContext.Provider>
  );
}
