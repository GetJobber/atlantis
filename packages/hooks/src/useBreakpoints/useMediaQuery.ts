import { useCallback, useSyncExternalStore } from "react";

type MediaQuery = `(${string}:${string})`;

export const mediaQueryStore = {
  subscribe(onChange: () => void, query: MediaQuery) {
    const matchMedia = window.matchMedia(query);
    matchMedia.addEventListener("change", onChange);

    return () => {
      matchMedia.removeEventListener("change", onChange);
    };
  },
  getSnapshot(query: MediaQuery) {
    return () => window.matchMedia(query).matches;
  },
};

export function useMediaQuery(query: MediaQuery) {
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
