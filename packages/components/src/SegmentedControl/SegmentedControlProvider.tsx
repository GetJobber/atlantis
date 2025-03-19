import React, {
  ChangeEventHandler,
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

interface SegmentedControlProviderContext<T = unknown> {
  handleChange: ChangeEventHandler<HTMLInputElement>;
  selectedValue: T;
  segmentedControlName?: string;
}

export const SegmentedControlContext = createContext<
  SegmentedControlProviderContext<unknown>
>({
  handleChange: () => ({}),
  selectedValue: null,
  segmentedControlName: "",
});

interface SegmentedControlProviderProps<T> extends PropsWithChildren {
  readonly selectedValue?: T;
  readonly onSelectValue?: (value: T) => void;
  readonly defaultValue?: T;
  readonly name?: string;
}

export const useSegmentedControl = <T,>() => {
  return useContext(
    SegmentedControlContext,
  ) as SegmentedControlProviderContext<T>;
};

export function SegmentedControlProvider<T>({
  children,
  selectedValue,
  onSelectValue,
  defaultValue,
  name,
}: SegmentedControlProviderProps<T>) {
  const isControlled =
    selectedValue !== undefined && onSelectValue !== undefined;
  const [internalSelectedValue, setInternalSelectedValue] = useState<
    T | undefined
  >(defaultValue);

  const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    event => {
      const value = event.target.value as T;

      if (!isControlled) {
        setInternalSelectedValue(value);
      }
      onSelectValue?.(value);
    },
    [onSelectValue, isControlled],
  );

  const currentSelectedOption = isControlled
    ? selectedValue
    : internalSelectedValue;

  useEffect(() => {
    if (isControlled && currentSelectedOption !== undefined) {
      onSelectValue?.(currentSelectedOption);
    }
  }, []);

  return (
    <SegmentedControlContext.Provider
      value={{
        handleChange,
        selectedValue: currentSelectedOption,
        segmentedControlName: name,
      }}
    >
      {children}
    </SegmentedControlContext.Provider>
  );
}
