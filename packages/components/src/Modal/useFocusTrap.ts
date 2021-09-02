import { useEffect, useRef } from "react";

export function useFocusTrap<T extends HTMLElement>() {
  const ref = useRef<T>();
  const focusables = [
    "button",
    "[href]",
    "input",
    "select",
    "textarea",
    '[tabindex]:not([tabindex="-1"])',
  ];

  function handleKeyDown(event: KeyboardEvent) {
    if (!ref.current || event.key !== "Tab") {
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
    ref.current?.addEventListener("keydown", handleKeyDown);
    return () => {
      ref.current?.removeEventListener("keydown", handleKeyDown);
    };
  });

  return ref;
}
