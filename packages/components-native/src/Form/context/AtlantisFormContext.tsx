import { createContext, useContext, useRef } from "react";
import { AtlantisFormContextProps } from "./types";

export const defaultValues = {
  useConfirmBeforeBack: () => {
    const ref = useRef(() => undefined);
    return ref;
  },
  useInternalFormLocalCache: () => ({
    setLocalCache: () => undefined,
    removeLocalCache: () => undefined,
  }),
};

export const AtlantisFormContext =
  createContext<AtlantisFormContextProps>(defaultValues);

export function useAtlantisFormContext(): AtlantisFormContextProps {
  return useContext(AtlantisFormContext);
}
