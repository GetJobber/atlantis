import { useEffect, useMemo } from "react";
import debounce from "lodash/debounce";
import { useCallbackRef } from "../useCallbackRef";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyFunction = (...args: any[]) => any;

/**
 * A hook to easily manage debounced functions, including their cleanup.
 * @param func The function to debounce.
 * @param wait The number of milliseconds to delay.
 * @param options Optional debounce settings.
 * @returns The debounced function.
 */
export function useDebounce<T extends AnyFunction>(
  func: T,
  wait: number,
  options?: Parameters<typeof debounce>[2],
) {
  const funcRef = useCallbackRef(func);

  const debounced = useMemo(() => {
    return debounce(
      (...args: Parameters<T>) => funcRef(...args),
      wait,
      options,
    );
  }, [funcRef, wait, options]);

  useEffect(() => {
    // If the debounced function is recreated (or unmounted), cancel the last call.
    return () => debounced.cancel();
  }, [debounced]);

  return debounced;
}
