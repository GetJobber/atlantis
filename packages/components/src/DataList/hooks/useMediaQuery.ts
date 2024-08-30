import { useCallback, useSyncExternalStore } from "react";

type MediaQuery = `(${string}:${string})`;

export const mediaQueryStore = {
  subscribe(onChange: () => void, query: MediaQuery) {
    if (
      typeof window === "undefined" ||
      typeof window.matchMedia === "undefined"
    ) {
      return () => undefined;
    }
    const matchMedia = window.matchMedia(query);
    matchMedia.addEventListener("change", onChange);

    return () => {
      matchMedia.removeEventListener("change", onChange);
    };
  },
  getSnapshot(query: MediaQuery) {
    if (
      typeof window === "undefined" ||
      typeof window.matchMedia === "undefined"
    ) {
      return () => true;
    }

    return () => window.matchMedia(query).matches;
  },
};

export function useMediaQuery(query: MediaQuery) {
  /**
   * matchMedia have had full support for browsers since 2012 but jest, being a
   * lite version of a DOM, doesn't support it.
   *
   * Instead of the consumers mocking matchMedia on every usage of DataList,
   * we can just return true to mimic the largest screen we support.
   *
   * In the event that the consumer wants to test the DataList on different
   * screen sizes, they can use the `mockViewportWidth` function from
   * `@jobber/components/useBreakpoints`.
   */

  const subscribeMediaQuery = useCallback(
    (onChange: () => void) => mediaQueryStore.subscribe(onChange, query),
    [query],
  );

  const matches = useSyncExternalStore(
    subscribeMediaQuery,
    mediaQueryStore.getSnapshot(query),
    () => true,
  );

  return matches;
}
