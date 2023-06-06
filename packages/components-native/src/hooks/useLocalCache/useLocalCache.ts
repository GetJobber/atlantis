import { useContext, useRef } from "react";
import { isEqual } from "lodash";
import { LocalCacheKeys } from "./localCacheKeys";
import { LocalCacheOptions } from "./types";
import { buildCustomId } from "./utils/localCacheHelper";
import { useBuildStorageKey } from "./utils/useBuildStorageKey";
import { AtlantisContext } from "../../AtlantisContext";

export interface UseLocalCacheShape {
  /**
   * Saves the data on local storage
   */
  readonly setLocalCache: <T>(data: T) => void;

  /**
   * Accepts a function that gives back the data from local storage as the
   * function's a param
   */
  readonly applyFromLocalCache: <T>() => T | undefined;

  /**
   * Removes the key from local storage
   */
  readonly removeLocalCache: () => void;
}

export function useLocalCache(
  key: LocalCacheKeys,
  options?: LocalCacheOptions,
): UseLocalCacheShape {
  const { session } = useContext(AtlantisContext);

  const customId = buildCustomId(options?.id);
  const storageKey = useBuildStorageKey({
    key,
    userId: session?.userId,
    accountId: session?.accountId,
  });

  const initialData = useRef<unknown>();

  function shouldSetData<T>(currentData: T): boolean {
    if (initialData.current == null) {
      initialData.current = currentData;
      return true;
    }

    return !isEqual(initialData.current, currentData);
  }
}
