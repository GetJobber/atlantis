import type { LegacyRef, MutableRefObject, RefCallback } from "react";

/**
 * Given an array of refs, merge them into a single ref callback.
 * This is useful for cases where you need to pass a multiple refs to a component.
 */
export function mergeRefs<T = unknown>(
  refs: Array<MutableRefObject<T> | LegacyRef<T> | undefined | null>,
): RefCallback<T> {
  return value => {
    refs.forEach(ref => {
      if (typeof ref === "function") {
        ref(value);
      } else if (ref != null) {
        (ref as MutableRefObject<T | null>).current = value;
      }
    });
  };
}
