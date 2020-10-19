import { useLayoutEffect, useRef } from "react";

export function useIsFirstRender() {
  const firstUpdate = useRef(true);

  useLayoutEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
  });

  return firstUpdate.current;
}
