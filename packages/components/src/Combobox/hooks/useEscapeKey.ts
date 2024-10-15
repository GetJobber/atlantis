import { useCallback, useEffect, useRef } from "react";

export function useEscapeKey(
  isOpen: boolean,
  handleClose: () => void,
  activatorRef: React.RefObject<HTMLDivElement>,
) {
  // create ref to store handleclose and update it when it changes
  const handleCloseRef = useRef(handleClose);
  handleCloseRef.current = handleClose;

  const listener = useCallback(
    (event: KeyboardEvent) => {
      // is the Combobox open and the escape key is pressed
      if (event.key === "Escape" && isOpen) {
        event.stopPropagation();
        handleCloseRef.current();
        // finds the first button in the activator and focuses it
        activatorRef.current?.querySelector("button")?.focus();
      }
    },
    [isOpen, activatorRef],
  );

  useEffect(() => {
    document.addEventListener("keydown", listener);

    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, [listener]);
}
