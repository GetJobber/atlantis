import { useEffect } from "react";

/**
 * Brings back the focus to the element that opened an overlaid element once
 * said overlaid element is dismissed.
 *
 * @param active - Determines if it should focus or not
 */
export function useRefocusOnActivator(
  active: boolean,
  { disabled }: { disabled?: boolean } = {},
) {
  useEffect(() => {
    let activator: Element | null | undefined;

    if (active && !activator) {
      activator = document.activeElement;
    }

    return () => {
      if (active) {
        if (activator instanceof HTMLElement) {
          !disabled && activator.focus();
        }
        activator = undefined;
      }
    };
  }, [active]);
}
