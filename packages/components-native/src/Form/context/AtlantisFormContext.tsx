import { createContext, useContext } from "react";
import { AtlantisFormContextProps } from "./types";

const defaultValues: AtlantisFormContextProps = {
  LocalCacheKeys: "",
  useConfirmBeforeBack: () => undefined,
  useEditMode: () => undefined,
  useInternalFormLocalCache: () => undefined,
  useLocalCache: () => undefined,
};

export const AtlantisFormContext = createContext(defaultValues);

export function useAtlantisFormContext(): AtlantisFormContextProps {
  return useContext(AtlantisFormContext);
}
