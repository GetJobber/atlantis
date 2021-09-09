import { useEffect } from "react";

/**
 * Brings back the focus to the element that opened an overlaid element once
 * said overlaid element is dismissed.
 *
 * @param active - Determines if it should focus or not
 */
export function useRefocusOnActivator(active: boolean) {
  useEffect(() => {
    let activator: Element | null | undefined;

    if (active && !activator) {
      activator = document.activeElement;
    }

    return () => {
      if (active) {
        // Wait for other DOM changes before focusing on the activator
        setTimeout(() => {
          if (activator instanceof HTMLElement) {
            activator.focus();
          }
          activator = undefined;
        }, 0);
      }
    };
  }, [active]);
}
