export interface VersionedCachedData<T> {
  /**
   * Save data on local storage
   */
  readonly data: T;

  /**
   * The app version so we can determine if it's stale or not
   */
  readonly version: string;

  /**
   * JSON date string so we can determine if it's stale or not
   */
  readonly timestamp: string;

  /**
   * Extra way to identify the data. If this id doesn't match id passed in the
   * `options`for `useLocalCache` the data will be removed from the local cache
   */
  readonly customId?: string;
}

export interface LocalCacheOptions {
  /**
   * Allows the ability to specify that the cached data contains pre-filled data.
   * By setting this the cached data will only be applied if the same id is based
   * for the same key. If the id doesn't match the data will be deleted from the
   * cache.
   */
  readonly id?: string | string[];
}
