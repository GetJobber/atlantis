import { useEffect, useRef } from "react";

/**
 * Traps the focus within the children of the ref element.
 *
 * @param active - Turns the focus trapping on or off. Also adds aria-hidden on the
 * body but not the dialog.
 *
 * @returns ref
 */
export function useFocusTrap<T extends HTMLElement>(active: boolean) {
  // There's an ongoing issue with useRef return type clashing with an element's
  // ref prop type. TLDR: Use null because useRef doesn't expect undefined.
  // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/35572
  // eslint-disable-next-line no-null/no-null
  const ref = useRef<T>(null);

  function handleKeyDown(event: KeyboardEvent) {
    if (!(active && ref.current) || event.key !== "Tab") {
      return;
    }

    const { firstElement, lastElement } = getElements(ref.current);

    if (event.shiftKey) {
      if (document.activeElement === firstElement) {
        lastElement.focus();
        event.preventDefault();
      }
    } else {
      if (document.activeElement === lastElement) {
        firstElement.focus();
        event.preventDefault();
      }
    }
  }

  useEffect(() => {
    if (active) {
      document.body.setAttribute("aria-hidden", "true");
      ref.current?.setAttribute("aria-hidden", "false");
      ref.current?.focus();
      ref.current?.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.removeAttribute("aria-hidden");
      ref.current?.removeAttribute("aria-hidden");
      ref.current?.removeEventListener("keydown", handleKeyDown);
    };
  }, [active]);

  return ref;
}

function getElements<T extends HTMLElement>(ref: T) {
  const focusables = [
    "button",
    "[href]",
    "input",
    "select",
    "textarea",
    '[tabindex]:not([tabindex="-1"])',
  ];
  const elements = ref.querySelectorAll<HTMLElement>(focusables.join(", "));
  const firstElement = ref;
  const lastElement = elements[elements.length - 1];
  return { firstElement, lastElement };
}
