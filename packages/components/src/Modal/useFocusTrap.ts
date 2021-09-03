import { useEffect, useRef } from "react";

export function useFocusTrap<T extends HTMLElement>(active: boolean) {
  // There's an ongoing issue with useRef return type clashing with an element's
  // ref prop type. TLDR: Use null because useRef doesn't expect undefined.
  // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/35572#issuecomment-498242139
  // eslint-disable-next-line no-null/no-null
  const ref = useRef<T>(null);
  const focusables = [
    "button",
    "[href]",
    "input",
    "select",
    "textarea",
    '[tabindex]:not([tabindex="-1"])',
  ];

  function handleKeyDown(event: KeyboardEvent) {
    if (!(active && ref.current) || event.key !== "Tab") {
      return;
    }

    const elements = ref.current.querySelectorAll<HTMLElement>(
      focusables.join(", "),
    );
    const firstElement = ref.current;
    const lastElement = elements[elements.length - 1];

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
  });

  return ref;
}
