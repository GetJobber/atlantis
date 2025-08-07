import { useEffect, useMemo } from "react";
import { debounce } from "es-toolkit";
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

  // Note: do not add additional dependencies! There is currently no use case where we would change
  // the wait delay or options between renders. By not tracking as dependencies, this allows
  // consumers of useDebounce to provide a raw object for options rather than forcing them to
  // memoize that param. Same with the func they provide, we're using a ref to keep that up
  // to date and to avoid forcing the consumer to memoize it.
  const debounced = useMemo(() => {
    return debounce(
      (...args: Parameters<T>) => funcRef(...args),
      wait,
      options,
    );
  }, [funcRef]);

  useEffect(() => {
    // If the debounced function is recreated (or unmounted), cancel the last call.
    return () => debounced.cancel();
  }, [debounced]);

  return debounced;
}
