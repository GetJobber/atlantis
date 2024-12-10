import React, {
  ChangeEventHandler,
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";
import { AnyOption } from "./Option";
import { InputTextRebuiltProps } from "../InputText/InputText.types";

export interface AutocompleteContext<T = unknown> {
  handleSelectedValueChange: ChangeEventHandler;
  selectedValue: T;
  inputTextValue: string;
  onTextInputChange?: InputTextRebuiltProps["onChange"];
  defaultValue?: T;
  name?: string;
}

export const AutocompleteContext = createContext<AutocompleteContext<unknown>>({
  handleSelectedValueChange: () => ({}),
  selectedValue: undefined,
  name: "",
  inputTextValue: "",
});

export interface AutoCompleteProviderProps<T extends AnyOption = AnyOption>
  extends PropsWithChildren {
  readonly selectedValue?: T;
  readonly defaultSelectedValue?: T;
  readonly onSelectValue?: (newValue: T) => void;
  readonly textInputValue?: string;
  readonly onTextInputChange?: (newText: string) => void;
  readonly name?: string;
}

export function useAutocomplete<T>() {
  return useContext(AutocompleteContext) as AutocompleteContext<T>;
}

export function AutoCompleteProvider<T extends AnyOption>({
  selectedValue,
  onSelectValue,
  textInputValue,
  onTextInputChange,
  defaultSelectedValue,
  name,
  children,
}: AutoCompleteProviderProps<T>) {
  const [currentSelectedOption, handleChange] = useControllableState<T>({
    value: selectedValue,
    onValueChange: onSelectValue,
  });
  const [inputTextValue, handleInputTextChange] = useControllableInputText({
    value: textInputValue,
    onValueChange: onTextInputChange,
    defaultValue: defaultSelectedValue?.label,
  });

  return (
    <AutocompleteContext.Provider
      value={{
        handleSelectedValueChange: handleChange,
        selectedValue: currentSelectedOption,
        inputTextValue,
        onTextInputChange: handleInputTextChange,
        defaultValue: defaultSelectedValue,
        name,
      }}
    >
      {children}
    </AutocompleteContext.Provider>
  );
}

export interface ControllableStateProps<T = unknown> {
  readonly value?: T;
  readonly onValueChange?: (newValue: T) => void;
  readonly defaultValue?: T;
}

export function useControllableState<T>({
  defaultValue,
  value,
  onValueChange,
}: ControllableStateProps<T>) {
  const isControlled = value !== undefined && onValueChange !== undefined;
  const [internalSelectedValue, setInternalSelectedValue] = useState<
    T | undefined
  >(defaultValue);

  const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    event => {
      const newValue = event.target.value as T;

      if (!isControlled) {
        setInternalSelectedValue(newValue);
      }
      onValueChange?.(newValue);
    },
    [onValueChange, isControlled],
  );

  const currentSelectedOption = isControlled ? value : internalSelectedValue;

  const hasInitialized = useRef(false);

  if (!hasInitialized.current && currentSelectedOption !== undefined) {
    onValueChange?.(currentSelectedOption);
    hasInitialized.current = true;
  }

  return [currentSelectedOption, handleChange] as const;
}

export interface InputTextControllableStateProps {
  readonly value?: string;
  readonly onValueChange?: (newValue: string) => void;
  readonly defaultValue?: string;
}

export function useControllableInputText({
  value,
  onValueChange,
  defaultValue,
}: InputTextControllableStateProps) {
  const isControlled = value !== undefined && onValueChange !== undefined;
  const [internalSelectedValue, setInternalSelectedValue] = useState<string>(
    defaultValue || "",
  );

  const handleChange: InputTextRebuiltProps["onChange"] = useCallback(
    (newValue: string) => {
      if (!isControlled) {
        setInternalSelectedValue(newValue);
      }
      onValueChange?.(newValue);
    },
    [onValueChange, isControlled],
  );

  const currentSelectedOption = isControlled ? value : internalSelectedValue;

  const hasInitialized = useRef(false);

  if (!hasInitialized.current && currentSelectedOption !== undefined) {
    onValueChange?.(currentSelectedOption);
    hasInitialized.current = true;
  }

  return [currentSelectedOption, handleChange] as const;
}
