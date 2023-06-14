import { createContext, useContext, useRef } from "react";
import { FieldValues } from "react-hook-form";
import { AtlantisFormContextProps } from "./types";

const defaultValues = {
  useConfirmBeforeBack: () => {
    const ref = useRef(() => undefined);
    return ref;
  },
  useInternalFormLocalCache: () => ({
    setLocalCache: () => undefined,
    removeLocalCache: () => undefined,
  }),
};

export const AtlantisFormContext = createContext(defaultValues);

export function useAtlantisFormContext<
  TData extends FieldValues,
>(): AtlantisFormContextProps<TData> {
  return useContext(AtlantisFormContext);
}
