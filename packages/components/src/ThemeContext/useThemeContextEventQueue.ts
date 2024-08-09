import { useCallback, useMemo, useState } from "react";
import { Theme } from "./types";

export function useThemeContextEventQueue() {
  const [themeChangeQueue, setThemeChangeQueue] = useState<Theme[]>([]);

  const enqueueThemeChange = useCallback((newTheme: Theme) => {
    setThemeChangeQueue(prev => [...prev, newTheme]);
  }, []);

  const dequeueThemeChange = useCallback(() => {
    const [newTheme, ...rest] = themeChangeQueue;

    setThemeChangeQueue(rest);

    return newTheme;
  }, [themeChangeQueue]);

  const isEmpty = useMemo(
    () => themeChangeQueue.length === 0,
    [themeChangeQueue],
  );

  return {
    isEmpty,
    dequeueThemeChange,
    enqueueThemeChange,
    themeChangeQueue,
  };
}
