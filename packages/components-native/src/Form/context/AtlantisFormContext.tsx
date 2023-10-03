import { createContext, useContext, useRef } from "react";
import { AtlantisFormContextProps } from "./types";

export const atlantisFormContextDefaultValues = {
  useConfirmBeforeBack: () => {
    const ref = useRef(() => undefined);
    return ref;
  },
  useInternalFormLocalCache: () => ({
    setLocalCache: () => undefined,
    removeLocalCache: () => undefined,
  }),
};

export const AtlantisFormContext = createContext<AtlantisFormContextProps>(
  atlantisFormContextDefaultValues,
);

export function useAtlantisFormContext(): AtlantisFormContextProps {
  return useContext(AtlantisFormContext);
}
