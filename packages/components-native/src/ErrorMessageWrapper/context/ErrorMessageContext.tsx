/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext, useContext } from "react";
import { ErrorMessageContextProps } from "./types";

const defaultValues: ErrorMessageContextProps = {
  elements: {},
  register: _ => undefined,
  unregister: _ => undefined,
};

export const ErrorMessageContext = createContext(defaultValues);

export function useErrorMessageContext(): ErrorMessageContextProps {
  return useContext(ErrorMessageContext);
}
