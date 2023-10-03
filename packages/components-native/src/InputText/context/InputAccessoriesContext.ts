import { createContext, useContext } from "react";
import { InputAccessoriesContextProps } from "./types";

const inputAccessoriesContextDefaultValues: InputAccessoriesContextProps = {
  elements: {},
  focusedInput: "",
  canFocusNext: false,
  canFocusPrevious: false,
  inputAccessoryID: undefined,
  register: () => undefined,
  unregister: () => undefined,
  onFocusNext: () => undefined,
  onFocusPrevious: () => undefined,
  setFocusedInput: () => undefined,
};

export const InputAccessoriesContext = createContext(
  inputAccessoriesContextDefaultValues,
);

export function useInputAccessoriesContext(): InputAccessoriesContextProps {
  return useContext(InputAccessoriesContext);
}
