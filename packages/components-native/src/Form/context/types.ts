import { MutableRefObject } from "react";
import { FieldValues, UseFormReturn } from "react-hook-form";

export interface UseConfirmBeforeBackProps {
  alwaysPreventBack: boolean;
  onAcceptEvent?: () => void;
  shouldShowAlert: boolean;
  showLostProgressMessage?: boolean;
}

interface LocalCacheOptions {
  /**
   * Allows the ability to specify that the cached data contains pre-filled data.
   * By setting this the cached data will only be applied if the same id is based
   * for the same key. If the id doesn't match the data will be deleted from the
   * cache.
   */
  readonly id?: string | string[];
}

export interface AtlantisFormContextProps<TData extends FieldValues> {
  useConfirmBeforeBack: (
    props: UseConfirmBeforeBackProps,
  ) => MutableRefObject<() => void>;
  useInternalFormLocalCache: (
    formMethods: UseFormReturn<TData>,
    cacheKey?: string,
    options?: LocalCacheOptions,
  ) => {
    setLocalCache: (data: TData) => void;
    removeLocalCache: () => void;
  };
}
