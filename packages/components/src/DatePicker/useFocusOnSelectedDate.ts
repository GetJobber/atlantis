import { useRef } from "react";

export function useFocusOnSelectedDate(portalContainerId?: string) {
  const ref = useRef<HTMLDivElement>(null);

  /**
   * Moves focus to the selected/pre-selected day in the calendar ([tabindex="0"]).
   * Uses tabindex rather than react-datepicker's internal CSS class names, which
   * are an implementation detail and may change.
   *
   * Returns true if focus was successfully moved, false otherwise.
   */
  function focusOnSelectedDate(): boolean {
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
  }

  return { ref, focusOnSelectedDate };
}
