import type { MutableRefObject } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import throttle from "lodash/throttle";

interface UseTabsOverflow {
  overflowRight: boolean;
  overflowLeft: boolean;
  tabRow: MutableRefObject<HTMLUListElement>;
}

export function useTabsOverflow(): UseTabsOverflow {
  const [overflowRight, setOverflowRight] = useState(false);
  const [overflowLeft, setOverflowLeft] = useState(false);
  const tabRow = useRef() as MutableRefObject<HTMLUListElement>;

  const handleOverflowing = () => {
    if (tabRow.current) {
      const scrollWidth = tabRow.current.scrollWidth;
      const clientWidth = tabRow.current.clientWidth;
      const maxScroll = scrollWidth - clientWidth;
      const scrollPos = tabRow.current.scrollLeft;

      setOverflowRight(scrollPos >= 0 && scrollPos != maxScroll);
      setOverflowLeft(scrollPos > 0 && scrollPos < scrollWidth);
    }
  };

  const throttledHandleOverflowing = useCallback(
    throttle(handleOverflowing, 100),
    [],
  );

  useEffect(() => {
    handleOverflowing();
    tabRow?.current?.addEventListener("scroll", throttledHandleOverflowing);

    return () => {
      tabRow?.current?.removeEventListener(
        "scroll",
        throttledHandleOverflowing,
      );
    };
  });

  return {
    overflowRight,
    overflowLeft,
    tabRow,
  };
}
