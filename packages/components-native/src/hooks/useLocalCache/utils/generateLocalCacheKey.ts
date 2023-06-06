import { LocalCacheKeys } from "../localCacheKeys";

interface GenerateLocalCacheKeysOptions {
  accountId?: string;
  userId?: string;
}

export function generateLocalCacheKey(
  key: LocalCacheKeys,
  options?: GenerateLocalCacheKeysOptions,
);
