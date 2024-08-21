import { useCallback, useMemo, useState } from "react";
import { Theme, ThemeChangeDetails } from "./types";

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
  const handleThemeChangeEvent = useCallback(
    (event: Event) => {
      const newTheme = (event as CustomEvent<ThemeChangeDetails>).detail.theme;
      enqueueThemeChange(newTheme);
    },
    [enqueueThemeChange],
  );

  return {
    dequeueThemeChange,
    isEmpty,
    enqueueThemeChange,
    themeChangeQueue,
    handleThemeChangeEvent,
  };
}
