import { useMemo } from "react";
import { LocalCacheKeys } from "../localCacheKeys";

interface UseBuildStorageKeyShape {
  key: LocalCacheKeys;
  accountId?: string;
  userId?: string;
}

export function useBuildStorageKey({
  key,
  accountId,
  userId,
}: UseBuildStorageKeyShape) {
  return useMemo(() => {
    if (key !== LocalCacheKeys.INVALID && accountId && userId) {
      return generateLocalCacheKey(key, { accountId, userId });
    }
  });
}
