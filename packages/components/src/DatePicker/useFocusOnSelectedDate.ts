import { useCallback, useRef } from "react";

export function useFocusOnSelectedDate(portalContainerId?: string) {
  const ref = useRef<HTMLDivElement>(null);

  // Moves focus to the selected/pre-selected day in the calendar ([tabindex="0"]).
  const focusOnSelectedDate = useCallback((): boolean => {
    const portalElement = portalContainerId
      ? document.getElementById(portalContainerId)
      : null;
    const searchRoot = portalElement ?? ref.current;
    const day = searchRoot?.querySelector('[tabindex="0"]');

    if (day instanceof HTMLElement) {
      day.focus();

      return true;
    }

    return false;
  }, [portalContainerId]);

  return { ref, focusOnSelectedDate };
}
