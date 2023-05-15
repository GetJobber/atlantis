import { createContext, useContext } from "react";
/**
 * @interal Context to verify `Grid.Cell`'s are only usable inside of a `Grid`
 */
export interface InternalGridContextProps {
  readonly gridName: string;
}

export const defaultValues: InternalGridContextProps = {
  gridName: "",
};

export const InternalGridContext = createContext(defaultValues);

export function useInternalGridContext(): InternalGridContextProps {
  return useContext(InternalGridContext);
}
