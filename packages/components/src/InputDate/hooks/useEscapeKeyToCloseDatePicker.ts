import { useEffect } from "react";

export function useEscapeKeyToCloseDatePicker(
  open: boolean,
  onClose: () => void,
  refs: React.RefObject<HTMLElement | null>[],
) {
  const escFunction = (event: KeyboardEvent) => {
    if (event.key === "Escape" && open) {
      onClose();
      event.stopPropagation();
    }
  };

  useEffect(() => {
    refs.forEach(ref => ref.current?.addEventListener("keydown", escFunction));

    return () => {
      refs.forEach(ref =>
        ref.current?.removeEventListener("keydown", escFunction),
      );
    };
  }, [open, ...refs]);
}
