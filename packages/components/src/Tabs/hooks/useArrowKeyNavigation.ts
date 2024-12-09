import { useCallback } from "react";

interface UseArrowKeyNavigationProps {
  elementsRef: React.RefObject<(HTMLElement | null)[]>;
  onActivate: (index: number) => void;
}

export const useArrowKeyNavigation = ({
  elementsRef,
  onActivate,
}: UseArrowKeyNavigationProps) => {
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLElement>) => {
      const elements = elementsRef.current;
      if (!elements) return;

      const currentIndex = elements.findIndex(
        element => element === document.activeElement,
      );

      if (currentIndex === -1) return;

      const focusAndActivateTab = (index: number) => {
        const element = elements[index];

        if (element) {
          element.focus();
          onActivate(index);
        }
      };

      if (event.key === "ArrowRight") {
        event.preventDefault();
        const nextIndex = (currentIndex + 1) % elements.length;
        focusAndActivateTab(nextIndex);
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        const prevIndex =
          (currentIndex - 1 + elements.length) % elements.length;
        focusAndActivateTab(prevIndex);
      }
    },
    [elementsRef, onActivate],
  );

  return handleKeyDown;
};
