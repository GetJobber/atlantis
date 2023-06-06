import { useCallback } from "react";
import { LocalCacheKeys } from "./localCacheKeys";

interface UseLocalCacheDeleteShape {
  readonly deleteOrphanedKeys: () => void;
  readonly deleteAllCacheKeys: () => void;
  readonly deleteStaleValues: () => void;
}

const existingKeys = Object.values(LocalCacheKeys);

export function useLocalCacheDelete(): UseLocalCacheDeleteShape {
  const deleteOrphanedKeys = useCallback(() => deleteOrphans(), []);
}

function deleteOrphans() {
  const validKeys = getValidCacheKeys();
  const orphanedKeys = validKeys.filter(key => !endsWithSupportedKeys(key));

  storage.multiRemove(orphanedKeys);
}

function endsWithSupportedKeys(value: string) {
  return existingKeys.some(key => value.endsWith(key));
}
