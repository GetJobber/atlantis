import React, { PropsWithChildren, createContext, useContext } from "react";

interface SegmentedControlProviderContext {
  name?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onValueChange: React.Dispatch<React.SetStateAction<any | undefined>>;
  selectedValue: unknown;
}

export const SegmentedControlContext =
  createContext<SegmentedControlProviderContext>({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, prettier/prettier
    onValueChange: (val: unknown) => ({}),
    selectedValue: null,
  });

interface SegmentedControlProviderProps<T> extends PropsWithChildren {
  readonly name?: string;
  readonly onValueChange: (value: T) => void;
  readonly selectedValue: T | undefined;
}

export const useSegmentedControl = () => {
  const { onValueChange, selectedValue, name } = useContext(
    SegmentedControlContext,
  );

  return { onValueChange, selectedValue, name };
};

export function SegmentedControlProvider<TValue extends string | number>({
  children,
  onValueChange,
  name,
  selectedValue,
}: SegmentedControlProviderProps<TValue>) {
  return (
    <SegmentedControlContext.Provider
      value={{ onValueChange, selectedValue, name }}
    >
      {children}
    </SegmentedControlContext.Provider>
  );
}
