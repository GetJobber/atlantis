import { FieldValues, UseFormReturn } from "react-hook-form";
import { useIsMounted } from "@jobber/hooks";
import {
  LocalCacheKeys,
  LocalCacheOptions,
  UseLocalCacheShape,
} from "../../hooks/useLocalCache";

export function useInternalFormLocalCache<T extends FieldValues>(
  { reset, formState, setValue }: UseFormReturn<T>,
  cacheKey?: LocalCacheKeys,
  options?: LocalCacheOptions,
): Pick<UseLocalCacheShape, "setLocalCache" | "removeLocalCache"> {
  const isMounted = useIsMounted();
  const {} = useLocalCache(cacheKey || LocalCacheKeys.INVALID, options);
}
