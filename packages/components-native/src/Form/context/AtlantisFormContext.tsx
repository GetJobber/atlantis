import { createContext, useContext, useRef } from "react";
import type { AtlantisFormContextProps } from "./types";

export const atlantisFormContextDefaultValues = {
  useConfirmBeforeBack: () => {
    const ref = useRef(() => undefined);

    return ref;
  },
  useInternalFormLocalCache: () => ({
    setLocalCache: () => undefined,
    removeLocalCache: () => undefined,
  }),
  edgeToEdgeEnabled: false,
};

export const AtlantisFormContext = createContext<AtlantisFormContextProps>(
  atlantisFormContextDefaultValues,
);

export function useAtlantisFormContext(): AtlantisFormContextProps {
  return useContext(AtlantisFormContext);
}
